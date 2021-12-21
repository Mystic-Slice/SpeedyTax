import { Button, TextField } from '@material-ui/core'
import { MuiThemeProvider } from 'material-ui/styles'
import React, { Component } from 'react'

export interface TaxInformation {
    primaryIncomeAmount: string,
    primaryIncomeCompany: string,
    primaryIncomeDocument: string,
    rentAmount: string,
    rentDoorNo: string,
    rentStreetName: string,
    rentDocument: string,
    pfAmount: string,
    pfInterest: string,
    pfBankName: string,
    pfDocument: string,
    houseLoanAmount: string,
    houseLoanInterest: string,
    houseLoanBankName: string,
    houseLoanDocument: string,
    donationAmount: string,
    donationTrustName: string,
    donationDocument: string
}

export class TaxInfoView extends Component<{ clientTaxInfo: TaxInformation, handleChange: (input:any) => any }> {
    state = {
        isEditMode: false,
        errorPrimaryIncomeAmount: false,
        errorPrimaryIncomeCompany: false,
        errorPrimaryIncomeDocument: false,
        errorRentAmount: false,
        errorRentDoorNo: false,
        errorRentStreetName: false,
        errorRentDocument: false,
        errorPfAmount: false,
        errorPfInterest: false,
        errorPfBankName: false,
        errorPfDocument: false,
        errorHouseLoanAmount: false,
        errorHouseLoanInterest: false,
        errorHouseLoanBankName: false,
        errorHouseLoanDocument: false,
        errorDonationAmount: false,
        errorDonationTrustName: false,
        errorDonationDocument: false
    }

    switchEditMode = () => {
        const { isEditMode } = this.state;
        if(isEditMode) {
            const { primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
                rentAmount, rentDoorNo, rentStreetName, rentDocument,
                pfAmount, pfInterest, pfBankName, pfDocument,
                houseLoanAmount, houseLoanInterest, houseLoanBankName, houseLoanDocument,
                donationAmount, donationTrustName, donationDocument } = this.props.clientTaxInfo;
                if(!this.validate(primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
                    rentAmount, rentDoorNo, rentStreetName, rentDocument,
                    pfAmount, pfInterest, pfBankName, pfDocument,
                    houseLoanAmount, houseLoanInterest, houseLoanBankName, houseLoanDocument,
                    donationAmount, donationTrustName, donationDocument)) return false
        }
        this.setState({isEditMode: isEditMode ? false : true});
    }

