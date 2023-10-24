let { User } = require('../database/models');

let middleware = async (req, res, next) => {
    try {
        if(req.cookies.recordar != undefined && req.session.user == undefined) {
            let userCookie = await User.findOne({
                where: {
                    email: req.cookies.recordar,
                },
                raw: true
            });
            if(userCookie) {
                req.session.user = userCookie;
            };
        };
        next();      
    } catch (error) {
        res.send(error);
    };
};

module.exports = middleware;