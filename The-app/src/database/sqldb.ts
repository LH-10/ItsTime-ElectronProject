import database, { Database } from "better-sqlite3";
import path from "node:path"
import {app} from "electron"

let db:Database;
function initDb(){

    const dbPath=path.join(app.getPath('userData'),'dbtest.db');
    db=new database(dbPath)   
}

export {db,initDb}