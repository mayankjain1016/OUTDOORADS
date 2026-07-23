const fs = require('fs');
const path = require('path');

const dataFile = 'src/data/index.ts';
let content = fs.readFileSync(dataFile, 'utf8');

// First, remove the mock items we added earlier
content = content.replace(/\{\s*id: "inv-agra-1"[\s\S]*?\},/, '');
content = content.replace(/\{\s*id: "inv-agra-2"[\s\S]*?\},/, '');
content = content.replace(/\{\s*id: "inv-agra-3"[\s\S]*?\},/, '');
content = content.replace(/\{\s*id: "inv-agra-4"[\s\S]*?\},/, '');

const baseDir = 'public/Inventory/Agra';
const folders = ['Unipole', 'Pole Kiosk', 'Traffic Island', 'Metro Pillers'];
let newItems = '';
let counter = 5; // Start from 5 since 1-4 were used/mocked

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        const imageUrl = `/Inventory/Agra/${folder.replace(/ /g, '%20')}/${encodeURIComponent(file)}`;
        
        const item = `  {
    id: "inv-agra-${counter++}",
    type: "${folder}",
    cityId: "agra",
    cityName: "Agra",
    area: "Various",
    locationDetails: "Contact for specific location details",
    size: "Standard",
    availability: "Available",
    imageUrl: "${imageUrl}",
    description: "Premium ${folder} advertising space in Agra.",
  },
`;
        newItems += item;
      }
    });
  }
});

// Insert the new items at the beginning of the MEDIA_INVENTORY array
content = content.replace(
  'export const MEDIA_INVENTORY: MediaInventory[] = [',
  'export const MEDIA_INVENTORY: MediaInventory[] = [\n' + newItems
);

fs.writeFileSync(dataFile, content);
console.log(`Added ${counter - 5} actual images from Agra folders to the inventory.`);
