import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core';
import { UserInformation } from '../HomePage';

export class UserInfoView extends Component<UserInformation> {
    state = {
        isEditMode: false
    }

    switchMode = () => {
        this.setState({isEditMode: this.state.isEditMode ? false : true});
    }

    render() {
        const { name, email, DOB, handleChange } = this.props;
        return (
            <div>
                <TextField
                    placeholder="Enter you name"
                    label="Name"
                    onChange={handleChange("name")}
                    defaultValue={this.props.name}
                    margin="normal"
                    InputProps = {{
                        readOnly: !this.state.isEditMode
                    }}
                />
                <TextField
                    placeholder="Enter you email"
                    label="Email"
                    onChange={handleChange("email")}
                    defaultValue={this.props.email}
                    margin="normal"
                    InputProps = {{
                        readOnly: !this.state.isEditMode
                    }}
                />
                <TextField
                    placeholder="Enter you name"
                    label="DOB"
                    onChange={handleChange("DOB")}
                    defaultValue={this.props.DOB}
                    margin="normal"
                    InputProps = {{
                        readOnly: !this.state.isEditMode
                    }}
                />
                <Button color="primary" variant="contained" onClick={this.switchMode}>{this.state.isEditMode?"Confirm": "Edit"}</Button>
            </div>
        )
    }
}

export default UserInfoView
