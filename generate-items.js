const fs = require('fs');
const path = require('path');

const folders = ['Fashion', 'Lifestyle'];
const industryMap = {
  'Fashion': 'ind-11',
  'Lifestyle': 'ind-12'
};

let counter = 200;
let newItems = [];

folders.forEach(folder => {
  const folderPath = path.join(__dirname, 'public', 'Gellary', folder);
  if (fs.existsSync(folderPath)) {
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.jfif'));
    files.forEach(file => {
      newItems.push(`  { id: "gal-${counter++}", campaignTitle: "${folder} Campaign", industryId: "${industryMap[folder]}", industryName: "${folder}", cityName: "Mumbai", imageUrl: "/Gellary/${folder}/${file}" },`);
    });
  }
});

fs.writeFileSync('new_gallery_items.txt', newItems.join('\n'));
