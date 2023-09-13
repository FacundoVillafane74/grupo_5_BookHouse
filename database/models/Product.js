module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

    let cols = {

    };

    let config = {
        tableName: '',
        timestamps: false
    };

    let Product = sequelize.define(alias, cols, config);

    return Product;
};