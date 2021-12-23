import { Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { ClientInformation } from '../ConsultantHomePage'
import { appTheme } from '../../App'

export class ClientInformationDetail extends Component<{ client: ClientInformation, goBack: () => void }> {
    render() {
        const { client, goBack } = this.props
        return (
            <div style={{
                width: "40%",
                border: "4px solid black",
                borderRadius: "5px",
                padding: "20px",
                backgroundColor:"#f5f5f5",
            }}>
                <h1 style={{marginTop:"0px"}} >Client Name: {client.name}</h1>
                <TextField
                    value={client.email}
                    label="Client Email"
                    InputProps={{
                        readOnly: true
                    }} 
                    fullWidth
                />
                <TextField
                    value={client.panId}
                    label="Client PAN"
                    InputProps={{
                        readOnly: true
                    }} 
                    fullWidth
                />
                <TextField
                    value={client.meetingDate}
                    label="Meeting Date"
                    InputProps={{
                        readOnly: true
                    }} 
                    fullWidth
                />
                <TextField
                    value={client.meetingTime}
                    label="Meeting Time"
                    InputProps={{
                        readOnly: true
                    }} 
                    fullWidth
                />
                <Button 
                    style={{                        
                        backgroundColor: appTheme.primaryAccentColor,
                        boxShadow:"2px 2px",
                        marginTop: "20px"
                    }}
                    onClick={goBack}>
                    Go Back
                    </Button>
            </div>
        )
    }
}

export default ClientInformationDetail
