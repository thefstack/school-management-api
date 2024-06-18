const pool=require("../db/conn");


const createSubject=async(subject)=>{
    try{
        const sql=`insert into subjects (name, class_id, teacher_id) values( ?, ?, ?)`;
        const values=[
            subject.name,
            subject.class_id,
            subject.teacher_id
        ];
        const [result]=await pool.execute(sql,values);
        return result;

    }catch(error){
        throw error;
    }
}

const getSubject=async()=>{
    try{
        const sql=`select * from subjects`;
        const [result] =await pool.execute(sql);
        return result;
    }catch(error){
        throw error;
    }
}

const getSubjectById=async(id)=>{
    try{
        const sql=`select * from subjects where id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result[0];

    }catch(error){
        return error;
    }
}

const updateSubject=async(id,updateData)=>{
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

const deleteSubject=async(id)=>{
    try{
        const sql=`delete from subjects where id= ?`;
        const [result]=await pool.execute(sql,[id]);
        return result.affectedRows;
    }catch(error){
        throw error;
    }
}


module.exports={
    createSubject,
    getSubject,
    getSubjectById,
    updateSubject,
    deleteSubject
}