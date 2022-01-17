import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ConsultantDetails from './Views/ConsultantDetails'
import RefundStatus from './Views/RefundStatus'
import { TaxInfoView } from './Views/TaxInfoView'
import { appTheme } from '../App'
import HomeIcon from '@mui/icons-material/Home'
import { TaxInformation } from '../../types'
import { User } from '../../types'
const { ipcRenderer } = window.require("electron");

export class TaxFilingPage extends Component<{ user: User}> {

    constructor(props: { user: User } | Readonly<{ user: User }>) {
        super(props)
        ipcRenderer.send('get-user-tax-details', this.props.user);
        ipcRenderer.once('get-user-income-reply', (event, result) => this.setIncome(result))
        ipcRenderer.once('get-user-rent-reply', (event, result) => this.setRent(result))
        ipcRenderer.once('get-user-pf-reply', (event, result) => this.setPf(result))
        ipcRenderer.once('get-user-house-reply', (event, result) => this.setHouseLoan(result))
        ipcRenderer.once('get-user-donation-reply', (event, result) => this.setDonation(result))
    }

    state = {
        step: initStep(),
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
        donationDocument: "",
        isEditMode: false
    }

    setIncome = (result: any) => {
        if(result === 0) {
            result = {
                Amount: "",
                Company: "",
                File_Location: "income_statement.pdf"
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
                Amount: "",
                Door_or_Plot_No: "",
                City: "",
                File_Location: "rental_agreement.pdf"
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
                Amount: "",
                Intrest_rate: "",
                Bank_Name: "",
                File_Location: "pf_statement.pdf"
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
                Amount: "",
                Intrest_rate: "",
                Bank_Name: "",
                File_Location: "house_loan.pdf"
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
                Amount: "",
                Trust_Name: "",
                File_Location: "donation_receipt.pdf"
            }
        }
        this.setState({
            donationAmount: String(result.Amount),
            donationTrustName: String(result.Trust_Name),
            donationDocument: String(result.File_Location)
        })
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    handleEditModeChange = ():void => {
        this.setState({isEditMode: this.state.isEditMode ? false : true});
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1});
    }

    prevStep = () => {
        let { step } = this.state;
        this.setState({ step: step - 1});
    }

    goToConsultation = () => {
        if(this.state.primaryIncomeAmount == "") {
            alert("Fill primary income")
        }else{
            this.nextStep();
            ipcRenderer.send('create-new-consultation', this.props.user)
        }
    }

    render() {
        const { isEditMode, step, primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
            rentAmount, rentDoorNo, rentStreetName, rentDocument,
            pfAmount, pfInterest, pfBankName, pfDocument,
            houseLoanAmount, houseLoanInterest, houseLoanBankName, houseLoanDocument,
            donationAmount, donationTrustName, donationDocument } = this.state

        const clientTaxInfo: TaxInformation = {
            primaryIncomeAmount: primaryIncomeAmount,
            primaryIncomeCompany: primaryIncomeCompany,
            primaryIncomeDocument: primaryIncomeDocument,
            rentAmount: rentAmount,
            rentDoorNo: rentDoorNo,
            rentStreetName: rentStreetName,
            rentDocument: rentDocument,
            pfAmount: pfAmount,
            pfInterest: pfInterest,
            pfBankName: pfBankName,
            pfDocument: pfDocument,
            houseLoanAmount: houseLoanAmount,
            houseLoanInterest: houseLoanInterest,
            houseLoanBankName: houseLoanBankName,
            houseLoanDocument: houseLoanDocument,
            donationAmount: donationAmount,
            donationTrustName: donationTrustName,
            donationDocument: donationDocument
        }
        switch (step) {
            case 1:
                return (
                    <div
                        style={{border:'5px solid black',
                        padding:'10px',
                        margin:'20px',
                        borderRadius:'5px',
                        backgroundColor:appTheme.secondaryColor
                    }}>
                        <div style={{                            
                            float:"left",
                            marginTop:"10px",                        
                        }}>
                            <Button style={{
                                backgroundColor:appTheme.primaryAccentColor
                            }} 
                            variant="contained" component={Link} to="/">Home</Button>
                        </div>
                        
                        <h1 style={{paddingLeft: "240px", marginTop:"10px"}}>Tax Information</h1>                       
                        <TaxInfoView clientTaxInfo={clientTaxInfo} user={this.props.user} isEditMode={isEditMode} handleChange={this.handleChange} handleEditModeChange={this.handleEditModeChange}/>  
                        <div style={{
                            float:"left"
                            }}>
                            <Button style={{
                                backgroundColor:appTheme.primaryAccentColor,
                            }} 
                            color="primary" variant="contained" onClick={this.prevStep} disabled>Previous</Button>
                        </div>      
                        <div style={{
                            float:"right"
                            }}>
                            <Button  disabled={isEditMode} style={{
                                backgroundColor:appTheme.primaryAccentColor
                            }} 
                            variant="contained" 
                            onClick={this.goToConsultation}
                            >Next</Button>
                        </div>          
                                           
                    </div>
                )
            case 2:
                return (
                    <div style={{border:'5px solid black',
                    padding:'10px',
                    margin:'20px',
                    borderRadius:'5px',
                    backgroundColor:appTheme.secondaryColor
                    }}>
                        <h1 style={{marginTop:"0px"}}>Meet with consultant</h1>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor
                        }}
                        variant="contained" component={Link} to="/">Home</Button>
                        <ConsultantDetails user={this.props.user}/>  
                        <div style={{
                        float:"left"
                        }}>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor
                        }}
                        variant="contained" onClick={this.prevStep}>Previous</Button>
                        </div>                    
                        
                        <div style={{
                        float:"right"
                        }}>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor
                        }}
                        variant="contained" onClick={this.nextStep}>Next</Button>
                        </div>                          
                    </div>
                )
            case 3:
                return (
                    <div style={{border:'5px solid black',
                        padding:'10px',
                        margin:'20px',
                        borderRadius:'5px',
                        width: "60%",
                        maxWidth: "500px",
                        backgroundColor:appTheme.secondaryColor
                        }}>
                        <h1 style={{marginTop:"0px"}}>Refund Status</h1>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor,
                            marginTop:'0px',
                            marginBottom:'20px'
                        }} 
                        variant="contained" component={Link} to="/">Home</Button>
                        <RefundStatus clientTaxInfo={clientTaxInfo} user={this.props.user}/>
                        
                        <div style={{
                        float:"left"
                        }}>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor,
                            marginTop:"20px"
                        }}
                        variant="contained" onClick={this.prevStep}>Previous</Button>
                        </div>                    
                        
                        <div style={{
                        float:"right"
                        }}>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor,
                            marginTop:"20px"
                        }}
                        variant="contained" onClick={this.nextStep} disabled>Next</Button>
                        </div>   
                    </div>
                )
        }
    }
}

export default TaxFilingPage

const initStep = () => {
    return 1;
}