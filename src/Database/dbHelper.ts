import * as sqlite3 from 'sqlite3';
import { tables } from './constants';

export var db: sqlite3.Database;

export function initDbConnection() {
    console.log("Creating database connection");
    db = new sqlite3.Database('.\\src\\Database\\database.sqlite3', console.log);
    createTables();
}

export function severDbConnection() {
    console.log("Severing database connection")
    db.close();
}

export function createTables() {
    tables.forEach((table) => {
        db.run("CREATE TABLE IF NOT EXISTS " + table)
        console.log("Created Table: " + table.split(" ")[0])
    })
}