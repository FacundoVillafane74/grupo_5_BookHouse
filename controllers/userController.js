const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');

let userController = {
    login: (req, res) => {
        res.render('login', {errors: req.query});
    },

    loginPost: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            res.send('esta todo bien')
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/login?' + queryString);
        }
    },
    register: (req, res) => {
        res.render('register', {errors: req.query});
    },
    registerPost: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            res.send('salio todo bien');
        } else {
            console.log(req.body)
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/register?' + queryString);
        }
    }
};

module.exports = userController;