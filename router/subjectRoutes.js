const express=require("express");
const router=express.Router();
const subjectModel=require("../models/subjectModel")
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const subject=await subjectModel.createSubject(req.body);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const subject=await subjectModel.getSubject();
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:id",authorizeAdmin,async(req,res)=>{
    try{
        const subject=await subjectModel.getSubjectById(req.params.id);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const subject=await subjectModel.updateSubject(req.params.id, req.body);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const subject=await subjectModel.deleteSubject(req.params.id);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})



module.exports=router;