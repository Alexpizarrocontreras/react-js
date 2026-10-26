import { useState } from "react";
 
function GestionCursos({ cursos, setCursos }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [informacion, setInformacion] = useState("");
  const [idEditando, setIdEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
 
  function limpiarFormulario() {
    setNombre("");
    setDescripcion("");
    setInformacion("");
    setIdEditando(null);
  }
 
  function manejarEnvio(evento) {
    evento.preventDefault();
 
    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      informacion.trim() === ""
    ) {
      setMensaje("Completa todos los campos.");
      return;
    }
 
    if (idEditando !== null) {
      // UPDATE: actualizar un curso existente
      const cursosActualizados = cursos.map((curso) =>
        curso.id === idEditando
          ? {
              ...curso,
              nombre: nombre.trim(),
              descripcion: descripcion.trim(),
              informacion: informacion.trim(),
            }
          : curso,
      );
 
      setCursos(cursosActualizados);
      setMensaje("Curso actualizado correctamente.");
    } else {
      // CREATE: agregar un curso nuevo
      const nuevoCurso = {
        id: Date.now(),
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        informacion: informacion.trim(),
      };
 
      setCursos([...cursos, nuevoCurso]);
      setMensaje("Curso agregado correctamente.");
    }
 
    limpiarFormulario();
  }
 
  function editarCurso(curso) {
    setNombre(curso.nombre);
    setDescripcion(curso.descripcion);
    setInformacion(curso.informacion);
    setIdEditando(curso.id);
    setMensaje("");
  }
 
  function eliminarCurso(idEliminar) {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este curso?",
    );
 
    if (!confirmar) {
      return;
    }
 
    const cursosActualizados = cursos.filter(
      (curso) => curso.id !== idEliminar,
    );
 
    setCursos(cursosActualizados);
 
    if (idEditando === idEliminar) {
      limpiarFormulario();
    }
 
    setMensaje("Curso eliminado correctamente.");
  }
 
  function cancelarEdicion() {
    limpiarFormulario();
    setMensaje("");
  }
 
  return (
    <section id="gestion-cursos" className="gestion-cursos">
      <h2>Administración de cursos</h2>
 
      <p>Registra cursos nuevos o modifica los que ya existen.</p>
 
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="nombre-curso">Nombre del curso:</label>
 
          <input
            id="nombre-curso"
            type="text"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            placeholder="Ej. Inteligencia Artificial"
          />
        </div>
 
        <div>
          <label htmlFor="descripcion-curso">Descripción:</label>
 
          <input
            id="descripcion-curso"
            type="text"
            value={descripcion}
            onChange={(evento) => setDescripcion(evento.target.value)}
            placeholder="Describe el curso"
          />
        </div>
 
        <div>
          <label htmlFor="informacion-curso">Información adicional:</label>
 
          <textarea
            id="informacion-curso"
            value={informacion}
            onChange={(evento) => setInformacion(evento.target.value)}
            placeholder="¿Qué aprenderá el aprendiz?"
            rows={3}
          />
        </div>
 
        <button type="submit">
          {idEditando !== null ? "Guardar cambios" : "Agregar curso"}
        </button>
 
        {idEditando !== null && (
          <button type="button" onClick={cancelarEdicion}>
            Cancelar edición
          </button>
        )}
      </form>
 
      {mensaje && (
        <p className="mensaje" role="status">
          {mensaje}
        </p>
      )}
 
      <h3>Cursos registrados: {cursos.length}</h3>
 
      {cursos.length === 0 ? (
        <p>No hay cursos registrados.</p>
      ) : (
        <div className="lista-administracion">
          {cursos.map((curso) => (
            <article className="item-administracion" key={curso.id}>
              <h4>{curso.nombre}</h4>
 
              <p>{curso.descripcion}</p>
 
              <p>{curso.informacion}</p>
 
              <div className="acciones-curso">
                <button type="button" onClick={() => editarCurso(curso)}>
                  Editar
                </button>
 
                <button type="button" onClick={() => eliminarCurso(curso.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
 
export default GestionCursos;
 
 