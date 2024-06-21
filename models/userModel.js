const pool=require("../db/conn");
const bcrypt=require('bcryptjs');

const createUser=async(userData)=>{
    try{
        const sql=`insert into users(user_id, password, token) values (?, ?, ?)`

        const hashPassword=await bcrypt.hash(userData.password,10);
        const values=[
            userData.user_id,
            hashPassword,
            hashPassword
        ];
        
        const user= await pool.execute(sql,values);
        return true;
    }catch(error){
        throw error;
    }
};

const getUser=async(id)=>{
    try{
        const sql=`select * from users`;
        const [user]=await pool.execute(sql);
        return user[0];
    }catch(error){
        console.log("error")
        throw error;
    }
}

const getUserById=async(id)=>{
    try{
        const sql=`select * from users where user_id=?`;
        const [user]=await pool.execute(sql,[id]);
        return user[0];
    }catch(error){
        console.log("error")
        throw error;
    }
}

const updateUser=async (id,updateData)=>{
    try{        
            if(updateData.password){
                updateData.password=await bcrypt.hash(updateData.password,10);
            }
        const setClause=Object.keys(updateData).map((keys)=>`${keys}=?`).join(", ");
        
        const values=Object.values(updateData);
        values.push(id);
        const sql=`update users set ${setClause} where user_id=?`;
        
        const [result]=await pool.execute(sql,values);
        
        return result.info;

    }catch(error){
        
        throw error;
    }
}

const deleteUser=async(id)=>{
    try{
        const sql=`delete from users where user_id=?`;
        const result=await pool.execute(sql,[id]);
        return true;
    }catch(error){
        throw error;
    }
}




module.exports={
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
}