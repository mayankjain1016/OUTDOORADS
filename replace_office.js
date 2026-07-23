const fs = require('fs');

const contactPath = 'src/app/contact/page.tsx';
let contactContent = fs.readFileSync(contactPath, 'utf8');

// Replace Headquarters with Office in the Contact Card
contactContent = contactContent.replace(
  '<h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Headquarters</h3>',
  '<h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Office</h3>'
);

// Replace Headquarters and Address in the Map Section
contactContent = contactContent.replace(
  '<h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">ApexOOH Headquarters</h4>\n              <p className="text-primary-600 text-sm md:text-base">BKC, Mumbai</p>',
  '<h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">Adexpo Office</h4>\n              <p className="text-primary-600 text-sm md:text-base">Sanjay Place, Agra</p>'
);

// Fallback in case the map section uses Windows line endings
contactContent = contactContent.replace(
  '<h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">ApexOOH Headquarters</h4>\r\n              <p className="text-primary-600 text-sm md:text-base">BKC, Mumbai</p>',
  '<h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">Adexpo Office</h4>\r\n              <p className="text-primary-600 text-sm md:text-base">Sanjay Place, Agra</p>'
);


fs.writeFileSync(contactPath, contactContent);

// Restore the Office text to the Footer since I accidentally removed it entirely earlier
const footerPath = 'src/components/layout/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
if (!footerContent.includes('tracking-widest">Office</span>')) {
  footerContent = footerContent.replace(
    '<li className="col-span-1 min-[360px]:col-span-2 lg:col-span-1 flex flex-col items-start text-left">\n                \n                <span className="text-zinc-200 leading-relaxed max-w-xs">5th floor Corporate Park, Sanjay Place Agra</span>',
    '<li className="col-span-1 min-[360px]:col-span-2 lg:col-span-1 flex flex-col items-start text-left">\n                <span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Office</span>\n                <span className="text-zinc-200 leading-relaxed max-w-xs">5th floor Corporate Park, Sanjay Place Agra</span>'
  );
  
  // Fallback for Windows line endings
  footerContent = footerContent.replace(
    '<li className="col-span-1 min-[360px]:col-span-2 lg:col-span-1 flex flex-col items-start text-left">\r\n                \r\n                <span className="text-zinc-200 leading-relaxed max-w-xs">5th floor Corporate Park, Sanjay Place Agra</span>',
    '<li className="col-span-1 min-[360px]:col-span-2 lg:col-span-1 flex flex-col items-start text-left">\r\n                <span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Office</span>\r\n                <span className="text-zinc-200 leading-relaxed max-w-xs">5th floor Corporate Park, Sanjay Place Agra</span>'
  );
  
  fs.writeFileSync(footerPath, footerContent);
}

console.log("Replaced Headquarters with Office successfully!");
