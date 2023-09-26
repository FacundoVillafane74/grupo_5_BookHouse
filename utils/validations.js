const { body } = require('express-validator');
const path = require('path');

const validations = {
    validationFormAdd: [
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
    ],

    validationFormEdit: [
        body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
        body('description').notEmpty().withMessage('Debes completar el campo de descripción'),
        body('category').notEmpty().withMessage('Debes elegir una categoría'),
        body('author').notEmpty().withMessage('Debes completar el campo con un autor'),
        body('age').notEmpty().withMessage('Debes completar el año de lanzamiento'),
        body('price').notEmpty().withMessage('Debes colocar un precio')
    ],

    validationFormRegister: [
        body('name').notEmpty().withMessage('Debes completar el campo de nombre'),
        body('last_name').notEmpty().withMessage('Debes completar el campo de apellido'),
        body('email').notEmpty().withMessage('Debes completar el campo con tu email').bail()
        .isEmail().withMessage('Debes poner un formato de email válido'),
        body('password').notEmpty().withMessage('Debes completar el campo con tu contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
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
    ],

    validationFormLogin: [
        body('email').notEmpty().withMessage('Debes completar el campo con tu email').bail()
        .isEmail().withMessage('Debes poner un formato de email válido'),
        body('password').notEmpty().withMessage('Debes completar el campo con tu contraseña').bail()
        .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    ]
};

module.exports = validations;