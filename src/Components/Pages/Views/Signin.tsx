import { Button, Grid, MenuItem, Select, TextField } from '@material-ui/core'
import React, { Component, FormEvent } from 'react'
import { User } from '../../App'

export class Signin extends Component<{ handleSubmit: (user: User) => void }> {

    state = {
        userName: "",
        password: "",
        type: "client"
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    handleSigninSubmit = (event: FormEvent) => {
        event.preventDefault();
        const { handleSubmit } = this.props;
        const { userName, password, type } = this.state;
        const user: User = {
            userName: userName,
            password: password,
            type: type as "client" | "consultant"
        }
        handleSubmit(user);
    }

    render() {
        const { userName, password, type } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSigninSubmit}>
                    <TextField 
                        value={userName} 
                        label="Username" 
                        type={"email"} 
                        onChange={this.handleChange("userName")}
                        fullWidth/>
                    <TextField 
                        value={password} 
                        label="Password" 
                        type={"password"} 
                        onChange={this.handleChange("password")} 
                        inputProps={{ maxLength: 20, minLength: 12 }}
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
                            <Button 
                                type="submit"
                                variant="contained"
                                >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signin
