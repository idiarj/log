import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Soporte para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la carpeta de logs
const logsDir = path.join(__dirname, '../logs');
const dbPath = path.join(logsDir, 'logs.db');

// Crear carpeta "logs" si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
  console.log('[LOGGER] Carpeta "logs/" creada');
}

const db = new sqlite3.Database(dbPath);

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
