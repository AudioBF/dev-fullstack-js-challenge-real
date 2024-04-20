const express = require("express");
const knex = require("knex");
var cors = require("cors");
let database = require("./database");
const knexConfigFile = require("../knexfile");

const app = express();

app.database = knex(knexConfigFile.test);

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/students/list/:searchQuery?", function (req, res) {
  let result = database;
  let search = req.params.searchQuery;
  if (search) {
    search = search.toLowerCase();
    result = result.filter((student) => {
      return (
        student.ra == search ||
        student.name.toLowerCase().indexOf(search) != -1 ||
        student.cpf == search
      );
    });
  }

  return app
    .database("students")
    .select()
    .then((data) => {
      res.send(data);
    });
});

app.get("/students/find/:ra", function (req, res) {
  return app
    .database("students")
    .select()
    .where({ ra: req.params.ra })
    .first()
    .then((response) => {
      res.send(response);
    });
});

app.post("/students/save", (req, res) => {
  database.push({
    nome: req.body.name,
    ra: req.body.ra,
    email: req.body.email,
    cpf: req.body.cpf,
  });
  res.send({ result: true, message: "Estudante cadastrado com sucesso." });
});

app.put("/students/edit/:ra", async (req, res) => {
  const userFound = await app
    .database("students")
    .select()
    .where({ ra: req.params.ra })
    .first();

  if (!userFound) {
    return res.status(400).send({
      result: false,
      message: "O estudante informado nao existe",
    });
  }

  const studentUpdate = await app
    .database("students")
    .update({
      email: req.body.email,
      name: req.body.name,
    })
    .where({
      ra: req.params.ra,
    });

  if (studentUpdate) {
    res.send({
      result: true,
      message: "O estudante foi atualizado com sucesso.",
    });
  } else {
    res.status(500).send({
      result: false,
      message: "Falha ao tentar editar o estudante.",
    });
  }
});

app.delete("/students/delete/:ra", (req, res) => {
  database = database.filter((student) => {
    return student.ra != req.params.ra;
  });
  res.send({
    result: true,
    message: `O estudante #${req.params.ra} foi excluido com sucesso.`,
  });
});
app.listen(3000);

console.log("server is running...");
