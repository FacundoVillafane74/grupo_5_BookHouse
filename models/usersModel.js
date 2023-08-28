const fs = require('fs');
const path = require('path');
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
};

module.exports = model;