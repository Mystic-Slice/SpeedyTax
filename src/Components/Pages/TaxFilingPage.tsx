import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ConsultantDetails from './Views/ConsultantDetails'
import RefundStatus from './Views/RefundStatus'
import { TaxInfoView } from './Views/TaxInfoView'

export class TaxFilingPage extends Component {
    state = {
        step: initStep(),
        primaryIncome: 0
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
        const { step, primaryIncome } = this.state;
        switch (step) {
            case 1:
                return (
                    <div>
                        <h1>Tax Information</h1>
                        <TaxInfoView primaryIncome={primaryIncome} handleChange={this.handleChange}/>
                        <Button color="primary" variant="contained" component={Link} to="/">Go back to profile</Button>
                        <Button color="primary" variant="contained" onClick={this.prevStep} disabled>Previous</Button>
                        <Button color="primary" variant="contained" onClick={this.nextStep}>Next</Button>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <h1>Meet with consultant</h1>
                        <Button color="primary" variant="contained" component={Link} to="/">Home</Button>
                        <ConsultantDetails/>  
                        <div style={{
                        float:"left"
                        }}>
                        <Button color="primary" variant="contained" onClick={this.prevStep}>Previous</Button>
                        </div>                    
                        
                        <div style={{
                        float:"right"
                        }}>
                        <Button color="primary" variant="contained" onClick={this.nextStep}>Next</Button>
                        </div>                          
                    </div>
                )
            case 3:
                return (
                    <div>
                        <h1>Refund Status</h1>
                        <RefundStatus/>
                        <Button color="primary" variant="contained" component={Link} to="/">Go back to profile</Button>
                        <Button color="primary" variant="contained" onClick={this.prevStep}>Previous</Button>
                        <Button color="primary" variant="contained" onClick={this.nextStep} disabled>Next</Button>
                    </div>
                )
        }
    }
}

export default TaxFilingPage

const initStep = () => {
    return 1;
}