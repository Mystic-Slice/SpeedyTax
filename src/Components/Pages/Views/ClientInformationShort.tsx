import { ButtonBase, Card, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { ClientInformation } from '../ConsultantHomePage'

export class ClientInformationShort extends Component<{ client: ClientInformation, setClient: (client: ClientInformation) => () => void }> {
    render() {
        const { client, setClient } = this.props;
        const { name, email } = client
        return (
            <Card style={{
                width: "100%"
            }}>
                <ButtonBase onClick={setClient(client)}>
                    <TextField
                        value={name}
                        label="Client Name"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "50%"
                        }}/>
                    <TextField
                        value={email}
                        label="Email Id"
                        InputProps={{
                            readOnly: true
                        }} 
                        style={{
                            width: "50%"
                        }}/>
                </ButtonBase>
            </Card>
        )
    }
}

export default ClientInformationShort
