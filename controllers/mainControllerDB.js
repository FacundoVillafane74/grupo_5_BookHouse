// Falta importación del modelo
const { Product } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    home: async (req, res) => {
        try {
            const productsSuspenso = await Product.findAll({
                where: {
                    category_id: 1
                }
            });

            const productsFiccion = await Product.findAll({
                where: {
                    category_id: 2
                }
            }); 

            res.render('index', {productsSuspenso, productsFiccion});
        } catch (error) {
            res.send(error);
        }
    },

    search: async (req, res) => {
        try {
            let userText = req.query.search

            let productSearch = await Product.findAll({
                where: {
                    name: {[Op.like]: '%' + userText + '%'}
                }
            });

            res.render('productResult', { productSearch, userText });
        } catch (error) {
            res.send(error);
        }
    }
};
