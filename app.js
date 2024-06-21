const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

const studentRouter = require("./router/studentRoutes");
const teacherRoutes = require("./router/teacherRoutes");
const classRoutes = require("./router/classRoutes");
const subjectRoutes = require("./router/subjectRoutes");
const userRoute=require("./router/userRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser())
require("dotenv").config();


app.use("/user",userRoute);
app.use("/student", studentRouter);
app.use("/teacher", teacherRoutes);
app.use("/class", classRoutes);
app.use("/subject", subjectRoutes);



app.get("/", async (req, res) => {
  res.send("hello from the server");
});

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
