import { useState } from "react";

function PresentacionAprendiz (){
const [nombre, setnombre] = useState("");
const [curso, setcurso] = useState("");

    return (
        <div>
    <h2>mi presentacion</h2>
    <label htmlFor="nombrePresentacion">escribe tu nombre: </label>

        <input 
        is="nombrePresentacion"
        type="text"
        value={nombre}
        onChange={(e) => setnombre(e.target.value)}
        placeholder="ejemplo: alex"
        />
        <br />
        <br />

        <label htmlFor="cursoPresentacion">¿que curso te interesa?</label>

        <input 
        is="cursoPresentacion"
        type="text"
        value={curso}
        onChange={(e) => setcurso(e.target.value)}
        placeholder="ejemplo: alex"
        />
        <h3>mis datos</h3>
        <p>mi nombre es: {nombre}</p>
        <p>me interesa aprender: {curso}</p>
        <p>
            hola, {nombre} te interesa aprender {curso}
        </p>

        </div>
    );
}
export default PresentacionAprendiz;