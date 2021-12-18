import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import ClientInformationDetail from './Views/ClientInformationDetail';
import ClientInformationShort from './Views/ClientInformationShort';

export interface ClientInformation {
    name: string,
    email: string,
    panId: string,
    meetingDate: string,
    meetingTime: string
}

const clients: ClientInformation[] = [
    {
        name: "Ashwath",
        email: "vaashwath@gmail.com",
        panId: "ASCD12344C",
        meetingDate: "12/12/12",
        meetingTime: "4 pm"
    },
    {
        name: "Kishore",
        email: "vkishore@gmail.com",
        panId: "ASCD12344C",
        meetingDate: "12/12/12",
        meetingTime: "4 pm"
    }
]

export class ConsultantHomePage extends Component<{ signOut: () => void }> {
    state = {
        client: null as ClientInformation
    }

    setClient = (client: ClientInformation) => () => {
        this.setState({client: client});
    }

    render() {
        const { client } = this.state;
        if(client) {
            return (
                <ClientInformationDetail client={client} goBack={this.setClient(null as ClientInformation)}/>
            )
        }

        const { signOut } = this.props;
        return (
            <div>
                <h1>Consultant Home Page</h1>
                {clients.map(client => (
                    <ClientInformationShort client={client} setClient={this.setClient}/>
                ))}
                <Button onClick={signOut}>Sign out</Button> 
            </div>
        )
    }
}

export default ConsultantHomePage
