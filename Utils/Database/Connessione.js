const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "CiaoCia0",
  database: "ProdottiSoldo",
});
db.connect((err) => {
  // you should probably add reject instead of throwing error
  // reject(new Error());
  if (err) {
    throw err;
  }
  console.log("Mysql: Connected");
});
db.safeQuery = (sql, vals) => {
  return new Promise((resolve, reject) => {
    db.query(sql, vals, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

db.promise = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(new Error());
      } else {
        resolve(result);
      }
    });
  });
};

db.getLastInsertedId = async () => {
  const ris = await db.promise("SELECT LAST_INSERT_ID() as ID;");

  return ris[0].ID;
};

module.exports = db;
