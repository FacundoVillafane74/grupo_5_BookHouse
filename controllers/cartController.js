const path = require('path');

let cartController = {
    cart: (req, res) => {
        const ruta = path.join(__dirname, '../views/productCart.html');
        res.sendFile(ruta);
    }
};

module.exports = cartController;