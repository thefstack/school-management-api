const mysql = require('mysql2/promise');
const dbConfig = require('./db.Config');


    let pool;

    try{
        pool = mysql.createPool(dbConfig);
        console.log("Connected to Database");
    }catch(error){
        console.log("Error while connecting to Database");
    }
    


module.exports=pool;
