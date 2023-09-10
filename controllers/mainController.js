const mainModel = require('../models/mainModel');

let mainController = {
    home: (req, res) => {
        let productsSuspenso = mainModel.productsSuspenso();
        let productsFiccion = mainModel.productsFiccion();

        res.render('index', {productsSuspenso, productsFiccion});
    },

    search: (req, res) => {
        let userText = req.query.search

        let productSearch = mainModel.search(userText);

        res.render('productResult', { productSearch, userText });
    }
};

module.exports = mainController;