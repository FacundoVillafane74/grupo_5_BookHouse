module.exports = (sequelize, dataTypes) => {
    let alias = 'User';

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

        last_name: {
            type: dataTypes.STRING(50),
            allowNull: false
        },

        email: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        password: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        image: {
            type: dataTypes.STRING(200),
            allowNull: false
        },

        rol_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };

    let config = {
        tableName: 'users',
        timestamps: false
    };

    let User = sequelize.define(alias, cols, config);

    User.associate = (models) =>{
        User.belongsTo(models.Rol, {
            as: "rol",
            foreignKey: "rol_id"
        });

        User.belongsToMany(models.Product, {
            as: "favorites-user",
            through: "favorites",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        });

        User.belongsToMany(models.Cart, {
            as: "cart-user",
            through: "cart",
            foreignKey: "user_id",
            otherKey: "product_id",
            timestamps: false
        });

        User.hasMany(models.Order, {
            as: "orders",
            foreignKey: "userId",
          });

    }

    return User;
};