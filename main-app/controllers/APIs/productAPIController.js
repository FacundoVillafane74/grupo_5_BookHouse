const { Product } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            const products = await Product.findAll();

            let productsAPI = products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    category: product.category_id,
                    age: product.age,
                    price: product.price,
                    image: 'http://localhost:3001/images/products/' + product.image,
                    detail: '/product/api/' + product.id + '/detail'
                }
            });

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

            productsAPI.map(product => product.category == 1 ? product.category = 'Suspenso' : product.category = 'Ciencia Ficcion');

            let respuesta = {
                count: products.length,
                countByCategory: [
                    {
                        suspenso: productsSuspenso.length
                    },
                    {
                        cienciaFiccion: productsFiccion.length
                    }
                ],
                products: productsAPI
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
                url: 'http://localhost:3001/images/products/' + findProduct.image
            }

            res.status(200).json(respuesta);
        } catch (error) {
            res.send(error);
        }
    }
}