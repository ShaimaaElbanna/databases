//I want to get alerts when a country has >= 10 languages.
// E.g. If a country X has 9 languages in the CountryLanguage table,
// and a user INSERTs one more row in the CountryLanguage table,
// then I should get an alert. How can I achieve this ?


let mysql = require("mysql");
let express = require("express");
let JSAlert = require("js-alert");

let app = express();

let connection = mysql.createConnection({
  host: "localhost",
  user: "foo",
  password: "bar",
  multipleStatements: true,
  database: "new_world"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("connected");
});

app.get(
  "/query/countrylanguage/:code/:lang/:isOff",
  (req, res) => {
    console.log(
      req.params.code +
        " " +
        req.params.lang +
        " " +
        req.params.isOff
    );
    let query = `INSERT INTO countrylanguage (countrycode, language, isOfficial) VALUES ("${
      req.params.code
    }", "${req.params.lang}", "${req.params.isOff}");`;

    let q2 = `select count(language) AS languageNumber from countryLanguage where countryCode = "${
      req.params.code
    }"`;
    connection.query(query, (err, result) => {
      if (err) throw err;
      //console.log(result);
      res.send(JSON.stringify({ result }));
      connection.query(q2, (err, result) => {
        if (err) throw err;
        //console.log(result);
        if (result[0].languageNumber >= 10) {
          JSAlert.alert(
            "How can I achieve this .. 10 or more LANGS ?"
          );
        } else {
          JSAlert.alert("Less than 10 LANGS");
        }
      });
    });
  }
);

app.listen("3000", () => {
  console.log("Server startred on port 3000");
});