import { Button, ButtonGroup } from '@material-ui/core';
import React, { Component } from 'react'
import Signin from './Views/Signin';
import Signup from './Views/Signup';
import { User } from '../App';
import { appTheme } from '../App';

const LoginStyle = {
    width: "20%",
    minWidth: "320px",
    height: "fit-content",
    minHeight: "230px",
    border: "4px solid black",
    borderRadius: "5px",
    padding: "20px",
    backgroundColor:"#f5f5f5",
}

const ButtonGroupStyle = {
    width: "100%"
}

const ButtonStyle = {
    backgroundColor:"appTheme.secondaryAccentColor",
    color:"white",
    width: "50%"
}

export class Login extends Component<{ setUser: any }> {
    state = {
        method: 0
    }

    switchMethod = (newMethod: number) => () => {
        this.setState({ method: newMethod })
    }

    handleSubmit = (user: User) => {
        const { setUser } = this.props;
        setUser(user);
    }

    getView = (method: number) => {
        switch(method) {
            case 0:
                return <Signin handleSubmit={this.handleSubmit}/>
            case 1:
                return <Signup handleSubmit={this.handleSubmit}/>
        }
    }

    render() {
        const { method } = this.state;
        return (
            <div style={LoginStyle}>
                <ButtonGroup style={ButtonGroupStyle}>
                    <Button 
                        variant={!method ? "outlined": "contained"}
                        disableElevation
                        onClick={this.switchMethod(0)}
                        style={{
                            width: "50%",
                            backgroundColor:!method?"white":appTheme.secondaryAccentColor,
                            color:!method?"black":"white",

                        }}>
                        Sign-in
                    </Button>
                    <Button 
                        variant={method ? "outlined": "contained"}
                        disableElevation
                        onClick={this.switchMethod(1)}
                        style={{
                            width: "50%",
                            backgroundColor:method?"white":appTheme.secondaryAccentColor,
                            color:method?"black":"white"

                        }}>
                        Sign-up
                    </Button>
                </ButtonGroup><br/><br/>
                { this.getView(method) }
            </div>
        )
    }
}

export default Login
