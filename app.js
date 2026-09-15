/**
 * The Crown Pickleball Series - Points Table & Match History
 * Single-player tournament data with 10-per-page pagination and accordion expand/collapse
 */

import { initStatsModule } from "./statsRenderer.js";
import { initTournamentsModule } from "./tournamentsRenderer.js";
import { initVenuesModule } from "./venuesRenderer.js";
import { initUpdatesModule } from "./updatesRenderer.js";
import { initHeaderModule } from "./headerRenderer.js";
import { dataStore } from "./dataStore.js";

export const tournamentData = [
  {
    id: "p-1",
    rank: 1,
    name: "Jay Dodani",
    tournaments: 5,
    games: 8,
    won: 6,
    loss: 2,
    points: 120,
    form: ["W", "W", "L", "W", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Kushal Shah", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Arjun Mehta", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Rohan Verma", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Rahul Sharma", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 5", opponent: "Dev Patel", score: "11-6", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-2",
    rank: 2,
    name: "Kushal Shah",
    tournaments: 5,
    games: 8,
    won: 6,
    loss: 2,
    points: 115,
    form: ["L", "W", "W", "W", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Jay Dodani", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Aditya Nair", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Vikram Malhotra", score: "11-5", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Krish Kapoor", score: "11-4", points: "+10", result: "win" },
      { tournament: "Tournament 6", opponent: "Rahul Sharma", score: "11-7", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-3",
    rank: 3,
    name: "Arjun Mehta",
    tournaments: 5,
    games: 8,
    won: 5,
    loss: 3,
    points: 105,
    form: ["W", "L", "W", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Neel Joshi", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Jay Dodani", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Kabir Roy", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Yash Chopra", score: "11-5", points: "+10", result: "win" },
      { tournament: "Tournament 6", opponent: "Rohan Verma", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-4",
    rank: 4,
    name: "Rohan Verma",
    tournaments: 5,
    games: 8,
    won: 5,
    loss: 3,
    points: 100,
    form: ["W", "L", "W", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Vikram Malhotra", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Arjun Mehta", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Jay Dodani", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Aman Gupta", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 5", opponent: "Dhruv Rathi", score: "8-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-5",
    rank: 5,
    name: "Rahul Sharma",
    tournaments: 5,
    games: 8,
    won: 5,
    loss: 3,
    points: 98,
    form: ["L", "W", "W", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Dev Patel", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Dhruv Rathi", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Yash Chopra", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Jay Dodani", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 7", opponent: "Kabir Roy", score: "6-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-6",
    rank: 6,
    name: "Dev Patel",
    tournaments: 5,
    games: 8,
    won: 4,
    loss: 4,
    points: 92,
    form: ["L", "W", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Rahul Sharma", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Kabir Roy", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Arjun Mehta", score: "5-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Dhruv Rathi", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 5", opponent: "Jay Dodani", score: "6-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-7",
    rank: 7,
    name: "Aditya Nair",
    tournaments: 5,
    games: 8,
    won: 4,
    loss: 4,
    points: 90,
    form: ["W", "L", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Aman Gupta", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Kushal Shah", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Rahul Sharma", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Yash Chopra", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 7", opponent: "Neel Joshi", score: "6-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-8",
    rank: 8,
    name: "Krish Kapoor",
    tournaments: 5,
    games: 8,
    won: 4,
    loss: 4,
    points: 85,
    form: ["W", "L", "L", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Dhruv Rathi", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Aman Gupta", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Neel Joshi", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Kushal Shah", score: "4-11", points: "0", result: "loss" },
      { tournament: "Tournament 6", opponent: "Kabir Roy", score: "11-9", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-9",
    rank: 9,
    name: "Neel Joshi",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 78,
    form: ["L", "W", "W", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Arjun Mehta", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Yash Chopra", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Dhruv Rathi", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Aditya Nair", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Arjun Mehta", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-10",
    rank: 10,
    name: "Harsh Singhania",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 75,
    form: ["L", "L", "L", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Yash Chopra", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Neel Joshi", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Aman Gupta", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Arjun Mehta", score: "4-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Aditya Nair", score: "11-8", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-11",
    rank: 11,
    name: "Vikram Malhotra",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 72,
    form: ["L", "W", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Rohan Verma", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Kabir Roy", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Kushal Shah", score: "5-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Dhruv Rathi", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 5", opponent: "Jay Dodani", score: "6-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-12",
    rank: 12,
    name: "Sameer Khan",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 70,
    form: ["W", "L", "W", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Kabir Roy", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Dev Patel", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Rishi Agarwal", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Aman Gupta", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Siddharth Das", score: "9-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-13",
    rank: 13,
    name: "Kabir Roy",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 68,
    form: ["W", "L", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Aman Gupta", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Vikram Malhotra", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Arjun Mehta", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Yash Chopra", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 7", opponent: "Rahul Sharma", score: "11-6", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-14",
    rank: 14,
    name: "Siddharth Das",
    tournaments: 5,
    games: 8,
    won: 3,
    loss: 5,
    points: 65,
    form: ["L", "W", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Tanmay Bhat", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Sameer Khan", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Dev Patel", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Kushal Shah", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Dhruv Rathi", score: "8-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-15",
    rank: 15,
    name: "Yash Chopra",
    tournaments: 5,
    games: 8,
    won: 2,
    loss: 6,
    points: 54,
    form: ["W", "L", "L", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Harsh Singhania", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Neel Joshi", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Rahul Sharma", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Arjun Mehta", score: "5-11", points: "0", result: "loss" },
      { tournament: "Tournament 6", opponent: "Aditya Nair", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-16",
    rank: 16,
    name: "Tanmay Bhat",
    tournaments: 5,
    games: 8,
    won: 2,
    loss: 6,
    points: 50,
    form: ["L", "L", "W", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Siddharth Das", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Rishi Agarwal", score: "11-7", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Vikram Malhotra", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Dhruv Rathi", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 5", opponent: "Aman Gupta", score: "5-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-17",
    rank: 17,
    name: "Aman Gupta",
    tournaments: 5,
    games: 8,
    won: 2,
    loss: 6,
    points: 48,
    form: ["L", "W", "W", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Kabir Roy", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Krish Kapoor", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Harsh Singhania", score: "11-6", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Rohan Verma", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Arjun Mehta", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-18",
    rank: 18,
    name: "Dhruv Rathi",
    tournaments: 5,
    games: 8,
    won: 2,
    loss: 6,
    points: 42,
    form: ["L", "L", "L", "W", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Krish Kapoor", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Rahul Sharma", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Neel Joshi", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Dev Patel", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Rohan Verma", score: "11-8", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-19",
    rank: 19,
    name: "Manan Desai",
    tournaments: 5,
    games: 8,
    won: 1,
    loss: 7,
    points: 32,
    form: ["L", "L", "L", "L", "W"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Yash Chopra", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Aman Gupta", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Rishi Agarwal", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 1", opponent: "Vikram Malhotra", score: "5-11", points: "0", result: "loss" },
      { tournament: "Tournament 5", opponent: "Dev Patel", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-20",
    rank: 20,
    name: "Rishi Agarwal",
    tournaments: 4,
    games: 7,
    won: 1,
    loss: 6,
    points: 30,
    form: ["L", "L", "L", "W", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Sameer Khan", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Tanmay Bhat", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Manan Desai", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Varun Dhawan", score: "11-8", points: "+10", result: "win" },
    ]
  },
  {
    id: "p-21",
    rank: 21,
    name: "Varun Dhawan",
    tournaments: 4,
    games: 7,
    won: 1,
    loss: 6,
    points: 28,
    form: ["L", "L", "W", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Karan Johar", score: "11-8", points: "+10", result: "win" },
      { tournament: "Tournament 3", opponent: "Siddharth Das", score: "7-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Vikram Malhotra", score: "5-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Rishi Agarwal", score: "8-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-22",
    rank: 22,
    name: "Karan Johar",
    tournaments: 4,
    games: 6,
    won: 1,
    loss: 5,
    points: 25,
    form: ["L", "W", "L", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 4", opponent: "Varun Dhawan", score: "8-11", points: "0", result: "loss" },
      { tournament: "Tournament 3", opponent: "Kunal Kamra", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Sameer Khan", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Dhruv Rathi", score: "7-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-23",
    rank: 23,
    name: "Kunal Kamra",
    tournaments: 3,
    games: 5,
    won: 0,
    loss: 5,
    points: 15,
    form: ["L", "L", "L", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 3", opponent: "Karan Johar", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 2", opponent: "Pratik Gandhi", score: "9-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Aman Gupta", score: "5-11", points: "0", result: "loss" },
    ]
  },
  {
    id: "p-24",
    rank: 24,
    name: "Pratik Gandhi",
    tournaments: 3,
    games: 5,
    won: 0,
    loss: 5,
    points: 10,
    form: ["L", "L", "L", "L", "L"],
    pastMatches: [
      { tournament: "Tournament 3", opponent: "Kunal Kamra", score: "11-9", points: "+10", result: "win" },
      { tournament: "Tournament 2", opponent: "Siddharth Das", score: "6-11", points: "0", result: "loss" },
      { tournament: "Tournament 1", opponent: "Harsh Singhania", score: "4-11", points: "0", result: "loss" },
    ]
  }
];

// App State
let currentPage = 1;
const pageSize = 10;
let searchQuery = "";

/**
 * Returns filtered player list based on active search
 */
function getFilteredData() {
  const currentData = dataStore.getPointsTable();
  if (!searchQuery) return currentData;
  const q = searchQuery.toLowerCase();
  return currentData.filter(player => 
    player.name.toLowerCase().includes(q) ||
    (player.pastMatches && player.pastMatches.some(m => m.opponent.toLowerCase().includes(q)))
  );
}

/**
 * Renders the points table rows for current page and mounts accordion listeners
 */
export function renderPointsTable() {
  const tableBody = document.getElementById("points-table-body");
  const countBadge = document.getElementById("table-summary-count");
  if (!tableBody) return;

  const filteredData = getFilteredData();
  const totalCount = filteredData.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  // Bound currentPage
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);
  const pageItems = filteredData.slice(startIndex, endIndex);

  // Update summary count text
  if (countBadge) {
    const totalPlayers = dataStore.getPointsTable().length;
    if (searchQuery) {
      countBadge.textContent = `Found ${totalCount} of ${totalPlayers} Players`;
    } else {
      countBadge.textContent = `Standings • ${totalPlayers} Players`;
    }
  }

  tableBody.innerHTML = "";

  if (pageItems.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `
      <td colspan="8" style="text-align: center; padding: 36px 16px; color: var(--text-muted); font-weight: 600;">
        No players found matching "${searchQuery}"
      </td>
    `;
    tableBody.appendChild(emptyRow);
    renderPagination(totalCount, totalPages);
    return;
  }

  pageItems.forEach((team) => {
    // Main Team / Player Row
    const teamRow = document.createElement("tr");
    teamRow.className = "team-row";
    teamRow.id = `row-${team.id}`;
    teamRow.setAttribute("data-team-id", team.id);
    teamRow.tabIndex = 0;
    teamRow.setAttribute("role", "button");
    teamRow.setAttribute("aria-expanded", "false");
    teamRow.setAttribute("aria-controls", `expanded-${team.id}`);

    // Plain Rank number without medal backgrounds
    const rankBadge = `<span class="rank-number">${team.rank}</span>`;

    // Row columns: Rank, Player/Team, Tournament, Games, Won, Loss, Points, Expand Arrow
    teamRow.innerHTML = `
      <td class="col-rank">
        ${rankBadge}
      </td>
      <td class="col-team">
        <span class="team-name">${team.name}</span>
      </td>
      <td class="col-stat col-tournament">${team.tournaments}</td>
      <td class="col-stat col-games">${team.games}</td>
      <td class="col-stat col-won">${team.won}</td>
      <td class="col-stat col-loss">${team.loss}</td>
      <td class="col-stat col-points">
        <span class="points-val">${team.points}</span>
      </td>
      <td class="col-expand">
        <button class="expand-btn" id="btn-${team.id}" aria-label="Toggle match history for ${team.name}" aria-expanded="false">
          <svg class="chevron-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </td>
    `;

    // Detail / Match History Expanded Row
    const detailRow = document.createElement("tr");
    detailRow.className = "detail-row";
    detailRow.id = `expanded-${team.id}`;
    detailRow.setAttribute("aria-hidden", "true");

    const pastMatchesHtml = team.pastMatches.map((m) => {
      const isWin = m.result === "win";
      return `
        <tr class="past-match-row">
          <td class="pm-tournament">
            <span class="tournament-tag">${m.tournament}</span>
          </td>
          <td class="pm-opponent">
            <span class="opponent-name">${m.opponent}</span>
          </td>
          <td class="pm-score">
            <span class="score-badge ${isWin ? 'score-win' : 'score-loss'}">
              <span class="score-indicator">${isWin ? 'W' : 'L'}</span>
              ${m.score}
            </span>
          </td>
          <td class="pm-points">
            <span class="points-badge ${isWin ? 'pts-positive' : 'pts-zero'}">
              ${m.points}
            </span>
          </td>
        </tr>
      `;
    }).join("");

    detailRow.innerHTML = `
      <td colspan="8" class="detail-cell">
        <div class="detail-wrapper">
          <div class="past-matches-container">
            <div class="past-matches-header">
              <div class="pm-title-group">
                <svg class="pm-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h4 class="past-matches-title">PAST MATCHES</h4>
              </div>
              <div class="pm-summary-pills">
                <span class="pm-record-pill">Record: <strong>${team.won}W - ${team.loss}L</strong></span>
                <span class="pm-form-pills">
                  Form:
                  ${team.form.map(f => `<span class="form-dot form-${f.toLowerCase()}">${f}</span>`).join('')}
                </span>
              </div>
            </div>

            <div class="subtable-responsive">
              <table class="past-matches-table" aria-label="Past matches for ${team.name}">
                <thead>
                  <tr>
                    <th scope="col">Tournament Name</th>
                    <th scope="col">Opponent</th>
                    <th scope="col">Score</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  ${pastMatchesHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </td>
    `;

    tableBody.appendChild(teamRow);
    tableBody.appendChild(detailRow);

    // Event listener for toggle (Accordion: at most one player row expanded at a time)
    const toggleExpansion = () => {
      const isCurrentlyExpanded = teamRow.classList.contains("expanded");
      const expandBtn = teamRow.querySelector(".expand-btn");

      if (isCurrentlyExpanded) {
        // Close current player row
        teamRow.classList.remove("expanded");
        detailRow.classList.remove("open");
        teamRow.setAttribute("aria-expanded", "false");
        if (expandBtn) expandBtn.setAttribute("aria-expanded", "false");
        detailRow.setAttribute("aria-hidden", "true");
      } else {
        // Automatically close any other open player row in points table
        tableBody.querySelectorAll(".team-row.expanded").forEach((openRow) => {
          if (openRow !== teamRow) {
            openRow.classList.remove("expanded");
            openRow.setAttribute("aria-expanded", "false");
            const otherBtn = openRow.querySelector(".expand-btn");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            const otherTeamId = openRow.getAttribute("data-team-id");
            const otherDetail = document.getElementById(`expanded-${otherTeamId}`);
            if (otherDetail) {
              otherDetail.classList.remove("open");
              otherDetail.setAttribute("aria-hidden", "true");
            }
          }
        });

        // Open selected player row
        teamRow.classList.add("expanded");
        detailRow.classList.add("open");
        teamRow.setAttribute("aria-expanded", "true");
        if (expandBtn) expandBtn.setAttribute("aria-expanded", "true");
        detailRow.setAttribute("aria-hidden", "false");
      }
    };

    const expandBtn = teamRow.querySelector(".expand-btn");
    if (expandBtn) {
      expandBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleExpansion();
      });
    }

    teamRow.addEventListener("click", toggleExpansion);
    teamRow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target && (e.target.classList.contains("expand-btn") || e.target.closest(".expand-btn"))) {
          return;
        }
        e.preventDefault();
        toggleExpansion();
      }
    });
  });

  renderPagination(totalCount, totalPages);
}

/**
 * Renders pagination controls below the table
 */
function renderPagination(totalCount, totalPages) {
  const paginationContainer = document.getElementById("pagination-container");
  if (!paginationContainer) return;

  if (totalCount <= pageSize) {
    paginationContainer.innerHTML = "";
    return;
  }

  const startEntry = (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalCount);

  let pageButtonsHtml = "";
  for (let i = 1; i <= totalPages; i++) {
    pageButtonsHtml += `
      <button class="page-num-btn ${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}">
        ${i}
      </button>
    `;
  }

  paginationContainer.innerHTML = `
    <div class="pagination-info">
      Showing <strong>${startEntry}–${endEntry}</strong> of <strong>${totalCount}</strong> players
    </div>
    <div class="pagination-actions">
      <button class="page-nav-btn" id="btn-prev-page" ${currentPage === 1 ? 'disabled' : ''} aria-label="Previous Page">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>Prev</span>
      </button>

      <div class="page-num-group">
        ${pageButtonsHtml}
      </div>

      <button class="page-nav-btn" id="btn-next-page" ${currentPage === totalPages ? 'disabled' : ''} aria-label="Next Page">
        <span>Next</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  `;

  // Attach button event listeners
  const prevBtn = document.getElementById("btn-prev-page");
  const nextBtn = document.getElementById("btn-next-page");
  const numBtns = paginationContainer.querySelectorAll(".page-num-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderPointsTable();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderPointsTable();
      }
    });
  }

  numBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.getAttribute("data-page"), 10);
      if (page && page !== currentPage) {
        currentPage = page;
        renderPointsTable();
      }
    });
  });
}

/**
 * Initializes search filtering
 */
export function initFilters() {
  const searchInput = document.getElementById("search-teams");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      currentPage = 1; // Reset to page 1 on new search
      renderPointsTable();
    });
  }
}

/**
 * Handles Tab navigation between Points Tables and Stats analytics
 */
export function initNavigation() {
  const tabs = document.querySelectorAll(".series-tab");
  const pointsTableSection = document.querySelector(".table-container-wrapper");
  const statsSection = document.getElementById("stats-section");
  const tournamentsSection = document.getElementById("tournaments-section");
  const venuesSection = document.getElementById("venues-section");
  const updatesSection = document.getElementById("updates-section");

  function hideAllSections() {
    if (pointsTableSection) pointsTableSection.style.display = "none";
    if (statsSection) statsSection.style.display = "none";
    if (tournamentsSection) tournamentsSection.style.display = "none";
    if (venuesSection) venuesSection.style.display = "none";
    if (updatesSection) updatesSection.style.display = "none";
  }

  function setTab(target) {
    tabs.forEach(tab => {
      tab.classList.remove("active");
      tab.removeAttribute("aria-current");
    });

    const activeTab = Array.from(tabs).find(tab => tab.getAttribute("href") === `#${target}`) || tabs[0];
    if (activeTab) {
      activeTab.classList.add("active");
      activeTab.setAttribute("aria-current", "page");
    }

    hideAllSections();

    if (target === "admin") {
      window.location.href = "/admin";
      return;
    } else if (target === "stats") {
      if (statsSection) {
        statsSection.style.display = "block";
        initStatsModule();
      }
    } else if (target === "tournaments") {
      if (tournamentsSection) {
        tournamentsSection.style.display = "block";
        initTournamentsModule();
      }
    } else if (target === "venues") {
      if (venuesSection) {
        venuesSection.style.display = "block";
        initVenuesModule();
      }
    } else if (target === "updates") {
      if (updatesSection) {
        updatesSection.style.display = "block";
        initUpdatesModule();
      }
    } else {
      // Default: Points Tables view
      if (pointsTableSection) pointsTableSection.style.display = "";
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      const href = tab.getAttribute("href");
      if (href && href.startsWith("#")) {
        const target = href.replace("#", "");
        e.preventDefault();
        history.pushState(null, "", `#${target}`);
        setTab(target);
      }
    });
  });

  window.addEventListener("popstate", () => {
    const hash = window.location.hash.replace("#", "");
    setTab(hash || "points-tables");
  });

  // Initial tab based on URL hash
  const initialHash = window.location.hash.replace("#", "");
  setTab(initialHash || "points-tables");
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  initHeaderModule();
  renderPointsTable();
  initFilters();
  initNavigation();

  // Reactive subscription: when admin saves a match or tournament, update points table live!
  dataStore.subscribe(() => {
    renderPointsTable();
  });
});

