import React, {Component} from 'react';

import { Table } from 'react-bootstrap';

export class ItemSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
        };
        this.props = props;
        this.createFootwearTable = this.createFootwearTable.bind(this);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(item){
        this.props.addToCart(item);
    }

    createFootwearTable() {
            return this.props.products.map(item => {
                return <tr key={item.name}>
                    <td data-es-label="Shoe">{item.name}</td>
                    <td data-es-label="Shoe">{item.category}</td>
                    <td data-es-label="Price">£{item.price}</td>
                    <td data-es-label="Stock">{item.stock}</td>
                    <td data-es-label="Add"><input name="addtocart" type="button" value="Add to Cart" onClick={() => this.buttonClicked(item)}/></td>
                </tr>;
            });
    }

    render() {
        return (
            <div className={!this.props.cartVisible ? "visible" : "invisible"}>
                <h2>Available Products:</h2>
                <Table responsive id="productTable" striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Product </th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Add to Cart</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.createFootwearTable()}
                    </tbody>
                </Table>
            </div>
        );
    }
}