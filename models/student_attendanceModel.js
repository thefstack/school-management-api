const pool=require("../db/conn");


const createStudent_attendance=async(subject)=>{
    try{
        const sql=`insert into student_attendance (name, student_id, class_id, date, status) values( ?, ?, ?, ?, ?)`;
        const values=[
            subject.name,
            subject.student_id,
            subject.class_id,
            subject.date,
            subject.status
        ];
        const [result]=await pool.execute(sql,values);
        return result;

    }catch(error){
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
        const sql=`select * from student_attendance where id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result[0];

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
    updateStudent_attendancet,
    deleteStudent_attendance
}