const multer = require('multer');
const path = require('path');

const storages = {
    storageProducts: multer.diskStorage({
        destination: (req, file, callback) => {
            let pathArchives = path.join(__dirname, '../public/images/products');
            callback(null, pathArchives);
        },
        filename: (req, file, callback) => {
            let nameOfFile = 'img-' + Date.now() + path.extname(file.originalname);
            callback(null, nameOfFile);
        }
    }),

    storageUsers: multer.diskStorage({
        destination: (req, file, callback) => {
            let pathArchives = path.join(__dirname, '../public/images/users');
            callback(null, pathArchives);
        },
        filename: (req, file, callback) => {
            let nameOfFile = 'img-' + Date.now() + path.extname(file.originalname);
            callback(null, nameOfFile);
        }
    })
};

module.exports = storages;