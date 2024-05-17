module.exports = class StudentController {
  constructor(app) {
    this.app = app;
  }

  listAction = (req, res) => {
    let query = this.app.database("students");

    let search = req.params.searchQuery;
    if (search) {
      query
        .where("ra", search)
        .orwhere("name", "like", `%${search}%`)
        .orwhere("cpf", search);
    }
    return query.select().then((data) => {
      res.send(data);
    });
  };

  findAction = (req, res) => {
    return this.app
      .database("students")
      .select()
      .where({ ra: req.params.ra })
      .first()
      .then((response) => {
        res.send(response);
      });
  };

  isCreateDataValid = async (data) => {
    if (data.name == "") {
      return "Nome is required";
    }

    if (data.email == "") {
      return "Email is required";
    }

    if (data.ra == "") {
      return "ra is required";
    }

    if (data.cpf == "") {
      return "cpf is required";
    }

    if (parseInt(data.ra) != data.ra) {
      return "RA must be a number";
    }

    if (parseInt(data.cpf) != data.cpf) {
      return "CPF must be a number";
    }

    const userExists = await this.app
      .database("students")
      .select()
      .where({
        ra: data.ra,
      })
      .first();

    if (userExists) {
      return "RA User already exists.";
    }

    return true;
  };

  createAction = async (req, res) => {
    const isCreateDataValid = await this.isCreateDataValid(req.body);
    if (isCreateDataValid != true) {
      return res.status(400).send({
        result: false,
        message: isCreateDataValid,
      });
    }

    return this.app
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
            result: true,
            message: "Nao foi possivel cadastrar o estudante",
          });
        }
      });
  };

  isEditDataValid = (data) => {
    if (data.name == "") {
      return "Nome is required";
    }

    if (data.email == "") {
      return "Email is required";
    }
    return true;
  };

  editAction = async (req, res) => {
    const isEditDataValid = this.isEditDataValid(req.body);
      console.log(isEditDataValid);

    if (isEditDataValid != true) {
        return res.status(400).send({
            result: false,
            message: isEditDataValid,
        });
    }

    const userFound = await this.app
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

    const studentUpdate = await this.app
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
  };

  deleteAction = (req, res) => {
    return this.app
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
  };
};
