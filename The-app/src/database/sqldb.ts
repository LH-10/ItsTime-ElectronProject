import database, { Database } from "better-sqlite3";
import path from "node:path"
import {app} from "electron"
import { throws } from "node:assert";

let db:Database;
function initDb(){

    const dbPath=path.join(app.getPath('userData'),'dbtest.db');
    try{
        db=new database(dbPath)   
    }
    catch(err){
        console.log(err,"DB init issue")
        throw err
    }
}

export {db,initDb}