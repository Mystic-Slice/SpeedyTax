import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TaxInfoView from './Views/TaxInfoView'

export class TaxFilingPage extends Component<{ step?: number }, any> {
    state = {
        step: this.props.step ? this.props.step : 1,
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
                        <Button color="primary" variant="contained" component={Link} to="/">Go back to profile</Button>
                        <Button color="primary" variant="contained" onClick={this.prevStep}>Previous</Button>
                        <Button color="primary" variant="contained" onClick={this.nextStep}>Next</Button>
                    </div>
                )
            case 3:
                return (
                    <div>
                        <h1>Refund Status</h1>
                        <Button color="primary" variant="contained" component={Link} to="/">Go back to profile</Button>
                        <Button color="primary" variant="contained" onClick={this.prevStep}>Previous</Button>
                        <Button color="primary" variant="contained" onClick={this.nextStep} disabled>Next</Button>
                    </div>
                )
        }        
    }
}

export default TaxFilingPage