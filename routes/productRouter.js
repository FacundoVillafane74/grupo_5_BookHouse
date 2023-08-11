const express = require('express');
const productController = require('../controllers/productController');
const path = require('path');
const multer = require('multer');
const { body } = require('express-validator');

const router = express.Router();

// Destino y nombre de los archivos (multer)

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let pathArchives = path.join(__dirname, '../public/images');
        callback(null, pathArchives);
    },
    filename: (req, file, callback) => {
        let nameOfFile = 'img-' + Date.now() + path.extname(file.originalname);
        callback(null, nameOfFile);
    }
});

let upload = multer({storage});

// Validaciones (express-validator)

const validationFormProduct = [
    body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
    body('description').notEmpty().withMessage('Debes completar el campo de descripción'),
    body('category').notEmpty().withMessage('Debes elegir una categoría'),
    body('author').notEmpty().withMessage('Debes completar el campo con un autor'),
    body('age').notEmpty().withMessage('Debes completar el año de lanzamiento'),
    body('price').notEmpty().withMessage('Debes colocar un precio'),
    body('image').custom((value, {req}) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.jpeg'];
        if(file){
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones permitidas son ' + acceptedExtensions.join(', '));
        } 
        } else {
            throw new Error('Tienes que subir una imagen');
        }
        return true;
    })
];

// - /product

// DETALLE DEL PRODUCTO

router.get('/:id/detail', productController.detail);

// CARRITO DE COMPRAS

router.get('/cart', productController.cart);

// AGREGAR PRODUCTOS

router.get('/add', productController.add);
router.post('/add', [upload.single('image'), validationFormProduct], productController.create);

// EDITAR PRODUCTOS

router.get('/:id/edit', productController.edit);
router.put('/:id/edit', upload.single('image'), productController.update);

// ELIMINAR PRODUCTOS

router.delete('/:id/delete', productController.destroy);

module.exports = router;