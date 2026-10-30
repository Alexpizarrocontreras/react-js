import { useState } from "react";
import './styles.css';

function EditarAprendiz(props) {
    const [idSeleccionado, setIdSeleccionado] = useState(""); // Rastrea el ID seleccionado
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [enviando, setEnviando] = useState(false);

    // Captura la selección del menú y rellena los inputs automáticamente
    function manejarSeleccion(evento) {
        const id = evento.target.value;
        setIdSeleccionado(id);

        if (id === "") {
            setNombre("");
            setCorreo("");
            return;
        }

        // Buscamos el aprendiz seleccionado en la lista que viene por props
        const aprendizEncontrado = props.aprendices.find((a) => String(a.id) === String(id));
        if (aprendizEncontrado) {
            setNombre(aprendizEncontrado.name || "");
            setCorreo(aprendizEncontrado.email || "");
        }
    }

    function manejarEnvio(evento) {
        evento.preventDefault();
        
        if (!idSeleccionado) {
            setMensaje("Por favor, selecciona un aprendiz de la lista primero.");
            return;
        }

        if (nombre.trim() === "" || correo.trim() === "") {
            setMensaje("Completa todos los campos obligatorios antes de continuar");
            return;
        }

        setMensaje("");
        setEnviando(true);

        // Envío PATCH apuntando directamente al ID del aprendiz seleccionado
        fetch(`http://localhost:5000/aprendices/${idSeleccionado}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                name: nombre.trim(),
                email: correo.trim()
            })
        })
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se pudo actualizar el registro en la API");
            }
            return respuesta.json();
        })
        .then((datos) => {
            setMensaje(`¡Aprendiz ID ${datos.id} actualizado con éxito!`);
            
            // Avisa al componente padre para que refresque la lista de aprendices global
            if (props.onActualizarLista) {
                props.onActualizarLista();
            }
        })
        .catch((error) => {
            setMensaje("Ocurrió un error al enviar los datos a la API.");
            console.error(error);
        })
        .finally(() => {
            setEnviando(false);
        });
    }

    return (
        <div>
            <h2>Editar Aprendiz Existente</h2>

            <form className="presentacion" onSubmit={manejarEnvio}>
                {/* MENÚ DESPLEGABLE DE APRENDICES */}
                <div>
                    <label htmlFor="aprendiz">Selecciona un aprendiz: </label>
                    <select className="input-present"
                        id="aprendiz"
                        value={idSeleccionado}
                        onChange={manejarSeleccion}
                        required
                    >
                        <option value="">-- Selecciona un aprendiz --</option>
                        {props.aprendices && props.aprendices.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <br />

                {/* FORMULARIO DE EDICIÓN (Habilitado solo si seleccionas un usuario) */}
                {idSeleccionado && (
                    <>
                        <div>
                            <label htmlFor="nombrePresentacion">Modificar nombre: </label>
                            <input className="input-present"
                                id="nombrePresentacion"
                                type="text"
                                value={nombre}
                                onChange={(evento) => setNombre(evento.target.value)}
                                placeholder="Ejemplo: alex pizarro"
                                required
                            />
                        </div>
                        <br />

                        <div>
                            <label htmlFor="correoPresentacion">Modificar correo electrónico: </label>
                            <input className="input-present"
                                id="correoPresentacion"
                                type="email"
                                value={correo}
                                onChange={(evento) => setCorreo(evento.target.value)}
                                placeholder="Ejemplo: alex@correo.com"
                                required
                            />
                        </div>
                        <br />
                        
                        <button type="submit" className="envio-present" disabled={enviando}>
                            {enviando ? "Guardando cambios..." : "Guardar Cambios"}
                        </button>
                    </>
                )}
            </form>
            
            {mensaje !== "" && <p><strong>{mensaje}</strong></p>}
        </div>
    );
}

export default EditarAprendiz;
