const fs = require('fs');

const dataFile = 'src/data/index.ts';
let content = fs.readFileSync(dataFile, 'utf8');
const lines = content.split('\n');

// Keep lines that DO NOT contain '6e3e3d04-17ab-4219-8573-fb45c8ee7468'
const newLines = lines.filter(line => !line.includes('6e3e3d04-17ab-4219-8573-fb45c8ee7468'));

fs.writeFileSync(dataFile, newLines.join('\n'));
console.log(`Removed ${lines.length - newLines.length} lines from src/data/index.ts`);
