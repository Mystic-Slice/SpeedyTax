import { Button, Card, TextField } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import React, { Component } from 'react';
import { TaxInformation, User } from '../../../types';
import { appTheme } from '../../App';
const { ipcRenderer } = window.require("electron");

export const calculateTax = (taxInfo: TaxInformation) => {
	let primaryIncomeTax = 0
    if(+taxInfo.primaryIncomeAmount > 500000) primaryIncomeTax = (+taxInfo.primaryIncomeAmount - 500000) * 0.20;
	let rentTax = +taxInfo.rentAmount * 0.20;
	let pfDeduction = 0; 
	if(+taxInfo.pfAmount <= 750000) pfDeduction = +taxInfo.pfAmount * 0.20;
	let houseLoanDeduction = Math.min(150000, +taxInfo.houseLoanAmount * 0.20) + Math.min(200000, +taxInfo.houseLoanAmount * +taxInfo.houseLoanInterest * 0.20)
	let donationDeduction = +taxInfo.donationAmount * 0.20

	return {
		totalTax: primaryIncomeTax + rentTax,
		deductions: pfDeduction + houseLoanDeduction + donationDeduction
	}
}

export class RefundStatus extends Component<{clientTaxInfo: TaxInformation, user: User}> {

    constructor(props: { clientTaxInfo: TaxInformation; user: User; } | Readonly<{ clientTaxInfo: TaxInformation; user: User; }>) {
        super(props);
    }

    state = {
        totalTax: "",
        deductions: "",
        taxToBePaid: "",
        status: ""
    }

    componentDidMount(): void {
        this.setTax();
        ipcRenderer.send('get-consultation-status', this.props.user)
        ipcRenderer.once('get-consultation-status-reply', (event, result) => this.setStatus(result))
    }

    setTax = () => {
        let tax = calculateTax(this.props.clientTaxInfo);

        if(tax.deductions > tax.totalTax) tax.deductions = tax.totalTax;
        this.setState({
            totalTax: String(tax.totalTax),
            deductions: String(tax.deductions),
            taxToBePaid: String(tax.totalTax - tax.deductions)
        })
    }

    setStatus = (result: any) => {
        let status = result.Refund_Status

        let color;
        if(status == 'CONSULTANT_APPROVAL_PENDING') {
            color = 'red'
        } else if (status == 'PAYMENT_PENDING') {
            color = 'yellow'
        } else {
            color = 'green'
        }

        this.setState({
            status: color
        })
    }

    pay = () => {
        ipcRenderer.send('pay-tax', this.props.user)
        ipcRenderer.once('pay-tax-reply', (event) => {
            ipcRenderer.send('get-consultation-status', this.props.user)
            ipcRenderer.once('get-consultation-status-reply', (event, result) => this.setStatus(result))
        })
    }

    render() {
        const { totalTax, deductions, taxToBePaid, status } = this.state;

        return (
            <div>
                <Card 
                    style={{
                        display: "flex"
                    }}>
                    <div style={{ flex: "40%" }}>
                    <TextField
                        value={totalTax}
                        label="Total Tax"
                        fullWidth/>
                    <TextField
                        value={deductions}
                        label="Deductions"
                        fullWidth/>
                    <TextField
                        value={taxToBePaid}
                        label={"Tax to be paid"}
                        fullWidth/>
                    </div>
                    <div style={{flex: "60%", flexDirection: "column", backgroundColor: appTheme.secondaryAccentColor}}>
                        <Card style={{
                            width: "100%",
                            height: "70%",
                            backgroundColor: status,
                            margin: "auto",
                            textAlign:"center",
                            fontSize: "30px"
                        }}>
                        {status == 'red' ? 'Consultant approval pending': status == 'yellow' ? 'Payment pending' : 'Successful'}
                        </Card>
                        <Button 
                            style={{
                                width: "100%",
                                height: "30%",
                                color:"white"
                            }}
                            endIcon={<DownloadIcon/>}>
                            Download Tax Summary
                        </Button>

                    </div>
                </Card>
                <Button 
                    style={{
                        width: "100%",
                        height: "30%"
                    }}
                    color="primary"
                    onClick={this.pay}
                    disabled={status != 'yellow'}>
                    Pay
                </Button>
            </div>
        )
    }
}

export default RefundStatus
