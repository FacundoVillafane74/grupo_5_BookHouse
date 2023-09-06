const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { use } = require('../routes/mainRouter');

const usersPath = path.join(__dirname, '../data/users.json');

let model = {

};

module.exports = model;