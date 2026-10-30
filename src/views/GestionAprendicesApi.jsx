import { useState, useEffect } from "react";
import RegistroAprendizApi from "./RegistroAprendizAPi";
import EditarAprendiz from "../components/EditarAprendiz";

function GestionAprendicesApiCompleta() {
    const [aprendices, setAprendices] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState("");
    
    const [idAEliminar, setIdAEliminar] = useState(null);

    function cargarAprendices() {
        fetch("http://localhost:5000/aprendices")
            .then((res) => res.json())
            .then((datos) => {
                setAprendices(datos);
                setCargando(false);
            })
            .catch((err) => console.error("Error al cargar aprendices:", err));
    }

    useEffect(() => {
        cargarAprendices();
    }, []);

    function confirmarEliminacion() {
        if (!idAEliminar) return;

        fetch(`http://localhost:5000/aprendices/${idAEliminar}`, {
            method: "DELETE",
        })
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("No se pudo eliminar el registro");
            }
            setMensaje(`Aprendiz ID ${idAEliminar} eliminado con éxito.`);
            setIdAEliminar(null); // Cerramos el recuadro de confirmación
            cargarAprendices(); 
        })
        .catch((error) => {
            console.error(error);
            setMensaje("Ocurrió un error al intentar eliminar.");
            setIdAEliminar(null);
        });
    }

    return (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
            <h2>Panel de Gestión de Aprendices (API)</h2>

            {/* Mensaje de éxito o error flotante dentro de la app */}
            {mensaje && (
                <div style={{ padding: "10px", marginBottom: "15px", background: "#e2e3e5", borderRadius: "5px" }}>
                    <strong>{mensaje}</strong>
                </div>
            )}
            
            {/* ─── CUADRO DE CONFIRMACIÓN INTEGRADO EN REACT (Reemplaza al alert) ─── */}
            {idAEliminar && (
                <div style={{ 
                    background: "#fff3cd", 
                    border: "1px solid #ffeeba", 
                    padding: "15px", 
                    marginBottom: "20px", 
                    borderRadius: "6px" 
                }}>
                    <p style={{ margin: "0 0 10px 0", color: "#856404" }}>
                        ¿Estás seguro de que deseas eliminar este aprendiz?
                    </p>
                    <button 
                        onClick={confirmarEliminacion}
                        style={{ background: "#dc3545", color: "white", border: "none", padding: "6px 12px", marginRight: "10px", cursor: "pointer", borderRadius: "4px" }}
                    >
                        Sí, eliminar
                    </button>
                    <button 
                        onClick={() => setIdAEliminar(null)}
                        style={{ background: "#6c757d", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px" }}
                    >
                        Cancelar
                    </button>
                </div>
            )}
            {/* ------------------------------------------------------------------ */}
            
            {/* Sección de Registro */}
            <RegistroAprendizApi onAprendizRegistrado={() => {
                cargarAprendices();
                setMensaje("¡Aprendiz registrado con éxito!");
            }} />
            
            <hr style={{ margin: "30px 0" }} />

            {/* Sección de Edición / Actualización */}
            <EditarAprendiz 
                aprendices={aprendices} 
                onActualizarLista={() => {
                    cargarAprendices();
                    setMensaje("¡Aprendiz actualizado con éxito!");
                }} 
            />

            <hr style={{ margin: "30px 0" }} />

            {/* Listado rápido */}
            <div>
                <h3>Lista Actual en la API:</h3>
                {cargando ? <p>Cargando...</p> : (
                    <ul>
                        {aprendices.map((a) => (
                            <li key={a.id} style={{ marginBottom: "10px" }}>
                                <strong>{a.name}</strong> ({a.email}) - ID: {a.id} {" "}
                                <button 
                                    onClick={() => setIdAEliminar(a.id)} // Activamos el cuadro interno en vez del alert
                                    style={{ marginLeft: "10px", background: "#ff4d4d", color: "white", border: "none", padding: "4px 8px", cursor: "pointer", borderRadius: "4px" }}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default GestionAprendicesApiCompleta;