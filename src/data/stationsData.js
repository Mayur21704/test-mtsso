// Image imports from local assets
import torontoThumb from "@/assets/toronto_card.jpeg";
import hamiltonThumb from "@/assets/newimg/MS1A Different World, Just Beyond the Gangway.jpg";
import oshawaThumb from "@/assets/ship-dock.jpg";
import portColborneThumb from "@/assets/water1.jpg";

import judithImg from "@/assets/Toronto Station Chaplin And manager-Rev.Judith Alltree.png";
import danImg from "@/assets/Pastor Dan Phannenhour- Hamilton Station Chapalin-.jpg";

export const STATIONS = {
  toronto: {
    id: "toronto",
    name: "Mission to Seafarers Toronto",
    shortName: "Toronto Station",
    slug: "toronto",
    tagline: "Welcoming seafarers at the Port of Toronto with hospitality, practical support, and a place to belong.",
    portName: "Port of Toronto (Terminals 51 & 52)",
    coordinates: "43.6487° N, 79.3512° W",
    address: "8 Unwin Avenue, Port of Toronto, ON, M5A 1A1",
    phone: "(416) 469-5391",
    email: "glutenfreepriest@gmail.com",
    chaplain: {
      name: "Rev. Judith Alltree",
      title: "Toronto Station Chaplain & Manager",
      image: judithImg,
      bio: "Rev. Judith Alltree has dedicated decades to maritime chaplaincy and parish ministry across Canada. She currently serves as Toronto Port Chaplain and Vice-President of the MTSSO Board, receiving the NAMMA Distinguished Service Award in 2024.",
    },
    heroImage: torontoThumb,
    overview: "At the Port of Toronto, seafarers arrive after weeks or months at sea. Our station provides a warm welcome right ashore with Wi-Fi, refreshments, parcel pickup, haircuts, and dedicated chaplaincy.",
    portDetails: {
      annualVessels: "180+ Commercial Ships & Cruise Liners",
      cargoTypes: ["Sugar & Agricultural Bulk", "Steel & Project Cargo", "Salt & Aggregates", "Passenger Ships"],
      waterway: "Lake Ontario / St. Lawrence Seaway",
      description: "Toronto is an essential international commercial gateway on Lake Ontario, connecting Ontario industries directly with global overseas trade.",
    },
    services: [
      {
        title: "Ship Visiting & Gangway Ministry",
        description: "Direct on-board visits to check on crew welfare, provide SIM cards, and bring personal care supplies.",
      },
      {
        title: "Station Hospitality & Lounge",
        description: "Comfortable lounge with high-speed Wi-Fi, refreshments, quiet spaces, and international phone calling.",
      },
      {
        title: "Seafarer Parcel Pickup",
        description: "Secure delivery address for online orders of essential goods, electronics, and supplies.",
        badge: "Popular",
      },
      {
        title: "Haircuts for Seafarers",
        description: "Professional haircut and wellness appointments arranged in advance for crew stepping ashore.",
        badge: "Bookable",
      },
      {
        title: "Transportation & Shopping Runs",
        description: "Volunteer rides to local grocery stores, pharmacies, currency exchange, and medical clinics.",
      },
      {
        title: "Pastoral & Emotional Care",
        description: "Confidential listening, mental health support, prayer, and multi-faith spiritual companionship.",
      },
    ],
    hours: "Coordinated around vessel port schedules; on-call 7 days a week during navigation season.",
    parcelDeliveryAddress: "c/o Mission to Seafarers Toronto, 8 Unwin Ave, Toronto, ON M5A 1A1",
    facilities: ["High-speed Wi-Fi", "Lounge & Kitchenette", "Quiet Chapel Space", "Haircut Chair", "Snack Bar"],
    historyHighlight: "Serving seafarers at the Port of Toronto since 1961. Reopening a state-of-the-art new station space with the support of PortsToronto.",
  },

  hamilton: {
    id: "hamilton",
    name: "Mission to Seafarers Hamilton",
    shortName: "Hamilton Station",
    slug: "hamilton",
    tagline: "A sanctuary of rest, friendship, and human connection just beyond the gangway at Canada's largest Great Lakes port.",
    portName: "Port of Hamilton (HOPA Ports / Hamilton Harbour)",
    coordinates: "43.2725° N, 79.8456° W",
    address: "650 Catharine St N, Hamilton, ON, L8L 4V7",
    phone: "(905) 528-8681",
    email: "hamilton@mtsso.org",
    chaplain: {
      name: "Pastor Dan Phannenhour",
      title: "Hamilton Station Chaplain",
      image: danImg,
      bio: "Pastor Dan Phannenhour provides warm pastoral guidance and compassionate support to hundreds of domestic and international seafarers docking in Hamilton Harbour each year.",
    },
    heroImage: hamiltonThumb,
    overview: "Hamilton is Canada’s busiest Great Lakes port. The station offers a cozy home away from home with pool table, foosball, quiet chapel, and dependable shore transportation.",
    portDetails: {
      annualVessels: "600+ Domestic & International Vessels",
      cargoTypes: ["Steel & Iron Ore", "Agricultural Grains", "Fertilizer & Liquid Bulk", "Salt & Coal"],
      waterway: "Hamilton Harbour / Lake Ontario / Welland Canal link",
      description: "As the largest cargo port on the Canadian Great Lakes, Hamilton handles over 10 million tonnes of raw materials and finished goods annually.",
    },
    services: [
      {
        title: "Seafarers Centre & Recreation",
        description: "Recreation lounge with pool table, foosball, television, and comfortable couches for decompression.",
      },
      {
        title: "Ship Visiting Ministry",
        description: "Regular visits by Chaplain Dan and volunteers to vessels docked across Hamilton's expansive piers.",
      },
      {
        title: "Wi-Fi & Communication Hub",
        description: "High-bandwidth internet to video call family in the Philippines, India, Ukraine, and worldwide.",
      },
      {
        title: "Transportation & Van Service",
        description: "Reliable shuttle service connecting seafarers from industrial terminals to shopping centres.",
      },
      {
        title: "Pastoral & Multi-faith Care",
        description: "Spiritual care, ship blessings, emergency support, and hospital visitation.",
      },
    ],
    hours: "Daily during active port operations; Chaplain on-call 24/7 for vessel emergencies.",
    parcelDeliveryAddress: "c/o Mission to Seafarers Hamilton, 650 Catharine St N, Hamilton, ON L8L 4V7",
    facilities: ["Recreation Lounge (Pool/Foosball)", "Free Wi-Fi", "Quiet Chapel", "Kitchen & Coffee Bar", "Van Shuttle"],
    historyHighlight: "A steadfast pillar of Hamilton's working waterfront for decades, maintaining deep relationships with terminal operators and port workers.",
  },

  oshawa: {
    id: "oshawa",
    name: "Mission to Seafarers Oshawa",
    shortName: "Oshawa Station",
    slug: "oshawa",
    tagline: "Vital welfare outreach and practical assistance for vessels docking in Durham Region's key commercial port.",
    portName: "Port of Oshawa (HOPA Ports / Durham Waterfront)",
    coordinates: "43.8682° N, 78.8252° W",
    address: "1050 Farewell St, Oshawa, ON, L1H 6N6",
    phone: "(905) 576-2580",
    email: "oshawa@mtsso.org",
    chaplain: {
      name: "MTSSO Regional Chaplaincy Team",
      title: "Oshawa Port Welfare Officers",
      image: judithImg,
      bio: "Served through MTSSO's regional mobile chaplaincy team, ensuring every vessel docking in Oshawa receives shipboard visits and crew support.",
    },
    heroImage: oshawaThumb,
    overview: "The Port of Oshawa is an essential eastern gateway for steel, grain, and manufacturing cargo. MTSSO provides mobile ship visiting, shore leave transit, and essential supplies.",
    portDetails: {
      annualVessels: "80+ Ocean & Great Lakes Freighters",
      cargoTypes: ["Steel & Metal Products", "Grain & Agricultural Exports", "Salt & Asphalt"],
      waterway: "Eastern Lake Ontario",
      description: "Oshawa's modern deep-water port plays a crucial role in supplying the manufacturing heartland of Durham Region and the GTA.",
    },
    services: [
      {
        title: "Mobile Ship Visits",
        description: "Volunteers and chaplains meet vessels upon docking with welcome packages and connectivity tools.",
      },
      {
        title: "Shore Leave Transit",
        description: "Rides into downtown Oshawa for banking, groceries, SIM top-ups, and personal errands.",
      },
      {
        title: "Practical Care Packages",
        description: "Delivery of warm knitted beanies, toiletries, reading materials, and snacks directly to crews.",
      },
      {
        title: "Emergency Advocacy",
        description: "Supporting seafarers facing medical needs, vessel delays, or repatriation challenges.",
      },
    ],
    hours: "Coordinated based on vessel arrivals and port call schedules.",
    parcelDeliveryAddress: "c/o Mission to Seafarers Oshawa, 1050 Farewell St, Oshawa, ON L1H 6N6",
    facilities: ["Mobile Chaplaincy Van", "Portable Wi-Fi Hotspots", "Care Package Hub"],
    historyHighlight: "Serving the growing industrial waterfront of Oshawa as part of the unified Southern Ontario regional network.",
  },

  "port-colborne": {
    id: "port-colborne",
    name: "Mission to Seafarers Port Colborne",
    shortName: "Port Colborne Station",
    slug: "port-colborne",
    tagline: "Guardian of the Welland Canal — meeting transit crews at the vital southern gateway to Lake Erie.",
    portName: "Port Colborne & Welland Canal Locks",
    coordinates: "42.8842° N, 79.2514° W",
    address: "West Pier / Welland Canal Transit Point, Port Colborne, ON",
    phone: "(905) 834-4567",
    email: "portcolborne@mtsso.org",
    chaplain: {
      name: "Canal Outreach & Chaplaincy Team",
      title: "Welland Canal Welfare Officers",
      image: danImg,
      bio: "Dedicated volunteer ship visitors and maritime chaplains supporting crews during lock transits, grain loading, and winter layups.",
    },
    heroImage: portColborneThumb,
    overview: "Located at the southern entrance of the historic Welland Canal on Lake Erie, Port Colborne is a critical navigation nexus for transiting lakers and salties.",
    portDetails: {
      annualVessels: "3,000+ Canal Transits & Port Dwell Calls",
      cargoTypes: ["Grain Milling & Agri-Bulk", "Ship Repair & Layup", "Aggregates & General Cargo"],
      waterway: "Welland Canal (Lock 8) & Lake Erie",
      description: "Port Colborne represents the southern gateway of the St. Lawrence Seaway, connecting Lake Ontario with Lake Erie and the upper Great Lakes.",
    },
    services: [
      {
        title: "Lock & Canal Gangway Visits",
        description: "Meeting crews during tie-ups, lockage delays, and grain terminal loading operations.",
      },
      {
        title: "Winter Layup Support",
        description: "Extended care, home visits, and fellowship for skeleton crews remaining aboard during winter freeze.",
      },
      {
        title: "Emergency Delivery Service",
        description: "Rushing urgent medical items, prescriptions, and packages to vessels with tight lock transit times.",
      },
      {
        title: "Spiritual & Crisis Ministry",
        description: "Pastoral care, counseling, and crisis response for seafarers navigating difficult waters.",
      },
    ],
    hours: "Seasonal canal operational schedule (March–December) and winter layup care.",
    parcelDeliveryAddress: "c/o Mission to Seafarers Port Colborne, Port Colborne, ON L3K 5V7",
    facilities: ["Canal Mobile Support Unit", "Emergency Care Dispatch"],
    historyHighlight: "Serving seafarers navigating the historic 8-lock Welland Canal for over a century of maritime heritage.",
  },
};
