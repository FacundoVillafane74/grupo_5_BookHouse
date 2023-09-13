module.exports = (sequelize, dataTypes) => {
    let alias = 'User';

    let cols = {

    };

    let config = {
        tableName: '',
        timestamps: false
    };

    let User = sequelize.define(alias, cols, config);

    return User;
};