import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import ClientInformationDetail from './Views/ClientInformationDetail';
import ClientInformationShort from './Views/ClientInformationShort';
import { appTheme } from '../App';
import SignOutIcon from '@mui/icons-material/Logout';
import { User, UserInformation } from '../../types'
const { ipcRenderer } = window.require("electron");

export class ConsultantHomePage extends Component<{ user: User, signOut: () => void }> {

    constructor(props: { user: User; signOut: () => void; } | Readonly<{ user: User; signOut: () => void; }>) {
        super(props);
        ipcRenderer.send('get-clients', this.props.user);
        ipcRenderer.once('get-clients-reply', (event, result) => this.setClientlist(result))
    }
    state = {
        currClient: null as UserInformation,
        clients: [] as UserInformation[]
    }

    setClientlist = (result: any) => {
        console.log(result)
        let clients = [] as UserInformation[]
        result.forEach((element: any) => {
            let client: UserInformation = {
                firstName: element.First_Name,
                lastName: element.Last_Name,
                email: element.Email_ID,
                phoneNumber: element.Phone_Number,
                panId: element.Pan_ID,
                dob: element.DOB
            }
            clients.push(client);
        });
        this.setState({
            clients: clients
        })
    }

    setClient = (client: UserInformation) => () => {
        this.setState({currClient: client});
    }

    render() {
        const { currClient, clients } = this.state;
        if(currClient) {
            return (
                <ClientInformationDetail client={currClient} goBack={this.setClient(null as UserInformation)}/>
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
                        <ClientInformationShort key={client.panId} client={client} setClient={this.setClient}/>
                    ))}
                </div>           
                
            </div>
        )
    }
}

export default ConsultantHomePage
