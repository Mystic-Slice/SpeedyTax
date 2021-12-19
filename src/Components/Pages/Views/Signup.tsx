import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React, { Component, FormEvent } from 'react'
import { User } from '../../App'

const regex = {
    userName: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&-])[A-Za-z\d@#$!%*?&-]{8,20}$/,
    panId: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    firstName: /^[A-Za-z ]{1,29}$/,
    lastName: /^[A-Za-z ]{1,29}$/,
    phoneNumber: /^[0-9]{10}$/,
    aadharNumber: /^[0-9]{12}$/
}

export class Signup extends Component<{ handleSubmit: (user: User) => void }> {

    state = {
        userName: "",
        password: "",
        panId: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        aadharNumber: "",
        errorUserName: false,
        errorPassword: false,
        errorPanId: false,
        errorFirstName: false,
        errorLastName: false,
        errorPhoneNumber: false,
        errorDob: false,
        errorAadharNumber: false
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    validate = (
        userName:string, 
        password: string, 
        panId: string, 
        firstName: string, 
        lastName: string, 
        phoneNumber: string, 
        dob: string, 
        aadharNumber: string) => {
            let error = false

            let errorUserName = false            
            if(!userName.match(regex.userName)) {
                errorUserName = true
                error = true
            }

            let errorPassword = false
            if(!password.match(regex.password)) {
                errorPassword = true
                error = true
            }

            let errorPanId = false
            if(!panId.match(regex.panId)) {
                errorPanId = true
                error = true
            }

            let errorFirstName = false
            if(!firstName.match(regex.firstName)) {
                errorFirstName = true
                error = true
            }

            let errorLastName = false
            if(!lastName.match(regex.lastName)) {
                errorLastName = true
                error = true
            }

            let errorPhoneNumber = false
            if(!phoneNumber.match(regex.phoneNumber)) {
                errorPhoneNumber = true
                error = true
            }

            let errorDob = false
            if(dob == "") {
                errorDob = true
                error = true
            }

            let errorAadharNumber = false
            if(!aadharNumber.match(regex.aadharNumber)) {
                errorAadharNumber = true
                error = true
            }

            this.setState({
                errorUserName: errorUserName,
                errorPassword: errorPassword,
                errorPanId: errorPanId,
                errorFirstName: errorFirstName,
                errorLastName: errorLastName,
                errorPhoneNumber: errorPhoneNumber,
                errorDob: errorDob,
                errorAadharNumber: errorAadharNumber
            })
            return !error
        }

    // TODO: Include the new user in the database
    handleSignUpSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { handleSubmit } = this.props;
        const { userName, password, panId, firstName, lastName, phoneNumber, dob, aadharNumber } = this.state;
        if(!this.validate(userName, password, panId, firstName, lastName, phoneNumber, dob, aadharNumber)) return false
        const user: User = {
            userName: userName,
            password: password,
            type: "client" as "client" | "consultant"
        }
        handleSubmit(user);
    }

    render() {
        const { userName, password, panId, firstName, lastName, phoneNumber, dob, aadharNumber } = this.state;
        const { errorUserName, errorPassword, errorPanId, errorFirstName, errorLastName, errorPhoneNumber, errorDob, errorAadharNumber } = this.state
        return (
            <div>
                <form onSubmit={this.handleSignUpSubmit}>
                    <TextField 
                        value={userName} 
                        label="Username (E-mail)"
                        error={errorUserName}
                        helperText={errorUserName ? "Invalid Email Id": ""}
                        onChange={this.handleChange("userName")} 
                        fullWidth>
                        Username:
                        
                    </TextField>

                    <TextField
                        value={password} 
                        label="Password" 
                        error={errorPassword}
                        helperText={errorPassword ? "Password should be 8 to 20 characters long with atleast one uppercase, one lowercase alphabets, one number and one special characters": ""}
                        onChange={this.handleChange("password")} 
                        fullWidth>
                        Password:
                    </TextField>

                    <TextField 
                        value={panId} 
                        label="Pan Id"
                        error={errorPanId}
                        helperText={errorPanId ? "Invalid Pan Id": ""}
                        onChange={this.handleChange("panId")}
                        fullWidth>
                        Pan id:
                    </TextField>

                    <TextField 
                        value={firstName} 
                        label="First Name"
                        error={errorFirstName}
                        helperText={errorFirstName ? "Invalid First name": ""}
                        onChange={this.handleChange("firstName")} 
                        fullWidth>
                        First Name:
                    </TextField>

                    <TextField 
                        value={lastName} 
                        label="Last Name"
                        error={errorLastName}
                        helperText={errorLastName ? "Invalid Last name": ""}
                        onChange={this.handleChange("lastName")} 
                        fullWidth>
                        Last Name:
                    </TextField>

                    <TextField 
                        value={phoneNumber} 
                        label="Phone Number"
                        error={errorPhoneNumber}
                        helperText={errorPhoneNumber ? "Invalid Phone number": ""}
                        onChange={this.handleChange("phoneNumber")}
                        fullWidth/>

                    <TextField 
                        value={dob}
                        label="Date of Birth"
                        error={errorDob}
                        helperText={errorDob ? "Invalid Date": ""}
                        type={"date"}
                        onChange={this.handleChange("dob")}
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            min: '1940-01-01',
                            max: '2015-01-01',
                        }}
                        fullWidth/>

                    <TextField 
                        value={aadharNumber} 
                        label="Aadhar Number"
                        error={errorAadharNumber}
                        helperText={errorAadharNumber ? "Invalid Aadhar number": ""}
                        onChange={this.handleChange("aadharNumber")}
                        fullWidth/>

                        <div style={{
                            width:"100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px"
                        }}>
                            <Button 
                                type="submit"
                                variant="contained">
                                Sign up
                            </Button>
                        </div>
                </form>
            </div>
        )
    }
}

export default Signup
