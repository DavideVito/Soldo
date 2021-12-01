const db = require("./Connessione");
const getUtente = require("./getUtente");

const inserisciOrdine = async (email, prodotti) => {
  const utente = await getUtente(email);

  const sql = "INSERT INTO Ordine (`idUtente`) VALUES ( ? );";

  await db.safeQuery(sql, [utente.idUtente]);
  const idOrdine = await db.getLastInsertedId();

  const inserimenti = prodotti.map((prodotto) =>
    inserisciProdotto(idOrdine, prodotto)
  );

  await Promise.all(inserimenti);
};

const inserisciProdotto = async (idOrdine, prodotto) => {
  const sql =
    "INSERT INTO OrdineContieneProdotto (`idOrdine`, `idProdotto`) VALUES (?, ?);";

  return await db.safeQuery(sql, [idOrdine, prodotto.idProdotto]);
};

module.exports = inserisciOrdine;
