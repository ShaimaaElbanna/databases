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
//2. create a table country
//CREATE TABLE table_name (column_name column_type);
let countriesTable= "CREATE TABLE if not exists countries (Name CHAR(52), Continent CHAR(52), Population INT(11))";
Connection.query(countriesTable, (err, res) => {
  if (err) throw err;
  console.log("Countries table was created successfuly");
}); 

//3. create a table city 

let cityTable= "CREATE TABLE if not exists city (Name CHAR(52), Continent CHAR(52), Population INT(11))";
Connection.query(cityTable, (err, res) => {
  if (err) throw err;
  console.log("city table was created successfuly");
}); 

//4. Insert 10-20 rows in each table with relevant fields. 

let countriesData = [
    ["Sweden", "Europ", 9900000],
    ["Germany", "Europ", 82000000],
    ["Lebanon", "Asia", 4000000],
    ["Egypt", "Africa", 99000000],
    ["Brazil", "South America", 209000000]
  ];
  
  let citiesData = [
    ["Gothenburg", "Sweden", 960000],
    ["Berlin", "Germany", 631696],
    ["Beirut", "Lebanon", 2200000],
    ["Cairo", "Egypt", 42000000],
    ["Brasília", "Brazil", 1000000]
  ];

let countriesRows = "INSERT INTO countries (name, continent, population) VALUES?"

let cityRows = "INSERT INTO city (name, country, population) VALUES ?";

Connection.query(countriesRows,[countriesData], err =>{
    if (err) throw err;
      console.log("Countries have been Inserted");

})

Connection.query(cityRows,[citiesData], err =>{
    if (err) throw err;
      console.log("Cities have been Inserted");

})

Connection.end(err =>{
    if (err) throw err.message
})