const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../data/products.json');

let model = {
    findAll: () => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

        return products;
    },

    findById: (id) => {
        let products = model.findAll();

        let findProduct = products.find(cadaProduct => cadaProduct.id === id);

        return findProduct;
    },
    
    create: (newProduct) => {
        let products = model.findAll();

        let lastProductId = products[products.length - 1].id;

        let productNew = {
            id: lastProductId + 1,
            ...newProduct
        };

        products.push(productNew);

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(productsPath, productsJSON, 'utf-8');

        return productNew;
    },

    update: (productUpdated) => {
        let products = model.findAll();

        let productIndex = products.findIndex(cadaProduct => cadaProduct.id === productUpdated.id);

        products[productIndex] = productUpdated;

        let productsJSON = JSON.stringify(products);

        fs.writeFileSync(productsPath, productsJSON, 'utf-8');
    },

    destroy: (id) => {
        let products = model.findAll();

        let newsProducts = products.filter(cadaProduct => cadaProduct.id !== id);

        let productsJSON = JSON.stringify(newsProducts);

        fs.writeFileSync(productsPath, productsJSON, 'utf-8');
    }
};

module.exports = model;