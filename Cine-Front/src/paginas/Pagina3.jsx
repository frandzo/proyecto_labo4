import { useState, useEffect } from "react";
import "./Pagina3.css";
//import { useNavigate } from "react-router-dom";

function App() {
    const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState([])
    const [overlayHorario, setOverlayHorario] = useState(false);
    
    const getPeliculas = async () => {
        const response = await fetch("http://localhost:3000/peliculas/titulos");
        if (response.ok) {
          const { peliculas } = await response.json();
          setPeliculas(peliculas);
        }
      };
    
      useEffect(() => {
        getPeliculas();
      }, []);

      const handleButtonClick = (pelicula) => {
        setPeliculaSeleccionada(pelicula); 
        setOverlayHorario(true);
      };

      const cerrarOverlay = () => {
        setOverlayHorario(false); 
        setPeliculaSeleccionada(null); 
      };
    

  return (
    <>
      <h1>Peliculas</h1>
      <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id_peliculas}>
            <button onClick={() => handleButtonClick(pelicula)}>
              {`${pelicula.titulo}`}
            </button>
          </li>
        ))}
      </ul>

      {overlayHorario && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>{peliculaSeleccionada.titulo}</h3>
            <button className="botones-horario">Viernes 29 de Noviembre - 18:00</button>
            <button className="botones-horario">Viernes 29 de Noviembre - 21:00</button>
            <button className="botones-horario">Viernes 29 de Noviembre - 23:30</button>
            <br/>
            <button className="boton-cerrar" onClick={cerrarOverlay}>x</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
