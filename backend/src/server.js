const express = require("express");
var cors = require("cors");
let database = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/students/list/:searchQuery?", function (req, res) {
  let result = database;
  let search = req.params.searchQuery;

  if (search) {
    search = search.toLocaleLowerCase();
    result = result.filter((student) => {
      return (
        student.ra == search ||
        student.name.toLowerCase().indexOf(search) != -1 ||
        student.cpf == search
      );
    });
  }

  setTimeout(function () {
    res.send(result);
  }, 900);
});

app.get("/students/find/:ra", function (req, res) {
  const studentFound = database.find(function (student) {
    return student.ra == req.params.ra;
  });
  setTimeout(function () {
    res.send(studentFound);
  }, 900);
});

app.post("/students/save", (req, res) => {
  const { name, email, ra, cpf } = req.body;

  const errors = [];

  if (!name) errors.push("name");
  if (!email) errors.push("email");
  if (!ra) errors.push("ra");
  if (!cpf) errors.push("cpf");

  if (errors.length) {
    res.status(400).send({
      result: false,
      message: `O ${errors.join(", ")} nao pode(m) ser(em) em branco`,
      status: 400,
    });
    return;
  }

  database.push({ name, email, ra, cpf });
  res
    .status(200)
    .send({ result: true, message: "Estudante cadastrado com sucesso." });
});

app.put("/students/edit/:ra", (req, res) => {
  database = database.filter((student) => {
    return student.ra != req.params.ra;
  });
  const { name, email, ra, cpf } = req.body;

  const errors = [];

  if (!name) errors.push("name");
  if (!email) errors.push("email");
  if (!ra) errors.push("ra");
  if (!cpf) errors.push("cpf");

  if (errors.length) {
    res.status(400).send({
      result: false,
      message: `O ${errors.join(", ")} nao pode(m) ser(em) em branco`,
      status: 400,
    });
    return;
  }

  database.push({ name, email, ra, cpf });
  res
    .status(200)
    .send({ result: true, message: "Estudante foi atualizado com sucesso." });
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
