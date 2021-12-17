import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import React, { Component, FormEvent } from 'react'
import { User } from '../../App'

export class Signup extends Component<{ handleSubmit: (user: User) => void }> {

    state = {
        userName: "",
        password: "",
        type: "client"
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    handleSignUpSubmit = (event: FormEvent) => {
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
                <form onSubmit={this.handleSignUpSubmit}>
                    <TextField value={userName} label="Username" type={"email"} onChange={this.handleChange("userName")}>Username:</TextField>
                    <TextField value={password} label="Password" type={"password"} onChange={this.handleChange("password")} inputProps={{ maxLength: 20, minLength: 12 }}>Password:</TextField>
                    <Select value={type} label="Type" onChange={this.handleChange}>
                        <MenuItem value={"client"}>Client</MenuItem>
                        <MenuItem value={"consultant"}>Consultant</MenuItem>
                    </Select>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default Signup
