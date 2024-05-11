import Loader from "../../shared/Loader";
import "./style.css";
import { useState } from "react";
import { Navigate, Link, useParams } from "react-router-dom";

const StudentManagerPage = () => {

    const {id} = useParams();

    const [isRedirect, setIsRedirect] = useState (false);
    const [isLoading, updateIsLoading] = useState(false);

    const [name, updateName] = useState("")
    const [email, updateEmail] = useState("")
    const [cpf, updateCpf] = useState("")
    const [ra, updateRa] = useState("")

    const isEditingMode = () => {
        return false;
    }
    const getRAFromUrl = () => {
        return 0;
    }


    const onSubmitForm = (event) => {
        event.preventDefault();
        const body = {
            name,
            ra,
            cpf,
            email,
        };

        let methodEndPoint;
        let urlEndPoint;

        if (isEditingMode()) {
            methodEndPoint = "PUT";
            urlEndPoint = `http://localhost:3006/students/edit/${getRAFromUrl()}`;
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
                alert(data.message);
                if (data.status === 400) {
                    return;
                }
                setIsRedirect(true);
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
                            name="name" id="name"
                            valeu={name}
                            placeholder="Digite o seu nome"
                            onChange={(event) => {
                                updateName(event.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            required type="text"
                            name="email" id="email"
                            valeu={email}
                            placeholder="Digite o seu email"
                            onChange={(event) => {
                                updateEmail(event.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ra">RA</label>
                        <input required type="number"
                            name="ra" id="ra"
                            valeu={ra}
                            placeholder="Digite o seu ra"
                            onChange={(event) => {
                                updateRa(event.target.value);
                            }} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input required type="number"
                            name="cpf" id="cpf"
                            valeu={cpf}
                            placeholder="Digite o seu cpf"
                            onChange={(event) => {
                                updateCpf(event.target.value);
                            }} />
                    </div>
                    <div className="actions">
                        <Link
                            to="/"
                            className="btn btn-warning margin-right-10">
                            Cancelar
                        </Link>
                        <button className="btn">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    );




}

export default StudentManagerPage;