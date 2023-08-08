const usersModel = require('../models/usersModel');

let userController = {
    login: (req, res) => {
        res.render('login');
    },

    loginPost: (req, res) => {

    },
    
    register: (req, res) =>{
        res.render('register');
    },

    registerPost: (req, res) => {

    }
};

module.exports = userController;