const fs = require('fs');
const path = 'src/app/contact/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add Mail to lucide-react imports
content = content.replace(
  'import { MapPin, Phone, Clock, Send, MessageSquare } from "lucide-react";',
  'import { MapPin, Phone, Clock, Send, MessageSquare, Mail } from "lucide-react";'
);

// 2. Add useState to imports
content = content.replace(
  'import { motion } from "framer-motion";',
  'import { useState } from "react";\nimport { motion } from "framer-motion";'
);

// 3. Replace Headquarters address
content = content.replace(
  '<p className="text-primary-600 text-sm md:text-base">Level 4, Trade Centre, BKC<br/>Bandra East, Mumbai<br/>Maharashtra 400051</p>',
  '<p className="text-primary-600 text-sm md:text-base">5th floor Corporate Park<br/>Sanjay Place<br/>Agra</p>'
);

// 4. Replace Call Us phone
content = content.replace(
  /<p className="text-primary-600 text-sm md:text-base mb-1">\+91 98765 43210<\/p>\r?\n\s*<p className="text-primary-600 text-sm md:text-base">1800-OOH-APEX \(Toll Free\)<\/p>/,
  '<p className="text-primary-600 text-sm md:text-base mb-1">9997927300</p>'
);

// 5. Replace Business Hours with Email Us
content = content.replace(
  '<Clock className="h-5 w-5 md:h-6 md:w-6" />',
  '<Mail className="h-5 w-5 md:h-6 md:w-6" />'
);
content = content.replace(
  /<h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Business Hours<\/h3>\r?\n\s*<p className="text-primary-600 text-sm md:text-base mb-1">Monday - Friday<\/p>\r?\n\s*<p className="text-primary-900 text-sm md:text-base font-medium">9:00 AM - 6:30 PM<\/p>/,
  '<h3 className="font-heading font-bold text-lg md:text-xl text-primary-900 mb-1 md:mb-2">Email Us</h3>\n                    <p className="text-primary-600 text-sm md:text-base mb-1">oohadexpo@gmail.com</p>'
);

// 6. Replace First Name and Last Name with Full Name
const firstNameBlock = /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">\r?\n\s*<div className="space-y-2">\r?\n\s*<label htmlFor="firstName" className="text-sm font-medium text-primary-700">First Name<\/label>\r?\n\s*<input \r?\n\s*type="text" \r?\n\s*id="firstName" \r?\n\s*className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue\/50 bg-primary-50 transition-all"\r?\n\s*placeholder="John"\r?\n\s*\/>\r?\n\s*<\/div>\r?\n\s*<div className="space-y-2">\r?\n\s*<label htmlFor="lastName" className="text-sm font-medium text-primary-700">Last Name<\/label>\r?\n\s*<input \r?\n\s*type="text" \r?\n\s*id="lastName" \r?\n\s*className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue\/50 bg-primary-50 transition-all"\r?\n\s*placeholder="Doe"\r?\n\s*\/>\r?\n\s*<\/div>\r?\n\s*<\/div>/g;

content = content.replace(
  firstNameBlock,
  `<div className="space-y-2">\n                    <label htmlFor="fullName" className="text-sm font-medium text-primary-700">Full Name</label>\n                    <input \n                      type="text" \n                      id="fullName" \n                      name="fullName"\n                      required\n                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 bg-primary-50 transition-all text-black"\n                      placeholder="John Doe"\n                    />\n                  </div>`
);

// Update name attributes and required tags on other inputs for standard form submission
content = content.replace(
  'id="email"',
  'id="email"\n                        name="email"\n                        required'
);
content = content.replace(
  'id="phone"',
  'id="phone"\n                        name="phone"\n                        required'
);
content = content.replace(
  'id="interest"',
  'id="interest"\n                      name="interest"'
);
content = content.replace(
  'id="message"\n                      rows={4}',
  'id="message"\n                      name="message"\n                      required\n                      rows={4}'
);

// 7. Inject handleSubmit into Contact function
const newHandleSubmit = `export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      number: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Thank you! Your message has been sent successfully.");
        form.reset();
      } else {
        console.error("API Error Response:", result);
        alert(\`❌ Failed to send message: \${result.message || "Unknown error"}\`);
      }
    } catch (error: any) {
      console.error("Fetch Error!", error);
      alert(\`❌ Something went wrong connecting to the server: \${error.message || error}\`);
    } finally {
      setLoading(false);
    }
  };

`;

content = content.replace(/export default function Contact\(\) \{\r?\n/, newHandleSubmit);

content = content.replace(
  'onSubmit={(e) => e.preventDefault()}',
  'onSubmit={handleSubmit}'
);

content = content.replace(
  '<Button type="submit" size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\n                    Send Message',
  '<Button type="submit" disabled={loading} size="lg" className="w-full md:w-auto px-10 h-12 md:h-14 rounded-full text-base md:text-lg shadow-lg hover:shadow-xl transition-all">\n                    {loading ? "Sending..." : "Send Message"}'
);

fs.writeFileSync(path, content);
console.log("Contact page repaired successfully!");
