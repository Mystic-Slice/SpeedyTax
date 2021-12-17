import React, { Component } from 'react'

export class RefundStatus extends Component {
    state = {
        status: 0
    }
    render() {
        const { status } = this.state;

        if(!status) {
            return (
                <h1>Tax Filed. Refund Pending.</h1>
            )
        }else {
            return (
                <h1>Refund Successful!</h1>
            )
        }
    }
}

export default RefundStatus
