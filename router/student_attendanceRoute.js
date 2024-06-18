const express=require("express");
const router=express.Router();
const Student_attendanceModel=require("../models/student_attendanceModel")


router.post("/",async(req,res)=>{
    try{
        const subject=await Student_attendanceModel.createStudent_attendance(req.body);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",async(req,res)=>{
    try{
        const subject=await Student_attendanceModel.getStudent_attendance();
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const subject=await Student_attendanceModel.getStudent_attendanceByID(req.params.id);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const subject=await Student_attendanceModel.updateStudent_attendance(req.params.id, req.body);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const subject=await Student_attendanceModel.deleteStudent_attendance(req.params.id);
        res.status(200).json({subject});
    }catch(error){
        res.status(400).json(error);
    }
})



module.exports=router;