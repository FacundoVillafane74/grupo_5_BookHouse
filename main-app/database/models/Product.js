module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },

        description: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        author: {
            type: dataTypes.STRING(50),
            allowNull: false
        },

        age: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'products',
        timestamps: false
    };

    let Product = sequelize.define(alias, cols, config);

    Product.associate = (models) =>{
        Product.belongsTo(models.CategoryProduct, {
            as: "category",
            foreignKey: "category_id"
        });

        Product.belongsToMany(models.User, {
            as: "favorites-product",
            through: "favorites",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        });

        Product.belongsToMany(models.Cart, {
            as: "cart-product",
            through: "cart",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        });
    }

    return Product;
};