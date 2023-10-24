const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const usersPath = path.join(__dirname, '../data/users.json');

let model = {
    findAll: () => {
        const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

        return users;
    },

    findByEmail: (email) => {
        const users = model.findAll();

        const coincidence = users.find(usuarioActual => usuarioActual.email === email);

        return coincidence;
    },

    create: (userData) => {
        let emailInUse = model.findByEmail(userData.email);

        if(emailInUse){
            return ({
                emailExist: 'Este email ya se encuentra en uso'
            })
        }
        
        let users = model.findAll();

        let newUser = {
            id: uuid.v4(),
            ...userData
        };

        newUser.password = bcrypt.hashSync(newUser.password, 12);

        users.push(newUser);

        fs.writeFileSync(usersPath, JSON.stringify(users), 'utf-8');

        return newUser;
    }
};

module.exports = model;