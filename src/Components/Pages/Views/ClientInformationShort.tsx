import { ButtonBase, Card, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { ClientInformation } from '../ConsultantHomePage'

export class ClientInformationShort extends Component<{ client: ClientInformation, setClient: (client: ClientInformation) => () => void }> {
    render() {
        const { client, setClient } = this.props;
        const { name, email, panId, meetingDate, meetingTime } = client
        return (
            <Card>
                <ButtonBase onClick={setClient(client)}>
                    <TextField
                        value={name}
                        label="Client Name"
                        InputProps={{
                            readOnly: true
                        }} fullWidth/>
                    <TextField
                        value={email}
                        label="Email Id"
                        InputProps={{
                            readOnly: true
                        }} fullWidth/>
                    <TextField
                        value={panId}
                        label="Pan Id"
                        InputProps={{
                            readOnly: true
                        }} fullWidth/>
                    <TextField
                        value={meetingDate}
                        label="Meeting Date"
                        InputProps={{
                            readOnly: true
                        }} fullWidth/>
                    <TextField
                        value={meetingTime}
                        label="Meeting Time"
                        InputProps={{
                            readOnly: true
                        }} fullWidth/>
                </ButtonBase>
            </Card>
        )
    }
}

export default ClientInformationShort
