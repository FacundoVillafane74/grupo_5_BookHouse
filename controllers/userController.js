const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

let userController = {
    login: (req, res) => {
        const erorr = req.query.error;

        res.render('login', {error: req.query});
    },


    loginPost: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const userInJson = usersModel.findByEmail(req.body.email);
        if(!userInJson){
           return res.redirect('/user/login?error=el mail o la contraseña son incorrectos');
        };

        const validPw = bcrypt.compareSync(req.body.password, userInJson.password);

        if (validPw) {
            req.session.user = userInJson;
            if (req.body.recordar != undefined){
                res.cookie('recordar', userInJson.email, {maxAge:60000 * 60 * 24 * 7})
            }
            res.redirect('/');
        } else {
            res.redirect('/user/login?error=el mail o la contraseña son incorrectos');
        }
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/login?' + queryString);
        }
    },
    
    register: (req, res) => {
        res.render('register', {errors: req.query, emailExist: req.query.emailExist});
    },

    registerPost: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const newUser = {
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                image: req.file.filename
            };
            const user = usersModel.create(newUser);
            if(user.emailExist){
                res.redirect('/user/register?emailExist=' + user.emailExist)
            }
            else {
                res.redirect('/user/login');
            }

        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/register?' + queryString);
        }
    }
};

module.exports = userController;