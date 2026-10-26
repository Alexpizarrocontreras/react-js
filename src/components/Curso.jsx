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
        <div className="contenedor-curso">
            <h3 className="titulo-curso">{props.nombre}</h3>
            <p className="descripcion-curso">{props.descripcion}</p>
            <p className="interesados">personas interesadas: {interesados}</p>
            <button className="boton-curso" onClick={mostrarmensaje}>
                ver informacion
            </button>
            <div></div>
            <button className="boton-curso" onClick={() => {inscripcion();agregarinscritos();}}>
                inscribirme
            </button>
            <div></div>
           <button className="boton-curso" onClick={agregarinteresado}>
                interesado
            </button>
            <p className="inscritos" >inscripciones registradas: {inscritos}</p>
           <button className="boton-curso" onClick={agregarinscritos}>
                registrar inscripcion
            </button>
        </div>
    );
}

export default Curso;