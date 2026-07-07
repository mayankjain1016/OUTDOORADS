const fs = require('fs');
const file = 'src/app/inventory/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix imports
content = content.replace('ChevronDown, Check, Navigation2', 'ChevronDown, ChevronUp, Check, Navigation2, SlidersHorizontal');

// 2. Fix state
const stateToReplace = `  const [selectedCityId, setSelectedCityId] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");`;
const stateReplacement = `  const [selectedCityId, setSelectedCityId] = useState<string>("All");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [expandedCityId, setExpandedCityId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleCity = (id: string) => {
    setExpandedCityId(expandedCityId === id ? null : id);
  };`;
content = content.replace(stateToReplace, stateReplacement);

// 3. Replace layout
const layoutToReplaceRegex = /\{\/\* Horizontal Dropdown Sub Navbar \*\/\}.*?\{\/\* Main Content Grid \*\/\}/s;

const newLayout = `{/* Mobile Sidebar Toggle */}
        <div className="flex justify-center mt-8 md:hidden relative z-40">
          <button 
            className="flex items-center px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-semibold text-slate-700"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8 flex flex-col md:flex-row gap-8 relative z-10">
        {/* Sidebar */}
        <aside className={\`w-full md:w-72 flex-shrink-0 \${isMobileSidebarOpen ? 'block' : 'hidden md:block'}\`}>
          <div className="sticky top-28 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-slate-900">Locations Filter</h3>
              {(selectedCityId !== "All" || selectedArea !== "All") && (
                <button 
                  onClick={() => { setSelectedCityId("All"); setSelectedArea("All"); }}
                  className="text-xs text-brand-blue hover:underline font-bold"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-4">
              {CITIES.map((city) => (
                <div key={city.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                  <button
                    className={\`w-full flex items-center justify-between p-4 text-left transition-colors \${
                      selectedCityId === city.id || expandedCityId === city.id ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'
                    }\`}
                    onClick={() => {
                      toggleCity(city.id);
                      setSelectedCityId(city.id);
                      setSelectedArea("All");
                    }}
                  >
                    <span className="font-semibold text-slate-900">{city.name}</span>
                    {expandedCityId === city.id ? (
                      <ChevronUp className="h-4 w-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedCityId === city.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white px-4 pb-4"
                      >
                        <div className="pt-2 space-y-1 flex flex-col">
                          {city.areas.map((area) => (
                            <button
                              key={area}
                              onClick={() => {
                                setSelectedCityId(city.id);
                                setSelectedArea(area);
                              }}
                              className={\`text-sm text-left py-2 px-3 rounded-xl transition-colors \${
                                selectedArea === area 
                                  ? 'bg-slate-900 text-white font-semibold shadow-sm' 
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                              }\`}
                            >
                              {area}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-1">`;

content = content.replace(layoutToReplaceRegex, newLayout);

// 4. Change closing div to main
content = content.replace(/<\/AnimatePresence>\s*<\/motion\.div>\s*<\/div>\s*<\/div>\s*\);\s*\}/, '</AnimatePresence>\n        </motion.div>\n        </main>\n      </div>\n    </div>\n  );\n}');

fs.writeFileSync(file, content);
console.log('Done');
