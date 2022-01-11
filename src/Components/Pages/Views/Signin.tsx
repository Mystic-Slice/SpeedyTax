import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core'
import React, { Component, FormEvent } from 'react'
import { User } from '../../../types'
import { appTheme } from '../../App'
const { ipcRenderer } = window.require("electron");

const regex = {
    userName: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&-])[A-Za-z\d@#$!%*?&-]{8,20}$/
}

export class Signin extends Component<{ handleSubmit: (user: User) => void }> {

    constructor(props: { handleSubmit: (user: User) => void; } | Readonly<{ handleSubmit: (user: User) => void; }>) {
        super(props);
    }

    state = {
        userName: "vaashwath@gmail.com",
        password: "Aa#1asdf",
        type: "client",
        errorUserName: false,
        errorPassword: false
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    validate(userName: string, password: string) {
        let error = false

        let errorUserName = false
        if(!userName.match(regex.userName)){
            errorUserName = true
            error = true
        }

        let errorPassword = false
        if(!password.match(regex.password)){
            errorPassword = true
            error = true
        }

        this.setState({
            errorUserName: errorUserName, 
            errorPassword: errorPassword
        })
        return !error
    }

    handleSigninSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { userName, password, type } = this.state;
        if(!this.validate(userName, password)) return
        const user: User = {
            userName: userName,
            password: password,
            type: type as "client" | "consultant"
        }
        this.signIn(user);
    }

    signIn = (user: User) => {
        const { handleSubmit } = this.props;
        ipcRenderer.send('validate-user', user);
        
        ipcRenderer.once('validate-user-reply', (event, result) => {
            if(result) {
                handleSubmit(user);
            }else{
                alert('Username and Password do not match')
            }
        })
    }

    render() {
        const { userName, password, type } = this.state;
        const { errorUserName, errorPassword } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSigninSubmit}>
                    <TextField 
                        value={userName} 
                        label="Username"
                        error={errorUserName}
                        helperText={errorUserName ? "Invalid Email Id": ""}
                        onChange={this.handleChange("userName")}
                        fullWidth/>
                    <TextField 
                        value={password} 
                        label="Password"
                        error={errorPassword}
                        helperText={errorPassword ? "Invalid password": ""}
                        onChange={this.handleChange("password")}
                        fullWidth/>
                    <div style={{
                        width: "100%",
                        marginTop: "10px"
                    }}>
                        <div style={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Select 
                                style={{
                                    width: "100%"
                                }}
                                value={type} 
                                label="Type" 
                                onChange={this.handleChange("type")}>
                                <MenuItem value={"client"}>Client</MenuItem>
                                <MenuItem value={"consultant"}>Consultant</MenuItem>
                            </Select>
                        </div>
                        <div style={{
                            width:"100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px"
                        }}>
                            <Button style={{
                                backgroundColor:appTheme.primaryAccentColor,
                                
                                
                            }}
                                type="submit"
                                variant="contained"
                                >
                                Sign in
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signin
