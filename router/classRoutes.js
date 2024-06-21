const express=require("express");
const router=express.Router();
const classModel=require("../models/classModel");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const classes=await classModel.createClasses(req.body);
        res.status(200).json({classes})
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        
        const classes=await classModel.getClasses();
        res.status(200).json(classes)
    }catch(error){
        res.status(400).json(error);
    }

})

router.get("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        
        const classes=await classModel.getClassesById(req.params.id);
        res.status(200).json(classes)
    }catch(error){
        res.status(400).json(error);
    }

})

router.put("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const classes=await classModel.updateClasses(req.params.id,req.body);
        res.status(200).json({classes});

    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const classes=await classModel
        .deleteClasses(req.params.id);
        res.status(200).json({classes})
    }catch(error){
        res.status(400).json(error);
    }
})

module.exports=router;