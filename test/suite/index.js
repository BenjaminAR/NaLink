const fs = require('fs');
const path = require('path');
const Mocha = require('mocha');

function findTestFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat && stat.isDirectory()) {
      // Recursividad para buscar en subdirectorios
      results = results.concat(findTestFiles(fullPath));
    } else if (file.endsWith('.test.js')) {
      results.push(fullPath);
    }
  });

  return results;
}

async function run() {
  const mocha = new Mocha({
    ui: 'tdd',
    color: true
  });

  const testsRoot = path.resolve(__dirname, '..');

  try {
    const files = findTestFiles(testsRoot);

    // Agrega los archivos a la suite de pruebas
    files.forEach(f => mocha.addFile(f));

    // Ejecuta las pruebas de mocha
    return new Promise((resolve, reject) => {
      mocha.run(failures => {
        if (failures > 0) {
          reject(new Error(`${failures} tests failed.`));
        } else {
          resolve();
        }
      });
    });
    
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = {
  run
};
