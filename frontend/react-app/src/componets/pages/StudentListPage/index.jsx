import React from "react";
import "./style.css";
import Loader from "../../shared/Loader";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

class StudentListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            studentsList: [],
            isLoading: true,
            formSearch: {
                searchInput: "",
            },
        };
    }

    componentDidMount() {
        this.fetchStudentList();
    }

    onClickRemoveStudent = (ra) => {

        Swal.fire({
            title: "Voce realmente deseja excluir esse estudante?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.deleteStudent(ra);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });

    };

    deleteStudent = (ra) => {
        this.setState({ isLoading: true });
        fetch(`http://localhost:3006/students/delete/${ra}`, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Swal.fire({
                    icon: "success",
                    title: "parabéns",
                    text: data.message,
                });
                this.fetchStudentList();
            });
    };

    onSubmitFormSearch = (event) => {
        event.preventDefault();
        this.fetchStudentList(event.target.searchInput.value);
    };

    fetchStudentList = (searchQuery = "") => {
        this.setState({ isLoading: true });
        fetch(`http://localhost:3006/students/list/${searchQuery}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    studentsList: data,
                    isLoading: false,
                });
            })
            .catch((error) => {
                alert(
                    "Desculpe, mas nao conseguimos estabelecer conexao com o servidor."
                );
            });
    }

    render() {
        if (this.state.isLoading) {
            return <Loader />;
        }

        return (
            <>
                <header className="main-header">Lista de Alunos</header>
                <div className="padding-lr-20">
                    <div className="card">
                        <form
                            onSubmit={(event) => {
                                this.onSubmitFormSearch(event);
                            }}
                            id="formSearchStudent"
                            className="form-search"
                        >
                            <input type="text"
                                name="searchInput"
                                id="searchInput"
                                value={this.state.formSearch.searchInput}
                                onChange={(event) => {
                                    this.setState({
                                        formSearch: {
                                            searchInput: event.target.value,
                                        },
                                    });
                                }}
                            />
                            <button>Pesquisar</button>
                        </form>

                        <Link to="/student/add" className="btn btn-dark" >
                            Cadastrar Aluno
                        </Link>
                    </div>
                    <div className="card">
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

                                        <tr key={student.ra}>
                                            <td>{student.ra}</td>
                                            <td>{student.name}</td>
                                            <td>{student.cpf}</td>
                                            <td>
                                                <Link className="action-link"
                                                    to={`/student/edit/${student.ra}`}
                                                >
                                                    Editar
                                                </Link>
                                                <Link className="removeStudent action-link"
                                                    onClick={() => {
                                                        this.onClickRemoveStudent(student.ra);
                                                    }}
                                                    to="/#"
                                                >
                                                    Excluir
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
}

export default StudentListPage;