import * as sqlite3 from 'sqlite3';
export function initDB() {
    console.log("creating db");
    const db = new sqlite3.Database('.\\src\\Database\\database.sqlite3', (err) => {
        if(err) console.log(err);
    });

    console.log("creating table");
    const createTable: string = "CREATE TABLE IF NOT EXISTS demo(ID INTEGER, text TEXT)"
    db.run(createTable, console.log)

    console.log("insert");
    const insertCmd: string = "INSERT INTO demo VALUES(1, \"Hi who are you?\")"
    db.run(insertCmd, console.log)

    console.log("select");
    const selectCmd: string = "SELECT * FROM demo"
    db.all(selectCmd, [], (err: Error, rows: any[]) => {
        if(err) console.log(err);
        rows.forEach((row) => {
            console.log(row.text);
        })
    })
    db.close();
}