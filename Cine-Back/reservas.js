import express from "express";
import { db } from "./db.js";

const router = express.Router();

// GET /tareas
// Consultar por todas las tareas
router.get("/", async (req, res) => {
  const [reservas] = await db.execute("select * from reservas");
  res.send({ reservas });
});

// GET /tareas/:id
// Consultar por una tarea

// router.get("/:id", async (req, res) => {
//   const id = req.params.id;

//   // Ejecuto consulta con parametros
//   const sql = "select * from tareas where id=?";
//   const [tareas] = await db.execute(sql, [id]);

//   // Si no hay tareas enviar un 204 (sin contenido)
//   if (tareas.length === 0) {
//     res.status(204).send();
//   } else {
//     res.send({ tarea: tareas[0] });
//   }
// });

// POST /tareas/
// Crear nueva tarea

router.post("/", async (req, res) => {
  const idusuario = 7;
  const idfuncion = 12;
  const idasiento = [1,2,3];
  var idventa;

  const [ven] = await db.execute(
    "insert into ventas (idusuario) values (?)",
    [idusuario]
  );
  idventa=ven.insertId;

  for(var i=0;i<idasiento.length;i++){
    const [result] = await db.execute(
      "insert into reservas (idfuncion, idasiento,idventa) values (?,?,?)",
      [idfuncion, idasiento[i], idventa]
    );
    
  };
  
  const [reservas] = await db.execute("select * from reservas");
  res
  .status(201)
  .send({ reservas });
});

// PUT /tareas/:id
// Modificar tarea

// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   const descripcion = req.body.descripcion;
//   const completada = req.body.completada;

//   await db.execute("update tareas set descripcion=?, completada=? where id=?", [
//     descripcion,
//     completada,
//     id,
//   ]);

//   res.send({ tarea: { id: parseInt(id), descripcion, completada } });
// });

// DELETE /tareas/:id
// Quitar tarea

// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   await db.execute("delete from tareas where id=?", [id]);

//   res.send({ id: parseInt(id) });
// });

export default router;
