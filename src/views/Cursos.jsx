import Curso from "../components/Curso";
 
function Cursos({ cursos }) {
    return (
        <section id="cursos">
            <h2>Nuestros cursos</h2>
 
            <div className="contenedor-cursos">
                {cursos.map((curso) => (
                    <Curso
                        key={curso.id}
                        nombre={curso.nombre}
                        descripcion={curso.descripcion}
                        informacion={curso.informacion}
                    />
 
                ))}
            </div>
        </section>
    );
}
export default Cursos;
