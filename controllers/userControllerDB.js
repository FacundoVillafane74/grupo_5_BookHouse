// Faltan importar los modelos

module.exports = {
    login: (req, res) => {
        res.render('login', {errors: req.query, error: req.query.error});
    },

    loginPost: async (req, res) => {
        try {
            
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