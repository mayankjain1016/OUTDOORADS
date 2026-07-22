const fs = require('fs');
let data = fs.readFileSync('src/data/index.ts', 'utf8');
data = data.replace(/cityName: "Mumbai"/g, 'cityName: "Agra"');
fs.writeFileSync('src/data/index.ts', data);
console.log('Done!');
