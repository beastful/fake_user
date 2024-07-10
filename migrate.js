const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

db.serialize(() => {
    db.run("CREATE TABLE habr (id INTEGER NOT NULL PRIMARY KEY, title TEXT, price TEXT, time TEXT, url TEXT)");
});

db.close();