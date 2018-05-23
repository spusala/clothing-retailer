import React, {Component} from 'react';

import { FormControl, Button, Panel } from 'react-bootstrap';

export class Checkout extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            cartAmount : '0.00'
        };
        this.goBack = this.goBack.bind(this);
        this.applyDiscount = this.applyDiscount.bind(this);
        this.addVoucher = this.addVoucher.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ voucher: e.target.value });
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            cartAmount: nextProps.cartAmount,
            cartItems: nextProps.cartItems
        });
    }

    goBack(){
        this.props.hideCheckout();
    }

    addVoucher(){
        let voucher = this.state.voucher;
        if(voucher && voucher === "ADD15OFF") {
            this.applyDiscount();
        } else{
            alert('Invalid voucher!');
        }
    }

    applyDiscount(){
        let amount = this.state.cartAmount;
        let discount;
        let payableAmount;

        let footwearDiscount =this.state.cartItems.some(i => {
            return i.category.includes('Footwear');
        });

        if(footwearDiscount && amount > 75){
            discount = 15;
        } else if(amount > 50){
            discount = 10;
        } else{
            discount = 5;
        }
        payableAmount = amount - discount;
        this.setState({
            payableAmount: payableAmount,
            discAdded: true
        });
    }


    render() {
        return (
            <div className={this.props.cartVisible ? "visible" : "invisible"}>
                <h3>Amount to be paid:£{this.state.cartAmount}</h3><br/>
                <FormControl
                    type="text"
                    value={this.state.voucher}
                    placeholder="Enter Voucher Code"
                    onChange={this.handleChange}
                /><br/>
                <Button bsStyle="primary" onClick={() => this.addVoucher()}>Add Voucher</Button><br/>
                <h4>Amount to be paid after discount:£{this.state.payableAmount}</h4><br/>

                <div>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title componentClass="h3">Vouchers</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <h4>ADD15OFF - Vouchers Available:</h4>
                            <p>The discount will be automatically applied.</p>
                            <p>£15.00 off when you have bought at least one footwear item and spent over £75.00</p>
                            <p>£10.00 off when you spend over £50.00</p>
                            <p>£5.00 off your order</p>
                        </Panel.Body>
                        <br/><br/>
                    </Panel>
                </div>
                <Button bsStyle="info" onClick={() => this.goBack()}>Go Back</Button>
            </div>
        );
    }
}