import "./App.css";
import Navbar from "./componets/shared/Navbar";
import StudentListPage from "./componets/pages/StudentListPage";
import StudentManagerPage from "./componets/pages/StudentManagerPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Navbar />
        <section className="container">
          <div className="content-page">
            <Routes>
              <Route path="/" element={<StudentListPage />} />
              <Route path="/student/add" element={<StudentManagerPage />} />
              <Route
                path="/student/edit/:id"
                element={<StudentManagerPage />}
              />
              <Route path="*" element={
                <div className="not-found">
                  <h1>Error 404</h1>
                  <p>Desculpe, mas nao conseguimos encontrar a pagina que voce solicitou.</p>
                </div>
              } />
            </Routes>
          </div>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
