import Loader from "../../shared/Loader";
import "./style.css";
import { useState, useEffect } from "react";
import { Navigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const StudentManagerPage = () => {

    const { id } = useParams();

    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, updateIsLoading] = useState(false);

    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [fieldCpf, updateFieldCpf] = useState({
        value: "",
        isReadonly: false,
    });
    const [fieldRa, updateFieldRa] = useState({
        value: "",
        isReadonly: false,
    });

    const fetchStudent = () => {
        updateIsLoading(true);
        fetch(`http://localhost:3006/students/find/${id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateName(data.name);
                updateEmail(data.email);
                updateFieldCpf({
                    isReadonly: true,
                    value: data.cpf,
                });
                updateFieldRa({
                    isReadonly: true,
                    value: data.ra,
                });
                updateIsLoading(false);
            });
    };
    useEffect(() => {
        if (id) {
            fetchStudent();
        }
    }, []);


    const onSubmitForm = (event) => {
        event.preventDefault();
        const body = {
            name: name,
            ra: fieldRa.value,
            cpf: fieldCpf.value,
            email: email,
        };

        let methodEndPoint;
        let urlEndPoint;

        if (id) {
            methodEndPoint = "PUT";
            urlEndPoint = `http://localhost:3006/students/edit/${id}`;
        } else {
            methodEndPoint = "POST";
            urlEndPoint = `http://localhost:3006/students/save`;
        }

        fetch(urlEndPoint, {
            method: methodEndPoint,
            body: JSON.stringify(body),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.result) {
                    Swal.fire("Parabéns", data.message, "success");
                    setIsRedirect(true);
                } else {
                    Swal.fire("Ops", data.message, "error");
                }
            });
    };

    if (isRedirect) {
        return <Navigate to="/" />;
    }

    if (isLoading) {
        return <Loader />;
    }

    return (
        <>
            <header className="main-header">Cadastro de Aluno</header>
            <div className="content-page padding-lr-20">
                <div className="card">
                    <form
                        id="studentForm"
                        className="form"
                        method="post"
                        onSubmit={onSubmitForm}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input
                                required type="text"
                                name="name"
                                id="name"
                                value={name}
                                placeholder="Digite o seu nome"
                                onChange={(event) => {
                                    updateName(event.target.value);
                                }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                required type="text"
                                name="email"
                                id="email"
                                value={email}
                                placeholder="Digite o seu email"
                                onChange={(event) => {
                                    updateEmail(event.target.value);
                                }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ra">RA</label>
                            <input
                                required type="number"
                                name="ra"
                                id="ra"
                                value={fieldRa.value}
                                readOnly={fieldRa.isReadonly}
                                placeholder="Digite o seu ra"
                                onChange={(event) => {
                                    updateFieldRa({
                                        ...fieldRa,
                                        value: event.target.value,
                                    });
                                }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                required type="number"
                                name="cpf"
                                id="cpf"
                                value={fieldCpf.value}
                                readOnly={fieldCpf.isReadonly}
                                placeholder="Digite o seu cpf"
                                onChange={(event) => {
                                    updateFieldCpf({
                                        ...fieldCpf,
                                        value: event.target.value,
                                    });
                                }} />
                        </div>
                        <div className="actions">
                            <Link
                                to="/"
                                className="btn btn-warning margin-right-10">
                                Cancelar
                            </Link>
                            <button className="btn btn-dark">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );

};

export default StudentManagerPage;