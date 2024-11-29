import { useState } from "react"
import "./PaginaLogin.css"
import { useNavigate } from "react-router-dom"

function App() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [registrado, setRegistrado] = useState("")
    const [token] = useState("");
    const [registrarUsuario, setRegistarUsuario] = useState(false)
    const navigate = useNavigate()

    const login = async (e) => {
        e.preventDefault()
        setError("")
        setRegistrado("")

        const response = await fetch("http://localhost:3000/autenticacion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        if (response.ok) {
           // const { token } = await response.json();
            setUsername("")
            setPassword("")
            setError("")
            
            navigate("/PaginaSeleccion")
        } else {
            const errorData = await response.json()
            setError(errorData.error || "Error en el inicio de sesión")
        }
    }

    const registro = async (e) => {
        e.preventDefault()
        setError("")
        setRegistrado("")

        const response = await fetch ("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        })

        if (response.ok) {
            setRegistrado("Usuario registrado con éxito. Ahora puedes iniciar sesión.")
            setRegistarUsuario(false)
            setUsername("")
            setPassword("")
        } else {
            const errorData = await response.json()
            setError(errorData.errores?.[0]?.msg || "Error al registrar el usuario.")
        }
    }
  
    return (
      <>
        <div id="login">
            <h1>{registrarUsuario ? "Registrarse" : "Iniciar Sesión"}</h1>
            <form onSubmit={registrarUsuario ? registro : login}>
            <label htmlFor="username">Usuario:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>

            <label htmlFor="password"> Contraseña:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>

            {registrarUsuario ? (
                <button className="boton-login" type="submit">Registrarse</button>
            ) : (
                <button className="boton-login" type="submit">Iniciar Sesión</button>
            )}
            </form>

            <p className="mensaje-login">
                {registrarUsuario ? (
                    <span>
                        Ya tengo una cuenta
                        <button className="registar-login" onClick={() => setRegistarUsuario(false)}>Iniciar Sesión</button>
                    </span>
                ) : (
                    <span>
                    Aún no tengo una cuenta
                    <button className="registar-login" onClick={() => setRegistarUsuario(true)}>Registrarse</button>
                    </span>
                )}
            </p>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {registrado && <p style={{ color: "green" }}>{registrado}</p>}
            {token && <p>token:{token}</p>}
        </div>
      </>
    );
  }
  
  export default App;
  