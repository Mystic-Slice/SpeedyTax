import { Button, TextField } from '@material-ui/core'
import { MuiThemeProvider } from 'material-ui/styles'
import React, { Component } from 'react'

export interface TaxInformation {
    primaryIncome: number,
    handleChange: (input: any) => any
}

export class TaxInfoView extends Component<TaxInformation, any> {
    state = {
        isEditMode: false
    }

    switchMode = () => {
        this.setState({isEditMode: this.state.isEditMode ? false : true});
    }

    render() {
        const { handleChange } = this.props
        return (
            <div>
                <TextField
                    placeholder="Enter primary income"
                    label="Primary Income"
                    onChange={handleChange("name")}
                    defaultValue={this.props.primaryIncome}
                    margin="normal"
                    InputProps = {{ readOnly: !this.state.isEditMode }}/>
                <Button color="primary" variant="contained" onClick={this.switchMode}>{this.state.isEditMode?"Confirm": "Edit"}</Button>
            </div>
        )
    }
}

export default TaxInfoView