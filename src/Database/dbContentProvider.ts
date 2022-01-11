import * as sqlite3 from 'sqlite3';
import { User, UserInformation } from '../types';
import { db } from './dbHelper';
import { ipcMain } from 'electron';

export function validateUser(event: Electron.IpcMainEvent,user: User) {
    let tableName;
    if(user.type == 'client') {
        tableName = 'Client'
    }else{
        tableName = 'Tax_Consultant'
    }

    let query = `SELECT * FROM ${tableName} WHERE Email_ID='${user.userName}' AND Password='${user.password}'`
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

export function checkEmailExists(event: Electron.IpcMainEvent, user: User) {
    let query = `SELECT * FROM Client WHERE Email_ID='${user.userName}'`
    console.log(query)

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        let exists = !(result.length === 0)
        event.reply('check-email-exists-reply', exists)
    })
}

export function createUser(event: Electron.IpcMainEvent, userInfo: UserInformation, password: string) {
    let query = `INSERT INTO Client VALUES(
                    '${userInfo.panId}',
                    '${userInfo.firstName}',
                    '${userInfo.lastName}',
                    '${userInfo.email}',
                    '${password}',
                    '${userInfo.phoneNumber}',
                    '${userInfo.dob}'
                    )`
    console.log(query)
    db.run(query, [], (error) => {
        if(error){
            console.log(error)
        }else{
            console.log("Inserted new record")
        }
    })
}

export function getUserDetails(event: Electron.IpcMainEvent, user: User) {
    let query = `SELECT * FROM Client WHERE Email_ID='${user.userName}' AND Password='${user.password}'`
    console.log(query)

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        result = result[0]
        let userInfo: UserInformation = {
            panId: result.Pan_ID,
            firstName: result.First_Name,
            lastName: result.Last_Name,
            email: result.Email_ID,
            phoneNumber: result.Phone_Number,
            dob: result.DOB
        }
        event.reply('get-user-details-reply', userInfo)
    })
}