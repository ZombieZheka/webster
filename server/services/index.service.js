// server/services/index.service.js

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const services = {};

fs.readdirSync(__dirname)
.filter(file => {
    return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.service.js') !== -1
        );
    })
.forEach(file => {
    const service = require(path.join(__dirname, file));
    const name = file.replace('.service.js', '');
    services[name] = service;
});

module.exports = services;
