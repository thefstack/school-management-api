const express=require("express");
const router=express.Router();
const Student_attendanceModel=require("../models/student_attendanceModel")
const {authenticateToken,authorizeAdmin}=require("../middleware/authToken")

router.post("/",authenticateToken,async(req,res)=>{
    try{
        const attendance=await Student_attendanceModel.createStudent_attendance(req.body);
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/",authenticateToken,async(req,res)=>{
    try{
        const attendance=await Student_attendanceModel.getStudent_attendance();
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.get("/:studentid",authenticateToken,async(req,res)=>{
    try{
        const studentid=req.params.studentid;
        let attendance;
        if(studentid.includes("-")){
            attendance=await Student_attendanceModel.getStudent_attendanceByDate(studentid);
        }
        else if((parseInt(studentid,10))>=200 && (parseInt(studentid,10)<=299))
            {
            attendance=await Student_attendanceModel.getStudent_attendanceByClass(studentid);
        }
        else{
            attendance=await Student_attendanceModel.getStudent_attendanceByID(studentid);
        }
        
        res.status(200).json({attendance});
    }catch(error){
        console.log(error)
        res.status(400).json(error);
    }
})

router.put("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const attendance=await Student_attendanceModel.updateStudent_attendance(req.params.id, req.body);
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})

router.delete("/:id",authenticateToken,authorizeAdmin,async(req,res)=>{
    try{
        const attendance=await Student_attendanceModel.deleteStudent_attendance(req.params.id);
        res.status(200).json({attendance});
    }catch(error){
        res.status(400).json(error);
    }
})



module.exports=router;