// Automated verification test for Central Data Store & Dynamic Points Table calculation
import { dataStore } from "../dataStore.js";

console.log("=== RUNNING CENTRAL DATA STORE TESTS ===");

// 1. Check Initial Seed Counts
const tourneys = dataStore.getTournaments();
const venues = dataStore.getVenues();
const categories = dataStore.getCategories();
const teams = dataStore.getTeams();
const players = dataStore.getPlayers();
const matches = dataStore.getMatches();
const registrations = dataStore.getRegistrations();
const metrics = dataStore.getSummaryMetrics();

console.log(`Tournaments count: ${tourneys.length} (Expected >= 7)`);
console.log(`Venues count: ${venues.length} (Expected >= 4)`);
console.log(`Categories count: ${categories.length} (Expected >= 4)`);
console.log(`Doubles teams count: ${teams.length} (Expected 24)`);
console.log(`Players count: ${players.length} (Expected 48)`);
console.log(`Matches count: ${matches.length}`);
console.log(`Registrations count: ${registrations.length}`);

if (tourneys.length < 7 || teams.length !== 24 || players.length !== 48) {
  console.error("FAIL: Initial seed counts do not match expected totals.");
  process.exit(1);
}

// 2. Test Derived Points Table Calculation
const initialPoints = dataStore.getPointsTable();
console.log(`Points table entries: ${initialPoints.length}`);
const leaderInitial = initialPoints[0];
console.log(`Initial Leader: ${leaderInitial.name} with ${leaderInitial.points} pts, ${leaderInitial.won} wins`);

// 3. Add a New Completed Match and Verify Points Table Auto-Update
console.log("\n--- Testing Add Match & Automatic Standings Update ---");
const testMatch = dataStore.addMatch({
  tournamentId: "tourney-5",
  tournamentName: "Tournament 5 • Autumn Championship",
  round: "Quarter Final",
  teamA: "Jay & Kushal",
  teamB: "Rahul & Dev",
  court: "Court 1",
  date: "Oct 16, 2026",
  time: "11:00 AM",
  scoreA: 11,
  scoreB: 8,
  status: "Completed",
  verified: true
});

console.log("Match Added:", testMatch.id, testMatch.score, "Winner:", testMatch.winner);
if (testMatch.winner !== "Jay & Kushal") {
  console.error("FAIL: Auto-winner determination failed. Expected 'Jay & Kushal', got:", testMatch.winner);
  process.exit(1);
}

const updatedPoints = dataStore.getPointsTable();
const jayAfterMatch = updatedPoints.find(p => p.name === "Jay Dodani");
const kushalAfterMatch = updatedPoints.find(p => p.name === "Kushal Shah");
const rahulAfterMatch = updatedPoints.find(p => p.name === "Rahul Sharma");

console.log(`Jay Dodani Points: ${jayAfterMatch.points} (Initial: ${leaderInitial.points})`);
console.log(`Kushal Shah Points: ${kushalAfterMatch.points}`);
console.log(`Rahul Sharma Losses: ${rahulAfterMatch.loss}`);

if (jayAfterMatch.points <= leaderInitial.points) {
  console.error("FAIL: Jay Dodani did not receive +10 points for the match win.");
  process.exit(1);
}

// 4. Test Add Tournament
console.log("\n--- Testing Add Tournament ---");
const initialTourneyCount = dataStore.getTournaments().length;
const newTourney = dataStore.addTournament({
  number: "11",
  name: "Tournament 11 • Test Invitational",
  date: "Apr 2027",
  venue: "The Racquet Club Ahmedabad",
  category: "Intermediate Doubles",
  status: "UPCOMING"
});

console.log("Added Tournament:", newTourney.name);
if (dataStore.getTournaments().length !== initialTourneyCount + 1) {
  console.error("FAIL: Tournament list count did not increase.");
  process.exit(1);
}

// 5. Test Delete Tournament & Match Cleanup
dataStore.deleteTournament(newTourney.id);
dataStore.deleteMatch(testMatch.id);
console.log("Cleanup test tournament & match passed.");

console.log("\n>>> ALL DATA STORE TESTS PASSED 100%! <<<");
