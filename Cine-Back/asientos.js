import express from "express";
import { db } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [asientos] = await db.execute("select * from asientos");
  // const [peliculas] = await db.execute("select * from peliculas");
  // const [reservas] = await db.execute("select * from reservas");
  // const [funciones] = await db.execute("select * from funciones");
  res.send({ asientos
    // , reservas, funciones, peliculas 
  });
});

// router.post("/", async (req, res) => {
//   const idfuncion = req.body.idfuncion;
//   const idasiento = req.body.idasiento;
//   const idventa = req.body.idventa;

//   // const completada = req.body.completada;
//   const [result] = await db.execute(
//     "insert into reservas(idfuncion, idasiento, idventa ) value(?,?,?)",
//     [idfuncion, idasiento, idventa]
//   );
//   res.status(201).send({
//     reserva: { id: result.insertdId, idfuncion, idasiento, idventa },
//   });
// });

export default router;
