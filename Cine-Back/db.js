import mysql from "mysql2/promise"
import dotenv from "dotenv"

export let db

dotenv.config()

export async function conectarDB() {
    db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    })
}