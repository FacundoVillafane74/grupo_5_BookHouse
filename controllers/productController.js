const productsModel = require('../models/productsModel');

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
        res.render('productAdd');
    },

    create: (req, res) => {
        if(req.file){
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
            res.render('productAdd');
        }
    },

    edit: (req, res) => {
        productId = Number(req.params.id);

        findProduct = productsModel.findById(productId);

        res.render('productEdit', {findProduct});
    },

    update: (req, res) => {
        let productUpdate = {
            id: Number(req.params.id),
            ...req.body,
            image: req.file.filename 
        }

        productsModel.update(productUpdate);

        res.redirect('/product/' + productUpdate.id + '/detail');
    },

    destroy: (req, res) => {
        productId = Number(req.params.id);

        productsModel.destroy(productId);

        res.redirect('/');
    }
};

module.exports = productController;