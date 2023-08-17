const productsModel = require('../models/productsModel');
const { validationResult } = require('express-validator');

let productController = {
    detail: (req, res) => {
        productId = Number(req.params.id);

        let findProduct = productsModel.findById(productId);

        res.render('productDetail', {findProduct});
    },
    
    cart: (req, res) => {
        res.render('productCart');
    },

    add: (req, res) => {
        console.log(req.query);
        res.render('productAdd', {errors: req.query});
    },

    create: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
        let newProduct = {
            name: req.body.name,
            description: req.body.description,
            image: req.file.filename,
            category: req.body.category,
            author: req.body.author,
            age: req.body.age,
            price: req.body.price
        };

        let productNew = productsModel.create(newProduct);

        res.redirect('/product/' + productNew.id + '/detail');
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/product/add?' + queryString);
        }
    },

    edit: (req, res) => {
        productId = Number(req.params.id);

        findProduct = productsModel.findById(productId);

        res.render('productEdit', {findProduct});
    },

    update: (req, res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
            let productUpdate = {
                id: Number(req.params.id),
                ...req.body,
                image: req.file ? req.file.filename : req.body['old-image']
            }

            productsModel.update(productUpdate);

            res.redirect('/product/' + productUpdate.id + '/detail');
        } else {
            let queryArray = errors.errors.map(error => '&' + error.path + '=' + error.msg);

            let queryString = queryArray.join('');

            res.redirect('/product/add?' + queryString);
        }
    },

    destroy: (req, res) => {
        productId = Number(req.params.id);

        productsModel.destroy(productId);

        res.redirect('/');
    }
};

module.exports = productController;