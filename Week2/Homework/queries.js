let mysql = require("mysql");
let express = require("express");

let app = express();

let connection = mysql.createConnection({
  host: "localhost",
  user: "hyf",
  password: "Jopa_2000s",
  database: "world"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("you are connected");
});

//query from database .. print result into brawser.
//What is the capital of country X ? (Accept X from user)
app.get("/query/country/:countryName", (req, res) => {
  console.log(req.params.countryName);
  let query = `select name from city where id = (select capital from country where name = ?)`;
  connection.query(
    query,
    [req.params.countryName],
    (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send(JSON.stringify({ result }));
    }
  );
});

//List all the languages spoken in the region Y (Accept Y from user)
app.get("/query/region/:region", (req, res) => {
  console.log(req.params.region);
  let query = `select DISTINCT language from CountryLanguage where CountryCode in (select Code from country where Region = ?)`;
  connection.query(
    query,
    [req.params.region],
    (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send(JSON.stringify({ result }));
    }
  );
});

//Find the number of cities in which language Z is spoken (Accept Z from user)
app.get("/query/city/:language", (req, res) => {
  console.log(req.params.language);
  let query = `select count(*) from city where CountryCode in (select CountryCode from countryLanguage where language = ?)`;
  connection.query(
    query,
    [req.params.language],
    (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send(JSON.stringify({ result }));
    }
  );
});
//question 4
app.get("/query/countryRegion/:country", (req, res) => {
  console.log(req.params.country);
  let query = `select name from country where region in (select region from country where name = ?
       AND code in (select CountryCode from CountryLanguage where Language = "Arabic" AND isOfficial = "T"))`;
  connection.query(
    query,
    [req.params.country],
    (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send(JSON.stringify({ result }));
    }
  );
});

//List all the continents with the number of languages spoken in each continent
app.get("/query/continent", (req, res) => {
  console.log(req.params.language);
  let query = `select continent, count(language) AS languages_number from countryLanguage, country where CountryCode in (select Code from country order by continent) and countryCode=code GROUP BY continent`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.send(JSON.stringify({ result }));
  });
});

app.listen("3000", () => {
  console.log("Server startred on port 3000");
});