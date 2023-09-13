const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { log } = require('console');

let userController = {
    login: (req, res) => {
        res.render('login', {errors: req.query, error: req.query.error});
    },

    loginPost: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const userInJson = usersModel.findByEmail(req.body.email);
        if(!userInJson){
           return res.redirect('/user/login?error=El email o la contraseña son incorrectos');
        };

        const validPw = bcrypt.compareSync(req.body.password, userInJson.password);

        if (validPw) {
            delete userInJson.password
            req.session.user = userInJson;
            if (req.body.recordar != undefined){
                res.cookie('recordar', userInJson.email, {maxAge: 60000 * 60 * 24 * 7})
            }
            res.redirect('/');
        } else {
            res.redirect('/user/login?error=El email o la contraseña son incorrectos');
        }
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/login?' + queryString);
        }
    },

    register: (req, res) => {
        let errors = {};
        let oldData = {};

        for (const field in req.query) {
            if (Object.hasOwnProperty.call(req.query, field)) {
                const element = req.query[field];
                if(field.includes('prev')){
                    let newField = field.replace('prev', '');
                    oldData[newField] = element;
                } else {
                    errors[field] = element;
                }
            }
        }
        
        res.render('register', {errors, oldData, emailExist: req.query.emailExist});
    },

    registerPost: (req, res) => {
        let errors = validationResult(req);
        const userToCreate = {
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
        };
        if(errors.isEmpty()){
            let newUser = {
                ...userToCreate,
                image: req.file.filename
            }

            const user = usersModel.create(newUser);

            if(user.emailExist){
                res.redirect('/user/register?emailExist=' + user.emailExist)
            }
            else {
                res.redirect('/user/login');
            }

        } else {
            let prevDataQuery = '';

            for (let field in userToCreate) {
                prevDataQuery += `&${'prev' + field}=${userToCreate[field]}`
            }

            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/user/register?' + queryString + prevDataQuery);
        }
    },

    profile: (req, res) => {
        res.render('profile');
    },

    logout: (req, res) => {
        res.clearCookie('recordar');
        req.session.destroy();

        res.redirect('/');
    }
};

module.exports = userController;