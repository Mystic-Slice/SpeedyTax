import { TaxInformation, User, UserInformation } from '../types';
import { db } from './dbHelper';

function currFAYear() {
    let date: Date = new Date();
    let year = date.getFullYear();
    let pastYear = year-1
    let yearString = pastYear.toString() + '-' + year.toString().substring(2)
    console.log(yearString)
    return yearString;
}

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

export function getUserTaxInfo(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    // Primary Income
    let query = `SELECT * FROM Income WHERE Pan_id = (SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-user-income-reply', result)
    })

    // Rent
    query = `SELECT * FROM Rent WHERE Pan_id = (SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-user-rent-reply', result)
    })

    // Pf
    query = `SELECT * FROM PF WHERE Pan_id = (SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-user-pf-reply', result)
    })

    // House Loan
    query = `SELECT * FROM House_Loan WHERE Pan_id = (SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-user-house-reply', result)
    })

    // Donation
    query = `SELECT * FROM Donation WHERE Pan_id = (SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-user-donation-reply', result)
    })
}

export function saveTaxInfo(event: Electron.IpcMainEvent, taxInfo: TaxInformation, user: User) {
    let yearString = currFAYear()

    // Income
    let query = `INSERT OR REPLACE INTO Income VALUES (
                (SELECT Pan_ID FROM Client WHERE Email_ID='${user.userName}'), 
                '${yearString}',
                ${taxInfo.primaryIncomeAmount},
                '${taxInfo.primaryIncomeDocument}',
                '${taxInfo.primaryIncomeCompany}'
                );`
    console.log(query);
    db.run(query, [], (error) => {
        if(error){
            console.log(error)
        }else{
            console.log("Inserted new Income record")
        }
    })

    if(taxInfo.rentAmount != "") {        
        // Rent
        query = `INSERT OR REPLACE INTO Rent VALUES (
            (SELECT Pan_ID FROM Client WHERE Email_ID='${user.userName}'), 
            '${yearString}',
            ${taxInfo.rentDoorNo},
            '${taxInfo.rentStreetName}',
            ${taxInfo.rentAmount},
            '${taxInfo.rentDocument}'
            );`
        console.log(query);
        db.run(query, [], (error) => {
            if(error){
                console.log(error)
            }else{
                console.log("Inserted new Rent record")
            }
        })
    }

    if(taxInfo.pfAmount != "") {
        // Pf
        query = `INSERT OR REPLACE INTO PF VALUES (
                (SELECT Pan_ID FROM Client WHERE Email_ID='${user.userName}'), 
                '${yearString}',
                '${taxInfo.pfBankName}',
                ${taxInfo.pfAmount},
                '${taxInfo.pfDocument}',
                ${taxInfo.pfInterest}
                );`
        console.log(query);
        db.run(query, [], (error) => {
            if(error){
                console.log(error)
            }else{
                console.log("Inserted new PF record")
            }
        })
    }

    if(taxInfo.houseLoanAmount != "") {
        // House Loan
        query = `INSERT OR REPLACE INTO House_Loan VALUES (
                (SELECT Pan_ID FROM Client WHERE Email_ID='${user.userName}'), 
                '${yearString}',
                '${taxInfo.houseLoanBankName}',
                ${taxInfo.houseLoanAmount},
                '${taxInfo.houseLoanDocument}',
                ${taxInfo.houseLoanInterest}
                );`
        console.log(query);
        db.run(query, [], (error) => {
            if(error){
                console.log(error)
            }else{
                console.log("Inserted new House Loan record")
            }
        })
    }

    if(taxInfo.donationAmount != "") {
        // Donation
        query = `INSERT OR REPLACE INTO Donation VALUES (
                (SELECT Pan_ID FROM Client WHERE Email_ID='${user.userName}'), 
                '${yearString}',
                ${taxInfo.donationAmount},
                '${taxInfo.donationDocument}',
                '${taxInfo.donationTrustName}'
                );`
        console.log(query);
        db.run(query, [], (error) => {
            if(error){
                console.log(error)
            }else{
                console.log("Inserted new Donation record")
            }
        })
    }
}

export function createConsultation(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    let checkExistsQuery = `SELECT * FROM Consultation WHERE Pan_id=(SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`

    let insertQuery = `INSERT OR REPLACE INTO Consultation VALUES (
                (SELECT Pan_ID from Client where Email_ID = '${user.userName}'),
                '${yearString}',
                (SELECT T.Employee_ID FROM Tax_Consultant AS T
                WHERE (SELECT count(*) FROM Consultation AS C WHERE C.Employee_ID=T.Employee_ID AND FA_Year='${yearString}') <= 
                (SELECT min((SELECT count(*) FROM Consultation AS C2 WHERE C2.Employee_ID=T2.Employee_ID AND FA_Year='${yearString}')) FROM Tax_Consultant AS T2)
                LIMIT 1),
                'CONSULTANT_APPROVAL_PENDING')`

    console.log(checkExistsQuery);

    db.all(checkExistsQuery, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }

        if(result.length == 0) {
            db.run(insertQuery, [], (error) => {
                if(error){
                    console.log(error)
                }else{
                    console.log("Created new consultation record")
                }
                event.reply('created-consultation')
            })
        }else {
            console.log("Consultation record already exists")
        }
        console.log(result)
    })
}

export function getClients(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    let query = `SELECT * FROM Client 
            WHERE Pan_id IN
            (SELECT Pan_id FROM Consultation WHERE Employee_ID=(SELECT Employee_ID from Tax_Consultant where Email_ID = '${user.userName}') AND FA_Year='${yearString}')`

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }

        if(result.length == 0) {
            result = 0
        }
        console.log(result)
        event.reply('get-clients-reply', result)
    })
}

export function getClientInfo(event: Electron.IpcMainEvent, userInfo: UserInformation) {
    let yearString = currFAYear()

    // Primary Income
    let query = `SELECT * FROM Income WHERE Pan_id = '${userInfo.panId}' AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-income-reply', result)
    })

    // Rent
    query = `SELECT * FROM Rent WHERE Pan_id = '${userInfo.panId}' AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-rent-reply', result)
    })

    // Pf
    query = `SELECT * FROM PF WHERE Pan_id = '${userInfo.panId}' AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-pf-reply', result)
    })

    // House Loan
    query = `SELECT * FROM House_Loan WHERE Pan_id = '${userInfo.panId}' AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-house-reply', result)
    })

    // Donation
    query = `SELECT * FROM Donation WHERE Pan_id = '${userInfo.panId}' AND FA_Year='${yearString}'`
    console.log(query)
    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-donation-reply', result)
    })
}

export function approveClient(event: Electron.IpcMainEvent, userInfo: UserInformation) {
    let yearString = currFAYear()

    let checkQuery = `SELECT * FROM Consultation WHERE Pan_ID='${userInfo.panId}' AND FA_Year='${yearString}' AND Refund_Status='CONSULTANT_APPROVAL_PENDING'`
    let updateQuery = `UPDATE Consultation
                    SET Refund_Status='PAYMENT_PENDING'
                    WHERE Pan_id='${userInfo.panId}' AND FA_Year='${yearString}';`
    console.log(checkQuery)

    db.all(checkQuery, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }

        if(result.length != 0) {
            db.run(updateQuery, [], (error) => {
                if(error){
                    console.log(error)
                }else{
                    console.log("Consultation record update")
                }
            })
        }else {
            console.log("Consultation record not updated")
        }
        console.log(result)
    })
}

export function getClientStatus(event: Electron.IpcMainEvent, userInfo: UserInformation) {
    let yearString = currFAYear()

    let query = `SELECT * FROM Consultation WHERE Pan_ID='${userInfo.panId}' AND FA_Year='${yearString}'`;
    console.log(query)

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-client-status-reply', result)
    })
}

export function getConsultantDetails(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    let query = `SELECT * FROM Tax_Consultant WHERE Employee_ID IN
                    (SELECT Employee_ID FROM Consultation WHERE 
                        Pan_ID=(SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}')`;
    console.log(query)

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-consultant-details-reply', result)
    })
}

