import Footer from './components/Footer';
import Header from './components/Header';
import Curso from './components/Curso';
import Navbar from './components/Navbar';
import RegistroAprendiz from './components/RegistroAprendiz';
import PresentacionAprendiz from './components/PresentacionAprendiz';
function App() {
  function saludar(){
    alert("bienvenido al centro nacional colombo aleman")
  }
  return (
    <div>
      <Header />
      <Navbar />

      <main id='inicio'>

      <section id='cursos'>

      <h2>nuestros cursos</h2>
      <button onClick={saludar}>
        haz click aqui
        </button>
      <p>ofrecemos una variedad de cursos para ayudarte a desarrollar tus habilidades y alcanzar tus metas profesionales</p>
      <Curso 
        nombre="desarrollo web"
        descripcion="aprender a crear paginas web modernas y atractivas"
        />
      <Curso 
        nombre="bases de datos"
        descripcion="aprende a gestionar y manipular bases de datos"
        />
      <Curso 
        nombre="inteligencia artificial"
        descripcion="aprende a desarrollar soluciones basadas en intelgencia artificial"
        />
      <Curso 
        nombre="programacion con java"
        descripcion="aprende a desarrollar aplicaciones y soluciones mediante el lenguaje java"
        />
      <Curso 
        nombre="curso de python"
        descripcion="aprende a desarrollar aplicaciones mediante el entorno de python"
        />
      </section>

      <section id='nosotros'>
        <h2>sobre nosotros</h2>
        <p>somos un centro de formacion comprometido con el desarrollo de nuestros estudiantes y la excelencia educativa</p>
      </section>

      <section id='contacto'>
        <h2>contacto</h2>
        <p>puedes contactarnos a traves de nuestro correo electronico o numero telefonico para mas informacion sobre nuestros cursos</p>
      </section>

      <RegistroAprendiz />

      </main>

      <PresentacionAprendiz />
      <Footer />
    </div>
  );
}

export default App;