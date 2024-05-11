import "./style.css";
import {Link} from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="main-nav">
        <header>Modulo Academico</header>
        <ul className="nav-links">
          <Link className="nav-item" to="/#">
            <li>Alunos</li>
          </Link>
        </ul>
      </nav>
    )
}

export default Navbar; 

// import React from 'react';
// import './NavBar.css'