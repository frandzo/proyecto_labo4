import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import "./PaginaFunciones.css"
import dayjs from "dayjs"
import { Dropdown } from 'primereact/dropdown';

import { Link, useNavigate } from "react-router-dom";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [idpelicula, setIdPelicula] = useState(0);
  const [funciones, setFunciones] = useState([])
  const [funcionId, setFuncionId] = useState(0)
  const [fecha, setFecha] = useState(dayjs(Date()))
  const [fechatxt, setFechatxt] = useState("")
  const [horario, setHorario] = useState("")
  const [value, setValue] = useState("Fruit")

  const getPeliculas = async() => {
    const response = await fetch("http://localhost:3000/peliculas")
    if (response.ok) {
      const { peliculas } = await response.json()
      setPeliculas(peliculas)
    }
  }

  useEffect(() => {
    getPeliculas();
    getFunciones();
  }, [])

  const handleSubmit = async (e) => {
    const response = await fetch("http://localhost:3000/funciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idpelicula,
        horario,
        fecha
      }),
    });

    if (response.ok) {
      const { funciones: nuevaFuncion } = await response.json();
      nuevaFuncion.titulo=peliculas.find((element) => element.id == idpelicula).titulo
      setFunciones([...funciones, nuevaFuncion]);
    }
  }

  const getFunciones = async() => {
    const response = await fetch("http://localhost:3000/funciones")
    if (response.ok) {
      const { funciones } = await response.json()
      setFunciones(funciones)
    }
  }

  const quitarFuncion = async (id) => {
    if (confirm(`¿Quitar ${id}?`)) {
      const response = await fetch(`http://localhost:3000/funciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFunciones(funciones.filter((f) => f.id !== id));
      }
    }
  }

  const handleChange = (a)=>{
    var b=new Date()
    setFecha(a)
    setFechatxt(a.$y.toString()+"-"+(a.$M+1).toString()+"-"+(a.$D).toString())
    console.log(a.$y.toString()+"-"+(a.$M+1).toString()+"-"+(a.$D).toString())
  }

  const handleChangeSelectHorario = (a)=>{
    setHorario(a);
    console.log(a);
  }

  const handleChangeSelectPelicula = (a)=>{
    setIdPelicula(a);
    console.log(a);
  }

    return (
      <>
      <h1>Funciones</h1> 
        <LocalizationProvider
          dateAdapter={AdapterDayjs}>
            {<DatePicker  format="YYYY-MM-DD" value={fecha} onChange={(nuevaFecha) =>{handleChange(nuevaFecha)}}/>}
        </LocalizationProvider>

        <Dropdown value={idpelicula} onChange={(e) => handleChangeSelectPelicula(e.value)} options={peliculas} optionLabel="titulo" optionValue="id" placeholder="Seleccionar Película..." style={{width:'300px'}} />

        <Dropdown value={horario} onChange={(e) => handleChangeSelectHorario(e.value)} options={[{hr:"15:00"},{hr:"18:00"},{hr:"21:00"}]} optionLabel="hr"  optionValue="hr" placeholder="Seleccionar Horario..." style={{width:'300px'}}/>
        
        <button onClick={()=>handleSubmit()} type="submit"  className="boton-agregar">Agregar Función</button>


      
      {/* <select placeholder="Seleccionar Película..."  value={peliculaId} onChange={(e)=>handleChangeSelectPelicula(e.target.value)}>
        
        {peliculas.map((pelicula) => (
          <option key={pelicula.id} value={pelicula.id}>
            {`${pelicula.id}: ${pelicula.titulo} (${pelicula.año} - ${pelicula.director})`}
          </option>
        ))}
      </select> */}


      {/* <select  placeholder="Seleccionar Horario..." value={horario} onChange={(e)=>handleChangeSelectHorario(e.target.value)}>
        <option value="15:00">15:00</option>
        <option value="18:00">18:00</option>
        <option value="21:00">21:00</option>
      </select> */}
      {/* <ul>
        {peliculas.map((pelicula) => (
          <li key={pelicula.id}>
            {`${pelicula.id}: ${pelicula.titulo} (${pelicula.año} - ${pelicula.director})`}
            <div className="button-container">
              <button className="boton-editar" onClick={() => modificarPelicula(pelicula)}>Editar Película</button>
              <button className="boton-eliminar" onClick={() => quitarPelicula(pelicula.id)}>Eliminar Película</button>
            </div>
          </li>
        ))}
      </ul> */}
      {/* <form onSubmit={(e) => {e.preventDefault()
          if (peliculaId === 0) {
            handleSubmit(e)
          } else {
            modificarPeliculaApi()
          }}}>
        <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
        <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
        <label htmlFor="año">Año:</label>
          <input type="number" id="año" value={año} onChange={(e) => setAño(e.target.value)} required/>
        <label htmlFor="duracion">Duración:</label>
          <input type="number" id="duracion" value={duracion} onChange={(e) => setDuracion(e.target.value)} required/>
        <label htmlFor="genero">Género:</label>
          <input type="text" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required/>
        <label htmlFor="director">Director:</label>
          <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)} required/>
          

          {peliculaId === 0 && <button type="submit" className="boton-agregar">Agregar Película</button>}
          {peliculaId !== 0 && (
            <>
            <button className="boton-editar" onClick={modificarPeliculaApi}>Editar Película</button>
            <button onClick={() => {
              setPeliculaId(0)
              setTitulo("")
              setDescripcion("")
              setAño("")
              setDuracion("")
              setGenero("")
              setDirector("")
            }}>Cancelar</button>
            </>
          )}
      </form>
*/}
      <ul>
        {funciones.map((funcion) => (
          <li key={funcion.id}>  
          <p>{`${funcion.id}: Día: ${funcion.fecha.slice(0, 10)}
          Hora:${funcion.horario} 
          Película:(${funcion.titulo})`}  
            </p>  
            <div className="button-container">
              <button className="boton-eliminar" onClick={() => quitarFuncion(funcion.id)}>Quitar Función</button>
            </div>
          </li>
        ))}
      </ul> 
      
      <Link to="/PaginaSeleccion">
        <button>Volver</button>
      </Link>
      </>
    );
  }

  export default App;