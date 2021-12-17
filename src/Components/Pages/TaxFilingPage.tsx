import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class TaxFilingPage extends Component {
    render() {
        return (
            <div>
                <h1>This is the tax filing page</h1>
                <Button color="primary" variant="contained" component={Link} to="/">Go back to profile</Button>
            </div>
        )
    }
}

export default TaxFilingPage
