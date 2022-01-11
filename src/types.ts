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