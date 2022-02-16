const express = require('express');
const timesDb = require('./db');

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.json(timesDb);
});

routes.post("/newTime", (req, res) => {
    const {
      nome,
      cidade,
      estado,
      serie,
      titulos,
      folhaPagamento,
    } = req.body;

    if(nome && cidade && estado !== undefined){
      const id = timesDb.length + 1
      timesDb.push({
        id,
        nome,
        cidade,
        estado,
        serie,
        titulos,
        folhaPagamento,
      });
    return res.status(200).json({msg:"Informação atualizada com sucesso"})
    }
    else{
    return res.status(400).json({msg:"Preenchimento de dados infocorreto"})
    }
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
  
    if(isNaN(req.params.id)){
      return res.sendStatus(400);
    } else {
      const id = parseInt(req.params.id);
      const time = timesDb.find((t) => t.id == id);
      if(time !=undefined){
        const {
          nome,
          cidade,
          estado,
          serie,
          titulos,
          folhaPagamento,
        } = req.body;
        if(nome != undefined) time.nome = nome;
        if(cidade != undefined) time.cidade = cidade;
        if(estado != undefined) time.estado = estado;
        if(serie != undefined) time.serie = serie;
        if(titulos.estaduais != undefined) time.titulos.estaduais = titulos.estaduais;
        if(titulos.nacionais != undefined) time.titulos.nacionais = titulos.nacionais;
        if(titulos.internacionais != undefined) time.titulos.internacionais = titulos.internacionais;
        if(folhaPagamento != undefined) time.folhaPagamento = folhaPagamento;
        return res.status(200).json({msg: "Time atualizado com sucesso"});
      }
      else{
        return res.status(400).json({msg:"Id não encontrado"})
      }
    }
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
