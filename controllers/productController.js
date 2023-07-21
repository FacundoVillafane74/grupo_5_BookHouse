const path = require('path');

let productController = {
    detail: (req, res) => {
        const ruta = path.join(__dirname, '../views/productDetail.html');
        res.sendFile(ruta);
    }
};

module.exports = productController;