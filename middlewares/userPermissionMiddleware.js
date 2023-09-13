let middlewares = {
    auth: (req, res, next) => {
        if(req.session.user) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },

    guest: (req, res, next) => {
        if(!req.session.user) {
            next();
        } else {
            res.redirect('/');
        }
    },

    admin: (req, res, next) => {
        if(req.session.user.category === 'admin') {
            next();
        } else {
            res.redirect('/user/login');
        }
    },
};

module.exports = middlewares;