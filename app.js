const express=require("express")
const app=express();


const PORT=process.env.PORT ||5000;

const studentRouter=require("./router/studentRoutes");
const teacherRoutes=require("./router/teacherRoutes")

app.use(express.json());

app.use("/student",studentRouter);
app.use("/teacher",teacherRoutes);



app.get("/",async(req,res)=>{
    res.send("hello from the server");
})


app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`)
})