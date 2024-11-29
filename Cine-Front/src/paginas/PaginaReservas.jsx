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
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(0)
  const [idpelicula, setIdPelicula] = useState(0);
  const [funciones, setFunciones] = useState([])
  const [funcionesFiltradas, setFuncionesFiltradas] = useState([])
  const [funcionId, setFuncionId] = useState(0)
  const [fecha, setFecha] = useState(dayjs(Date()))
  const [fechatxt, setFechatxt] = useState("")
  const [horario, setHorario] = useState("")
  const [value, setValue] = useState("Fruit")
  const [sala, setSala] = useState(1)
  const [reservas,setReservas] = useState([])
  const [reservasFiltradas,setReservasFiltradas] = useState([])
  const [display, setDisplay] = useState([])
  const [btnText, setBtnText] = useState([])
  const [asientos, setAsientos]=useState([])
  const [lastOpen, setLastOpen] = useState(0)
  const [asientosDisponibles, setAsientosDisponibles] = useState([])
  const [asientosSeleccionados,setAsientosSeleccionados] = useState([])
  const [checked, setChecked] = useState([])
  const [disabled, setDisabled] = useState([])
  const handleClick = () => setChecked(!checked)

  const getPeliculas = async() => {
    const response = await fetch("http://localhost:3000/peliculas")
    if (response.ok) {
      const { peliculas } = await response.json()
      setPeliculas(peliculas)
    }
  }

  const getReservas = async() => {
    const response = await fetch("http://localhost:3000/reservas")
    if (response.ok) {
      const { reservas } = await response.json()
      setReservas(reservas)
      setReservasFiltradas(reservas)
      console.log(reservas)
    }
  }

  const getAsientos = async() => {
    const response = await fetch("http://localhost:3000/asientos")
    if (response.ok) {
      const { asientos } = await response.json()
      setAsientos(asientos)
      const asientosDisp = asientos.map((e)=>reservas.find((f)=>f.idasiento==e.idasiento)?"red":"black")
      setAsientosDisponibles(asientosDisp)
      console.log(asientosDisp)
      console.log(reservas)
    }
  }

  useEffect(() => {
    getPeliculas();
    getFunciones();
    getReservas();
    getAsientos();
  }, [])

  const getFunciones = async() => {
    const response = await fetch("http://localhost:3000/funciones")
    if (response.ok) {
      const { funciones } = await response.json()
      setFunciones(funciones)
      setFuncionesFiltradas(funciones)
      setDisplay(funciones.map((e)=>'none'))
      setBtnText(funciones.map((e)=>'Ver Asientos'))
    }
  }

  function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return 'red';
        }
    }
    return 'black';
}

