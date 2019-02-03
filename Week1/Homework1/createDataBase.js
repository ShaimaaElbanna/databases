let mysql = require('mysql');

let Connection = mysql.createConnection({
  host: 'localhost',
  user: 'shaimaa',
  password: 'hyf_database',
  database: 'newWorld'
});

Connection.connect(function(err) {
  if (err) throw err.message;
  Connection.query(
      'Create Database',
      (err,result)=>{
          if (err) throw err.message;
          console.log('dataBase has been created sucssefuly')
      }
  );
  Connection.end(function(err){
      if (err) throw err.message
  });
});

//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Jopa_2000s';