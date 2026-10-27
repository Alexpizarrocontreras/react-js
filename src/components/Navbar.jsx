import { Link } from "react-router-dom"
import logo from '../assets/logo.png';
 
function Navbar() {
  return (
    <nav className="navbar"> 
      <img src={logo} className='logo' alt="Logo"/>
      
      <Link to="/" className="cont">Inicio</Link>
      <Link to="/Cursos" className="cont">Cursos</Link>
      <Link to="/Registro" className="cont">Registro</Link>
      <Link to="/GestionCursos" className="cont">Administrar Cursos</Link>
      <Link to="/Acercade" className="cont">Acerca de</Link>

      <div className="dropdown">
        <button className="dropbtn">ver mas ▾</button>
        <div className="dropdown-content">
          <Link to="/aprendiz">Aprendices</Link>
          <Link to="/instructores">Instructores</Link>
          <Link to="/competencias">competencias</Link>
          <Link to="/fichas">fichas</Link>
          <Link to="/Evaluaciones">Evaluaciones</Link>
        </div>
      </div>
    </nav>
  );
}
 
export default Navbar;
