import React, { Component } from 'react';
import UserInfo from './Views/UserInfoView';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { appTheme } from '../App';
import SignOutIcon from '@mui/icons-material/Logout';

export interface UserInformation {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    panId: string,
    aadharNumber: string,
    dob: string
}

export class ClientHomePage extends Component<{ signOut: () => void }> {
    state = {
        firstName: "Ashwath",
        lastName: "V A",
        email: "vaashwath@gmail.com",
        phoneNumber: "7339099303",
        panId: "ASDFG1234A",
        aadharNumber: '111122223333',
        dob: "2002-07-21"
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
