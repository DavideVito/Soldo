const connessione = require("./Connessione");
const getUtente = require("./getUtente");

const queryDettagli = `
SELECT
    *,
    RAND() * 100 as id
FROM
    (
        SELECT
            idOrdine,
            idProdotto,
            COUNT(idProdotto) as QTA,
            nomeProdotto,
            tipoProdotto,
            email
        from
            v_ordini
        GROUP BY
            idProdotto,
            idOrdine,
            nomeProdotto,
            tipoProdotto,
            email
    ) as T`;

const getOrdini = async (email = "") => {
  const utente = await getUtente(email);

  let sql = `SELECT * FROM Ordine INNER JOIN Utente on (Utente.idUtente = Ordine.idUtente)`;

  if (!utente.admin) {
    sql += ` WHERE Utente.idUtente = ? `;
  }

  sql += ` ORDER BY data desc `;

  const p1 = connessione.safeQuery(sql, [utente.idUtente]);

  let sql2 = `${queryDettagli}`;

  if (!utente.admin) {
    sql2 += ` WHERE email = ? `;
  }

  sql2 += ` ORDER BY idOrdine`;

  const p2 = connessione.safeQuery(sql2, [email]);

  const [ordini, dettagliOrdine] = await Promise.all([p1, p2]);

  const newOrdini = ordini.map((ordine) => {
    const ord = { ...ordine };

    ord.dettagli = dettagliOrdine.filter(
      (dett) => dett.idOrdine === ord.idOrdine
    );

    return ord;
  });

  return newOrdini.filter((ordine) => ordine.dettagli.length > 0);
};

module.exports = getOrdini;
