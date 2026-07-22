const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'data', 'index.ts');
const clientsLogoPath = path.join(__dirname, 'public', 'ClientsLogo');

let content = fs.readFileSync(dataFilePath, 'utf8');

const files = fs.readdirSync(clientsLogoPath).filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

let counter = 1;
let newItems = [];

files.forEach(file => {
  // Try to create a readable name from the file name
  const name = file.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '')
                   .replace(/[_-]/g, ' ')
                   .replace(/\b\w/g, c => c.toUpperCase());
                   
  newItems.push(`  { id: "cli-${counter++}", name: "${name}", logoUrl: "/ClientsLogo/${file}", category: "Partner" }`);
});

const newClientsString = 'export const CLIENTS: Client[] = [\n' + newItems.join(',\n') + '\n];';

const updatedContent = content.replace(/export const CLIENTS: Client\[\] = \[[\s\S]*?\];/, newClientsString);

fs.writeFileSync(dataFilePath, updatedContent);
console.log(`Successfully updated CLIENTS with ${newItems.length} logos.`);
