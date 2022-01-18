import React, { Component } from 'react';
import UserInfo from './Views/UserInfoView';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { appTheme } from '../App';
import { User, UserInformation } from '../../types'
import SignOutIcon from '@mui/icons-material/Logout';
const { ipcRenderer } = window.require("electron");

export class ClientHomePage extends Component<{ signOut: () => void, user: User }> {

    constructor(props: { signOut: () => void; user: User; } | Readonly<{ signOut: () => void; user: User; }>) {
        super(props)
        ipcRenderer.send('get-user-details', this.props.user);
        ipcRenderer.once('get-user-details-reply', (event, result) => this.setUserInfo(result))
    }

    state = {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        panId: "",
        dob: ""
    }

    setUserInfo = (userInfo: UserInformation) => {
        this.setState({
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            email: userInfo.email,
            phoneNumber: userInfo.phoneNumber,
            panId: userInfo.panId,
            dob: userInfo.dob
        })
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    } 

    render() {
        return (
            <div style={{
                maxWidth: "500px",
                
            }}>
                <div
                    style={{
                        backgroundColor:appTheme.secondaryColor
                    }}
                >
                <Button style={{
                    float: "right",
                    margin: "30px",
                    marginLeft: "0",
                    backgroundColor:appTheme.secondaryAccentColor,
                    }} 
                    variant="contained"
                    color="primary" 
                    onClick={this.props.signOut}
                    startIcon={<SignOutIcon/>} >
                    Sign out
                    </Button>              
                <UserInfo user={this.state as UserInformation} handleChange={this.handleChange} />                         

                </div>
           
                <Button style={{
                        display: "flex",
                        marginTop:"10px",
                        backgroundColor:appTheme.primaryAccentColor,
                        boxShadow:"2px 2px"
                    }} 
                    variant="contained" 
                    component={Link} 
                    to='/filing'>
                    Start Filing
                </Button>
            </div>
        ) 
    }
}

export default ClientHomePage
