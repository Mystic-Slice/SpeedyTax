import { Button, Card, TextField } from '@material-ui/core';
import DownloadIcon from '@mui/icons-material/Download';
import React, { Component } from 'react';
import { appTheme } from '../../App';

export class RefundStatus extends Component {
    state = {
        status: 0
    }
    render() {
        const { status } = this.state;

        return (
            <div>
                <Card 
                    style={{
                        display: "flex"
                    }}>
                    <div
                        style={{
                            flex: "60%"
                        }}
                        >
                    <TextField
                        value="555-6666"
                        label="Application Number"
                        fullWidth
                        />
                    <TextField
                        value="01/01/2021"
                        label="Application Date"
                        fullWidth
                        />
                    </div>
                    <div style={{flex: "40%", flexDirection: "column", backgroundColor: appTheme.secondaryAccentColor}}>
                        <Card style={{
                            width: "100%",
                            height: "70%",
                            backgroundColor: status ? "green": "red",
                            margin: "auto",
                            textAlign:"center",
                            fontSize: "30px"
                        }}>
                        {status?"Successful": "Pending"}
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
            </div>
        )
    }
}

export default RefundStatus