    validate = (
        primaryIncomeAmount: string,
        primaryIncomeCompany: string,
        primaryIncomeDocument: string,
        rentAmount: string,
        rentDoorNo: string,
        rentStreetName: string,
        rentDocument: string,
        pfAmount: string,
        pfInterest: string,
        pfBankName: string,
        pfDocument: string,
        houseLoanAmount: string,
        houseLoanInterest: string,
        houseLoanBankName: string,
        houseLoanDocument: string,
        donationAmount: string,
        donationTrustName: string,
        donationDocument: string
    ) => {
        let error = false

        let regexPos = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
        let regexPercentage = /^\d{1,2}(?:\.\d{,2})?%$/

        let errorPrimaryIncomeAmount = false
        if(!primaryIncomeAmount.match(regexPos)) {
            errorPrimaryIncomeAmount = true
            error = true
        }
        
        let errorPrimaryIncomeCompany = false
        if(primaryIncomeCompany == "") {
            errorPrimaryIncomeCompany = true
            error = true
        }

        let errorPrimaryIncomeDocument = false
        if(primaryIncomeDocument == "") {
            errorPrimaryIncomeDocument = true
            error = true
        }

        let errorRentAmount = false
        if(!rentAmount.match(regexPos)) {
            errorRentAmount = true
            error = true
        } 
        
        let errorRentDoorNo = false
        if(rentDoorNo == "") {
            errorRentDoorNo = true
            error = true
        }
        
        let errorRentStreetName = false
        if(rentStreetName == "") {
            errorRentStreetName = true
            error = true
        }

        let errorRentDocument = false
        if(rentDocument == "") {
            errorRentDocument = true
            error = true
        }
        
        let errorPfAmount = false
        if(!pfAmount.match(regexPos)) {
            errorPfAmount = true
            error = true
        }

        let errorPfInterest = false
        if(!pfInterest.match(regexPercentage)) {
            errorPfInterest = true
            error = true
        }

        let errorPfBankName = false
        if(pfBankName == "") {
            errorPfBankName = true
            error = true
        }
        
        let errorPfDocument = false
        if(pfDocument == "") {
            errorPfDocument = true
            error = true
        }
        
        let errorHouseLoanAmount = false
        if(!houseLoanAmount.match(regexPos)) {
            errorHouseLoanAmount = true
            error = true
        }
        
        let errorHouseLoanInterest = false
        if(!houseLoanInterest.match(regexPercentage)) {
            errorHouseLoanInterest = true
            error = true
        }
        let errorHouseLoanBankName = false
        if(houseLoanBankName == "") {
            errorHouseLoanBankName = true
            error = true
        }
        
        let errorHouseLoanDocument = false
        if(houseLoanDocument == "") {
            errorHouseLoanDocument = true
            error = true
        }
        
        let errorDonationAmount = false
        if(!donationAmount.match(regexPos)) {
            errorDonationAmount = true
            error = true
        }

        let errorDonationTrustName = false
        if(donationTrustName == "") {
            errorDonationTrustName = true
            error = true
        }
        
        let errorDonationDocument = false
        if(donationDocument == "") {
            errorDonationDocument = true
            error = true
        }

        this.setState({
            errorPrimaryIncomeAmount: errorPrimaryIncomeAmount,
            errorPrimaryIncomeCompany: errorPrimaryIncomeCompany,
            errorPrimaryIncomeDocument: errorPrimaryIncomeDocument,
            errorRentAmount: errorRentAmount,
            errorRentDoorNo: errorRentDoorNo,
            errorRentStreetName: errorRentStreetName,
            errorRentDocument: errorRentDocument,
            errorPfAmount: errorPfAmount,
            errorPfInterest: errorPfInterest,
            errorPfBankName: errorPfBankName,
            errorPfDocument: errorPfDocument,
            errorHouseLoanAmount: errorHouseLoanAmount,
            errorHouseLoanInterest: errorHouseLoanInterest,
            errorHouseLoanBankName: errorHouseLoanBankName,
            errorHouseLoanDocument: errorHouseLoanDocument,
            errorDonationAmount: errorDonationAmount,
            errorDonationTrustName: errorDonationTrustName,
            errorDonationDocument: errorDonationDocument
        })
        return !error
    }

