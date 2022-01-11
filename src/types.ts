export interface User {
    userName: string,
    password: string,
    type: "client" | "consultant"
}

export interface UserInformation {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    panId: string,
    dob: string
}

export interface TaxInformation {
    primaryIncomeAmount: string,
    primaryIncomeCompany: string,
    primaryIncomeDocument: string,
    rentAmount: string,
    rentDoorNo: string,
    rentStreetName: string,
    rentDocument: string,
    pfAmount: string,
    pfInterest: string,
    pfBankName: string,
    pfDocument: string,
    houseLoanAmount: string,
    houseLoanInterest: string,
    houseLoanBankName: string,
    houseLoanDocument: string,
    donationAmount: string,
    donationTrustName: string,
    donationDocument: string
}