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
            </Routes>
          </div>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
