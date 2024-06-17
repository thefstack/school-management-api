const pool=require("../db/conn");


const createClasses= async(classes)=>{
    try{
        const sql=`insert into classes ( name, section ) values ( ?, ?)`

        const values=[
            classes.name,
            classes.section
        ]
        const [result]= await pool.execute(sql,values);
        return result.insertId;

    }catch(error){
        throw error;
    }
}

const getClasses=async()=>{
    try{
        const sql='select * from classes';
        const [result]=await pool.execute(sql);
        return result;
    }catch(error){
        throw error;
    }
}

const getClassesById=async(id)=>{
    try{
        const sql= `select * from classes where id=?`;
        const [result]=await pool.execute(sql,[id]);
        return result;
    }catch(error){
        throw error;
    }
}

const updateClasses=async(id,updateData)=>{
    try{
        const setClause=Object.keys(updateData).map((keys)=>`${keys}=?`).join(",");
        const values=Object.values(updateData);
        values.push(id);

        const sql=`update classes set ${setClause} where id=?`;
        const result=await pool.execute(sql,values);
        return result;
    }catch(error){
        throw error;
    }
}

const deleteClasses=async(id)=>{
    try{
        const sql=`delete from classes where id=?`;

        const [result]=await pool.execute(sql,[id]);
        return result;
    }catch(error){
        throw error;
    }
}

module.exports={
    getClasses,
    createClasses,
    getClassesById,
    updateClasses,
    deleteClasses
}