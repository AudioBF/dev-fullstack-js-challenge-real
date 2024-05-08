import "./App.css";
import Navbar from "./componets/shared/Navbar";
import StudentListPage from "./componets/pages/StudentList";

function App() {
  return (
    <div className="main-container">
      <Navbar />
      <section className="container">
        <header className="main-header">Consulta de Alunos</header>
        <div className="loader"></div>
        <div className="content-page">
         <StudentListPage/> 
        </div>
      </section>


      <nav className="main-nav">
        <header>Modulo Academico</header>
        <ul className="nav-links">
          <a className="nav-item" href="studentsList.html">
            <li>Alunos</li>
          </a>
        </ul>
      </nav>
      <section className="container">
        <header className="main-header">Cadastro de Aluno</header>
        <div className="loader"></div>
        <div className="content-page padding-lr-20">
          <form id="studentForm" className="form" action="" method="post">
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input required type="text" name="name" id="name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input required type="text" name="email" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="ra">RA</label>
              <input required type="number" name="ra" id="ra" />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input required type="number" name="cpf" id="cpf" />
            </div>
            <div className="actions">
              <a
                href="studentsList.html"
                className="btn btn-warning margin-right-10"
              >
                Cancelar
              </a>
              <button className="btn">Salvar</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default App;
