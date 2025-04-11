import db, { initDB } from './database.js';
import { LEVELS } from './levels.js';

export class Logger {
  constructor() {
    initDB();
  }

  _log({ level, message, req = null, status = null, duration = null }) {
    const logData = {
      level,
      message,
      ip: req?.ip || null,
      method: req?.method || null,
      url: req?.originalUrl || null,
      status: status ?? null,
      query: req ? JSON.stringify(req.query) : null,
      body: req?.body ? JSON.stringify(req.body) : null,
      duration
    };

    const sql = `
      INSERT INTO logs (level, message, ip, method, url, status, query, body, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        logData.level,
        logData.message,
        logData.ip,
        logData.method,
        logData.url,
        logData.status,
        logData.query,
        logData.body,
        logData.duration
      ],
      (err) => {
        if (err) {
          console.error(`[LOGGER ERROR] ${err.message}`);
        } else {
          console.log(`[${level.toUpperCase()}] ${message}`);
        }
      }
    );
  }

  // Middleware para Express
  main() {
    return (req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        const msg = `[${req.method}] ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        this._log({
          level: LEVELS.INFO,
          message: msg,
          req,
          status: res.statusCode,
          duration
        });
      });

      next();
    };
  }

  info(message) {
    this._log({ level: LEVELS.INFO, message });
  }

  debug(message) {
    this._log({ level: LEVELS.DEBUG, message });
  }

  warn(message) {
    this._log({ level: LEVELS.WARN, message });
  }

  error(message) {
    this._log({ level: LEVELS.ERROR, message });
  }
}
