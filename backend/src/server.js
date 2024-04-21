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
  let query = app.database("students");

  let result = database;
  let search = req.params.searchQuery;
  if (search) {
    query
      .where("ra", search)
      .orwhere("nome", "like", `%${search}%`)
      .orwhere("cpf", search);
  }
  return query.select().then((data) => {
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

app.post("/students/save", async (req, res) => {
  if (req.body.name == "") {
    return res.status(400).send({ 
      result: false, 
      message: "Nome is required" });
  }
  if (req.body.email == "") {
    return res
      .status(400)
      .send({ result: false, message: "Email is required" });
  }
  if (req.body.ra == "") {
    return res.status(400).send({ result: false, message: "ra is required" });
  }
  if (req.body.cpf == "") {
    return res.status(400).send({ result: false, message: "cpf is required" });
  }

  const userExists = await app
    .database("students")
    .select()
    .where({
      ra: req.body.ra,
    })
    .first();

  if (userExists) {
    return res.status(400).send({
      result: false,
      message: "RA User already exists.",
    });
  }

  return app
    .database("students")
    .insert({
      name: req.body.name,
      ra: req.body.ra,
      email: req.body.email,
      cpf: req.body.cpf,
    })
    .then((response) => {
      if (response) {
        res.send({
          result: true,
          message: "Estudante cadastrado com sucesso!",
        });
      } else {
        res.status(500).send({
          result: false,
          message: "Nao foi possivel cadastrar o estudante",
        });
      }
    });
});

app.put("/students/edit/:ra", async (req, res) => {
  if (req.body.name == "") {
    return res.status(400).send({
      result: false,
      message: "Nome is required",
    });
  }
  if (req.body.email == "") {
    return res.status(400).send({
      result: false,
      message: "Email is required",
    });
  }

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
  return app
    .database("students")
    .where({ ra: req.params.ra })
    .del()
    .then((response) => {
      if (response) {
        res.send({
          result: true,
          message: `O estudante #${req.params.ra} foi excluido com sucesso.`,
        });
      } else {
        res.send({
          result: false,
          message: `Nao foi possivel excluir o estudante.`,
        });
      }
    });
});

app.listen(3000);

console.log("server is running...");
