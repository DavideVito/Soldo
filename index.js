const express = require("express");
const cors = require("cors");
const noCache = require("nocache");
const app = express();

const PORT = process.env.PORT || 3001;

const loginRoutes = require("./Middleware/login");
const prodottiRoutes = require("./Middleware/prodotti");
const ordiniRoutes = require("./Middleware/ordini");

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use(noCache(), express.static("frontend/build"));

app.use("/login", loginRoutes);
app.use("/prodotti", prodottiRoutes);
app.use("/ordini", ordiniRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
