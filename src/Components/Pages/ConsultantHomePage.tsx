import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import ClientInformationDetail from './Views/ClientInformationDetail';
import ClientInformationShort from './Views/ClientInformationShort';
import { appTheme } from '../App';
import SignOutIcon from '@mui/icons-material/Logout';

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
        panId: "ASHW12234A",
        meetingDate: "01/12/2021",
        meetingTime: "1 pm"
    },
    {
        name: "Kishore",
        email: "vkishore@gmail.com",
        panId: "KISH54332K",
        meetingDate: "02/12/2021",
        meetingTime: "2 pm"
    },
    {
        name: "Anish",
        email: "anish@gmail.com",
        panId: "ANIS78199H",
        meetingDate: "14/12/2021",
        meetingTime: "3 pm"
    },
    {
        name: "Yashasvi",
        email: "yashasvi@gmail.com",
        panId: "YASH93782E",
        meetingDate: "12/12/2021",
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
            <div style={{
                border:'5px solid black',
                padding:'10px',
                margin:'20px',
                borderRadius:'5px',
                backgroundColor:appTheme.secondaryColor
            }}>
                <h1 style={{margin:"0px", marginBottom: "20px"}} >Clients</h1>
                <Button style={{
                    float: "right",
                    margin: "30px",
                    marginTop: "-60px",
                    marginRight: "0px",
                    backgroundColor:appTheme.secondaryAccentColor,
                    }} 
                    variant="contained"
                    color="primary" 
                    onClick={signOut}
                    startIcon={<SignOutIcon/>} >
                    Sign out
                    </Button>   
                <div>
                    {clients.map(client => (
                        <ClientInformationShort client={client} setClient={this.setClient}/>
                    ))}
                </div>           
                
            </div>
        )
    }
}

export default ConsultantHomePage
