// Faltan importar los modelos

module.exports = {
    detail: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    },

    cart: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    },

    add: (req, res) => {
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

        res.render('productAdd', { errors, oldData });
    },

    create: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    },

    edit: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    },

    update: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    },

    destroy: async (req, res) => {
        try {
            
        } catch (error) {
            res.send(error);
        }
    }
};