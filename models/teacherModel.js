const pool=require("../db/conn");

const createTeacher=async(teacher)=>{
    const sql='insert into teachers(name, dob, gender,  father_name, mother_name, phone1, phone2, religion, category, village, pincode, landmark, aadhar, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    const values=[
        teacher.name,
        teacher.dob,
        teacher.gender,
        teacher.father_name,
        teacher.mother_name,
        teacher.phone1,
        teacher.phone2,
        teacher.religion,
        teacher.category,
        teacher.village,
        teacher.pincode,
        teacher.landmark,
        teacher.aadhar,
        teacher.email
    ]

    try{
        
        const [result]= await pool.execute(sql,values);
        
        return result.insertId

    }catch(error){
        throw error;
    }

}

const getTeacher=async()=>{
    const sql="select * from teachers";
    try{
        const [result]=await pool.execute(sql);
        return result;
    }catch(error){
        throw error;
    }
}

const getTeacherById=async(id)=>{
    const sql='select * from  teachers where id = ? '
    try{
        const [result]=await pool.execute(sql,[id]);
        return result[0];
    }catch(error){
        console.log(error);
        throw error;
    }
}

const updateTeacher=async(id,updateData)=>{
    try{
        const setClause=Object.keys(updateData).map((keys)=>`${keys}=?`).join(", ");

        const values= Object.values(updateData);
        values.push(id)
        const sql=`update teachers set ${setClause} where id=?`

        const [result]= await pool.execute(sql,values)
        return result;

    }catch(error){
        console.log(error);
        throw error
    }
}

const deleteTeacher=async(id)=>{
    try{
        const sql=`delete from teachers where id = ?`;

        const [result]= await pool.execute(sql,[id]);

        return result.affectedRows;
    }catch(error){
        console.log(error)
        throw error;
    }
}

module.exports={
    createTeacher,
    getTeacher,
    getTeacherById,
    updateTeacher,
    deleteTeacher
}