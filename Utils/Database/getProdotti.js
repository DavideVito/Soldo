const db = require("./Connessione");

const getProdotti = async () => {
  return db.promise("SELECT * FROM v_Prodotti");
};

module.exports = getProdotti;
