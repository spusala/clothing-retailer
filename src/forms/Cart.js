import React, {Component} from 'react';
import uuid from 'uuid';

import { Table, Button } from 'react-bootstrap';

export class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            amount : '0.00'
        };
        this.createCartItems = this.createCartItems.bind(this);
        this.removeSelectedItem = this.removeSelectedItem.bind(this);
        this.addItemsToCart = this.addItemsToCart.bind(this);
        this.checkout = this.checkout.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.cartItems){
            this.cartItems = this.addItemsToCart(nextProps.cartItems);
            this.updateCart(this.cartItems);
        }
    }

    addItemsToCart(newItem){
        if(!this.cartItems){
            this.cartItems = [];
        }
        this.cartItems.push(newItem);
        return this.cartItems.map((item) =>
        {
            return {
                "id": uuid.v4(),
                "name": item.name,
                "price": item.price,
                "category": item.category
            };
        });
    }

    updateCart(cartList){
        let amount = 0;
        this.cartItems.map(item => {
            amount = amount + item.price
        });
        this.setState({
            amount: amount,
            cartItems: cartList
        });
    }

    removeSelectedItem(removedItem){
        this.props.addRemovedItemToStock(removedItem);
        this.cartItems = this.cartItems.filter(item => item.id !== removedItem.id);
        this.updateCart(this.cartItems);
    }

    checkout(){
        this.props.displayCheckout(this.state);
    }

    createCartItems() {
        return this.state.cartItems.map(item => {
            return <tr key={item.id}>
                <td data-es-label="Item">{item.name}</td>
                <td data-es-label="Price">£{item.price}</td>
                <td data-es-label="Add"><input name="Remove" type="button" value="Remove" onClick={() => this.removeSelectedItem(item)}/></td>
            </tr>;
        });
    }

    render() {
        return (
            <div className={!this.props.cartVisible ? "visible" : "invisible"}>
                <div>
                    <h3>Cart:£{this.state.amount}</h3>
                </div>
                {(this.state.cartItems.length > 0) &&
                    <div>
                        <h3>Selected Items:</h3>
                        <Table responsive id="cartTable" striped condensed hover>
                            <tbody>
                            {this.createCartItems()}
                            </tbody>
                            <Button bsStyle="primary" onClick={() => this.checkout()}>Proceed To Checkout</Button>
                        </Table>
                    </div>
                    }
            </div>
        );
    }
}