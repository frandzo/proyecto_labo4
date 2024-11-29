import express from "express"
import { db } from "./db.js"

const router = express.Router()

router.get("/", async(req, res) => {
    const [funciones] = await db.execute("SELECT f.idfuncion,f.idpelicula,f.horario,f.fecha,p.titulo FROM funciones f INNER JOIN peliculas p on (f.idpelicula = p.idpelicula) where f.disponible=true")
    res.send({
        funciones: funciones.map(({ idfuncion, ...elemento }) => ({
            id: idfuncion,
            ...elemento
        }))
    })
})

router.post("/", async(req, res) => {
    const idpelicula = req.body.idpelicula
    const horario = req.body.horario
    const fecha = req.body.fecha
    const disponible = 1;

    const [result] = await db.execute(
        "INSERT INTO funciones (idpelicula, horario, fecha, disponible) VALUES(?,?,?,1)",
        [idpelicula, horario, fecha.slice(0,10)]
    )

    res.status(201).send({
        funciones: {
            id: result.insertId,
            idpelicula, 
            horario, 
            fecha,
            disponible
        }
    })
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    await db.execute("UPDATE funciones SET disponible=false WHERE idfuncion=?", [id])
    res.send({ id: parseInt(id) })
})

// router.get("/titulos", async(req, res) => {
//     const [peliculas] = await db.execute("SELECT titulo FROM peliculas")
//     res.send({
//         peliculas: peliculas.map((elemento) => ({
//             id: elemento.idpelicula,
//             ...elemento
//         }))
//     })
// })

// router.get("/:id", async(req, res) => {
//     const id = req.params.id
//     const sql = "SELECT * FROM peliculas WHERE idpelicula=?"
//     const [peliculas] = await db.execute(sql, [id])

//     if (peliculas.length === 0) {
//         res.status(204).send()
//     } else {
//         res.send({ pelicula: peliculas[0] })
//     }
// })

// router.post("/", async(req, res) => {
//     const titulo = req.body.titulo
//     const descripcion = req.body.descripcion
//     const año = req.body.año
//     const duracion = req.body.duracion
//     const genero = req.body.genero
//     const director = req.body.director

//     const [result] = await db.execute(
//         "INSERT INTO peliculas(titulo, descripcion, año, duracion, genero, director,disponible) VALUES(?,?,?,?,?,?,1)",
//         [titulo, descripcion, año, duracion, genero, director]
//     )

//     res.status(201).send({
//         peliculas: {
//             id: result.insertId,
//             titulo,
//             descripcion,
//             año,
//             duracion,
//             genero,
//             director
//         }
//     })
// })

// router.put("/:id", async(req, res) => {
//     const id = req.params.id
//     const titulo = req.body.titulo
//     const descripcion = req.body.descripcion
//     const año = req.body.año
//     const duracion = req.body.duracion
//     const genero = req.body.genero
//     const director = req.body.director

//     await db.execute(
//         "UPDATE peliculas SET titulo=?, descripcion=?, año=?, duracion=?, genero=?, director=? WHERE idpelicula=?",
//         [titulo, descripcion, año, duracion, genero, director, id]
//       )

//     res.status(201).send({
//         peliculas: {
//             id: parseInt(id),
//             titulo,
//             descripcion,
//             año,
//             duracion,
//             genero,
//             director
//         }
//     })
// })

// router.delete("/:id", async(req, res) => {
//     const id = req.params.id
//     await db.execute("UPDATE peliculas SET disponible=false WHERE idpelicula=?", [id])
//     res.send({ id: parseInt(id) })
// })

export default router