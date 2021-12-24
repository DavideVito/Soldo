const express = require("express");
const getProdotti = require("../Utils/Database/getProdotti");
const fileUpload = require("express-fileupload");
const path = require("path");
const inserisciProdotto = require("../Utils/Database/inserisciProdotto");
const { v4: uuid } = require("uuid");

const cartellaFileImmagini = path.join(__dirname, "..", "immagini/");

const uploadMiddleware = fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  tempFileDir: path.join(__dirname, "temp/"),
  useTempFiles: true,
  debug: true,
  createParentPath: cartellaFileImmagini,
});

const router = express.Router();

router.get("/", (req, res) => {
  getProdotti()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(500).json(err);
    });
});

router.post("/", uploadMiddleware, (req, res) => {
  res.json(req.files);

  const immagineProdotto = req.files?.immagine;

  if (!immagineProdotto) {
    return res.status(400).send("no foto");
  }

  const ext = path.extname(immagineProdotto.name);

  const nomeFile = uuid();

  const percorso = path.join(cartellaFileImmagini, nomeFile + ext);

  const url = path.join("immagini", nomeFile + ext);

  immagineProdotto.mv(percorso);

  const { nome, prezzo, tipo } = req.body;

  if (!nome) {
    return res.status(400).send("no nome");
  }
  if (!prezzo) {
    return res.status(400).send("no prezzo");
  }
  if (!tipo) {
    return res.status(400).send("no tipo");
  }

  inserisciProdotto(nome, prezzo, tipo, url);

  console.log(immagineProdotto);
});

module.exports = router;
