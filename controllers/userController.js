const path = require('path');

let userController = {
    login: (req, res) => {
        const ruta = path.join(__dirname, '../views/login.html');
        res.sendFile(ruta);
    },
    register: (req, res) =>{
        const ruta = path.join(__dirname, '../views/register.html');
        res.sendFile(ruta);
    }
};

module.exports = userController;