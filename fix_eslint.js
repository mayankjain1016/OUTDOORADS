const fs = require('fs');

const pagePath = 'src/app/contact/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// 1. Remove unused Clock import
pageContent = pageContent.replace(
  'import { MapPin, Phone, Clock, Send, MessageSquare, Mail, CheckCircle, XCircle, X } from "lucide-react";',
  'import { MapPin, Phone, Send, MessageSquare, Mail, CheckCircle, XCircle, X } from "lucide-react";'
);

// 2. Remove 'any' from catch block and handle error type properly
pageContent = pageContent.replace(
  '} catch (error: any) {',
  '} catch (error) {'
);
pageContent = pageContent.replace(
  'alert(`❌ Something went wrong connecting to the server: ${error.message || error}`);',
  'const errorMessage = error instanceof Error ? error.message : String(error);\n      alert(`❌ Something went wrong connecting to the server: ${errorMessage}`);'
);
// And for the popup version:
pageContent = pageContent.replace(
  'setPopup({ show: true, type: "error", message: `Something went wrong connecting to the server: ${error.message || error}` });',
  'const errorMessage = error instanceof Error ? error.message : String(error);\n      setPopup({ show: true, type: "error", message: `Something went wrong connecting to the server: ${errorMessage}` });'
);


// 3. Fix loading state usage on the submit button
// Check if disabled={loading} is missing from the Button
if (!pageContent.includes('disabled={loading}')) {
  pageContent = pageContent.replace(
    '<Button type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\n                    Send Message',
    '<Button disabled={loading} type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\n                    {loading ? "Sending..." : "Send Message"}'
  );
  
  // Windows line endings fallback
  pageContent = pageContent.replace(
    '<Button type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\r\n                    Send Message',
    '<Button disabled={loading} type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\r\n                    {loading ? "Sending..." : "Send Message"}'
  );
}

fs.writeFileSync(pagePath, pageContent);
console.log("ESLint errors fixed in page.tsx!");
