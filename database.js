const database = require("better-sqlite3");
const db = new database("./database.db");

db.exec(`CREATE TABLE IF NOT EXISTS dados (
ID INTEGER PRIMARY KEY AUTOINCREMENT,
DATE TEXT,
ANOTATION TEXT
)
`);

module.exports = db;