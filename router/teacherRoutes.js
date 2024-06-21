const express=require('express');
const router=express.Router();
const teacherModel=require("../models/teacherModel");

const teacherAttendance=require("./teacher_attendanceRoute");
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.use("/attendance",teacherAttendance);

router.post("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const teacherId=await teacherModel.createTeacher(req.body);
        res.status(200).json({id:teacherId})
    }catch(error){
        
        res.status(400).json({error})
    }
})

router.get("/",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const teacher=await teacherModel.getTeacher();
        res.status(200).json(teacher);
    }catch(error){
        res.status(400).json({error})
    }
})

router.get("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const teacher=await teacherModel.getTeacherById(req.params.id);
        res.status(200).json(teacher);

    }catch(error){
        res.status(400).json({error});
    }
})

router.put("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const teacher=await teacherModel.updateTeacher
        (req.params.id,req.body);

        res.status(200).json(teacher.info);
        
    }catch(error){
        res.json(400).json({error});
    }
})

router.delete("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const teacher=await teacherModel.deleteTeacher(req.params.id);

        res.status(200).json(teacher);
    }catch(error){
        res.status(400).json({error});
    }
})


module.exports= router