let products = require('../data/data.json');

export class ProductService {
    fetchAllProducts() {
        return products;
    }

    fetchProductByCategory(category) {
        return products.filter(p => {
            return p.category === category;
        });
    }
}
