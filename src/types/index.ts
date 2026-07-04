export type MediaType = 
  | "Hoarding"
  | "Unipole"
  | "Pole Kiosk"
  | "Traffic Booth"
  | "Billboard"
  | "Digital Screen"
  | "Bus Shelter"
  | "Wall Wrap";

export interface City {
  id: string;
  name: string;
  image: string;
  mediaCount: number;
  areas: string[];
}

export interface MediaInventory {
  id: string;
  type: MediaType;
  cityId: string;
  cityName: string;
  area: string;
  locationDetails: string;
  size: string; // e.g., "40x20 ft"
  availability: "Available" | "Booked" | "Maintenance";
  imageUrl: string;
  description: string;
  lat?: number;
  lng?: number;
}

export interface Industry {
  id: string;
  name: string;
  icon?: string;
}

export interface GalleryItem {
  id: string;
  campaignTitle: string;
  industryId: string;
  industryName: string;
  cityName: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number; // 1-5
  photoUrl: string;
}

export interface Statistics {
  campaignsExecuted: number;
  happyClients: number;
  premiumLocations: number;
  citiesCovered: number;
  yearsOfExperience: number;
  teamMembers: number;
}
