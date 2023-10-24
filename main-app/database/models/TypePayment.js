module.exports = (sequelize, dataTypes) => {
    let alias = 'TypePayment';

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
        tableName: 'type_payment',
        timestamps: false
    };

    let TypePayment = sequelize.define(alias, cols, config);

    TypePayment.associate = (models)=>{
        TypePayment.hasMany(models.Cart, {
            as: "carts",
            foreignKey: "payment_id"
        });
    } 

    return TypePayment;
};