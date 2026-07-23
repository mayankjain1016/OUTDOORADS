const fs = require('fs');
const path = require('path');

const dataFilePath = 'src/data/index.ts';
let content = fs.readFileSync(dataFilePath, 'utf8');

const lines = content.split('\n');
const newLines = [];
let insideClients = false;

for (const line of lines) {
  if (line.includes('export const CLIENTS: Client[] = [')) {
    insideClients = true;
  }
  if (insideClients && line.includes('];')) {
    insideClients = false;
  }

  if (insideClients) {
    const match = line.match(/logoUrl:\s*"([^"]+)"/);
    if (match) {
      const logoUrl = match[1];
      const localPath = path.join('public', logoUrl.replace(/^\//, ''));
      if (!fs.existsSync(localPath)) {
        console.log('Removing reference to missing file:', logoUrl);
        continue; // Skip this line because the file is deleted
      }
    }
  }
  newLines.push(line);
}

fs.writeFileSync(dataFilePath, newLines.join('\n'));
console.log('Cleanup complete.');
