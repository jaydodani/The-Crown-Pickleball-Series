/**
 * The Crown Pickleball Series - Official Venues Data
 * Metadata, tournament hosting history, Google Maps links, and facility specs
 */

export const venuesData = [
  {
    id: "venue-bainbridge",
    name: "BAINBRIDGE PICKLEBALL CLUB",
    shortName: "Bainbridge Club",
    city: "Ahmedabad, Gujarat",
    address: "Off Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054",
    tournamentsCount: 2,
    tournamentsHosted: [
      { name: "Tournament 1", date: "Jun 12–14, 2026", winner: "Jay & Kushal" },
      { name: "Tournament 4", date: "Sep 11–13, 2026", winner: "Jay & Kushal" }
    ],
    upcomingTournaments: [
      { name: "Tournament 6", date: "Nov 20–22, 2026", status: "Upcoming Fixture" }
    ],
    courts: "8 Championship Courts",
    surface: "USAPA Pro-Cushion Acrylic",
    environment: "Outdoor & Covered Floodlit",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bainbridge+Pickleball+Club+Ahmedabad",
    image: "/venues/bainbridge.jpg",
    features: ["Tournament Stadium Seating", "Floodlights (800 Lux)", "Players Lounge & Cafe", "Pro Equipment Store"]
  },
  {
    id: "venue-yu-pikkle",
    name: "YU PIKKLE PICKLEBALL",
    shortName: "Yu Pikkle",
    city: "Ahmedabad, Gujarat",
    address: "Near Vaishnodevi Circle, SG Highway, Ahmedabad, Gujarat 382421",
    tournamentsCount: 1,
    tournamentsHosted: [
      { name: "Tournament 3", date: "Aug 21–23, 2026", winner: "Arjun & Rohan" }
    ],
    upcomingTournaments: [],
    courts: "6 Indoor Air-Cooled Courts",
    surface: "High-Grip Cushioned Surface",
    environment: "Indoor Arena & Viewing Deck",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Yu+Pikkle+Pickleball+Ahmedabad",
    image: "/venues/yu_pikkle.jpg",
    features: ["Glass Mezzanine Gallery", "Climate Controlled", "Locker & Shower Rooms", "Video Replay System"]
  },
  {
    id: "venue-shaishya",
    name: "SHAISHYA PICKLEBALL AREENA",
    shortName: "Shaishya Areena",
    city: "Ahmedabad, Gujarat",
    address: "Shaishya Sports Complex, Drive-In Road, Thaltej, Ahmedabad, Gujarat 380054",
    tournamentsCount: 1,
    tournamentsHosted: [
      { name: "Tournament 2", date: "Jul 17–19, 2026", winner: "Rahul & Dev" }
    ],
    upcomingTournaments: [
      { name: "Tournament 7 (Grand Finale)", date: "Dec 18–20, 2026", status: "Championship Finale" }
    ],
    courts: "10 Pro Tournament Courts",
    surface: "Olympic Decoturf Multi-Layer",
    environment: "Championship Stadium Bowl",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shaishya+Pickleball+Arena+Ahmedabad",
    image: "/venues/shaishya.jpg",
    features: ["Grandstand Stadium Seating", "Live Broadcast Rigging", "Medical & Physio Room", "VIP Hospitality Boxes"]
  },
  {
    id: "venue-dinkers",
    name: "DINKERS PICKLEBALL ACADEMY",
    shortName: "Dinkers Academy",
    city: "Ahmedabad, Gujarat",
    address: "Ambli-Bopal Road, Near Ashok Vatika, Ahmedabad, Gujarat 380058",
    tournamentsCount: 0,
    tournamentsHosted: [],
    upcomingTournaments: [
      { name: "Tournament 5", date: "Oct 16–18, 2026", status: "Next Upcoming Tournament" }
    ],
    courts: "6 Match & Training Courts",
    surface: "Cushioned All-Weather Hardcourt",
    environment: "Outdoor Greenery & Club Patio",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dinkers+Pickleball+Academy+Ahmedabad",
    image: "/venues/dinkers.jpg",
    features: ["Ball Machine Practice Bays", "Certified Coaching Academy", "Outdoor Social Terrace", "Physique Warmup Zone"]
  }
];
