/**
 * The Racquet Club Ahmedabad - Central Data Engine
 * Single source of truth for Tournaments, Venues, Matches, Players, Teams, Registrations & Settings.
 * Backed by localStorage with reactive change listeners for cross-tab & admin/public sync.
 */

const STORAGE_KEY = "rca_pickleball_store_v2";

// Default Initial Tournaments Seed
const INITIAL_TOURNAMENTS = [
  {
    id: "tourney-1",
    number: "01",
    name: "Tournament 1 • Season Opener",
    status: "COMPLETED",
    date: "Jun 12–14, 2026",
    startTime: "08:00 AM",
    endTime: "07:00 PM",
    venueId: "venue-bainbridge",
    venue: "Bainbridge Pickleball Club",
    category: "Intermediate Doubles",
    maxTeams: 24,
    registeredTeams: 24,
    registrationStatus: "Closed",
    city: "Ahmedabad",
    winner: "Jay & Kushal",
    runnerUp: "Aditya & Krish",
    score: "11-7, 11-6",
    mvp: "Jay Kushal",
    matchesPlayed: 18,
    pointsAwarded: "100 Pts",
    description: "The premier kickoff event of The Crown Pickleball Series 2026 at Bainbridge Pickleball Club."
  },
  {
    id: "tourney-2",
    number: "02",
    name: "Tournament 2 • Monsoon Classic",
    status: "COMPLETED",
    date: "Jul 17–19, 2026",
    startTime: "08:30 AM",
    endTime: "07:30 PM",
    venueId: "venue-shaishya",
    venue: "Shaishya Pickleball Areena",
    category: "Intermediate Doubles",
    maxTeams: 24,
    registeredTeams: 24,
    registrationStatus: "Closed",
    city: "Ahmedabad",
    winner: "Rahul & Dev",
    runnerUp: "Neel & Harsh",
    score: "11-9, 11-6",
    mvp: "Rahul Sharma",
    matchesPlayed: 18,
    pointsAwarded: "100 Pts",
    description: "High intensity monsoon indoor battle under stadium floodlights at Shaishya Pickleball Areena."
  },
  {
    id: "tourney-3",
    number: "03",
    name: "Tournament 3 • Crown City Masters",
    status: "COMPLETED",
    date: "Aug 21–23, 2026",
    startTime: "09:00 AM",
    endTime: "08:00 PM",
    venueId: "venue-yu-pikkle",
    venue: "Yu Pikkle Pickleball",
    category: "Intermediate Doubles",
    maxTeams: 24,
    registeredTeams: 24,
    registrationStatus: "Closed",
    city: "Ahmedabad",
    winner: "Arjun & Rohan",
    runnerUp: "Jay & Kushal",
    score: "11-8, 9-11, 11-7",
    mvp: "Arjun Mehta",
    matchesPlayed: 18,
    pointsAwarded: "100 Pts",
    description: "Indoor air-conditioned pro courts showdown with capacity crowds watching from the glass gallery."
  },
  {
    id: "tourney-4",
    number: "04",
    name: "Tournament 4 • The Invitational Cup",
    status: "COMPLETED",
    date: "Sep 11–13, 2026",
    startTime: "08:00 AM",
    endTime: "06:30 PM",
    venueId: "venue-bainbridge",
    venue: "Bainbridge Pickleball Club",
    category: "Intermediate Doubles",
    maxTeams: 24,
    registeredTeams: 24,
    registrationStatus: "Closed",
    city: "Ahmedabad",
    winner: "Jay & Kushal",
    runnerUp: "Arjun & Rohan",
    score: "11-9, 11-8",
    mvp: "Jay Kushal",
    matchesPlayed: 18,
    pointsAwarded: "100 Pts",
    description: "Top seeded doubles duels producing nail-biting finishes and intense third-set rallies."
  },
  {
    id: "tourney-5",
    number: "05",
    name: "Tournament 5 • Autumn Championship",
    status: "UPCOMING",
    date: "Oct 16–18, 2026",
    startTime: "08:00 AM",
    endTime: "08:00 PM",
    venueId: "venue-dinkers",
    venue: "Dinkers Pickleball Academy",
    category: "Intermediate & Premier Doubles",
    maxTeams: 24,
    registeredTeams: 24,
    registrationStatus: "Open",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "150 Series Pts",
    description: "The fifth stop of The Crown Series heads to Dinkers Pickleball Academy for intense doubles championship action."
  },
  {
    id: "tourney-6",
    number: "06",
    name: "Tournament 6 • Winter Masters Cup",
    status: "UPCOMING",
    date: "Nov 20–22, 2026",
    startTime: "09:00 AM",
    endTime: "08:00 PM",
    venueId: "venue-yu-pikkle",
    venue: "Yu Pikkle Pickleball",
    category: "Premier Doubles & Singles",
    maxTeams: 24,
    registeredTeams: 18,
    registrationStatus: "Coming Soon",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "150 Series Pts",
    description: "Indoor speed-court showdown with seedings directly influencing qualification for the season finale."
  },
  {
    id: "tourney-7",
    number: "07",
    name: "Tournament 7 • The Crown Grand Finale",
    status: "UPCOMING",
    date: "Dec 18–20, 2026",
    startTime: "09:30 AM",
    endTime: "09:00 PM",
    venueId: "venue-shaishya",
    venue: "Shaishya Pickleball Areena",
    category: "Series Championship Finals",
    maxTeams: 8,
    registeredTeams: 8,
    registrationStatus: "Closed",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "250 Series Pts",
    description: "The pinnacle tournament of the year. The top 8 teams battle in the grand stadium bowl for the Crown Trophy."
  },
  {
    id: "tourney-8",
    number: "08",
    name: "Tournament 8 • New Year Open",
    status: "UPCOMING",
    date: "Jan 15–17, 2027",
    startTime: "08:00 AM",
    endTime: "07:00 PM",
    venueId: "venue-racquet-club",
    venue: "The Racquet Club Ahmedabad",
    category: "Open Doubles",
    maxTeams: 24,
    registeredTeams: 12,
    registrationStatus: "Coming Soon",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "100 Series Pts",
    description: "Kickstarting the 2027 calendar at our flagship stadium courts."
  },
  {
    id: "tourney-9",
    number: "09",
    name: "Tournament 9 • Gujarat Super Cup",
    status: "UPCOMING",
    date: "Feb 19–21, 2027",
    startTime: "08:00 AM",
    endTime: "07:00 PM",
    venueId: "venue-bainbridge",
    venue: "Bainbridge Pickleball Club",
    category: "Advanced Doubles",
    maxTeams: 24,
    registeredTeams: 10,
    registrationStatus: "Coming Soon",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "150 Series Pts",
    description: "Statewide championship drawing top players from across western India."
  },
  {
    id: "tourney-10",
    number: "10",
    name: "Tournament 10 • Spring Masters",
    status: "UPCOMING",
    date: "Mar 26–28, 2027",
    startTime: "08:30 AM",
    endTime: "07:30 PM",
    venueId: "venue-shaishya",
    venue: "Shaishya Pickleball Areena",
    category: "Premier Doubles",
    maxTeams: 24,
    registeredTeams: 6,
    registrationStatus: "Coming Soon",
    city: "Ahmedabad",
    winner: "",
    runnerUp: "",
    score: "",
    mvp: "",
    matchesPlayed: 0,
    pointsAwarded: "200 Series Pts",
    description: "Spring climax ahead of national selection trials."
  }
];

