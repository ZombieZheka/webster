// server/tests/index.test.js

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const tests = {};

fs.readdirSync(__dirname)
.filter(file => {
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') !== -1
  );
})
.forEach(file => {
  const test = require(path.join(__dirname, file));
  const name = file.replace('.test.js', '');
  tests[name] = test;
});

const delimiter = '------------------------------';
console.log(delimiter);

for (const testName in tests) {
  const testValue = tests[testName];
  console.log(` ${testName} |`, testValue);
  console.log(delimiter);
}
