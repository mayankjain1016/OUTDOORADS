const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, 'src', 'data', 'index.ts');
const gellaryPath = path.join(__dirname, 'public', 'Gellary');

let content = fs.readFileSync(dataFilePath, 'utf8');

// Parse the current industries from the file to get their IDs
const industriesMatch = content.match(/export const INDUSTRIES: Industry\[\] = \[([\s\S]*?)\];/);
const industryMap = {};
if (industriesMatch) {
  const lines = industriesMatch[1].split('\n');
  lines.forEach(line => {
    const idMatch = line.match(/id:\s*"([^"]+)"/);
    const nameMatch = line.match(/name:\s*"([^"]+)"/);
    if (idMatch && nameMatch) {
      industryMap[nameMatch[1]] = idMatch[1];
    }
  });
}

// Ensure we found some industries
if (Object.keys(industryMap).length === 0) {
  console.error("No industries found or regex failed.");
  process.exit(1);
}

const folders = fs.readdirSync(gellaryPath, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let counter = 100;
let newItems = [];

folders.forEach(folder => {
  if (industryMap[folder]) {
    const folderPath = path.join(gellaryPath, folder);
    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png|jfif|webp|avif)$/i.test(f));
    
    files.forEach(file => {
      newItems.push(`  { id: "gal-${counter++}", campaignTitle: "${folder} Campaign", industryId: "${industryMap[folder]}", industryName: "${folder}", cityName: "Mumbai", imageUrl: "/Gellary/${folder}/${file}" }`);
    });
  }
});

const newGalleryString = 'export const GALLERY: GalleryItem[] = [\n' + newItems.join(',\n') + '\n];';

const updatedContent = content.replace(/export const GALLERY: GalleryItem\[\] = \[[\s\S]*?\];/, newGalleryString);

fs.writeFileSync(dataFilePath, updatedContent);
console.log(`Successfully updated GALLERY with ${newItems.length} images.`);
