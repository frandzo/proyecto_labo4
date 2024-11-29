import express from "express"
import cors from "cors"
import peliculasRouter from "./peliculas.js"
import funcionesRouter from "./funciones.js"
import reservasRouter from "./reservas.js"
import asientosRouter from "./asientos.js"
import loginRouter from "./login.js"
import autenticacionRouter from "./autenticacion.js"
import { conectarDB } from "./db.js"
import dotenv from "dotenv"

dotenv.config()

conectarDB()
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
    res.send("Hola Mundo")
})

app.use("/peliculas", peliculasRouter)
app.use("/login", loginRouter)
app.use("/autenticacion", autenticacionRouter)
app.use("/funciones", funcionesRouter)
app.use("/reservas", reservasRouter)
app.use("/asientos", asientosRouter)

app.listen(port, () => {
    console.log(`App conectada en ${port}`)
})