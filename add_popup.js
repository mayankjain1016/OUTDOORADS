const fs = require('fs');
const path = 'src/app/contact/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Update imports
content = content.replace(
  'import { useState } from "react";\nimport { motion } from "framer-motion";',
  'import { useState } from "react";\nimport { motion, AnimatePresence } from "framer-motion";'
);
content = content.replace(
  'import { MapPin, Phone, Clock, Send, MessageSquare, Mail } from "lucide-react";',
  'import { MapPin, Phone, Clock, Send, MessageSquare, Mail, CheckCircle, XCircle, X } from "lucide-react";'
);

// 2. Add Popup state
content = content.replace(
  'const [loading, setLoading] = useState(false);',
  'const [loading, setLoading] = useState(false);\n  const [popup, setPopup] = useState<{ show: boolean; type: "success" | "error"; message: string } | null>(null);'
);

// 3. Replace alerts with setPopup
content = content.replace(
  'alert("✅ Thank you! Your message has been sent successfully.");',
  'setPopup({ show: true, type: "success", message: "Thank you! Your message has been sent successfully. We will get back to you soon." });'
);
content = content.replace(
  'alert(`❌ Failed to send message: ${result.message || "Unknown error"}`);',
  'setPopup({ show: true, type: "error", message: `Failed to send message: ${result.message || "Unknown error"}` });'
);
content = content.replace(
  'alert(`❌ Something went wrong connecting to the server: ${error.message || error}`);',
  'setPopup({ show: true, type: "error", message: `Something went wrong connecting to the server: ${error.message || error}` });'
);

// 4. Inject Popup UI
const popupUI = `
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
            >
              <button
                onClick={() => setPopup(null)}
                className="absolute top-4 right-4 text-primary-400 hover:text-primary-900 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="p-8 text-center">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-6 bg-primary-50">
                  {popup.type === "success" ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-500" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-primary-900 mb-2">
                  {popup.type === "success" ? "Success!" : "Oops!"}
                </h3>
                
                <p className="text-primary-600 mb-8">
                  {popup.message}
                </p>
                
                <Button 
                  onClick={() => setPopup(null)}
                  className="w-full h-12 rounded-xl"
                  variant={popup.type === "success" ? "default" : "outline"}
                >
                  {popup.type === "success" ? "Done" : "Try Again"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
`;

content = content.replace(
  '<div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-primary-foreground">',
  '<div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-24 bg-primary-foreground relative">' + popupUI
);

fs.writeFileSync(path, content);
console.log("Popup added successfully!");
