# vidi-logger

Un middleware de logging para aplicaciones **Express.js** que registra todas las solicitudes HTTP entrantes y permite agregar logs manuales (info, debug, warning, error), almacenando todo en una base de datos **SQLite3**.

---

## 🚀 Características

- 📦 Middleware plug-and-play para Express
- 🔎 Logs manuales: `info()`, `debug()`, `warn()`, `error()`
- 🧠 Guarda logs en SQLite (`logs.db`)
- 🔍 Incluye: IP, método HTTP, URL, status, query, body, duración, timestamp
- 🖥️ Ideal para debugging, monitoreo, o auditar actividad en tu servidor

---

## 📦 Instalación

```bash
npm install vidi-logger