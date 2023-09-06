let usersModel = require('../models/usersModel');

let middleware = (req, res, next) => {
    if(req.cookies.recordar != undefined && req.session.user == undefined) {
        let userCookie = usersModel.findByEmail(req.cookies.recordar);
        if(userCookie) {
            req.session.user = userCookie
        }
    }
    next();
};

module.exports = middleware;