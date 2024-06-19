const express=require("express");
const router=express.Router();
const teacher_attendanceModel=require("../models/teacher_attendanceModel")

router.post("/",async(req,res)=>{
    try{
        const attendance=await teacher_attendanceModel.createteacher_attendance(req.body);
        
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",async(req,res)=>{
    try{
        const attendance=await teacher_attendanceModel.getteacher_attendance();
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:teacherid",async(req,res)=>{
    try{
        const teacherid=req.params.teacherid;
        let attendance;
        if(teacherid.includes("-")){
            attendance=await teacher_attendanceModel.getteacher_attendanceByDate(teacherid);
        }
        else{
            attendance=await teacher_attendanceModel.getteacher_attendanceByID(teacherid);
        }
        
        res.status(200).json({attendance});
    }catch(error){
        console.log(error)
        res.status(400).json(error);
    }
})

router.put("/:id",async(req,res)=>{
    try{
        const attendance=await teacher_attendanceModel.updateteacher_attendance(req.params.id, req.body);
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",async(req,res)=>{
    try{
        const attendance=await teacher_attendanceModel.deleteteacher_attendance(req.params.id);
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})



module.exports=router;