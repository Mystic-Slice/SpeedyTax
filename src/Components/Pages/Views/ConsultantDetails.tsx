import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { appTheme } from '../../App';

export class ConsultantDetails extends Component {
    state = {
        name: "Ashwath V A",
        email: "vaashwath@gmail.com",
        phoneNumber: "1234567890"
    } 
    render() {
        const { name, email, phoneNumber } = this.state;
        return (
            <div style={{
                width:"100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin:"10px",
            }}>
                <div style={{
                flex:"70%",
                
                }}>
                    <TextField
                        value={name}
                        label="Consultant Name"
                        InputProps={{ readOnly: true }} fullWidth/>
                    <TextField
                        value={email}
                        label="Email"
                        InputProps={{ readOnly: true }} fullWidth/>
                    <TextField
                        value={phoneNumber}
                        label="Phone number"
                        InputProps={{ readOnly: true }}/>
                </div>

                <div style={{
                flex:"30%"               
                }}>                 
                </div>
                
            </div>
        )
    }
}

export default ConsultantDetails

