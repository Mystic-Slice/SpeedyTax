import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { ClientInformation } from '../ConsultantHomePage'

export class ClientInformationDetail extends Component<{ client: ClientInformation, goBack: () => void }> {
    render() {
        const { client, goBack } = this.props
        return (
            <div>
                <h1>Detailed Client view</h1>
                <h1>{JSON.stringify(client)}</h1>
                <Button onClick={goBack}>Go Back</Button>
            </div>
        )
    }
}

export default ClientInformationDetail
