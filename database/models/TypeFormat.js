module.exports = (sequelize, dataTypes) => {
    let alias = 'TypeFormat';

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
        tableName: 'type_format',
        timestamps: false
    };

    let TypeFormat = sequelize.define(alias, cols, config);

    TypeFormat.associate = (models)=>{
        TypeFormat.hasMany(models.Cart, {
            as: "typeFormat",
            foreignKey: "format_id"
        });
    } 

    return TypeFormat;
};