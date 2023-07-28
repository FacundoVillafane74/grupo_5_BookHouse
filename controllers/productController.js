let productController = {
    detail: (req, res) => {
        res.render('productDetail');
    },
    
    cart: (req, res) => {
        res.render('productCart');
    },

    add: (req, res) => {
        res.render('productAdd');
    },
    edit: (req, res) => {
        res.render('productEdit');
    }
};

module.exports = productController;