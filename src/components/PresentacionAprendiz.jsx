import { useState, useEffect } from "react";
import './styles.css';


function PresentacionAprendiz(props) {
    const [nombre, setNombre] = useState("");
    const [curso, setCurso] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mostrarInfo, setMostrarInfo] = useState(false);

    const [perfil, setperfil] = useState({ nombre: "", curso: "" });

    useEffect(() => {
        const aprendizLocal = localStorage.getItem("aprendiz");
        if (aprendizLocal) {
            setperfil(JSON.parse(aprendizLocal));
        }
    }, []);

    function manejarEnvio(evento) {
        evento.preventDefault();
        if (nombre.trim() === "" || curso.trim() === "") {
            setMensaje("Completa todos los campos obligatorios antes de continuar");
            return;
        }

        const nuevosDatos = { nombre: nombre.trim(), curso: curso.trim() };

        setperfil(nuevosDatos);
        localStorage.setItem("aprendiz", JSON.stringify(nuevosDatos));

        setMensaje("Presentación enviada correctamente.");
        setNombre("");
        setCurso("");
    }

    return (
        <div>
            <h2>Mi presentación</h2>

            <form className="presentacion" onSubmit={manejarEnvio}>
                <label htmlFor="nombrePresentacion">Escribe tu nombre: </label>
                <input className="input-present"
                    id="nombrePresentacion"
                    type="text"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                    placeholder="Ejemplo: alex pizarro"
                />
                <br /><br />

                <label htmlFor="cursoPresentacion">¿Qué curso te interesa?: </label>
                <select className="input-present"
                    id="cursoPresentacion"
                    value={curso}
                    onChange={(evento) => setCurso(evento.target.value)}
                >
                    <option value="">-- Selecciona un curso --</option>
                    {props.cursos && props.cursos.map((item) => (
                        <option key={item.id} value={item.nombre}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <br /><br />
                
                <button type="submit" className="envio-present">Enviar formulario</button>
            </form>
            
            {mensaje !== "" && <p>{mensaje}</p>}

            <h3>MI PERFIL DE APRENDIZ</h3>

            {mostrarInfo && perfil.nombre && (
                <div className="card-present">
                    <p><strong>Nombre:</strong> {perfil.nombre}</p>
                    <p><strong>Curso de interés:</strong> {perfil.curso}</p>
                    <br />
                </div>
            )}
            <button onClick={() => setMostrarInfo(!mostrarInfo)}>
                {mostrarInfo ? "Ocultar información" : "Mostrar información"}
            </button>
        </div>
    );
}

export default PresentacionAprendiz;
