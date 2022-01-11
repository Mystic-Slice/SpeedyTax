import * as sqlite3 from 'sqlite3';
import { User } from '../types';
import { db } from './dbHelper';
import { ipcMain } from 'electron';

export function validateUser(event: Electron.IpcMainEvent,user: User) {
    if(user.type == 'client') {
        let query = `SELECT * FROM Client WHERE Email_ID='${user.userName}' AND Password='${user.password}'`
        console.log(query)

        db.all(query, [], (error :any, result :any) => {
            if(error){
                console.log(error);
                return;
            }
            let valid = !(result.length === 0)
            event.reply('validate-user-reply', valid)
        })
    }
}