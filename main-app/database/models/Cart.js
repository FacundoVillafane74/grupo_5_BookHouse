module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "User",
                key: "id"
            }
        },

        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Product",
                key: "id"
            }
        },

        count: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        },

        payment_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },

        format_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'cart',
        timestamps: false
    };

    let Cart = sequelize.define(alias, cols, config);
     
    Cart.associate = (models) =>{
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });

        Cart.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });

        Cart.belongsTo(models.TypePayment, {
            as: "typePayment",
            foreignKey: "payment_id"
        });

        Cart.belongsTo(models.TypeFormat, {
            as: "typeFormat",
            foreignKey: "format_id"
        });

    }

    return Cart;
};