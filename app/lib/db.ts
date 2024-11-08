import sqlite3 from "sqlite3";
import {open, Database} from "sqlite"

let db: Database | null = null;

const openDb = async (): Promise<Database> => {

    if(!db){
        db = await open({
            filename: "./ExpCategories.sqlite",
            driver: sqlite3.Database,
        })

        await db.exec(` CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
            )`)
    }
    return db


}
export default openDb