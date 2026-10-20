import { use, useState } from "react";
function RegistroAprendiz(){
const [nombre, setnombre] = useState("");
    return (
    <div>
        <h2> registro aprendiz</h2>
        <label>escribe tu nombre: </label>
        <input  
        type="text"
        placeholder="escribe tu nombre"
        value={nombre}
        onChange={(e) => setnombre(e.target.value)}
        />

        <p>bienvenido, {nombre}</p>
    </div>
    );
}
export default RegistroAprendiz;