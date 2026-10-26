import { Link } from "react-router-dom"
 
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Inicio </Link>
 
      <Link to="/Cursos">Cursos </Link>
 
      <Link to="/Registro">Registro </Link>
 
      <Link to="/GestionCursos">Administrar Cursos </Link>

      <Link to="/Acercade">Acerca de</Link>
    </nav>
  );
}
 
export default Navbar;