const { User } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = {
    login: (req, res) => {
        res.render('login', {errors: req.query, error: req.query.error});
    },

    loginPost: async (req, res) => {
        try {
            /* let errors = validationResult(req);
            if(errors.isEmpty()){ */
                const userInDB = await User.findOne({
                    where: {
                        email: req.body.email
                    },
                    raw: true,
                });
                /* console.log(userInDB);  */
            if(!userInDB){
               return res.redirect('/user/login?error=El email o la contraseña son incorrectos');
            };
    
            const validPw = bcrypt.compareSync(req.body.password, userInDB.password);
    
            if (validPw) {
                /* delete userInDB.password */
                req.session.user = userInDB;
                if (req.body.recordar != undefined){
                    res.cookie('recordar', userInDB.email, {maxAge: 60000 * 60 * 24 * 7})
                }
                /* console.log(req.session.user); */
                res.redirect('/');
            } else {
                res.redirect('/user/login?error=El email o la contraseña son incorrectos');
            }
            /* } else {
                let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);
    
                let queryString = queryArray.join('');
    
                res.redirect('/user/login?' + queryString);
            }  */
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
            /* let errors = validationResult(req); */
            const userToCreate = {
                name: req.body.name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 12),
                rol_id: 2
            };
            /* if(errors.isEmpty()){ */
                let newUser = {
                    ...userToCreate,
                    image: req.file.filename
                }

                const user = await User.create(newUser);

                if(user.emailExist){
                    res.redirect('/user/register?emailExist=' + user.emailExist)
                }
                else {
                    res.redirect('/user/login');
                }

            /* } else {
                let prevDataQuery = '';

                for (let field in userToCreate) {
                    prevDataQuery += `&${'prev' + field}=${userToCreate[field]}`
                }

                let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

                let queryString = queryArray.join('');

                res.redirect('/user/register?' + queryString + prevDataQuery);
            } */
        } catch (error) {
            res.send(error);
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