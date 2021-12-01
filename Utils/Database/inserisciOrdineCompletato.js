const db = require("./Connessione");

const inserisciOrdineCompletato = async (idOrdine) => {
  const sql = `INSERT INTO OrdiniCompletati (idOrdine) VALUES ( ? );`;

  return await db.safeQuery(sql, [idOrdine]);
};

module.exports = inserisciOrdineCompletato;
