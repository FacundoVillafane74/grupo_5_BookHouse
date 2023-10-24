module.exports = (sequelize, dataTypes) => {
    let alias = 'Favorite';

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
    };

    let config = {
        tableName: 'favorites',
        timestamps: false
    };

    let Favorite = sequelize.define(alias, cols, config);

    Favorite.associate = (models) => {
        Favorite.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        });

        Favorite.belongsTo(models.Product, {
            as: "product",
            foreignKey: "product_id"
        });
    }
    return Favorite;
};