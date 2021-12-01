const db = require("./Connessione");

const getUtente = async (email) => {
  const user = await db.safeQuery("SELECT * FROM Utente WHERE mail = ? ", [
    email,
  ]);

  return user[0];
};

module.exports = getUtente;
