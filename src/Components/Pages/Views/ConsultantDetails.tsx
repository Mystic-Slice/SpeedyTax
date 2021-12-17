import { TextField } from '@material-ui/core'
import React, { Component } from 'react'

export class ConsultantDetails extends Component {
    state = {
        name: "Ashwath V A",
        email: "vaashwath@gmail.com",
        phoneNumber: "1234567890"
    } 
    render() {
        const { name, email, phoneNumber } = this.state;
        return (
            <div>
                <TextField
                    value={name}
                    label="Consultant Name"
                    InputProps={{ readOnly: true }}/>
                <TextField
                    value={email}
                    label="Email"
                    InputProps={{ readOnly: true }}/>
                <TextField
                    value={phoneNumber}
                    label="Phone number"
                    InputProps={{ readOnly: true }}/>
            </div>
        )
    }
}

export default ConsultantDetails

