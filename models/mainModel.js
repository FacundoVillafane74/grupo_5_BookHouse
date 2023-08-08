const fs = require('fs');
const path = require('path');
const productsPath = path.join(__dirname, '../data/products.json');

let model = {
    findAll: () => {
        let products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

        return products;
    },

    productsSuspenso: () => {
        let products = model.findAll();

        let productsSuspenso = products.filter(cadaProduct => cadaProduct.category == 'suspenso');

        return productsSuspenso;
    },

    productsFiccion: () => {
        let products = model.findAll();

        let productsFiccion = products.filter(cadaProduct => cadaProduct.category == 'ciencia-ficcion');

        return productsFiccion;
    }
};

module.exports = model;
