const productsModel = require('../models/productsModel');
const { validationResult } = require('express-validator');

let productController = {
    detail: (req, res) => {
        productId = Number(req.params.id);

        let findProduct = productsModel.findById(productId);

        res.render('productDetail', { findProduct });
    },

    cart: (req, res) => {
        res.render('productCart');
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

    create: (req, res) => {
        let errors = validationResult(req);
        let productToCreate = {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            author: req.body.author,
            age: req.body.age,
            price: req.body.price
        };
        if (errors.isEmpty()) {
            let newProduct = {
                ...productToCreate,
                image: req.file.filename
            }

            let productNew = productsModel.create(newProduct);

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
    },

    edit: (req, res) => {
        let productId = Number(req.params.id);

        findProduct = productsModel.findById(productId);

        let errors = req.query;

        res.render('productEdit', {findProduct, errors});
    },

    update: (req, res) => {
        let errors = validationResult(req);

        let productToUpdate = {
            id: Number(req.params.id),
            ...req.body,
        }

        if (errors.isEmpty()) {
            let productUpdate = {
                ...productToUpdate,
                image: req.file ? req.file.filename : req.body['old-image']
            };

            productsModel.update(productUpdate);

            res.redirect('/product/' + productUpdate.id + '/detail');
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/product/' + productToUpdate.id + '/edit?' + queryString);
        }
    },

    destroy: (req, res) => {
        productId = Number(req.params.id);

        productsModel.destroy(productId);

        res.redirect('/');
    }
};

module.exports = productController;