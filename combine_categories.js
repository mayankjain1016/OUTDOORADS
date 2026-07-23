const fs = require('fs');
let data = fs.readFileSync('src/data/index.ts', 'utf8');

// Combine Lifestyle and Tabacoo into FMCG
data = data.replace(/{ id: "ind-9", name: "Tabacoo" }/g, '{ id: "ind-9", name: "FMCG" }');
data = data.replace(/[ \t]*{ id: "ind-12", name: "Lifestyle" },\n/g, '');

data = data.replace(/industryName: "Tabacoo"/g, 'industryName: "FMCG"');
data = data.replace(/industryName: "Lifestyle"/g, 'industryName: "FMCG"');

data = data.replace(/industryId: "ind-12"/g, 'industryId: "ind-9"');

data = data.replace(/campaignTitle: "Tabacoo Campaign"/g, 'campaignTitle: "FMCG Campaign"');
data = data.replace(/campaignTitle: "Lifestyle Campaign"/g, 'campaignTitle: "FMCG Campaign"');

fs.writeFileSync('src/data/index.ts', data);
console.log('Categories combined successfully!');
