const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

async function run() {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  // Leer los archivos de prueba
  fs.readdirSync(testsRoot).forEach(file => {
    if (file.endsWith('.test.js')) {
      mocha.addFile(path.join(testsRoot, file));
    }
  });

  // Ejecutar las pruebas
  return new Promise((c, e) => {
    mocha.run(failures => {
      if (failures > 0) {
        e(new Error(`${failures} tests failed.`));
      } else {
        c();
      }
    });
  });
}

module.exports = {
  run
};
