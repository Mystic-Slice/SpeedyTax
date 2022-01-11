import React, { Component, ComponentProps } from 'react'
import { Button, TextField } from '@material-ui/core';
import { UserInformation } from '../../../types';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import {appTheme} from '../../App'

const regex = {
    firstName: /^[A-Za-z ]{1,29}$/,
    lastName: /^[A-Za-z ]{1,29}$/,
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneNumber: /^[0-9]{10}$/,
    panId: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
}

const userInfoStyle = {
    border: "5px solid black",
    borderRadius: "5px",
    padding: "20px"
}

export class UserInfoView extends Component<{ user: UserInformation, handleChange: (input: any) => any, style: React.CSSProperties } | any> {
    render() {
        const { user, handleChange } = this.props;
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
                    margin="normal"
                    onChange={handleChange("firstName")}
                    InputProps={{
                        readOnly: true
                    }}
                    fullWidth
                />

                <TextField
                    value={user.lastName}
                    placeholder="Enter your Last Name"
                    label="Last Name"
                    margin="normal"
                    onChange={handleChange("lastName")}
                    InputProps={{
                        readOnly: true
                    }}
                    fullWidth
                />

                <TextField
                    value={user.email}
                    placeholder="Enter your Email"
                    label="Email"
                    margin="normal"
                    onChange={handleChange("email")}
                    InputProps={{
                        readOnly: true
                    }}
                    fullWidth
                />

                <TextField
                    value={user.phoneNumber}
                    placeholder="Enter your Phone Number"
                    label="Phone Number"
                    margin="normal"
                    onChange={handleChange("phoneNumber")}
                    InputProps={{
                        readOnly: true
                    }}
                    fullWidth
                />

                <TextField
                    value={user.panId}
                    placeholder="Enter your Pan Id"
                    label="Pan Id"
                    margin="normal"
                    onChange={handleChange("panId")}
                    InputProps={{
                        readOnly: true
                    }}
                    fullWidth
                />

                <TextField
                    value={user.dob}
                    placeholder="Enter your Date of Birth"
                    label="Date of Birth"
                    margin="normal"
                    type={"date"}
                    onChange={handleChange("dob")}
                    InputLabelProps={{
                        shrink: true
                    }}
                    InputProps={{
                        readOnly: true
                    }}
                    inputProps={{
                        min: '1940-01-01',
                        max: '2015-01-01'
                    }}
                    fullWidth
                />

            </div>
        )
    }
}

export default UserInfoView
