import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GestionCursos from "./components/GestionCursos";
 
import Inicio from "./views/Inicio";
import Cursos from "./views/Cursos";
import Registro from "./views/Registro";
import AcercaDe from "./views/Acercade";
import Usuarioapi from "./views/Usuarioapi";
 
function App() {
  const [cursos, setCursos] = useState(() => {
    const cursosGuardados = localStorage.getItem("mis_cursos");
    if (cursosGuardados) {
      return JSON.parse(cursosGuardados);
    } else {
      return [
        {
          id: 1,
          nombre: "Diseño Web",
          descripcion: "Creación de interfaces modernas y atractivas.",
          informacion: "Aprenderás HTML, CSS y fundamentos de diseño web.",
        },
        {
          id: 2,
          nombre: "Desarrollo de Software",
          descripcion: "Construcción de aplicaciones tecnológicas.",
          informacion: "Aprenderás programación y desarrollo de aplicaciones.",
        },
        {
          id: 3,
          nombre: "Bases de Datos",
          descripcion: "Diseño y administración de datos.",
          informacion: "Aprenderás modelado, normalización y SQL.",
        },
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem("mis_cursos", JSON.stringify(cursos));
  }, [cursos]);
 
  return (
    <>
      <Header />
 
      <Navbar />
 
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
 
          <Route path="/Cursos" element={<Cursos cursos={cursos} />} />
 
          <Route path="/Registro" element={<Registro cursos={cursos} />} />
 
          <Route
            path="/GestionCursos"
            element={<GestionCursos cursos={cursos} setCursos={setCursos} />}
          />
          <Route
            path="/Acercade"
            element={<AcercaDe />}
          />
          <Route
            path="/Usuarioapi"
            element={<Usuarioapi />}
          />
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </main>
 
      <Footer />
    </>
  );
}
 
export default App;
