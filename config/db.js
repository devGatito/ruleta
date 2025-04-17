import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Cargar el archivo .env adecuado
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development"
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

console.log("🌐 Conectando con:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ? "[OK]" : "[EMPTY]",
  database: process.env.DB_NAME,
});

export default pool;
