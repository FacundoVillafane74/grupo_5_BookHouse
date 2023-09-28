module.exports = (sequelize, dataTypes) => {
    let alias = 'CategoryProduct';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        }
    };

    let config = {
        tableName: 'category_product',
        timestamps: false
    };

    let CategoryProduct = sequelize.define(alias, cols, config);

    CategoryProduct.associate = (models) =>{
        CategoryProduct.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return CategoryProduct;
};