import { Button, TextField } from '@material-ui/core'
import React, { Component } from 'react'
import { TaxInformation, UserInformation } from '../../../types'
import { appTheme } from '../../App'
const { ipcRenderer } = window.require("electron");

export class ClientInformationDetail extends Component<{ client: UserInformation, goBack: () => void }> {

    constructor(props: { client: UserInformation; goBack: () => void } | Readonly<{ client: UserInformation; goBack: () => void }>) {
        super(props)
        ipcRenderer.send('get-client-info', this.props.client)
        ipcRenderer.once('get-client-income-reply', (event, result) => this.setIncome(result))
        ipcRenderer.once('get-client-rent-reply', (event, result) => this.setRent(result))
        ipcRenderer.once('get-client-pf-reply', (event, result) => this.setPf(result))
        ipcRenderer.once('get-client-house-reply', (event, result) => this.setHouseLoan(result))
        ipcRenderer.once('get-client-donation-reply', (event, result) => this.setDonation(result))
    }

    state = {
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
                <h3 style={{marginTop:"0px"}}>Client Name: {client.firstName}</h3>
                

                <h3 style={{margin:'1px'}}>Primary Income</h3>                
                    <TextField
                        value={primaryIncomeAmount}
                        label="Income Amount"
                        margin="normal"
                        disabled/>

                    <TextField
                        value={primaryIncomeCompany}
                        label="Company Name"
                        margin="normal"
                        disabled/>
                   
                <h3 style={{margin:'1px'}}>Rent</h3>
                    <TextField
                        value={rentAmount}
                        label="Rent Amount"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={rentDoorNo}
                        label="Door No."
                        margin="normal"
                        disabled/>
                    <TextField
                        value={rentStreetName}
                        label="Street Name"
                        margin="normal"
                        disabled/>
                    
                <h3 style={{margin:'1px'}} >PF</h3>
                    <TextField
                        value={pfAmount}
                        label="PF Amount"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={pfInterest}
                        label="PF Interest Rate"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={pfBankName}
                        label="Bank Name"
                        margin="normal"
                        disabled/>

                <h3 style={{margin:'1px'}} >House Loan</h3>
                    <TextField
                        value={houseLoanAmount}
                        label="Loan Amount"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={houseLoanInterest}
                        label="Loan Interest"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={houseLoanBankName}
                        label="Bank Name"
                        margin="normal"
                        disabled/>

                <h3 style={{margin:'1px'}} >Donation</h3>
                    <TextField
                        value={donationAmount}
                        label="Donation Amount"
                        margin="normal"
                        disabled/>
                    <TextField
                        value={donationTrustName}
                        label="Trust Name"
                        margin="normal"
                        disabled/>
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
                            marginTop: "20px"
                        }}
                        onClick={this.approve}>
                        Approve
                        </Button>
                </div >
        )
    }
}

export default ClientInformationDetail
