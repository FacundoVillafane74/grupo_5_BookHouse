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
    }
};

module.exports = middlewares;