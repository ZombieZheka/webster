// server/controllers/index.controller.js

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const controllers = {};

fs.readdirSync(__dirname)
.filter(file => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.controller.js') !== -1
        );
    })
.forEach(file => {
    const controller = require(path.join(__dirname, file));
    const name = file.replace('.controller.js', '');
    controllers[name] = controller;
});

module.exports = controllers;
