const { User, Order } = require('../database/models');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        res.render('login', {errors: req.query, error: req.query.error});
    },

    loginPost: async (req, res) => {
        try {
            let errors = validationResult(req);
            if(errors.isEmpty()){
                const userInDB = await User.findOne({
                    where: {
                        email: req.body.email
                    },
                    raw: true,
                });
            if(!userInDB){
               return res.redirect('/user/login?error=El email o la contraseña son incorrectos');
            };
    
            const validPw = bcrypt.compareSync(req.body.password, userInDB.password);
    
            if (validPw) {
                /* delete userInDB.password */ //DUDA
                req.session.user = userInDB;
                if (req.body.recordar != undefined){
                    res.cookie('recordar', userInDB.email, {maxAge: 60000 * 60 * 24 * 7})
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
        } catch (error) {
            res.send(error);
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

    registerPost: async (req, res) => {
        try {
            let errors = validationResult(req);
            const userToCreate = {
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 12),
                rol_id: 2
            };
            if(errors.isEmpty()){
                let newUser = {
                    ...userToCreate,
                    image: req.file.filename
                }

                const usersInDB = await User.findAll({
                    raw: true,
                });
                
                let emailExisted = '';

                usersInDB.forEach(user => {
                    if(user.email == req.body.email) {
                        emailExisted = user.email
                }})

                if(emailExisted == req.body.email){
                    return res.redirect('/user/register?emailExist=' + 'El mail ya existe')
                } else {
                    await User.create(newUser, {raw: true});
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
        } catch (error) {
            res.send(error);
        }
    },

    profile: async (req, res) => {
        try {
            let userFind = await User.findByPk(req.params.id);

            res.render('profile', {userFind});
        } catch (error) {
            res.send(error);
        }
    },

    orders: async (req, res) => {
        let orders = await Order.findAll({
          where: {userId: req.session.user.id}
        });
        return res.render('orderList', {orders});
      },

    editUser: async (req, res) => {
        try {
            let userFind = await User.findByPk(req.params.id);

            let errors = req.query;

            res.render('userEdit', {userFind, errors});
        } catch (error) {
            res.send(error);
        }

    },

    editUpdate: async (req, res) => {
        try {
            let errors = validationResult(req);

            let userToUpdate = {
                id: Number(req.params.id),
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email
            }

            if(errors.isEmpty()) {
                let userUpdated = {
                    ...userToUpdate,
                    image: req.file ? req.file.filename : req.body['old-image']
                }
                
                await User.update(userUpdated, {
                    where: {
                        id: req.params.id
                    }
                });
                
                res.redirect('/user/' + req.params.id + '/profile');
            } else {
                let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

                let queryString = queryArray.join('');

                res.redirect('/user/' + req.params.id + '/edit?' + queryString);
            }
        } catch (error) {
            res.send(error);
        }
    },

    logout: (req, res) => {
        res.clearCookie('recordar');
        req.session.destroy();

        res.redirect('/');
    }
};