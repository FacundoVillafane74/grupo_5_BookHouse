const fs = require('fs');
const path = require('path');
const usersPath = path.join(__dirname, '../data/users.json');

let model = {
    findByEmail: (email) => {
        const useres = JSON.parse(fs.readFileSync(model.fileRoute, 'utf-8'));

        const coincidence = users.find(usuarioActual => usuarioActual.email === email);

        return coincidence || null;
    },
};

module.exports = model;