// Default Venues Seed
const INITIAL_VENUES = [
  {
    id: "venue-racquet-club",
    name: "THE RACQUET CLUB AHMEDABAD",
    shortName: "The Racquet Club",
    city: "Ahmedabad, Gujarat",
    address: "Racquet Club Boulevard, Bodakdev, Ahmedabad, Gujarat 380054",
    tournamentsCount: 0,
    courtsCount: 8,
    courts: ["Court 1 (Stadium)", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6", "Court 7", "Court 8"],
    surface: "Championship Cushion Acrylic Pro",
    environment: "Outdoor Floodlit & Air-Cooled Dome",
    contactPhone: "+91 79 4890 1200",
    contactEmail: "tournaments@racquetclub.in",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bodakdev+Ahmedabad",
    image: "/racquet-club-logo.png",
    status: "Active",
    features: ["Grandstand Stadium Seating", "Live Streaming Cameras", "Player Lounge & Recovery Cafe", "Physio Center"]
  },
  {
    id: "venue-bainbridge",
    name: "BAINBRIDGE PICKLEBALL CLUB",
    shortName: "Bainbridge Club",
    city: "Ahmedabad, Gujarat",
    address: "Off Sindhu Bhavan Road, Bodakdev, Ahmedabad, Gujarat 380054",
    tournamentsCount: 2,
    courtsCount: 8,
    courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6", "Court 7", "Court 8"],
    surface: "USAPA Pro-Cushion Acrylic",
    environment: "Outdoor & Covered Floodlit",
    contactPhone: "+91 98250 11223",
    contactEmail: "info@bainbridgepickleball.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Bainbridge+Pickleball+Club+Ahmedabad",
    image: "/venues/bainbridge.jpg",
    status: "Active",
    features: ["Tournament Stadium Seating", "Floodlights (800 Lux)", "Players Lounge & Cafe", "Pro Equipment Store"]
  },
  {
    id: "venue-yu-pikkle",
    name: "YU PIKKLE PICKLEBALL",
    shortName: "Yu Pikkle",
    city: "Ahmedabad, Gujarat",
    address: "Near Vaishnodevi Circle, SG Highway, Ahmedabad, Gujarat 382421",
    tournamentsCount: 1,
    courtsCount: 6,
    courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"],
    surface: "High-Grip Cushioned Surface",
    environment: "Indoor Arena & Viewing Deck",
    contactPhone: "+91 97129 33445",
    contactEmail: "play@yupikkle.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Yu+Pikkle+Pickleball+Ahmedabad",
    image: "/venues/yu_pikkle.jpg",
    status: "Active",
    features: ["Glass Mezzanine Gallery", "Climate Controlled", "Locker & Shower Rooms", "Video Replay System"]
  },
  {
    id: "venue-shaishya",
    name: "SHAISHYA PICKLEBALL AREENA",
    shortName: "Shaishya Areena",
    city: "Ahmedabad, Gujarat",
    address: "Shaishya Sports Complex, Drive-In Road, Thaltej, Ahmedabad, Gujarat 380054",
    tournamentsCount: 1,
    courtsCount: 10,
    courts: ["Center Court", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6", "Court 7", "Court 8", "Court 9", "Court 10"],
    surface: "Olympic Decoturf Multi-Layer",
    environment: "Championship Stadium Bowl",
    contactPhone: "+91 79 2685 4411",
    contactEmail: "admin@shaishyaclub.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Shaishya+Pickleball+Arena+Ahmedabad",
    image: "/venues/shaishya.jpg",
    status: "Active",
    features: ["Grandstand Stadium Seating", "Live Broadcast Rigging", "Medical & Physio Room", "VIP Hospitality Boxes"]
  },
  {
    id: "venue-dinkers",
    name: "DINKERS PICKLEBALL ACADEMY",
    shortName: "Dinkers Academy",
    city: "Ahmedabad, Gujarat",
    address: "Ambli-Bopal Road, Near Ashok Vatika, Ahmedabad, Gujarat 380058",
    tournamentsCount: 0,
    courtsCount: 6,
    courts: ["Court 1", "Court 2", "Court 3", "Court 4", "Court 5", "Court 6"],
    surface: "Cushioned All-Weather Hardcourt",
    environment: "Outdoor Greenery & Club Patio",
    contactPhone: "+91 99099 88776",
    contactEmail: "coach@dinkersacademy.in",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Dinkers+Pickleball+Academy+Ahmedabad",
    image: "/venues/dinkers.jpg",
    status: "Active",
    features: ["Ball Machine Practice Bays", "Certified Coaching Academy", "Outdoor Social Terrace", "Physique Warmup Zone"]
  }
];

// Default Categories Seed
const INITIAL_CATEGORIES = [
  { id: "cat-1", name: "Intermediate Doubles", type: "Doubles", format: "Round Robin + Knockout", gender: "Open", status: "Active" },
  { id: "cat-2", name: "Advanced Doubles", type: "Doubles", format: "Double Elimination", gender: "Open", status: "Active" },
  { id: "cat-3", name: "Intermediate Singles", type: "Singles", format: "Knockout", gender: "Open", status: "Active" },
  { id: "cat-4", name: "Advanced Singles", type: "Singles", format: "Knockout", gender: "Men & Women", status: "Active" }
];

// Default 24 Doubles Teams Seed
const INITIAL_DOUBLES_TEAMS = [
  { id: "team-1", name: "Jay & Kushal", player1: "Jay Dodani", player2: "Kushal Shah", category: "Intermediate Doubles", status: "Active" },
  { id: "team-2", name: "Rahul & Dev", player1: "Rahul Sharma", player2: "Dev Patel", category: "Intermediate Doubles", status: "Active" },
  { id: "team-3", name: "Arjun & Rohan", player1: "Arjun Mehta", player2: "Rohan Verma", category: "Intermediate Doubles", status: "Active" },
  { id: "team-4", name: "Aditya & Krish", player1: "Aditya Nair", player2: "Krish Kapoor", category: "Intermediate Doubles", status: "Active" },
  { id: "team-5", name: "Neel & Harsh", player1: "Neel Joshi", player2: "Harsh Singhania", category: "Intermediate Doubles", status: "Active" },
  { id: "team-6", name: "Vikram & Sameer", player1: "Vikram Malhotra", player2: "Sameer Khan", category: "Intermediate Doubles", status: "Active" },
  { id: "team-7", name: "Kabir & Siddharth", player1: "Kabir Roy", player2: "Siddharth Das", category: "Intermediate Doubles", status: "Active" },
  { id: "team-8", name: "Yash & Tanmay", player1: "Yash Chopra", player2: "Tanmay Bhat", category: "Intermediate Doubles", status: "Active" },
  { id: "team-9", name: "Aman & Dhruv", player1: "Aman Gupta", player2: "Dhruv Rathi", category: "Intermediate Doubles", status: "Active" },
  { id: "team-10", name: "Manan & Rishi", player1: "Manan Desai", player2: "Rishi Agarwal", category: "Intermediate Doubles", status: "Active" },
  { id: "team-11", name: "Varun & Karan", player1: "Varun Dhawan", player2: "Karan Johar", category: "Intermediate Doubles", status: "Active" },
  { id: "team-12", name: "Kunal & Pratik", player1: "Kunal Kamra", player2: "Pratik Gandhi", category: "Intermediate Doubles", status: "Active" },
  { id: "team-13", name: "Aarav & Vivaan", player1: "Aarav Patel", player2: "Vivaan Shah", category: "Intermediate Doubles", status: "Active" },
  { id: "team-14", name: "Ananya & Diya", player1: "Ananya Dave", player2: "Diya Parikh", category: "Intermediate Doubles", status: "Active" },
  { id: "team-15", name: "Ishaan & Reyansh", player1: "Ishaan Mehta", player2: "Reyansh Joshi", category: "Intermediate Doubles", status: "Active" },
  { id: "team-16", name: "Sanya & Meera", player1: "Sanya Trivedi", player2: "Meera Vyas", category: "Intermediate Doubles", status: "Active" },
  { id: "team-17", name: "Samarth & Krrish", player1: "Samarth Dave", player2: "Krrish Patel", category: "Intermediate Doubles", status: "Active" },
  { id: "team-18", name: "Riya & Tara", player1: "Riya Shah", player2: "Tara Nair", category: "Intermediate Doubles", status: "Active" },
  { id: "team-19", name: "Dhwanit & Parth", player1: "Dhwanit Raval", player2: "Parth Soni", category: "Intermediate Doubles", status: "Active" },
  { id: "team-20", name: "Nirav & Bhavin", player1: "Nirav Vora", player2: "Bhavin Kothari", category: "Intermediate Doubles", status: "Active" },
  { id: "team-21", name: "Chirag & Hiren", player1: "Chirag Sheth", player2: "Hiren Modi", category: "Intermediate Doubles", status: "Active" },
  { id: "team-22", name: "Jatin & Meet", player1: "Jatin Solanki", player2: "Meet Pandya", category: "Intermediate Doubles", status: "Active" },
  { id: "team-23", name: "Hardik & Dhaval", player1: "Hardik Shah", player2: "Dhaval Patel", category: "Intermediate Doubles", status: "Active" },
  { id: "team-24", name: "Ronak & Yashpal", player1: "Ronak Mehta", player2: "Yashpal Singh", category: "Intermediate Doubles", status: "Active" }
];

// Default 48 Individual Players Seed
const INITIAL_PLAYERS = [
  { id: "p-1", name: "Jay Dodani", team: "Jay & Kushal", partner: "Kushal Shah", category: "Intermediate Doubles", contact: "+91 98790 01001", email: "jay@racquetclub.in" },
  { id: "p-2", name: "Kushal Shah", team: "Jay & Kushal", partner: "Jay Dodani", category: "Intermediate Doubles", contact: "+91 98790 01002", email: "kushal@racquetclub.in" },
  { id: "p-3", name: "Rahul Sharma", team: "Rahul & Dev", partner: "Dev Patel", category: "Intermediate Doubles", contact: "+91 98790 01003", email: "rahul@gmail.com" },
  { id: "p-4", name: "Dev Patel", team: "Rahul & Dev", partner: "Rahul Sharma", category: "Intermediate Doubles", contact: "+91 98790 01004", email: "dev@gmail.com" },
  { id: "p-5", name: "Arjun Mehta", team: "Arjun & Rohan", partner: "Rohan Verma", category: "Intermediate Doubles", contact: "+91 98790 01005", email: "arjun@gmail.com" },
  { id: "p-6", name: "Rohan Verma", team: "Arjun & Rohan", partner: "Arjun Mehta", category: "Intermediate Doubles", contact: "+91 98790 01006", email: "rohan@gmail.com" },
  { id: "p-7", name: "Aditya Nair", team: "Aditya & Krish", partner: "Krish Kapoor", category: "Intermediate Doubles", contact: "+91 98790 01007", email: "aditya@gmail.com" },
  { id: "p-8", name: "Krish Kapoor", team: "Aditya & Krish", partner: "Aditya Nair", category: "Intermediate Doubles", contact: "+91 98790 01008", email: "krish@gmail.com" },
  { id: "p-9", name: "Neel Joshi", team: "Neel & Harsh", partner: "Harsh Singhania", category: "Intermediate Doubles", contact: "+91 98790 01009", email: "neel@gmail.com" },
  { id: "p-10", name: "Harsh Singhania", team: "Neel & Harsh", partner: "Neel Joshi", category: "Intermediate Doubles", contact: "+91 98790 01010", email: "harsh@gmail.com" },
  { id: "p-11", name: "Vikram Malhotra", team: "Vikram & Sameer", partner: "Sameer Khan", category: "Intermediate Doubles", contact: "+91 98790 01011", email: "vikram@gmail.com" },
  { id: "p-12", name: "Sameer Khan", team: "Vikram & Sameer", partner: "Vikram Malhotra", category: "Intermediate Doubles", contact: "+91 98790 01012", email: "sameer@gmail.com" },
  { id: "p-13", name: "Kabir Roy", team: "Kabir & Siddharth", partner: "Siddharth Das", category: "Intermediate Doubles", contact: "+91 98790 01013", email: "kabir@gmail.com" },
  { id: "p-14", name: "Siddharth Das", team: "Kabir & Siddharth", partner: "Kabir Roy", category: "Intermediate Doubles", contact: "+91 98790 01014", email: "sid@gmail.com" },
  { id: "p-15", name: "Yash Chopra", team: "Yash & Tanmay", partner: "Tanmay Bhat", category: "Intermediate Doubles", contact: "+91 98790 01015", email: "yash@gmail.com" },
  { id: "p-16", name: "Tanmay Bhat", team: "Yash & Tanmay", partner: "Yash Chopra", category: "Intermediate Doubles", contact: "+91 98790 01016", email: "tanmay@gmail.com" },
  { id: "p-17", name: "Aman Gupta", team: "Aman & Dhruv", partner: "Dhruv Rathi", category: "Intermediate Doubles", contact: "+91 98790 01017", email: "aman@gmail.com" },
  { id: "p-18", name: "Dhruv Rathi", team: "Aman & Dhruv", partner: "Aman Gupta", category: "Intermediate Doubles", contact: "+91 98790 01018", email: "dhruv@gmail.com" },
  { id: "p-19", name: "Manan Desai", team: "Manan & Rishi", partner: "Rishi Agarwal", category: "Intermediate Doubles", contact: "+91 98790 01019", email: "manan@gmail.com" },
  { id: "p-20", name: "Rishi Agarwal", team: "Manan & Rishi", partner: "Manan Desai", category: "Intermediate Doubles", contact: "+91 98790 01020", email: "rishi@gmail.com" },
  { id: "p-21", name: "Varun Dhawan", team: "Varun & Karan", partner: "Karan Johar", category: "Intermediate Doubles", contact: "+91 98790 01021", email: "varun@gmail.com" },
  { id: "p-22", name: "Karan Johar", team: "Varun & Karan", partner: "Varun Dhawan", category: "Intermediate Doubles", contact: "+91 98790 01022", email: "karan@gmail.com" },
  { id: "p-23", name: "Kunal Kamra", team: "Kunal & Pratik", partner: "Pratik Gandhi", category: "Intermediate Doubles", contact: "+91 98790 01023", email: "kunal@gmail.com" },
  { id: "p-24", name: "Pratik Gandhi", team: "Kunal & Pratik", partner: "Kunal Kamra", category: "Intermediate Doubles", contact: "+91 98790 01024", email: "pratik@gmail.com" },
  { id: "p-25", name: "Aarav Patel", team: "Aarav & Vivaan", partner: "Vivaan Shah", category: "Intermediate Doubles", contact: "+91 98790 01025", email: "aarav@gmail.com" },
  { id: "p-26", name: "Vivaan Shah", team: "Aarav & Vivaan", partner: "Aarav Patel", category: "Intermediate Doubles", contact: "+91 98790 01026", email: "vivaan@gmail.com" },
  { id: "p-27", name: "Ananya Dave", team: "Ananya & Diya", partner: "Diya Parikh", category: "Intermediate Doubles", contact: "+91 98790 01027", email: "ananya@gmail.com" },
  { id: "p-28", name: "Diya Parikh", team: "Ananya & Diya", partner: "Ananya Dave", category: "Intermediate Doubles", contact: "+91 98790 01028", email: "diya@gmail.com" },
  { id: "p-29", name: "Ishaan Mehta", team: "Ishaan & Reyansh", partner: "Reyansh Joshi", category: "Intermediate Doubles", contact: "+91 98790 01029", email: "ishaan@gmail.com" },
  { id: "p-30", name: "Reyansh Joshi", team: "Ishaan & Reyansh", partner: "Ishaan Mehta", category: "Intermediate Doubles", contact: "+91 98790 01030", email: "reyansh@gmail.com" },
  { id: "p-31", name: "Sanya Trivedi", team: "Sanya & Meera", partner: "Meera Vyas", category: "Intermediate Doubles", contact: "+91 98790 01031", email: "sanya@gmail.com" },
  { id: "p-32", name: "Meera Vyas", team: "Sanya & Meera", partner: "Sanya Trivedi", category: "Intermediate Doubles", contact: "+91 98790 01032", email: "meera@gmail.com" },
  { id: "p-33", name: "Samarth Dave", team: "Samarth & Krrish", partner: "Krrish Patel", category: "Intermediate Doubles", contact: "+91 98790 01033", email: "samarth@gmail.com" },
  { id: "p-34", name: "Krrish Patel", team: "Samarth & Krrish", partner: "Samarth Dave", category: "Intermediate Doubles", contact: "+91 98790 01034", email: "krrish@gmail.com" },
  { id: "p-35", name: "Riya Shah", team: "Riya & Tara", partner: "Tara Nair", category: "Intermediate Doubles", contact: "+91 98790 01035", email: "riya@gmail.com" },
  { id: "p-36", name: "Tara Nair", team: "Riya & Tara", partner: "Riya Shah", category: "Intermediate Doubles", contact: "+91 98790 01036", email: "tara@gmail.com" },
  { id: "p-37", name: "Dhwanit Raval", team: "Dhwanit & Parth", partner: "Parth Soni", category: "Intermediate Doubles", contact: "+91 98790 01037", email: "dhwanit@gmail.com" },
  { id: "p-38", name: "Parth Soni", team: "Dhwanit & Parth", partner: "Dhwanit Raval", category: "Intermediate Doubles", contact: "+91 98790 01038", email: "parth@gmail.com" },
  { id: "p-39", name: "Nirav Vora", team: "Nirav & Bhavin", partner: "Bhavin Kothari", category: "Intermediate Doubles", contact: "+91 98790 01039", email: "nirav@gmail.com" },
  { id: "p-40", name: "Bhavin Kothari", team: "Nirav & Bhavin", partner: "Nirav Vora", category: "Intermediate Doubles", contact: "+91 98790 01040", email: "bhavin@gmail.com" },
  { id: "p-41", name: "Chirag Sheth", team: "Chirag & Hiren", partner: "Hiren Modi", category: "Intermediate Doubles", contact: "+91 98790 01041", email: "chirag@gmail.com" },
  { id: "p-42", name: "Hiren Modi", team: "Chirag & Hiren", partner: "Chirag Sheth", category: "Intermediate Doubles", contact: "+91 98790 01042", email: "hiren@gmail.com" },
  { id: "p-43", name: "Jatin Solanki", team: "Jatin & Meet", partner: "Meet Pandya", category: "Intermediate Doubles", contact: "+91 98790 01043", email: "jatin@gmail.com" },
  { id: "p-44", name: "Meet Pandya", team: "Jatin & Meet", partner: "Jatin Solanki", category: "Intermediate Doubles", contact: "+91 98790 01044", email: "meet@gmail.com" },
  { id: "p-45", name: "Hardik Shah", team: "Hardik & Dhaval", partner: "Dhaval Patel", category: "Intermediate Doubles", contact: "+91 98790 01045", email: "hardik@gmail.com" },
  { id: "p-46", name: "Dhaval Patel", team: "Hardik & Dhaval", partner: "Hardik Shah", category: "Intermediate Doubles", contact: "+91 98790 01046", email: "dhaval@gmail.com" },
  { id: "p-47", name: "Ronak Mehta", team: "Ronak & Yashpal", partner: "Yashpal Singh", category: "Intermediate Doubles", contact: "+91 98790 01047", email: "ronak@gmail.com" },
  { id: "p-48", name: "Yashpal Singh", team: "Ronak & Yashpal", partner: "Ronak Mehta", category: "Intermediate Doubles", contact: "+91 98790 01048", email: "yashpal@gmail.com" }
];

// Seed central matches for Completed Tournaments (1, 2, 3, 4) & Scheduled (Tournament 5)
const INITIAL_MATCHES = [
  // Tournament 4 Finals & Key Matches
  {
    id: "m-401",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Final",
    teamA: "Jay & Kushal",
    teamB: "Arjun & Rohan",
    court: "Court 1",
    date: "Sep 13, 2026",
    time: "05:30 PM",
    scoreA: 11,
    scoreB: 9,
    score: "11-9",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  {
    id: "m-402",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Semi Final",
    teamA: "Jay & Kushal",
    teamB: "Rahul & Dev",
    court: "Court 1",
    date: "Sep 13, 2026",
    time: "03:00 PM",
    scoreA: 11,
    scoreB: 8,
    score: "11-8",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  {
    id: "m-403",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Semi Final",
    teamA: "Arjun & Rohan",
    teamB: "Aditya & Krish",
    court: "Court 2",
    date: "Sep 13, 2026",
    time: "03:00 PM",
    scoreA: 11,
    scoreB: 7,
    score: "11-7",
    winner: "Arjun & Rohan",
    status: "Completed",
    verified: true
  },
  {
    id: "m-404",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Quarter Final",
    teamA: "Jay & Kushal",
    teamB: "Neel & Harsh",
    court: "Court 1",
    date: "Sep 12, 2026",
    time: "02:00 PM",
    scoreA: 11,
    scoreB: 6,
    score: "11-6",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  {
    id: "m-405",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Quarter Final",
    teamA: "Rahul & Dev",
    teamB: "Vikram & Sameer",
    court: "Court 2",
    date: "Sep 12, 2026",
    time: "02:00 PM",
    scoreA: 11,
    scoreB: 7,
    score: "11-7",
    winner: "Rahul & Dev",
    status: "Completed",
    verified: true
  },
  {
    id: "m-406",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Quarter Final",
    teamA: "Arjun & Rohan",
    teamB: "Kabir & Siddharth",
    court: "Court 3",
    date: "Sep 12, 2026",
    time: "03:15 PM",
    scoreA: 11,
    scoreB: 8,
    score: "11-8",
    winner: "Arjun & Rohan",
    status: "Completed",
    verified: true
  },
  {
    id: "m-407",
    tournamentId: "tourney-4",
    tournamentName: "Tournament 4 • The Invitational Cup",
    round: "Quarter Final",
    teamA: "Aditya & Krish",
    teamB: "Aman & Dhruv",
    court: "Court 4",
    date: "Sep 12, 2026",
    time: "03:15 PM",
    scoreA: 11,
    scoreB: 9,
    score: "11-9",
    winner: "Aditya & Krish",
    status: "Completed",
    verified: true
  },
  // Tournament 3 Finals & Key Matches
  {
    id: "m-301",
    tournamentId: "tourney-3",
    tournamentName: "Tournament 3 • Crown City Masters",
    round: "Final",
    teamA: "Arjun & Rohan",
    teamB: "Jay & Kushal",
    court: "Court 1",
    date: "Aug 23, 2026",
    time: "06:00 PM",
    scoreA: 11,
    scoreB: 8,
    score: "11-8",
    winner: "Arjun & Rohan",
    status: "Completed",
    verified: true
  },
  {
    id: "m-302",
    tournamentId: "tourney-3",
    tournamentName: "Tournament 3 • Crown City Masters",
    round: "Semi Final",
    teamA: "Arjun & Rohan",
    teamB: "Rahul & Dev",
    court: "Court 1",
    date: "Aug 23, 2026",
    time: "03:30 PM",
    scoreA: 11,
    scoreB: 7,
    score: "11-7",
    winner: "Arjun & Rohan",
    status: "Completed",
    verified: true
  },
  {
    id: "m-303",
    tournamentId: "tourney-3",
    tournamentName: "Tournament 3 • Crown City Masters",
    round: "Semi Final",
    teamA: "Jay & Kushal",
    teamB: "Aditya & Krish",
    court: "Court 2",
    date: "Aug 23, 2026",
    time: "03:30 PM",
    scoreA: 11,
    scoreB: 7,
    score: "11-7",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  // Tournament 2 Finals & Key Matches
  {
    id: "m-201",
    tournamentId: "tourney-2",
    tournamentName: "Tournament 2 • Monsoon Classic",
    round: "Final",
    teamA: "Rahul & Dev",
    teamB: "Neel & Harsh",
    court: "Center Court",
    date: "Jul 19, 2026",
    time: "06:00 PM",
    scoreA: 11,
    scoreB: 9,
    score: "11-9",
    winner: "Rahul & Dev",
    status: "Completed",
    verified: true
  },
  {
    id: "m-202",
    tournamentId: "tourney-2",
    tournamentName: "Tournament 2 • Monsoon Classic",
    round: "Semi Final",
    teamA: "Rahul & Dev",
    teamB: "Jay & Kushal",
    court: "Center Court",
    date: "Jul 19, 2026",
    time: "03:00 PM",
    scoreA: 11,
    scoreB: 9,
    score: "11-9",
    winner: "Rahul & Dev",
    status: "Completed",
    verified: true
  },
  {
    id: "m-203",
    tournamentId: "tourney-2",
    tournamentName: "Tournament 2 • Monsoon Classic",
    round: "Semi Final",
    teamA: "Neel & Harsh",
    teamB: "Arjun & Rohan",
    court: "Court 2",
    date: "Jul 19, 2026",
    time: "03:00 PM",
    scoreA: 11,
    scoreB: 9,
    score: "11-9",
    winner: "Neel & Harsh",
    status: "Completed",
    verified: true
  },
  // Tournament 1 Finals & Key Matches
  {
    id: "m-101",
    tournamentId: "tourney-1",
    tournamentName: "Tournament 1 • Season Opener",
    round: "Final",
    teamA: "Jay & Kushal",
    teamB: "Aditya & Krish",
    court: "Court 1",
    date: "Jun 14, 2026",
    time: "05:00 PM",
    scoreA: 11,
    scoreB: 7,
    score: "11-7",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  {
    id: "m-102",
    tournamentId: "tourney-1",
    tournamentName: "Tournament 1 • Season Opener",
    round: "Semi Final",
    teamA: "Jay & Kushal",
    teamB: "Rahul & Dev",
    court: "Court 1",
    date: "Jun 14, 2026",
    time: "02:30 PM",
    scoreA: 11,
    scoreB: 8,
    score: "11-8",
    winner: "Jay & Kushal",
    status: "Completed",
    verified: true
  },
  // Scheduled Matches for Upcoming Tournament 5
  {
    id: "m-501",
    tournamentId: "tourney-5",
    tournamentName: "Tournament 5 • Autumn Championship",
    round: "Round of 16",
    teamA: "Jay & Kushal",
    teamB: "Manan & Rishi",
    court: "Court 1",
    date: "Oct 16, 2026",
    time: "09:00 AM",
    scoreA: null,
    scoreB: null,
    score: "vs",
    winner: "",
    status: "Scheduled",
    verified: false
  },
  {
    id: "m-502",
    tournamentId: "tourney-5",
    tournamentName: "Tournament 5 • Autumn Championship",
    round: "Round of 16",
    teamA: "Rahul & Dev",
    teamB: "Aman & Dhruv",
    court: "Court 2",
    date: "Oct 16, 2026",
    time: "09:00 AM",
    scoreA: null,
    scoreB: null,
    score: "vs",
    winner: "",
    status: "Scheduled",
    verified: false
  },
  {
    id: "m-503",
    tournamentId: "tourney-5",
    tournamentName: "Tournament 5 • Autumn Championship",
    round: "Round of 16",
    teamA: "Arjun & Rohan",
    teamB: "Yash & Tanmay",
    court: "Court 3",
    date: "Oct 16, 2026",
    time: "10:15 AM",
    scoreA: null,
    scoreB: null,
    score: "vs",
    winner: "",
    status: "Scheduled",
    verified: false
  },
  {
    id: "m-504",
    tournamentId: "tourney-5",
    tournamentName: "Tournament 5 • Autumn Championship",
    round: "Round of 16",
    teamA: "Aditya & Krish",
    teamB: "Kabir & Siddharth",
    court: "Court 4",
    date: "Oct 16, 2026",
    time: "10:15 AM",
    scoreA: null,
    scoreB: null,
    score: "vs",
    winner: "",
    status: "Scheduled",
    verified: false
  }
];

// Default Registrations Seed
const INITIAL_REGISTRATIONS = [
  { id: "reg-1", team: "Jay & Kushal", players: "Jay Dodani, Kushal Shah", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 20, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-2", team: "Rahul & Dev", players: "Rahul Sharma, Dev Patel", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 21, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-3", team: "Arjun & Rohan", players: "Arjun Mehta, Rohan Verma", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 21, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-4", team: "Aditya & Krish", players: "Aditya Nair, Krish Kapoor", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 22, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-5", team: "Neel & Harsh", players: "Neel Joshi, Harsh Singhania", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 22, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-6", team: "Vikram & Sameer", players: "Vikram Malhotra, Sameer Khan", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 23, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-7", team: "Kabir & Siddharth", players: "Kabir Roy, Siddharth Das", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 24, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-8", team: "Yash & Tanmay", players: "Yash Chopra, Tanmay Bhat", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 25, 2026", payment: "Pending", status: "Pending" },
  { id: "reg-9", team: "Aman & Dhruv", players: "Aman Gupta, Dhruv Rathi", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 26, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-10", team: "Manan & Rishi", players: "Manan Desai, Rishi Agarwal", category: "Intermediate Doubles", tournament: "Tournament 5", date: "Sep 27, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-11", team: "Varun & Karan", players: "Varun Dhawan, Karan Johar", category: "Intermediate Doubles", tournament: "Tournament 6", date: "Oct 01, 2026", payment: "Paid • ₹3,500", status: "Confirmed" },
  { id: "reg-12", team: "Kunal & Pratik", players: "Kunal Kamra, Pratik Gandhi", category: "Intermediate Doubles", tournament: "Tournament 6", date: "Oct 02, 2026", payment: "Unpaid", status: "Waitlisted" }
];

// Default Settings Seed
const INITIAL_SETTINGS = {
  seriesName: "The Racquet Club Ahmedabad • Pickleball Series",
  shortTitle: "The Crown Series",
  season: "2026 Season",
  pointsPerWin: 10,
  pointsPerLoss: 0,
  maxTeamsDefault: 24,
  primaryCity: "Ahmedabad, Gujarat",
  contactEmail: "admin@racquetclub.in",
  emergencyContact: "+91 79 4890 1200"
};

class DataStore {
  constructor() {
    this.listeners = new Set();
    this.channel = typeof window !== "undefined" && window.BroadcastChannel ? new BroadcastChannel("rca_pickleball_bus") : null;
    this.state = this.loadState();
    
    // Listen for storage events across other tabs
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY) {
          this.state = this.loadState();
          this.listeners.forEach(fn => fn("storage_sync", this.state));
        }
      });

      if (this.channel) {
        this.channel.onmessage = (event) => {
          if (event.data && event.data.type === "state_change") {
            this.state = this.loadState();
            this.listeners.forEach(fn => fn(event.data.action, this.state));
          }
        };
      }

      // Automatically sync latest state from backend database file
      this.syncWithBackend();
    }
  }

  async syncWithBackend() {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      const res = await fetch("/api/db");
      if (res.ok) {
        const remoteDb = await res.json();
        if (remoteDb && remoteDb.tournaments) {
          this.state = remoteDb;
          this.saveState();
          this.notify("backend_sync", false);
        }
      }
    } catch (err) {
      console.warn("Backend API sync offline, using local cache:", err);
    }
  }

  async apiPost(url, body) {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error("API POST error:", err);
    }
  }

  async apiPut(url, body) {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error("API PUT error:", err);
    }
  }

  async apiDelete(url) {
    if (typeof window === "undefined" || !window.fetch) return;
    try {
      await fetch(url, { method: "DELETE" });
    } catch (err) {
      console.error("API DELETE error:", err);
    }
  }

  loadState() {
    if (typeof window === "undefined" || !window.localStorage) {
      return this.getDefaultState();
    }
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (serialized) {
        const parsed = JSON.parse(serialized);
        return {
          tournaments: parsed.tournaments || INITIAL_TOURNAMENTS,
          venues: parsed.venues || INITIAL_VENUES,
          categories: parsed.categories || INITIAL_CATEGORIES,
          teams: parsed.teams || INITIAL_DOUBLES_TEAMS,
          players: parsed.players || INITIAL_PLAYERS,
          matches: parsed.matches || INITIAL_MATCHES,
          registrations: parsed.registrations || INITIAL_REGISTRATIONS,
          settings: parsed.settings || INITIAL_SETTINGS
        };
      }
    } catch (err) {
      console.warn("Error reading localStorage, using initial seed:", err);
    }
    const def = this.getDefaultState();
    this.saveState(def);
    return def;
  }

  getDefaultState() {
    return {
      tournaments: JSON.parse(JSON.stringify(INITIAL_TOURNAMENTS)),
      venues: JSON.parse(JSON.stringify(INITIAL_VENUES)),
      categories: JSON.parse(JSON.stringify(INITIAL_CATEGORIES)),
      teams: JSON.parse(JSON.stringify(INITIAL_DOUBLES_TEAMS)),
      players: JSON.parse(JSON.stringify(INITIAL_PLAYERS)),
      matches: JSON.parse(JSON.stringify(INITIAL_MATCHES)),
      registrations: JSON.parse(JSON.stringify(INITIAL_REGISTRATIONS)),
      settings: JSON.parse(JSON.stringify(INITIAL_SETTINGS))
    };
  }

  saveState(stateToSave = this.state) {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (err) {
        console.error("Failed to save state to localStorage:", err);
      }
    }
  }

  notify(event = "update", broadcast = true) {
    this.saveState();
    this.listeners.forEach(fn => fn(event, this.state));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("pickleball-store-updated", { detail: { event } }));
      if (broadcast && this.channel) {
        this.channel.postMessage({ type: "state_change", action: event });
      }
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  resetToDefault() {
    this.state = this.getDefaultState();
    this.saveState();
    this.notify("reset");
    this.apiPost("/api/reset", {});
    return this.state;
  }

  // ===================== TOURNAMENT OPERATIONS =====================
  getTournaments() {
    return [...this.state.tournaments];
  }

  getTournamentById(id) {
    return this.state.tournaments.find(t => t.id === id) || null;
  }

  addTournament(tournament) {
    const id = tournament.id || `tourney-${Date.now()}`;
    const newTournament = {
      id,
      registeredTeams: 0,
      matchesPlayed: 0,
      winner: "",
      runnerUp: "",
      score: "",
      mvp: "",
      ...tournament
    };
    this.state.tournaments.push(newTournament);
    this.notify("add_tournament");
    this.apiPost("/api/tournaments", newTournament);
    return newTournament;
  }

  updateTournament(id, updates) {
    const index = this.state.tournaments.findIndex(t => t.id === id);
    if (index !== -1) {
      this.state.tournaments[index] = { ...this.state.tournaments[index], ...updates };
      this.notify("update_tournament");
      this.apiPut(`/api/tournaments/${id}`, updates);
      return this.state.tournaments[index];
    }
    return null;
  }

  deleteTournament(id) {
    this.state.tournaments = this.state.tournaments.filter(t => t.id !== id);
    // Cascade remove matches belonging to this tournament
    this.state.matches = this.state.matches.filter(m => m.tournamentId !== id);
    this.notify("delete_tournament");
    this.apiDelete(`/api/tournaments/${id}`);
  }

  // ===================== MATCH OPERATIONS =====================
  getMatches() {
    return [...this.state.matches];
  }

  getMatchById(id) {
    return this.state.matches.find(m => m.id === id) || null;
  }

  addMatch(match) {
    const id = match.id || `m-${Date.now()}`;
    const scoreA = match.scoreA !== undefined && match.scoreA !== null ? Number(match.scoreA) : null;
    const scoreB = match.scoreB !== undefined && match.scoreB !== null ? Number(match.scoreB) : null;
    
    // Auto-determine winner if scores are provided and no manual override
    let winner = match.winner || "";
    if (!winner && scoreA !== null && scoreB !== null && scoreA !== scoreB) {
      winner = scoreA > scoreB ? match.teamA : match.teamB;
    }

    const newMatch = {
      id,
      round: "Group Stage",
      status: "Scheduled",
      verified: false,
      ...match,
      scoreA,
      scoreB,
      score: (scoreA !== null && scoreB !== null) ? `${scoreA}-${scoreB}` : (match.score || "vs"),
      winner
    };

    this.state.matches.unshift(newMatch);

    // If completed match, update tournament matchesPlayed counter
    if (newMatch.status === "Completed" && newMatch.tournamentId) {
      const tourney = this.getTournamentById(newMatch.tournamentId);
      if (tourney) {
        const count = this.state.matches.filter(m => m.tournamentId === newMatch.tournamentId && m.status === "Completed").length;
        this.updateTournament(tourney.id, { matchesPlayed: count });
      }
    }

    this.notify("add_match");
    this.apiPost("/api/matches", newMatch);
    return newMatch;
  }

  updateMatch(id, updates) {
    const index = this.state.matches.findIndex(m => m.id === id);
    if (index !== -1) {
      const existing = this.state.matches[index];
      const merged = { ...existing, ...updates };

      if (merged.scoreA !== undefined && merged.scoreB !== undefined && merged.scoreA !== null && merged.scoreB !== null) {
        merged.scoreA = Number(merged.scoreA);
        merged.scoreB = Number(merged.scoreB);
        merged.score = `${merged.scoreA}-${merged.scoreB}`;
        if (!updates.winner && merged.scoreA !== merged.scoreB) {
          merged.winner = merged.scoreA > merged.scoreB ? merged.teamA : merged.teamB;
        }
      }

      this.state.matches[index] = merged;

      // Update tournament matches count
      if (merged.tournamentId) {
        const count = this.state.matches.filter(m => m.tournamentId === merged.tournamentId && m.status === "Completed").length;
        const tourney = this.getTournamentById(merged.tournamentId);
        if (tourney) {
          tourney.matchesPlayed = count;
        }
      }

      this.notify("update_match");
      this.apiPut(`/api/matches/${id}`, updates);
      return this.state.matches[index];
    }
    return null;
  }

  deleteMatch(id) {
    const match = this.getMatchById(id);
    this.state.matches = this.state.matches.filter(m => m.id !== id);
    if (match && match.tournamentId) {
      const count = this.state.matches.filter(m => m.tournamentId === match.tournamentId && m.status === "Completed").length;
      const tourney = this.getTournamentById(match.tournamentId);
      if (tourney) {
        tourney.matchesPlayed = count;
      }
    }
    this.notify("delete_match");
    this.apiDelete(`/api/matches/${id}`);
  }

  // ===================== VENUE OPERATIONS =====================
  getVenues() {
    return [...this.state.venues];
  }

  getVenueById(id) {
    return this.state.venues.find(v => v.id === id) || null;
  }

  addVenue(venue) {
    const id = venue.id || `venue-${Date.now()}`;
    const newVenue = {
      id,
      tournamentsCount: 0,
      status: "Active",
      features: [],
      ...venue
    };
    this.state.venues.push(newVenue);
    this.notify("add_venue");
    this.apiPost("/api/venues", newVenue);
    return newVenue;
  }

  updateVenue(id, updates) {
    const index = this.state.venues.findIndex(v => v.id === id);
    if (index !== -1) {
      this.state.venues[index] = { ...this.state.venues[index], ...updates };
      this.notify("update_venue");
      this.apiPut(`/api/venues/${id}`, updates);
      return this.state.venues[index];
    }
    return null;
  }

  deleteVenue(id) {
    this.state.venues = this.state.venues.filter(v => v.id !== id);
    this.notify("delete_venue");
    this.apiDelete(`/api/venues/${id}`);
  }

  // ===================== CATEGORY OPERATIONS =====================
  getCategories() {
    return [...this.state.categories];
  }

  addCategory(category) {
    const id = category.id || `cat-${Date.now()}`;
    const newCat = { id, status: "Active", ...category };
    this.state.categories.push(newCat);
    this.notify("add_category");
    this.apiPost("/api/categories", newCat);
    return newCat;
  }

  updateCategory(id, updates) {
    const index = this.state.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      this.state.categories[index] = { ...this.state.categories[index], ...updates };
      this.notify("update_category");
      this.apiPut(`/api/categories/${id}`, updates);
      return this.state.categories[index];
    }
    return null;
  }

  deleteCategory(id) {
    this.state.categories = this.state.categories.filter(c => c.id !== id);
    this.notify("delete_category");
    this.apiDelete(`/api/categories/${id}`);
  }

  // ===================== PLAYERS & TEAMS =====================
  getPlayers() {
    return [...this.state.players];
  }

  addPlayer(player) {
    const id = player.id || `p-${Date.now()}`;
    const newP = { id, ...player };
    this.state.players.push(newP);
    this.notify("add_player");
    this.apiPost("/api/players", newP);
    return newP;
  }

  updatePlayer(id, updates) {
    const index = this.state.players.findIndex(p => p.id === id);
    if (index !== -1) {
      this.state.players[index] = { ...this.state.players[index], ...updates };
      this.notify("update_player");
      this.apiPut(`/api/players/${id}`, updates);
      return this.state.players[index];
    }
    return null;
  }

  deletePlayer(id) {
    this.state.players = this.state.players.filter(p => p.id !== id);
    this.notify("delete_player");
    this.apiDelete(`/api/players/${id}`);
  }

  getTeams() {
    return [...this.state.teams];
  }

  addTeam(team) {
    const id = team.id || `team-${Date.now()}`;
    const newTeam = { id, status: "Active", ...team };
    this.state.teams.push(newTeam);
    this.notify("add_team");
    this.apiPost("/api/teams", newTeam);
    return newTeam;
  }

  updateTeam(id, updates) {
    const index = this.state.teams.findIndex(t => t.id === id);
    if (index !== -1) {
      this.state.teams[index] = { ...this.state.teams[index], ...updates };
      this.notify("update_team");
      this.apiPut(`/api/teams/${id}`, updates);
      return this.state.teams[index];
    }
    return null;
  }

  deleteTeam(id) {
    this.state.teams = this.state.teams.filter(t => t.id !== id);
    this.notify("delete_team");
    this.apiDelete(`/api/teams/${id}`);
  }

  // ===================== REGISTRATIONS =====================
  getRegistrations() {
    return [...this.state.registrations];
  }

  addRegistration(reg) {
    const id = reg.id || `reg-${Date.now()}`;
    const newReg = {
      id,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Confirmed",
      payment: "Paid • ₹3,500",
      ...reg
    };
    this.state.registrations.unshift(newReg);
    this.notify("add_registration");
    return newReg;
  }

  updateRegistration(id, updates) {
    const index = this.state.registrations.findIndex(r => r.id === id);
    if (index !== -1) {
      this.state.registrations[index] = { ...this.state.registrations[index], ...updates };
      this.notify("update_registration");
      return this.state.registrations[index];
    }
    return null;
  }

  // ===================== SETTINGS =====================
  getSettings() {
    return { ...this.state.settings };
  }

  updateSettings(updates) {
    this.state.settings = { ...this.state.settings, ...updates };
    this.notify("update_settings");
    return this.state.settings;
  }

  // ===================== DYNAMIC POINTS TABLE CALCULATION =====================
  /**
   * Automatically computes the dynamic Points Table standings from matches & player roster.
   * Matches Won * 10 = Points
   */
  getPointsTable() {
    const completedMatches = this.state.matches.filter(m => m.status === "Completed" && m.winner);
    const winPoints = this.state.settings.pointsPerWin || 10;

    // Use players list as base
    const standingsMap = new Map();

    // Initialize all players
    this.state.players.forEach((p, idx) => {
      standingsMap.set(p.name, {
        id: p.id,
        rank: idx + 1,
        name: p.name,
        team: p.team || p.name,
        tournaments: 5,
        games: 0,
        won: 0,
        loss: 0,
        points: 0,
        pointsScored: 0,
        pointsAgainst: 0,
        form: [],
        pastMatches: []
      });
    });

    // Also support mapping team names (e.g. "Jay & Kushal") to both players
    completedMatches.forEach(m => {
      const matchScore = m.score || `${m.scoreA}-${m.scoreB}`;

      // Helper to process team / player in match
      const processParticipant = (name, oppName, scoreFor, scoreAgainst) => {
        // Check if direct player exists
        let p = standingsMap.get(name);
        if (p) {
          const isWin = m.winner === name;
          p.games += 1;
          if (isWin) {
            p.won += 1;
            p.points += winPoints;
          } else {
            p.loss += 1;
          }
          if (scoreFor) p.pointsScored += scoreFor;
          if (scoreAgainst) p.pointsAgainst += scoreAgainst;
          p.form.unshift(isWin ? "W" : "L");
          p.pastMatches.unshift({
            tournament: m.tournamentName ? m.tournamentName.split("•")[0].trim() : "Championship",
            opponent: oppName,
            score: matchScore,
            points: isWin ? `+${winPoints}` : "0",
            result: isWin ? "win" : "loss"
          });
        } else {
          // If match was played under team name (e.g., "Jay & Kushal"), credit both players
          const team = this.state.teams.find(t => t.name === name);
          if (team) {
            const isWin = m.winner === name;
            [team.player1, team.player2].forEach(playerName => {
              const teamPlayer = standingsMap.get(playerName);
              if (teamPlayer) {
                teamPlayer.games += 1;
                if (isWin) {
                  teamPlayer.won += 1;
                  teamPlayer.points += winPoints;
                } else {
                  teamPlayer.loss += 1;
                }
                if (scoreFor) teamPlayer.pointsScored += scoreFor;
                if (scoreAgainst) teamPlayer.pointsAgainst += scoreAgainst;
                teamPlayer.form.unshift(isWin ? "W" : "L");
                teamPlayer.pastMatches.unshift({
                  tournament: m.tournamentName ? m.tournamentName.split("•")[0].trim() : "Championship",
                  opponent: oppName,
                  score: matchScore,
                  points: isWin ? `+${winPoints}` : "0",
                  result: isWin ? "win" : "loss"
                });
              }
            });
          }
        }
      };

      processParticipant(m.teamA, m.teamB, m.scoreA, m.scoreB);
      processParticipant(m.teamB, m.teamA, m.scoreB, m.scoreA);
    });

    // Convert map to array
    const standings = Array.from(standingsMap.values());

    // Sort by points descending, then wins, then games played
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.won !== a.won) return b.won - a.won;
      return a.loss - b.loss;
    });

    // Assign final ranks & trim recent form to 5 items
    standings.forEach((item, idx) => {
      item.rank = idx + 1;
      if (item.form.length > 5) item.form = item.form.slice(0, 5);
      if (item.form.length === 0) item.form = ["-"];
    });

    return standings;
  }

  // ===================== SUMMARY METRICS =====================
  getSummaryMetrics() {
    const activeTournaments = this.state.tournaments.length;
    const playersCount = this.state.players.length;
    const teamsCount = this.state.teams.length;
    const matchesPlayed = this.state.matches.filter(m => m.status === "Completed").length || 120;
    const upcoming = this.state.tournaments.find(t => t.status === "UPCOMING") || { name: "Tournament 5" };
    const registeredTeams = this.state.registrations.length || 24;

    return {
      activeTournaments,
      playersCount,
      teamsCount,
      matchesPlayed,
      upcomingTournament: upcoming.name.split("•")[0].trim(),
      registeredTeams
    };
  }
}

// Export singleton instance
export const dataStore = new DataStore();
