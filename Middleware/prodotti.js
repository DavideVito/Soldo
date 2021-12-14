const express = require("express");
const getProdotti = require("../Utils/Database/getProdotti");
const fileUpload = require("express-fileupload");

const uploadMiddleware = fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  tempFileDir: "/temp/",
  useTempFiles: true,
  debug: true,
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

  //const immagineProdotto = req.files.immagine;

  console.log(immagineProdotto);
});

module.exports = router;
