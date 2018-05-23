import React, { Component } from 'react';
import {ProductService} from './services/ProductService';

import {RetailerForm} from './forms/RetailerForm'
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.productService = new ProductService();

        this.state = {
            products: this.productService.fetchAllProducts()
        };
    }


  render() {
    return (
      <div className="container">
          <main>
              <RetailerForm {...this.state} />
          </main>
      </div>
    );
  }
}

export default App;
