const mainModel = require('../models/mainModel');

let mainController = {
    home: (req, res) => {
        let productsSuspenso = mainModel.productsSuspenso();
        let productsFiccion = mainModel.productsFiccion();

        res.render('index', {productsSuspenso, productsFiccion});
    },
};

module.exports = mainController;