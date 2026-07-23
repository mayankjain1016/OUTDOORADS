const fs = require('fs');

const footerPath = 'src/components/layout/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace(
  '<span className="text-brand-blue/80 mb-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Office</span>',
  ''
);
fs.writeFileSync(footerPath, footerContent);

const contactPath = 'src/app/contact/page.tsx';
let contactContent = fs.readFileSync(contactPath, 'utf8');

contactContent = contactContent.replace(
  '<h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Headquarters</h3>\n                    <p className="text-primary-600 text-sm md:text-base">5th floor Corporate Park<br/>Sanjay Place<br/>Agra</p>',
  '<p className="text-primary-600 text-sm md:text-base">5th floor Corporate Park<br/>Sanjay Place<br/>Agra</p>'
);

contactContent = contactContent.replace(
  '<h4 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-0.5 md:mb-1">ApexOOH Headquarters</h4>\n              <p className="text-primary-600 text-sm md:text-base">BKC, Mumbai</p>',
  '<p className="text-primary-600 text-sm md:text-base">Sanjay Place, Agra</p>'
);

// Fix the primary button from earlier as well
contactContent = contactContent.replace(
  'variant={popup.type === "success" ? "default" : "outline"}',
  'variant={popup.type === "success" ? "primary" : "outline"}'
);

fs.writeFileSync(contactPath, contactContent);

console.log("Office and Headquarters text removed successfully!");
