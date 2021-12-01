const db = require("./Connessione");

const inserisciUtente = async (mail, nome) => {
  return db.safeQuery(`INSERT INTO Utente (nome,mail) VALUES (?, ?);`, [
    nome,
    mail,
  ]);
};

module.exports = inserisciUtente;
