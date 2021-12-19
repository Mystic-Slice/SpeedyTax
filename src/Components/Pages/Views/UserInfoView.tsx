import React, { Component, ComponentProps } from 'react'
import { Button, TextField } from '@material-ui/core';
import { UserInformation } from '../ClientHomePage';

const regex = {
    firstName: /^[A-Za-z ]{1,29}$/,
    lastName: /^[A-Za-z ]{1,29}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber: /^[0-9]{10}$/,
    panId: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    aadharNumber: /^[0-9]{12}$/
}

const userInfoStyle = {
    border: "5px solid black",
    borderRadius: "5px",
    padding: "20px"
}

export class UserInfoView extends Component<{ user: UserInformation, handleChange: (input: any) => any, style: React.CSSProperties } | any> {
    state = {
        isEditMode: false,
        errorFirstName: false,
        errorLastName: false,
        errorEmail: false,
        errorPhoneNumber: false,
        errorPanId: false,
        errorAadharNumber: false,
        errorDob: false
    }

    switchEditMode = () => {
        const { isEditMode } = this.state
        if(isEditMode) {
            const { firstName, lastName, email, phoneNumber, panId, aadharNumber, dob } = this.props.user
            if(!this.validate(firstName, lastName, email, phoneNumber, panId, aadharNumber, dob)) return false
        }
        console.log(isEditMode ? "Save": "")
        this.setState({isEditMode: isEditMode ? false : true});
    }

    validate = (
        firstName: string, 
        lastName: string,
        email: string, 
        phoneNumber: string, 
        panId: string, 
        aadharNumber: string,
        dob: string ) => {
            let error = false

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

            let errorEmail = false            
            if(!email.match(regex.email)) {
                errorEmail = true
                error = true
            }

            let errorPhoneNumber = false
            if(!phoneNumber.match(regex.phoneNumber)) {
                errorPhoneNumber = true
                error = true
            }

            let errorPanId = false
            if(!panId.match(regex.panId)) {
                errorPanId = true
                error = true
            }

            let errorAadharNumber = false
            if(!aadharNumber.match(regex.aadharNumber)) {
                errorAadharNumber = true
                error = true
            }

            let errorDob = false
            if(dob == "") {
                errorDob = true
                error = true
            }

            this.setState({
                errorFirstName: errorFirstName,
                errorLastName: errorLastName,
                errorEmail: errorEmail,
                errorPhoneNumber: errorPhoneNumber,
                errorPanId: errorPanId,
                errorAadharNumber: errorAadharNumber,
                errorDob: errorDob
            })
            return !error
        }

    render() {
        const { user, handleChange } = this.props;
        const { errorFirstName, errorLastName, errorEmail, errorPhoneNumber, errorPanId, errorAadharNumber, errorDob } = this.state
        return (
            <div style={userInfoStyle}>
                <h1 style={{
                    fontSize: "40px",
                    margin: "-4px"
                }}>
                    General Details
                    </h1>


                <TextField
                    value={user.firstName}
                    placeholder="Enter your First Name"
                    label="First Name"
                    error={errorFirstName}
                    helperText={errorFirstName ? "Invalid First Name": ""}
                    margin="normal"
                    onChange={handleChange("firstName")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.lastName}
                    placeholder="Enter your Last Name"
                    label="Last Name"                    
                    error={errorLastName}
                    helperText={errorLastName ? "Invalid Last Name": ""}
                    margin="normal"
                    onChange={handleChange("lastName")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.email}
                    placeholder="Enter your Email"
                    label="Email"
                    error={errorEmail}
                    helperText={errorEmail ? "Invalid Email": ""}
                    margin="normal"
                    onChange={handleChange("email")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.phoneNumber}
                    placeholder="Enter your Phone Number"
                    label="Phone Number"
                    error={errorPhoneNumber}
                    helperText={errorPhoneNumber ? "Invalid Phone Number": ""}
                    margin="normal"
                    onChange={handleChange("phoneNumber")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.panId}
                    placeholder="Enter your Pan Id"
                    label="Pan Id"
                    error={errorPanId}
                    helperText={errorPanId ? "Invalid Pan Id": ""}
                    margin="normal"
                    onChange={handleChange("panId")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.aadharNumber}
                    placeholder="Enter your Aadhar Number"
                    label="Aadhar Number"
                    error={errorAadharNumber}
                    helperText={errorAadharNumber ? "Invalid Aadhar Number": ""}
                    margin="normal"
                    onChange={handleChange("aadharNumber")}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    fullWidth
                />

                <TextField
                    value={user.dob}
                    placeholder="Enter your Date of Birth"
                    label="Date of Birth"
                    error={errorDob}
                    helperText={errorDob ? "Invalid Date": ""}
                    margin="normal"
                    type={"date"}
                    onChange={handleChange("dob")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: !this.state.isEditMode
                    }}
                    inputProps={{
                        min: '1940-01-01',
                        max: '2015-01-01'
                    }}
                    style={{
                        width: "50%"
                    }}
                />

                <div style={{
                        display: "inline",
                        float: "right",
                        marginTop: "30px"
                    }}>
                        <Button color="primary" variant="contained" 
                            onClick={this.switchEditMode} >
                            {this.state.isEditMode?"Save": "Edit"}
                        </Button>
                    </div>

            </div>
        )
    }
}

export default UserInfoView
