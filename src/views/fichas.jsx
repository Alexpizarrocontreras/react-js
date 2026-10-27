import { useState, useEffect } from "react";

function Fichas() {
    const [fichas, setfichas] = useState([]);
    const [cargando, setcargando] = useState(true);
    const [error, seterror] = useState("");

    useEffect(() => {
        async function obtenerusuarios() {
            try {
                setcargando(true);
                const respuesta = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                
                if (!respuesta.ok) {
                    throw new Error("No fue posible cargar usuarios");
                }
                
                const datos = await respuesta.json();
                setfichas(datos);
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
            <h2>Lista de </h2>
            <div>
                {fichas.map((ficha) => (
                    <div key={ficha.id}>
                        <strong>{ficha.title}</strong> - {ficha.body}
                        <br />
                        <br />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Fichas;
