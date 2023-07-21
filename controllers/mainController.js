const path = require('path');

let mainController = {
    home: (req, res) => {
        const ruta = path.join(__dirname, '../views/index.html');
        res.sendFile(ruta);
    },
};

module.exports = mainController;