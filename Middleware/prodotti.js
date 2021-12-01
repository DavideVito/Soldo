const express = require("express");
const getProdotti = require("../Utils/Database/getProdotti");

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

module.exports = router;