export function getConsultationStatus(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    let query = `SELECT * FROM Consultation WHERE 
                    Pan_ID=(SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}'`;
    console.log(query)

    db.all(query, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }
        if(result.length > 0) {
            result = result[0]
        }else{
            result = 0
        }
        console.log(result)
        event.reply('get-consultation-status-reply', result)
    })
}

export function payTax(event: Electron.IpcMainEvent, user: User) {
    let yearString = currFAYear()

    let checkQuery = `SELECT count(*) FROM Consultation WHERE 
                        Pan_ID=(SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}' AND Refund_Status='PAYMENT_PENDING'`
    let updateQuery = `UPDATE Consultation
                    SET Refund_Status='SUCCESSFUL'
                    WHERE Pan_id=(SELECT Pan_ID from Client where Email_ID = '${user.userName}') AND FA_Year='${yearString}';`
    console.log(checkQuery)

    db.all(checkQuery, [], (error :any, result :any) => {
        if(error){
            console.log(error);
            return;
        }

        if(result.length != 0) {
            console.log(updateQuery)
            db.run(updateQuery, [], (error) => {
                if(error){
                    console.log(error)
                }else{
                    console.log("Consultation record update")
                }
                event.reply('pay-tax-reply')
            })
        }else {
            console.log("Consultation record not updated")
        }
        console.log(result)
    })
}
