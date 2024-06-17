const express=require("express")
const app=express();


const PORT=process.env.PORT ||5000;

const studentRouter=require("./router/studentRoutes");
const teacherRoutes=require("./router/teacherRoutes");
const classRoutes=require("./router/classRoutes");

app.use(express.json());
require("dotenv").config();


app.use("/student",studentRouter);
app.use("/teacher",teacherRoutes);
app.use("/class",classRoutes);



app.get("/",async(req,res)=>{
    res.send("hello from the server");
})


app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})