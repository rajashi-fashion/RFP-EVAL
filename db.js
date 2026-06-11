const sqlSever = require('better-sqlite3');
const db = new sqlSever('./database.db');

module.exports = db;