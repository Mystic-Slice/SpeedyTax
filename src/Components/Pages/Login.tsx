import { Button } from '@material-ui/core';
import React, { Component } from 'react'
import Signin from './Views/Signin';
import Signup from './Views/Signup';
import { User } from '../App';

export class Login extends Component<{ setUser: any }> {
    state = {
        method: 0
    }

    switchMethod = () => {
        const { method } = this.state;
        this.setState({ method: method^1 })
    }

    handleSubmit = (user: User) => {
        const { setUser } = this.props;
        setUser(user);
    }

    render() {
        const { method } = this.state;
        switch(method) {
            case 0:
                return (
                    <div>
                        <Signup handleSubmit={this.handleSubmit}/>
                        <Button onClick={this.switchMethod}>Sign-in</Button>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <Signin handleSubmit={this.handleSubmit}/>
                        <Button onClick={this.switchMethod}>Sign-up</Button>
                    </div>
                )
        }
    }
}

export default Login
