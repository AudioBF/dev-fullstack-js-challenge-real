const express = require("express");

const database = require("./database")

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/students/list", function (req, res) {
  res.send(database);
});

app.get("/students/find/:ra", function(req, res){
  const studentFound = database.find(function(student){
    return student.ra == req.params.ra;
  });
  res.send(studentFound);
});

app.listen(3000);

console.log("server is running...");
