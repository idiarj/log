import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./logs.db');

export function initDB() {
  db.run(`
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      ip TEXT,
      method TEXT,
      url TEXT,
      status INTEGER,
      query TEXT,
      body TEXT,
      duration INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export default db;
