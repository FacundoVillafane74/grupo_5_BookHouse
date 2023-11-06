module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';

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
        tableName: 'rol',
        timestamps: false
    };

    let Rol = sequelize.define(alias, cols, config);

    Rol.associate = (models) =>{
        Rol.hasMany(models.User, {
            as: "users",
            foreignKey: "rol_id"
        })
    }

    return Rol;
};