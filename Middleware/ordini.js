const express = require("express");
const getOrdini = require("../Utils/Database/getOrdini");
const inserisciOrdine = require("../Utils/Database/inserisciOrdine");
const inserisciOrdineCompletato = require("../Utils/Database/inserisciOrdineCompletato");
const router = express.Router();

router.get("/:mail", (req, res) => {
  const { mail: email } = req.params;

  getOrdini(email)
    .then((ordini) => {
      res.status(200).send(ordini);
    })
    .catch((error) => {
      console.log(error);

      console.log(error.sql);
      res.status(400).json(error);
    });
});

router.post("/", (req, res) => {
  const { email, prodotti } = req.body;

  inserisciOrdine(email, prodotti).then(() => {
    res.status(200).send("OK");
  });
});

router.post("/completato", (req, res) => {
  const { idOrdine } = req.body;

  inserisciOrdineCompletato(idOrdine)
    .then(() => {
      res.status(201).send("OK");
    })
    .catch(() => {
      res.status(400).send("NO OK");
    });
});

module.exports = router;
