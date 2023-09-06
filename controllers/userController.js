const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const bcrypt = requiere('bcrypt');

let userController = {
    getLogin: (req, res) => {
        const erorr = req.query.error;

        res.render('login', {error: req.query});
    },

    login: (req, res) => {
        const userInJson = userModel.findByEmail(req.body.email);
        if(!userInJson){
           return res.redirect('/user/login?error=el mail o la contraseña son incorrectos');
        };

        const validPw = bcrypt.compareSync(req.body.password, userInJson.password);

        if (validPw) {
            req.session.user = userInJson;
            res.redirect('/');
        } else {
            res.redirect('/user/login?error=el mail o la contraseña son incorrectos');
        }
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