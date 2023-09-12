const middlewares = {
    userLogged: (req, res, next) => {
        res.locals.userLogged = req.session.user;

        next();
    }
};

module.exports = middlewares;