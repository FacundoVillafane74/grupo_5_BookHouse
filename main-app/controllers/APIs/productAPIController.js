const { Product } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const products = await Product.findAll();

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

            products.map(product => product.category_id == 1 ? product.category_id = 'Suspenso' : product.category_id = 'Ciencia Ficcion');

            let respuesta = {
                count: products.length,
                countByCategory: {
                    suspenso: productsSuspenso.length,
                    cienciaFiccion: productsFiccion.length
                },
                products: products 
            }

            res.status(200).json(respuesta);
        } catch (error) {
            res.json(error);
        }
    },

    detail: async (req, res) => {
        try {
            const findProduct = await Product.findByPk(req.params.id);

            let respuesta = {
                product: {
                    name: findProduct.name,
                    description: findProduct.description,
                    category_id: findProduct.category_id == 1 ? findProduct.category_id = 'Suspenso' : findProduct.category_id = 'Ciencia Ficcion',
                    author: findProduct.author,
                    age: findProduct.age,
                    price: findProduct.price,
                },
                url: findProduct.image
            }

            res.status(200).json(respuesta);
        } catch (error) {
            res.send(error);
        }
    }
}