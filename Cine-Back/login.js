import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ data });
});

router.post("/", (req, res) => {
  res.send({ data });
});

router.delete("/:id", (req, res) => {
  res.send({ data });
});

router.put("/:id", (req, res) => {
  res.send({ data });
});
export default router;
