import { Button, Icon, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import { TaxInformation, UserInformation } from '../../../types'
import { appTheme } from '../../App'
const { ipcRenderer } = window.require("electron");

const fontColor = {
    style: { color: 'rgb(0,0,0)' }
}

export class ClientInformationDetail extends Component<{ client: UserInformation, goBack: () => void }> {

    constructor(props: { client: UserInformation; goBack: () => void } | Readonly<{ client: UserInformation; goBack: () => void }>) {
        super(props)
        ipcRenderer.send('get-client-info', this.props.client)
        ipcRenderer.once('get-client-income-reply', (event, result) => this.setIncome(result))
        ipcRenderer.once('get-client-rent-reply', (event, result) => this.setRent(result))
        ipcRenderer.once('get-client-pf-reply', (event, result) => this.setPf(result))
        ipcRenderer.once('get-client-house-reply', (event, result) => this.setHouseLoan(result))
        ipcRenderer.once('get-client-donation-reply', (event, result) => this.setDonation(result))
        ipcRenderer.send('get-client-status', this.props.client)
        ipcRenderer.once('get-client-status-reply', (event, result) => this.setStatus(result))
    }

    state = {
        approveEnable: true,
        primaryIncomeAmount: "",
        primaryIncomeCompany: "",
        primaryIncomeDocument: "",
        rentAmount: "",
        rentDoorNo: "",
        rentStreetName: "",
        rentDocument: "",
        pfAmount: "",
        pfInterest: "",
        pfBankName: "",
        pfDocument: "",
        houseLoanAmount: "",
        houseLoanInterest: "",
        houseLoanBankName: "",
        houseLoanDocument: "",
        donationAmount: "",
        donationTrustName: "",
        donationDocument: ""
    }

    setStatus = (result: any) => {
        console.log(result)

        let status = result.Refund_Status
        let approve = false;
        if(status == 'CONSULTANT_APPROVAL_PENDING') {
            approve = true;
        }

        this.setState({
            approveEnable: approve
        })
    }

    setIncome = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "-",
                Company: "-",
                File_Location: "-"
            }
        }
        this.setState({
            primaryIncomeAmount: String(result.Amount),
            primaryIncomeCompany: String(result.Company),
            primaryIncomeDocument: String(result.File_Location)
        })
    }

    setRent = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "-",
                Door_or_Plot_No: "-",
                City: "-",
                File_Location: "-"
            }
        }
        this.setState({
            rentAmount: String(result.Amount),
            rentDoorNo: String(result.Door_or_Plot_No),
            rentStreetName: String(result.City),
            rentDocument: String(result.File_Location),
        })
    }

    setPf = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "-",
                Intrest_rate: "-",
                Bank_Name: "-",
                File_Location: "-"
            }
        }
        this.setState({
            pfAmount: String(result.Amount),
            pfInterest: String(result.Intrest_rate),
            pfBankName: String(result.Bank_Name),
            pfDocument: String(result.File_Location)
        })
    }

    setHouseLoan = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "-",
                Intrest_rate: "-",
                Bank_Name: "-",
                File_Location: ""
            }
        }
        this.setState({            
            houseLoanAmount: String(result.Amount),
            houseLoanInterest: String(result.Intrest_rate),
            houseLoanBankName: String(result.Bank_Name),
            houseLoanDocument: String(result.File_Location)
        })
    }

    setDonation = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "-",
                Trust_Name: "-",
                File_Location: "-"
            }
        }
        this.setState({
            donationAmount: String(result.Amount),
            donationTrustName: String(result.Trust_Name),
            donationDocument: String(result.File_Location)
        })
    }

    approve = () => {
        ipcRenderer.send('approve-client', this.props.client)

        setTimeout(() => {
            ipcRenderer.send('get-client-status', this.props.client)
            ipcRenderer.once('get-client-status-reply', (event, result) => this.setStatus(result))
        }, 2000)
    }

    render() {
        const { client, goBack } = this.props
        const { primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
            rentAmount, rentDoorNo, rentStreetName, rentDocument,
            pfAmount, pfInterest, pfBankName, pfDocument,
            houseLoanAmount, houseLoanInterest, houseLoanBankName, houseLoanDocument,
            donationAmount, donationTrustName, donationDocument } = this.state
        return (
            <div style={{
                border: "4px solid black",
                borderRadius: "5px",
                padding: "20px",
                backgroundColor:"#f5f5f5",
            }}>
                <h1 style={{marginTop:"0px"}}>Client Name: {client.firstName}</h1>
                <h2>Income</h2>
                <h3 style={{margin:'1px'}}>Primary Income</h3>                
                    <TextField
                        value={primaryIncomeAmount}
                        label="Income Amount"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>

                    <TextField
                        value={primaryIncomeCompany}
                        label="Company Name"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <Button 
                        style={{
                            color:"white",
                            marginTop:"30px",
                            marginLeft:"10px",
                            float: "right",
                            backgroundColor: appTheme.secondaryAccentColor
                        }}
                        variant="contained">
                        <DownloadIcon/>
                    </Button>
                <h3 style={{margin:'1px'}}>Rent</h3>
                    <TextField
                        value={rentAmount}
                        label="Rent Amount"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={rentDoorNo}
                        label="Door No."
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={rentStreetName}
                        label="City"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <Button
                        style={{
                            color:"white",
                            marginTop:"30px",
                            marginLeft:"10px",
                            float: "right",
                            backgroundColor: appTheme.secondaryAccentColor
                        }}
                        variant="contained">
                        <DownloadIcon/>
                    </Button>
                <h2>Deductible</h2>
                    
                <h3 style={{margin:'1px'}} >PF</h3>
                    <TextField
                        value={pfAmount}
                        label="PF Amount"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={pfInterest}
                        label="PF Interest Rate (in %)"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={pfBankName}
                        label="Bank Name"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <Button
                        style={{
                            color:"white",
                            marginTop:"30px",
                            marginLeft:"10px",
                            float: "right",
                            backgroundColor: appTheme.secondaryAccentColor
                        }}
                        variant="contained">
                        <DownloadIcon/>
                    </Button>
                <h3 style={{margin:'1px'}} >House Loan</h3>
                    <TextField
                        value={houseLoanAmount}
                        label="Loan Amount"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={houseLoanInterest}
                        label="Loan Interest (in %)"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={houseLoanBankName}
                        label="Bank Name"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <Button
                        style={{
                            color:"white",
                            marginTop:"30px",
                            marginLeft:"10px",
                            float: "right",
                            backgroundColor: appTheme.secondaryAccentColor
                        }}
                        variant="contained">
                        <DownloadIcon/>
                    </Button>
                <h3 style={{margin:'1px'}} >Donation</h3>
                    <TextField
                        value={donationAmount}
                        label="Donation Amount"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <TextField
                        value={donationTrustName}
                        label="Trust Name"
                        margin="normal"
                        inputProps={fontColor}
                        disabled/>
                    <Button
                        style={{
                            color:"white",
                            marginTop:"30px",
                            marginLeft:"10px",
                            float: "right",
                            backgroundColor: appTheme.secondaryAccentColor
                        }}
                        variant="contained">
                        <DownloadIcon/>
                    </Button>
                    <br/>

                    <Button 
                        style={{                        
                            backgroundColor: appTheme.primaryAccentColor,
                            boxShadow:"2px 2px",
                            marginTop: "20px"
                        }}
                        onClick={goBack}>
                        Go Back
                        </Button>
                    <Button 
                        style={{                        
                            backgroundColor: appTheme.primaryAccentColor,
                            boxShadow:"2px 2px",
                            marginTop: "20px",
                            float: "right"
                        }}
                        disabled={!this.state.approveEnable}
                        onClick={this.approve}>
                        Approve
                        </Button>
                </div >
        )
    }
}

export default ClientInformationDetail
