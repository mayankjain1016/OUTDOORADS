import { City, Client, GalleryItem, Industry, MediaInventory, Statistics, Testimonial } from "../types";

export const CITIES: City[] = [
  { id: "mum", name: "Mumbai", image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80", mediaCount: 1250, areas: ["Bandra", "Andheri", "South Mumbai", "Worli"] },
  { id: "del", name: "Delhi", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80", mediaCount: 980, areas: ["Connaught Place", "South Extension", "Vasant Kunj", "Karol Bagh"] },
  { id: "blr", name: "Bangalore", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80", mediaCount: 850, areas: ["Koramangala", "Indiranagar", "MG Road", "Whitefield"] },
  { id: "hyd", name: "Hyderabad", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80", mediaCount: 720, areas: ["Banjara Hills", "Jubilee Hills", "Hi-Tech City"] },
  { id: "che", name: "Chennai", image: "https://images.unsplash.com/photo-1502899576159-f224dc2349fa?w=800&q=80", mediaCount: 640, areas: ["T Nagar", "Anna Nagar", "Adyar"] },
  { id: "kol", name: "Kolkata", image: "https://images.unsplash.com/photo-1444723121692-4181f2c8d8db?w=800&q=80", mediaCount: 530, areas: ["Park Street", "Salt Lake", "New Town"] },
];

export const MEDIA_INVENTORY: MediaInventory[] = [
  {
    id: "inv-1",
    type: "Hoarding",
    cityId: "mum",
    cityName: "Mumbai",
    area: "Bandra",
    locationDetails: "Western Express Highway, Near Bandra Toll",
    size: "60x30 ft",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1551829158-b610c14b3014?w=800&q=80",
    description: "High visibility hoarding facing heavy South-bound traffic.",
  },
  {
    id: "inv-2",
    type: "Digital Screen",
    cityId: "del",
    cityName: "Delhi",
    area: "Connaught Place",
    locationDetails: "Inner Circle, Block A",
    size: "20x10 ft",
    availability: "Booked",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    description: "Premium DOOH screen in the heart of Delhi's premium shopping district.",
  },
  {
    id: "inv-3",
    type: "Unipole",
    cityId: "blr",
    cityName: "Bangalore",
    area: "Koramangala",
    locationDetails: "Sony World Signal",
    size: "40x20 ft",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80",
    description: "Dominating unipole at Bangalore's busiest tech intersection.",
  },
  {
    id: "inv-4",
    type: "Bus Shelter",
    cityId: "mum",
    cityName: "Mumbai",
    area: "Worli",
    locationDetails: "Sea Face Bus Stop",
    size: "12x6 ft",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80",
    description: "Illuminated bus shelter with high dwell time.",
  },
  {
    id: "inv-5",
    type: "Traffic Booth",
    cityId: "hyd",
    cityName: "Hyderabad",
    area: "Jubilee Hills",
    locationDetails: "Checkpost Intersection",
    size: "4x4 ft",
    availability: "Maintenance",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    description: "Eye-level traffic booth branding.",
  },
  {
    id: "inv-6",
    type: "Pole Kiosk",
    cityId: "del",
    cityName: "Delhi",
    area: "South Extension",
    locationDetails: "Ring Road (Series of 20)",
    size: "3x4 ft",
    availability: "Available",
    imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80",
    description: "Consecutive pole kiosks for high-recall campaigns.",
  },
];

export const INDUSTRIES: Industry[] = [
  { id: "ind-1", name: "Automotive" },
  { id: "ind-2", name: "Real Estate" },
  { id: "ind-3", name: "Jewelry" },
  { id: "ind-4", name: "Technology" },
  { id: "ind-5", name: "FMCG" },
  { id: "ind-6", name: "Entertainment" },
  { id: "ind-7", name: "Finance" },
];

export const GALLERY: GalleryItem[] = [
  { id: "gal-1", campaignTitle: "The Future of Driving", industryId: "ind-1", industryName: "Automotive", cityName: "Mumbai", imageUrl: "https://images.unsplash.com/photo-1542204165608-f5659872be99?w=800&q=80" },
  { id: "gal-2", campaignTitle: "Luxury Living Spaces", industryId: "ind-2", industryName: "Real Estate", cityName: "Bangalore", imageUrl: "https://images.unsplash.com/photo-1559828551-ddb663556094?w=800&q=80" },
  { id: "gal-3", campaignTitle: "Diwali Gold Fest", industryId: "ind-3", industryName: "Jewelry", cityName: "Delhi", imageUrl: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?w=800&q=80" },
  { id: "gal-4", campaignTitle: "Smartphone Launch", industryId: "ind-4", industryName: "Technology", cityName: "Hyderabad", imageUrl: "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=800&q=80" },
];

export const CLIENTS: Client[] = [
  { id: "cli-1", name: "AutoCorp", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80", category: "Automotive" },
  { id: "cli-2", name: "TechGiant", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80", category: "Technology" },
  { id: "cli-3", name: "LuxJewels", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80", category: "Jewelry" },
  { id: "cli-4", name: "BuildEstate", logoUrl: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80", category: "Real Estate" },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "tst-1", name: "Aarav Sharma", company: "AutoCorp India", role: "Marketing Director", quote: "Their premium inventory in Mumbai helped us achieve a 40% increase in showroom footfall during our launch month.", rating: 5, photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
  { id: "tst-2", name: "Priya Patel", company: "TechGiant", role: "VP Brand Strategy", quote: "The DOOH screens provided exceptional visibility. Their programmatic approach to outdoor is truly next-gen.", rating: 5, photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
];

export const STATS: Statistics = {
  campaignsExecuted: 12500,
  happyClients: 850,
  premiumLocations: 5400,
  citiesCovered: 45,
  yearsOfExperience: 15,
  teamMembers: 120,
};