function containsObjectA(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }
  return false;
}

  const mostrarAsientos = (id,idf) => {
    // console.log(asientos.map((e)=>containsObject(e.idasiento, reservas.filter((b)=>b.idfuncion==idf).map((r)=>r.idasiento))))
    // console.log(reservas)
    // console.log(idf)
    setAsientosDisponibles(asientos.map((e)=>containsObject(e.idasiento, reservas.filter((b)=>b.idfuncion==idf).map((r)=>r.idasiento))))
    setChecked(asientos.map((e)=>containsObjectA(e.idasiento, reservas.filter((b)=>b.idfuncion==idf).map((r)=>r.idasiento))))
    setDisabled(asientos.map((e)=>containsObjectA(e.idasiento, reservas.filter((b)=>b.idfuncion==idf).map((r)=>r.idasiento))))
    setAsientosSeleccionados([])
    const nextDisplay = display.map((c, i) => {
      if (i === id) {
        return 'flex'
      } else {
        return 'none';
      }
    });
    const nextTxt = btnText.map((c, i) => {
      if (i === id) {  
          return 'Ver Asientos'
        }else{
          return 'Ver Asientos'
        }
    });
    setDisplay(nextDisplay);
    setBtnText(nextTxt);
  }

  const handleChangeSelectPelicula = (a)=>{
    setIdPelicula(a);
    setFuncionesFiltradas(funciones.filter((e)=>e.idpelicula==a))
    setDisplay(funciones.map((e)=>'none'))
    setBtnText(funciones.map((e)=>'Ver Asientos'))
  }

  const borrarFiltros = () =>{
    setIdPelicula(0)
    setFuncionesFiltradas(funciones)
    setDisplay(funciones.map((e)=>'none'))
    setBtnText(funciones.map((e)=>'Ver Asientos'))
    setAsientosSeleccionados([])
  }

  const handleCheckbox = (a) =>{
    setAsientosDisponibles(asientosDisponibles.map((e,i)=>i==a?'blue':e))
    setDisabled(disabled.map((e,i)=>i==a?true:e))
    setAsientosSeleccionados([...asientosSeleccionados,a+1])
    console.log(asientosSeleccionados)
  }
    return (
      <>
      <h1>RESERVAS</h1> 
        <Dropdown value={idpelicula} onChange={(e) => handleChangeSelectPelicula(e.value)} options={peliculas} optionLabel="titulo" optionValue="id" placeholder="Seleccionar Película..." style={{width:'300px'}} />
       
        <button onClick={()=>borrarFiltros()} type="submit"  className="boton-agregar">Borrar selección</button>
      
      <ul>
        {funcionesFiltradas.map((funcion,i) => (
          <li key={funcion.id} style={{display:'flex',flexDirection:'column'}}>  
          <div style={{display:'flex','alignItems':'center','justifyContent':'center'}}>

            <p>{`${funcion.id}: Día: ${funcion.fecha.slice(0, 10)}
            Hora:${funcion.horario} 
            Película:(${funcion.titulo})`}  
            </p>  
            <div className="button-container">
              <button className="boton-eliminar" onClick={() => mostrarAsientos(i,funcion.id)}>{btnText[i]}</button>
            </div>

          </div>
          <div style={{"display":display[i],'flexDirection':'column',justifyContent:'center',alignItems:'center'}}><h4>Asientos</h4>
            <div style={{width:'200px',"display":"flex",'justifyContent':'space-between',alignItems:'center'}}>
              <div>
                <h4>Sala 1</h4>
                <h5>Pantalla</h5>
                <div style={{display:'flex'}}>
                  <table>
                    <tr>
                        <th>c</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                    <tr><td>A</td>
                        {asientos.map((e,i)=>{if(e.sala==1&&e.idasiento<6)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                    <tr><td>B</td>
                        {asientos.map((e,i)=>{if(e.sala==1&&e.idasiento>5&&e.idasiento<11)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                    <tr><td>C</td>
                        {asientos.map((e,i)=>{if(e.sala==1&&e.idasiento>10&&e.idasiento<16)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                </table>
                </div>
              </div>
              <div>
                <h4>Sala 2</h4>
                <h5>Pantalla</h5>
                <div style={{display:'flex'}}>
                  
                  <table>
                    <tr>
                        <th>c</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                    <tr>
                      <td>A</td>
                        {asientos.map((e,i)=>{if(e.sala==2&&e.idasiento>15&&e.idasiento<21)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                    <tr>
                      <td>B</td>
                        {asientos.map((e,i)=>{if(e.sala==2&&e.idasiento>20&&e.idasiento<26)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}                     
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                    <tr>
                      <td>C</td>
                        {asientos.map((e,i)=>{if(e.sala==2&&e.idasiento>25&&e.idasiento<31)return<td style={{color:asientosDisponibles[e.idasiento-1]}} key={e.idasiento}>
                          {e.idasiento}
                          <input type='button' onClick={()=>handleCheckbox(e.idasiento-1)} disabled={disabled[e.idasiento-1]} style={{background:asientosDisponibles[e.idasiento-1]}}></input>
                        </td>})}
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          </li>
        ))}
      </ul> 
      {/* <button onClick={()=>setMarcada(false)}>Limpiar selección</button> */}
      <button>Reservar</button>
      
      <Link to="/PaginaSeleccion">
        <button>Volver</button>
      </Link>
      </>
    );
  }

  export default App;