    render() {
        const { clientTaxInfo, handleChange } = this.props
        const { primaryIncomeAmount, primaryIncomeCompany, primaryIncomeDocument, 
            rentAmount, rentDoorNo, rentStreetName, rentDocument,
            pfAmount, pfInterest, pfBankName, pfDocument,
            houseLoanAmount, houseLoanInterest, houseLoanBankName, houseLoanDocument,
            donationAmount, donationTrustName, donationDocument } = clientTaxInfo
        const { isEditMode, 
            errorPrimaryIncomeAmount, errorPrimaryIncomeCompany, errorPrimaryIncomeDocument, 
            errorRentAmount, errorRentDoorNo, errorRentStreetName, errorRentDocument,
            errorPfAmount, errorPfInterest, errorPfBankName, errorPfDocument,
            errorHouseLoanAmount, errorHouseLoanInterest, errorHouseLoanBankName, errorHouseLoanDocument,
            errorDonationAmount, errorDonationTrustName, errorDonationDocument } = this.state;
        return (
            <div 
            style={{border:'5px solid black',
             padding:'10px',
             margin:'20px',
             borderRadius:'5px'}}
            >
                <h1 style={{margin:'1px'}}>Primary Income:</h1>
                    <TextField
                        value={primaryIncomeAmount}
                        label="Income Amount"
                        onChange={handleChange("primaryIncomeAmount")}
                        error={errorPrimaryIncomeAmount}
                        helperText={errorPrimaryIncomeAmount ? "Invalid Amount": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>

                    <TextField
                        value={primaryIncomeCompany}
                        label="Company Name"
                        onChange={handleChange("primaryIncomeCompany")}
                        error={errorPrimaryIncomeCompany}
                        helperText={errorPrimaryIncomeCompany ? "Please fill Company Name": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    {/* <TextField
                        value={primaryIncomeDocument}
                        label="Form-16"
                        onChange={handleChange("primaryIncomeDocument")}
                        error={errorPrimaryIncomeDocument}
                        helperText={errorPrimaryIncomeDocument ? "Invalid Document": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/> */}
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            marginTop: "20px",
                            marginRight: "0"
                        }}
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                <h1 style={{margin:'1px'}}>Rent</h1>
                    <TextField
                        value={rentAmount}
                        label="Rent Amount"
                        onChange={handleChange("rentAmount")}
                        error={errorRentAmount}
                        helperText={errorRentAmount ? "Invalid Amount": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={rentDoorNo}
                        label="Door No."
                        onChange={handleChange("rentDoorNo")}
                        error={errorRentDoorNo}
                        helperText={errorRentDoorNo ? "Please fill Door No": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={rentStreetName}
                        label="Street Name"
                        onChange={handleChange("rentStreetName")}
                        error={errorRentStreetName}
                        helperText={errorRentStreetName ? "Please fill Street name": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    {/* <TextField
                        value={rentDocument}
                        label="Rent Agreement"
                        onChange={handleChange("rentDocument")}
                        error={errorRentDocument}
                        helperText={errorRentDocument ? "Invalid Document": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/> */}
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            marginTop: "20px",
                            marginRight: "0"
                        }}
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                <h1 style={{margin:'1px'}} >PF</h1>
                    <TextField
                        value={pfAmount}
                        label="PF Amount"
                        onChange={handleChange("pfAmount")}
                        error={errorPfAmount}
                        helperText={errorPfAmount ? "Invalid Amount": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={pfInterest}
                        label="PF Interest Rate"
                        onChange={handleChange("pfInterest")}
                        error={errorPfInterest}
                        helperText={errorPfInterest ? "Invalid Interest Rate": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={pfBankName}
                        label="Bank Name"
                        onChange={handleChange("pfBankName")}
                        error={errorPfBankName}
                        helperText={errorPfBankName ? "Please fill Bank Name": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    {/* <TextField
                        value={pfDocument}
                        label="PF Document"
                        onChange={handleChange("pfDocument")}
                        error={errorPfDocument}
                        helperText={errorPfDocument ? "Invalid Document": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/> */}
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            marginTop: "20px",
                            marginRight: "0"
                        }}
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                <h1 style={{margin:'1px'}} >House Loan</h1>
                    <TextField
                        value={houseLoanAmount}
                        label="Loan Amount"
                        onChange={handleChange("houseLoanAmount")}
                        error={errorHouseLoanAmount}
                        helperText={errorHouseLoanAmount ? "Invalid Amount": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={houseLoanInterest}
                        label="Loan Interest"
                        onChange={handleChange("houseLoanInterest")}
                        error={errorHouseLoanInterest}
                        helperText={errorHouseLoanInterest ? "Invalid Interest Rate": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={houseLoanBankName}
                        label="Bank Name"
                        onChange={handleChange("houseLoanBankName")}
                        error={errorHouseLoanBankName}
                        helperText={errorHouseLoanBankName ? "Please fill Bank Name": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    {/* <TextField
                        value={houseLoanDocument}
                        label="Loan Document"
                        onChange={handleChange("houseLoanDocument")}
                        error={errorHouseLoanDocument}
                        helperText={errorHouseLoanDocument ? "Invalid Document": ""}
                        margin="normal"

                    InputProps = {{ readOnly: !isEditMode }}/> */}
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            marginTop: "20px",
                            marginRight: "0"
                        }}
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>
                <h1 style={{margin:'1px'}} >Donation</h1>
                    <TextField
                        value={donationAmount}
                        label="Donation Amount"
                        onChange={handleChange("donationAmount")}
                        error={errorDonationAmount}
                        helperText={errorDonationAmount ? "Invalid Amount": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    <TextField
                        value={donationTrustName}
                        label="Trust Name"
                        onChange={handleChange("donationTrustName")}
                        error={errorDonationTrustName}
                        helperText={errorDonationTrustName ? "Please fill Trust Name": ""}
                        margin="normal"
                        InputProps = {{ readOnly: !isEditMode }}/>
                    {/* <TextField
                        value={donationDocument}
                        label="Donation Document"
                        onChange={handleChange("donationDocument")}
                        error={errorDonationDocument}
                        helperText={errorDonationDocument ? "Invalid Document": ""}
                        margin="normal"

                        InputProps = {{ readOnly: !isEditMode }}/> */}
                    <Button
                        variant="contained"
                        component="label"
                        style={{
                            marginTop: "20px",
                            marginRight: "0"
                        }}
                        >
                        Upload File
                        <input
                            type="file"
                            hidden
                        />
                    </Button>

                    <div style={{
                        display: "inline",
                        float: "right",
                        marginTop: "30px",
                        paddingLeft:"10px"
                    }}>
                        <Button 
                        color="primary" 
                        variant="contained" 
                        onClick={this.switchEditMode}>
                        {isEditMode?"Save": "Edit"}
                        </Button>
                    </div>
            </div>
        )
    }
}

export default TaxInfoView