import { TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { User } from '../../../types'
const { ipcRenderer } = window.require("electron");

export class ConsultantDetails extends Component<{user: User}> {

    constructor(props: { user: User; } | Readonly<{ user: User; }>) {
        super(props);
        ipcRenderer.send('get-consultant-details', this.props.user);
        ipcRenderer.once('get-consultant-details-reply', (event, result) => this.setConsultant(result))
        ipcRenderer.once('created-consultation', (event) => this.getConsultantDetails())
    }

    state = {
        name: "",
        email: "",
        phoneNumber: ""
    }

    getConsultantDetails = () => {
        ipcRenderer.send('get-consultant-details', this.props.user);
        ipcRenderer.once('get-consultant-details-reply', (event, result) => this.setConsultant(result))
    }

    setConsultant = (result: any) => {
        this.setState({
            name: result.First_Name + " " + result.Last_Name,
            email: result.Email_ID,
            phoneNumber: result.Phone_Number
        })
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

