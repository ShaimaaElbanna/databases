let mysql = require("mysql");
let express = require("express");

let app = express();

let connection = mysql.createConnection({
  host: "localhost",
  user: "foo",
  password: "bar",
  database: "new_world"
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log("connected");
});

//query from database .. print result into brawser.
app.get("/query/:condition", (req, res) => {
  console.log(req.params.condition);
  let query = `${req.params.condition}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.send(JSON.stringify({ result }));
  });
});

app.listen("3000", () => {
  console.log("Server startred on port 3000");
});
