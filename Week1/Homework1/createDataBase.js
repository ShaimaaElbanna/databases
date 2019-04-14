let mysql = require('mysql');

let Connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jopa_2000s'
});

Connection.connect(function(err) {
  if (err) throw err.message;
  Connection.query(
      'Create Database if not exists test',
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