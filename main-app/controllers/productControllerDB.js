const { Product } = require('../database/models');
const { validationResult } = require('express-validator');

module.exports = {
    detail: async (req, res) => {
        try {
            const findProduct = await Product.findByPk(req.params.id);

            res.render('productDetail', { findProduct });
        } catch (error) {
            res.send(error);
        }
    },

    cart: async (req, res) => {
        try {
            res.render('productCart');
        } catch (error) {
            res.send(error);
        }
    },

    favorites: async (req, res) => {
        try {
            res.render('productFavorite');
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
            let errors = validationResult(req);
            
            let productToCreate = {
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category_id,
                author: req.body.author,
                age: req.body.age,
                price: req.body.price,
                detail: ''
            };

            if (errors.isEmpty()) {
                let newProduct = {
                    ...productToCreate,
                    image: req.file.filename
                }

                const productNew = await Product.create(newProduct);

                res.redirect('/product/' + productNew.id + '/detail');
            } else {
                let prevDataQuery = '';

                for (let field in productToCreate) {
                    prevDataQuery += `&${'prev' + field}=${productToCreate[field]}`
                }

                let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

                let queryString = queryArray.join('');

                res.redirect('/product/add?' + queryString + prevDataQuery);
            }
        } catch (error) {
            res.send(error);
        }
    },

    edit: async (req, res) => {
        try {
            const findProduct = await Product.findByPk(req.params.id);

            let errors = req.query;

            res.render('productEdit', {findProduct, errors});
        } catch (error) {
            res.send(error);
        }
    },

    update: async (req, res) => {
        try {
            let errors = validationResult(req);

            let productToUpdate = {
                id: Number(req.params.id),
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category_id,
                author: req.body.author,
                age: req.body.age,
                price: req.body.price
            }

            if (errors.isEmpty()) {
                let productUpdate = {
                    ...productToUpdate,
                    image: req.file ? req.file.filename : req.body['old-image']
                };

                const productsModel = await Product.update(productUpdate, {
                    where: {
                        id: req.params.id
                    }
                });

                res.redirect('/product/' + productUpdate.id + '/detail');
            } else {
                let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

                let queryString = queryArray.join('');

                res.redirect('/product/' + productToUpdate.id + '/edit?' + queryString);
            }
        } catch (error) {
            res.send(error);
        }
    },

    destroy: async (req, res) => {
        try {
            Product.destroy({
                where: {
                    id: req.params.id
                }
            });

            res.redirect('/');
        } catch (error) {
            res.send(error);
        }
    }
};