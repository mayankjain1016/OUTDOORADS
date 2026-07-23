const fs = require('fs');

const file = 'src/app/about/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replacements
content = content.replace(
  `title: "Our Mission",\n      description: "To empower brands to make bold statements in the real world. We strive to provide premium outdoor advertising solutions that are highly visible and contextually relevant, elevating the urban environment while delivering exceptional value to our clients.",`,
  `title: "Our Mission",\n      description: "To empower brands with high-visibility outdoor advertising solutions that deliver real-world impact. We focus on strategic placements, premium media quality, and measurable ROI to help our clients dominate their local markets.",`
);

content = content.replace(
  `features: ["Premium Inventory Access", "Contextually Relevant Ads", "Urban Environment Enhancement", "Client-Centric Value"],`,
  `features: ["Strategic Ad Placements", "High Footfall Locations", "End-to-End Campaign Management", "Client-Centric Value"],`
);

content = content.replace(
  `description: "To be the undisputed leader in out-of-home media innovation, seamlessly blending technology with physical structures to create immersive, data-driven, and sustainable advertising experiences that shape the future of urban communication.",`,
  `description: "To be the most trusted and innovative out-of-home media agency, transforming urban landscapes with dynamic, data-driven, and highly engaging advertising experiences that bridge the gap between brands and consumers.",`
);

content = content.replace(
  `features: ["Technological Integration", "Immersive Experiences", "Data-Driven Approach", "Sustainable Practices"],`,
  `features: ["Prime Location Network", "Data-Driven Targeting", "Creative Excellence", "Transparent Reporting"],`
);

// Values section
content = content.replace(`Nationwide Reach`, `Extensive Reach`);
content = content.replace(
  `Extensive network covering prime locations across major cities, ensuring maximum visibility.`,
  `A robust network of premium hoardings and digital screens across key locations, ensuring maximum audience visibility.`
);

content = content.replace(
  `Strategic placements designed to capture the right audience at the perfect moment.`,
  `Data-backed site selection designed to capture the attention of your target demographics at the perfect moment.`
);

content = content.replace(
  `From classic billboards to cutting-edge digital displays, offering versatile formats.`,
  `Offering a versatile portfolio from classic unipoles and hoardings to modern digital OOH screens and transit media.`
);

content = content.replace(
  `Data-driven insights to understand audience behavior and optimize your advertising ROI.`,
  `We prioritize audience engagement, helping you maximize your campaign ROI through smart geographic targeting.`
);

content = content.replace(
  `Impeccably maintained assets and high-resolution displays reflecting premium brand standards.`,
  `Impeccably maintained physical assets and high-resolution flex prints that reflect your brand's premium standards.`
);

content = content.replace(
  `Decades of expertise delivering measurable success for local businesses and global enterprises.`,
  `Years of on-ground expertise delivering highly successful campaigns for both local businesses and national enterprises.`
);

// Team Section
content = content.replace(`step: "SJ",\n      title: "Sarah Jenkins",\n      description: "Chief Executive Officer. Driving the strategic vision and nationwide expansion of ApexOOH.",`, `step: "FD",\n      title: "Founding Team",\n      description: "Driving the strategic vision, client relations, and nationwide expansion of OOH Ad Expo.",`);
content = content.replace(`step: "DC",\n      title: "David Chen",\n      description: "Head of Operations. Ensuring flawless execution and asset maintenance across our entire network.",`, `step: "OP",\n      title: "Operations Team",\n      description: "Ensuring flawless on-ground execution, installation, and asset maintenance across our network.",`);
content = content.replace(`step: "MT",\n      title: "Marcus Torres",\n      description: "Director of Strategy. Leading our data initiatives and helping brands optimize their OOH spend.",`, `step: "ST",\n      title: "Strategy Team",\n      description: "Leading our media planning initiatives and helping brands optimize their OOH advertising spend.",`);

// Hero Section
content = content.replace(`Pioneering Urban`, `Your Partner in`);
content = content.replace(`For five decades, we have been at the forefront of out-of-home advertising, connecting brands with their audiences through larger-than-life experiences.`, `With extensive local expertise and a growing network across major cities, OOH Ad Expo connects brands with their audiences through high-impact, real-world advertising.`);

// Stats Section Title
content = content.replace(`The Apex Advantage`, `The OOH Ad Expo Advantage`);

// Team Title
content = content.replace(`Meet the Visionaries`, `Meet the Experts Behind the Boards`);
content = content.replace(`The minds driving the future of urban media and brand experiences.`, `The dedicated professionals driving flawless execution and high-impact brand experiences.`);

// CTA Section
content = content.replace(`Ready to make <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">history?</span>`, `Ready to launch your <br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-blue-400">campaign?</span>`);
content = content.replace(`Join the hundreds of brands that trust ApexOOH to elevate their presence in the physical world.`, `Join the growing list of brands that trust OOH Ad Expo to elevate their presence in the physical world.`);

// Replace any remaining ApexOOH
content = content.replace(/ApexOOH/g, `OOH Ad Expo`);

fs.writeFileSync(file, content);
console.log('About page content updated successfully');
