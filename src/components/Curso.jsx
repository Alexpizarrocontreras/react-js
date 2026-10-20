import { useState } from "react";
function Curso(props){
    const [interesados, setinteresados] = useState(0);
    const [inscritos, setinscritos] = useState(0);

    function agregarinteresado(){
        setinteresados(interesados+1);
    }
    function agregarinscritos(){
        setinscritos(inscritos+1);
    }
    function mostrarmensaje(){
        alert(`bienvenido al curso de ${props.nombre}`);
    }
    function inscripcion(){
        alert(`te haz inscrito al curso de ${props.nombre}`);
    }
    return (
        <div>
            <h3>{props.nombre}</h3>
            <p>{props.descripcion}</p>
            <p>personas interesadas: {interesados}</p>
            <button onClick={mostrarmensaje}>
                ver informacion
            </button>
            <div></div>
            <button onClick={() => {inscripcion();agregarinscritos();}}>
                inscribirme
            </button>
            <div></div>
           <button onClick={agregarinteresado}>
                interesado
            </button>
            <p>inscripciones registradas: {inscritos}</p>
           <button onClick={agregarinscritos}>
                registrar inscripcion
            </button>
        </div>
    );
}

export default Curso;