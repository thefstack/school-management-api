
module.exports={
      host: 'localhost',
      user: 'root',
      database: 'school',
      password:process.env.PASSWORD,
      waitForConnections:true,
      connectionLimit:10, //maximum no of connection to create at once
      maxIdle:10, //idle connection are those that are not currently being used. it is same as connectionLimit
      idleTimeout:60000,
      queueLimit:0,
      enableKeepAlive:true,
      keepAliveInitialDelay:0

};