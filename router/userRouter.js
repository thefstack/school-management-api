const express=require("express");
const router=express.Router();

const userModel=require("../models/userModel");


const bcrypt = require("bcryptjs");
const pool = require("../db/conn");
const jwt=require("jsonwebtoken");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.get("/login",async(req,res)=>{
    try{
        const {user_id, password}=req.body;
        const [rows]=await pool.execute(`select * from users where user_id=?`,[user_id]);
        if(rows.length===0)
            return res.status(400).json({error:"Invalid username or password"})

        const user=rows[0];

        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
            return res.status(400).json({error:"Invalid username or password"});
        const payload={
            user:user.user_id,
            pass:user.password
        }
        const token=jwt.sign(payload ,process.env.SECRET_KEY,{expiresIn:'30m'});

        const updateData=await userModel.updateUser(user_id,{token:`${token}`})
        res.cookie('token',token,{httpOnly:true, secure:true, maxAge:30*60*1000});
        res.json({token})

    }catch(error){
        res.status(500).json({error:"Error logging in"})
    }
})


router.post("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const result=await userModel.createUser(req.body);
        res.status(200).json(result)
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:userid",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const result=await userModel.getToken(req.params.userid);
        if(result){
            res.status(200).json(result)
        }else{
            res.status(400).json({error:"error"})
        }
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const result=await userModel.updateUser(req.params.id,req.body);
        res.status(200).json({result})

    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const result=await userModel.deleteUser(req.params.id);
        res.status(200).json({result});
    }catch(error){
        res.status(400).json({error});
    }
})


module.exports=router;