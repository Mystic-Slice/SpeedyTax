import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ConsultantDetails from './Views/ConsultantDetails'
import RefundStatus from './Views/RefundStatus'
import { TaxInformation, TaxInfoView } from './Views/TaxInfoView'
import { appTheme } from '../App'

export class TaxFilingPage extends Component {
    state = {
        step: initStep(),
        primaryIncomeAmount: "150000",
        primaryIncomeCompany: "Google India",
        primaryIncomeDocument: "google_income.pdf",
        rentAmount: "12000",
        rentDoorNo: "54",
        rentStreetName: "D B Road",
        rentDocument: "rental_agreement.pdf",
        pfAmount: "400000",
        pfInterest: "7%",
        pfBankName: "SBI",
        pfDocument: "pf_statement.pdf",
        houseLoanAmount: "1600000",
        houseLoanInterest: "6%",
        houseLoanBankName: "SBI",
        houseLoanDocument: "house_loan.pdf",
        donationAmount: "200000",
        donationTrustName: "Udhavum Karangal",
        donationDocument: "donation_receipt.pdf"
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1});
    }

    prevStep = () => {
        let { step } = this.state;
        this.setState({ step: step - 1});
    }

    render() {
        const { step, primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
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
                    }} 
                    >
                        <div style={{                            
                            float:"left",
                            marginTop:"10px",                        
                        }}
                        >
                            <Button style={{
                                backgroundColor:appTheme.primaryAccentColor
                            }} 
                            variant="contained" component={Link} to="/">Home</Button>
                        </div>
                        
                        <h1 style={{textAlign:"center", marginTop:"0px"}}>Tax Information</h1>                       
                        <TaxInfoView clientTaxInfo={clientTaxInfo} handleChange={this.handleChange}/>  
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
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor
                        }} 
                        variant="contained" onClick={this.nextStep}>Next</Button>
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
                }}
                    >
                        <h1 style={{marginTop:"0px"}}>Meet with consultant</h1>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor
                        }}
                        variant="contained" component={Link} to="/">Home</Button>
                        <ConsultantDetails/>  
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
                    backgroundColor:appTheme.secondaryColor
                    }}
                    >
                        <h1 style={{marginTop:"0px"}}>Refund Status</h1>
                        <Button style={{
                            backgroundColor:appTheme.primaryAccentColor,
                            marginTop:'0px',
                            marginBottom:'20px'
                        }} 
                        variant="contained" component={Link} to="/">Home</Button>
                        <RefundStatus/>
                        
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
                        variant="contained" onClick={this.nextStep}>Next</Button>
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