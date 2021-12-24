/*



  */

const db = require("./Connessione");

const inserisciProdotto = async (nome, prezzo, tipo, percorso) => {
  const sql = `INSERT INTO Prodotto (nome, prezzoUnitario, tipoProdotto, percorso) VALUES ( ? , ? , ? , ?);`;

  await db.safeQuery(sql, [nome, prezzo, tipo, percorso]);

  const idProdotto = await db.getLastInsertedId();

  return idProdotto;
};

module.exports = inserisciProdotto;
