const pool=require("../db/conn");


const createteacher_attendance=async(attendance)=>{
    try{
        const sql=`insert into teacher_attendance (teacher_id, date, status) values( ?, ?, ?)`;
        const values=[
            attendance.teacher_id,
            attendance.date,
            attendance.status
        ];
        
        const [result]=await pool.execute(sql,values);
        return result.insertId;

    }catch(error){
        throw error;
    }
}

const getteacher_attendance=async()=>{
    try{
        const sql=`select * from teacher_attendance`;
        const [result] =await pool.execute(sql);
        return result;
    }catch(error){
        throw error;
    }
}

const getteacher_attendanceByID=async(id)=>{
    try{
        const sql=`select * from teacher_attendance where teacher_id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result;

    }catch(error){
        return error;
    }
}

const getteacher_attendanceByDate=async(date)=>{
    try{
        const sql=`select * from teacher_attendance where date= ?`;
        const [result]=await pool.execute(sql,[date]);
        console.log(result)
        return result;

    }catch(error){
        return error;
    }
}


const updateteacher_attendance=async(id,updateData)=>{
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

const deleteteacher_attendance=async(id)=>{
    try{
        const sql=`delete from teacher_attendance where id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result.affectedRows;
    }catch(error){
        throw error;
    }
}


module.exports={
    createteacher_attendance,
    getteacher_attendance,
    getteacher_attendanceByID,
    getteacher_attendanceByDate,
    updateteacher_attendance,
    deleteteacher_attendance
}