import { useState, useEffect } from "react";

function Evaluaciones() {
    const [evaluaciones, setevaluaciones] = useState([]);
    const [cargando, setcargando] = useState(true);
    const [error, seterror] = useState("");

    useEffect(() => {
        async function obtenerusuarios() {
            try {
                setcargando(true);
                const respuesta = await fetch(
                    "https://jsonplaceholder.typicode.com/comments"
                );
                
                if (!respuesta.ok) {
                    throw new Error("No fue posible cargar usuarios");
                }
                
                const datos = await respuesta.json();
                setevaluaciones(datos);
            } catch (err) {
                seterror("no pudimos cargar los usuarios, intenta nuevamente");
            } finally {
                setcargando(false);
            }
        }

        obtenerusuarios();
    }, []);

    if (cargando) return <p>Cargando usuarios...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Lista de evaluaciones</h2>
            <div>
                {evaluaciones.map((evaluacion) => (
                    <div key={evaluacion.id}>
                        <strong>{evaluacion.name}</strong> - <strong>{evaluacion.email}</strong> - {evaluacion.body}
                        <br />                    
                        <br />                    
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Evaluaciones;
