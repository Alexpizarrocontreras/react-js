import { useState, useEffect } from "react";

function RegistroAprendizApi({ onAprendizRegistrado }) {
    const [nombre, setnombre] = useState("");  
    const [correo, setcorreo] = useState("");  
    const [mensaje, setmensaje] = useState("");  
    const [enviado, setenviado] = useState(false);  
    const [aprendices, setaprendices] = useState([]);

    function cargarAprendices() {
        fetch("http://localhost:5000/aprendices")
            .then((res) => {
                if (!res.ok) throw new Error("Error al cargar la lista");
                return res.json();
            })
            .then((datos) => setaprendices(datos))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        cargarAprendices();
    }, []);

    function registrarAprendiz(e) {
        e.preventDefault(); // <-- Aquí va correctamente dentro del evento del formulario
        setmensaje("");
        setenviado(true);

        const ultimoId = aprendices.length > 0 
            ? Math.max(...aprendices.map(a => Number(a.id) || 0)) 
            : 0;
        
        const siguienteId = ultimoId + 1;

        fetch("http://localhost:5000/aprendices", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                id: siguienteId,
                name: nombre,
                email: correo
            })
        })
        .then((respuesta) => {
            if (!respuesta.ok){
                throw new Error("No se pudo enviar el registro");
            }
            return respuesta.json();
        })
        .then((datos) => {
            setmensaje('Solicitud exitosa. ID: ' + datos.id);
            setnombre("");
            setcorreo("");
            cargarAprendices(); 
            if (onAprendizRegistrado) {
                onAprendizRegistrado();
            }
        })
        .catch((error) => {
            setmensaje("Ocurrió un error al enviar");
            console.error(error);
        })
        .finally(() => {
            setenviado(false);
        });
    }

    return (
        <section>
            <h3>Registrar aprendiz (prueba)</h3>
            <form onSubmit={registrarAprendiz}>
                <div>
                    <label>Nombre completo: </label>
                    <input
                        value={nombre}
                        onChange={(e) => setnombre(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Correo electrónico: </label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setcorreo(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" disabled={enviado}>
                    {enviado ? "Enviando..." : "Registrar"}
                </button>
            </form>

            {mensaje && <p><strong>{mensaje}</strong></p>}
        </section>
    );
}

export default RegistroAprendizApi;