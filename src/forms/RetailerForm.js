import React, {Component} from 'react';
import {ItemSection} from './ItemSection';
import {Cart} from './Cart';
import {Checkout} from './Checkout';

export class RetailerForm extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props,
            displayCheckout:false,
            addedItem: []
        };
        this.addToCart = this.addToCart.bind(this);
        this.displayCheckout = this.displayCheckout.bind(this);
        this.hideCheckout = this.hideCheckout.bind(this);
        this.addItemToStock = this.addItemToStock.bind(this);
    }

    addToCart(item){
        //The item will be added to the cart and stock will be decremented by one item
        if(item.stock > 0) {
            item.stock--;
            this.setState({
                addedItem: item
            });
        } else{
            alert('Sorry, out of stock!');
        }

    }

    addItemToStock(item){
        // TODO:Add the item back to the stock when user removed from the cart. We need to set the state with the new list created with the stock.
        this.state.products.map(product => {
            if(product.name === item.name){
                product.stock++;
            }
        });
    }

    displayCheckout(data){
        this.setState({
            amount: data.amount,
            displayCheckout:true,
            cartItems: data.cartItems,
            addedItem : ''
        });
    }

    hideCheckout(){
        this.setState({
            displayCheckout:false
        });
    }

    render() {
        return (
            <div>
                <ItemSection {...this.state} cartVisible={this.state.displayCheckout} addToCart={this.addToCart}/>
                <Cart cartItems={this.state.addedItem} cartVisible={this.state.displayCheckout} displayCheckout={this.displayCheckout} addRemovedItemToStock={this.addItemToStock}/>
                <Checkout cartItems={this.state.cartItems} cartAmount={this.state.amount} hideCheckout={this.hideCheckout} cartVisible={this.state.displayCheckout}/>
            </div>
        );
    }
}
