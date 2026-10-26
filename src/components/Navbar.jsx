import { Link } from "react-router-dom"
import logo from '../assets/logo.png';
 
function Navbar() {
  return (
    <nav className="navbar"> <img src={logo} className='logo'/>
      <Link to="/" className="cont" >Inicio </Link>
 
      <Link to="/Cursos" className="cont" >Cursos </Link>
 
      <Link to="/Registro" className="cont" >Registro </Link>
 
      <Link to="/GestionCursos" className="cont" >Administrar Cursos </Link>

      <Link to="/Acercade" className="cont">Acerca de</Link>

      <Link to="/Usuarioapi" className="cont">usuarios</Link>
    </nav>
  );
}
 
export default Navbar;