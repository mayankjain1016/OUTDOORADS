const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'data', 'index.ts');
let content = fs.readFileSync(dataFilePath, 'utf8');

const regex = /imageUrl:\s*"(.*?)"/g;
let match;
let missing = [];

while ((match = regex.exec(content)) !== null) {
  let imgPath = match[1];
  if (imgPath.startsWith('/Gellary')) {
    // Check if file exists
    let fullPath = path.join(__dirname, 'public', imgPath);
    // URL decode the path in case there are encoded spaces in the JSON string
    // Wait, the JSON string might just be normal characters. 
    fullPath = decodeURI(fullPath);
    if (!fs.existsSync(fullPath)) {
      missing.push(imgPath);
    }
  }
}

if (missing.length > 0) {
  console.log('Missing images:');
  missing.forEach(m => console.log(m));
} else {
  console.log('All local images found!');
}
