const pool=require("../db/conn");


const createStudent_attendance=async(attendance)=>{
    try{
        const sql=`insert into student_attendance (student_id, class_id, date, status) values( ?, ?, ?, ?)`;
        const values=[
            attendance.student_id,
            attendance.class_id,
            attendance.date,
            attendance.status
        ];
        const [result]=await pool.execute(sql,values);
        return result.insertId;

    }catch(error){
        console.log(error)
        throw error;
    }
}

const getStudent_attendance=async()=>{
    try{
        const sql=`select * from student_attendance`;
        const [result] =await pool.execute(sql);
        return result;
    }catch(error){
        throw error;
    }
}

const getStudent_attendanceByID=async(id)=>{
    try{
        const sql=`select * from student_attendance where student_id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result;

    }catch(error){
        return error;
    }
}

const getStudent_attendanceByDate=async(date)=>{
    try{
        const sql=`select * from student_attendance where date= ?`;
        const [result]=await pool.execute(sql,[date]);
        console.log(result)
        return result;

    }catch(error){
        return error;
    }
}

const getStudent_attendanceByClass=async(class_id)=>{
    try{
        const sql=`select * from student_attendance where class_id= ?`;
        console.log("vscjhascj")
        const [result]=await pool.execute(sql,[class_id]);
        return result;

    }catch(error){
        return error;
    }
}

const updateStudent_attendancet=async(id,updateData)=>{
    try{
        const setClause= await Object.keys(updateData).map((keys)=>`${keys}=?`).join(', ');
        
        const values=Object.values(updateData);
        values.push(id);

        const sql=`update subjects set ${setClause} where id=?`;

        const [result]=await pool.execute(sql,values);

        return result;
    }catch(error){
        return error;
    }
}

const deleteStudent_attendance=async(id)=>{
    try{
        const sql=`delete from student_attendance where id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result.affectedRows;
    }catch(error){
        throw error;
    }
}


module.exports={
    createStudent_attendance,
    getStudent_attendance,
    getStudent_attendanceByID,
    getStudent_attendanceByDate,
    getStudent_attendanceByClass,
    updateStudent_attendancet,
    deleteStudent_attendance
}