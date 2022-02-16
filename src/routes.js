const express = require('express');
const timesDb = require('./db');

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json(timesDb);
});

routes.post("/newTime", (req, res) => {

});

routes.get("/:nome", (req, res) => {
  if (req.params.nome !== undefined) {
    const nome = req.params.nome;
    console.log(nome);
    const times = timesDb.find((c) => c.nome == nome);
    if (times != undefined) {
      return res.json(times);
    } else {
      return res.status(404).json({ msg: "Time não encontrado" });
    }
  } else {
    console.log(req.params.nome);
    return res.sendStatus(400);
  }
});

routes.put("/:id", (req, res) => {

});

routes.delete("/:id", (req, res) => {
  if (isNaN(req.params.id)) {
    return res.sendStatus(400);
  } else {
    const id = parseInt(req.params.id);
    const index = timesDb.findIndex((c) => c.id == id);
    if (index !== -1) {
      timesDb.splice(index, 1);
      return res.json({ msg: "Time excluido com sucesso" });
    } else {
      return res.status(404).json({ msg: "Time não encontrado" });
    }
  }
});

module.exports = routes;
