import React, {Component} from 'react';
import './checkout.css';

class OrderSubmitted extends Component {
    handleClick = e => {
        this.props.history.push('/');
    };
    render() {
        return (
            <div className='container orderSubmitted '>
                <div className='text-center text'>
                    <h1>Thank you!</h1>
                    <p>
                        Your order has been sent. You will get a copy to the
                        email address that you provided.
                        <br />
                        We are going to contact you as soon as possible.
                    </p>
                    <p>
                        If you have any inquiries, please dont hesitate to
                        contact us on
                        <br />
                        <strong>temporary_email112@yahoo.com</strong>
                    </p>
                    <button
                        className='btn btn-outline-success'
                        onClick={this.handleClick}
                    >
                        Back to home page
                    </button>
                </div>
            </div>
        );
    }
}

export default OrderSubmitted;
