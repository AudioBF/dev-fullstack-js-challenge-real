import React from "react";
import "./style.css";
class StudentListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentsList: [],
        };
    }


    componentDidMount() {
        this.fetchStudentList();
    }

    fetchStudentList = (searchQuery = "") => {
        // $(".loader").show("fast");
        // $(".content-page").hide();

        fetch(`http://localhost:3006/students/list/${searchQuery}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({studentsList: data});

                //  $(".loader").hide("fast");
                // $(".content-page").show("slow");
            })
            .catch((error) => {
                alert(
                    "Desculpe, mas nao conseguimos estabelecer conexao com o servidor."
                );
            });
    }



    render() {
        return (
            <div className="padding-lr-20">
                <div className="top-actions">
                    <form id="formSearchStudent" className="form-search">
                        <input type="text" name="searchInput" id="searchInput" />
                        <button>Pesquisar</button>
                    </form>
                    <a className="btn btn-dark" href="studentManager.html">
                        Cadastrar Aluno
                    </a>
                </div>
                <table id="studentList" className="table-list">
                    <thead>
                        <tr>
                            <th>Registro Academico</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Açoes</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.studentsList.map((student) => {
                            return (

                                <tr>
                                    <td>{student.ra}</td>
                                    <td>{student.name}</td>
                                    <td>{student.cpf}</td>
                                    <td>
                                        <a href={`studentManager.html?ra=${student.ra}`}>Editar</a>
                                        <a className="removeStudent" data-ra={student.ra} href="/#">Excluir</a>
                                    </td>
                                </tr>
                            );

                        })}


                    </tbody>
                </table>
            </div>
        );
    }
}

export default StudentListPage;