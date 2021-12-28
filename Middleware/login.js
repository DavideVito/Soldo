const express = require("express");
const getUtente = require("../Utils/Database/getUtente");
const inserisciUtente = require("../Utils/Database/inserisciUtente");
const router = express.Router();

router.post("/utente", (req, res) => {
  const { email, nome } = req.body;

  console.log(req.body);

  inserisciUtente(email, nome)
    .then(() => {
      res.status(201).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

router.get("/utente/:email?", (req, res) => {
  let email = req.body.email;

  if (!email) {
    email = req.params.email;
  }

  if (!email) return res.status(400).send("errro");
  getUtente(email)
    .then((user) => {
      res.status(201).send(user ?? {});
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json(error);
    });
});

module.exports = router;
