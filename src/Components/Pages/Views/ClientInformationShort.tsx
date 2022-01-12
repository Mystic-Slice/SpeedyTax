import { ButtonBase, Card, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { UserInformation } from '../../../types'
const { ipcRenderer } = window.require("electron");

export class ClientInformationShort extends Component<{ client: UserInformation, setClient: (client: UserInformation) => () => void }> {

    constructor(props: { client: UserInformation; setClient: (client: UserInformation) => () => void; } | Readonly<{ client: UserInformation; setClient: (client: UserInformation) => () => void; }>) {
        super(props);
        ipcRenderer.send('get-client-status', this.props.client)
        ipcRenderer.on('get-client-status-reply', (event, result) => this.setStatus(result))
    }

    state = {
        status: ""
    }

    setStatus = (result: any) => {
        console.log(result)

        if(result.Pan_ID != this.props.client.panId) {
            return
        }

        let status = result.Refund_Status
        if(status == 'CONSULTANT_APPROVAL_PENDING') {
            status = 'Approval pending'
        } else {
            status = 'Payment pending'
        }

        this.setState({
            status: status
        })
    }

    render() {
        const { client, setClient } = this.props;
        const { firstName, lastName, email, phoneNumber } = client
        return (
            <Card style={{
                width: "100%"
            }}>
                <ButtonBase onClick={setClient(client)}>
                    <TextField
                        value={firstName}
                        label="First Name"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "20%"
                        }}/>
                    <TextField
                        value={lastName}
                        label="Last Name"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "20%"
                        }}/>
                    <TextField
                        value={email}
                        label="Email"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "20%"
                        }}/>
                    <TextField
                        value={phoneNumber}
                        label="Phone Number"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "20%"
                        }}/>
                    <TextField
                        value={this.state.status}
                        label="Status"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "20%"
                        }}/>
                </ButtonBase>
            </Card>
        )
    }
}

export default ClientInformationShort
