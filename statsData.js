/**
 * The Crown Pickleball Series - Comprehensive Stats Data Model
 * 12 Logically Consistent Doubles Partnerships with Tournament Records & Match Histories
 */

export const statsTeams = [
  {
    id: "team-1",
    name: "Jay & Kushal",
    tournamentsEntered: 5,
    matchesPlayed: 16,
    wins: 13,
    losses: 3,
    winPercentage: "81.25%",
    winPercentageVal: 81.25,
    pointsScored: 168,
    pointsAgainst: 120,
    pointDifference: "+48",
    pointDifferenceVal: 48,
    bestWinStreak: 7,
    currentStreak: 4,
    tournamentWins: 2,
    finals: 3,
    semifinals: 5,
    podiumFinishes: { first: 2, second: 1, third: 1, total: 4 },
    elevenPlusWins: 13,
    matchesTogether: 16,
    biggestMargin: { opponent: "Atharv & Karan", score: "11-2", margin: "+9" },
    biggestMarginVal: 9,
    mvpAwards: [
      { tournament: "Tournament 4", player: "Jay Kushal", matches: 5, wins: 4, points: 52 },
      { tournament: "Tournament 1", player: "Jay Kushal", matches: 5, wins: 5, points: 55 }
    ],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Arjun & Rohan", score: "11-9", result: "WIN", points: "+10" },
      { tournament: "Tournament 4", opponent: "Rahul & Dev", score: "11-7", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Neel & Harsh", score: "11-4", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Aditya & Krish", score: "9-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Atharv & Karan", score: "11-2", result: "WIN", points: "+10" },
      { tournament: "Tournament 1", opponent: "Dhruv & Yash", score: "11-6", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-2",
    name: "Arjun & Rohan",
    tournamentsEntered: 5,
    matchesPlayed: 16,
    wins: 12,
    losses: 4,
    winPercentage: "75.00%",
    winPercentageVal: 75.00,
    pointsScored: 160,
    pointsAgainst: 126,
    pointDifference: "+34",
    pointDifferenceVal: 34,
    bestWinStreak: 6,
    currentStreak: 3,
    tournamentWins: 1,
    finals: 3,
    semifinals: 4,
    podiumFinishes: { first: 1, second: 2, third: 1, total: 4 },
    elevenPlusWins: 12,
    matchesTogether: 16,
    biggestMargin: { opponent: "Rishi & Om", score: "11-3", margin: "+8" },
    biggestMarginVal: 8,
    mvpAwards: [
      { tournament: "Tournament 3", player: "Arjun Mehta", matches: 5, wins: 4, points: 49 }
    ],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Jay & Kushal", score: "9-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 4", opponent: "Aditya & Krish", score: "11-8", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Rahul & Dev", score: "11-6", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Rishi & Om", score: "11-3", result: "WIN", points: "+10" },
      { tournament: "Tournament 1", opponent: "Manav & Parth", score: "11-5", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-3",
    name: "Rahul & Dev",
    tournamentsEntered: 5,
    matchesPlayed: 16,
    wins: 10,
    losses: 6,
    winPercentage: "62.50%",
    winPercentageVal: 62.50,
    pointsScored: 152,
    pointsAgainst: 130,
    pointDifference: "+22",
    pointDifferenceVal: 22,
    bestWinStreak: 5,
    currentStreak: 2,
    tournamentWins: 1,
    finals: 2,
    semifinals: 4,
    podiumFinishes: { first: 1, second: 1, third: 2, total: 4 },
    elevenPlusWins: 10,
    matchesTogether: 16,
    biggestMargin: { opponent: "Ved & Shaurya", score: "11-4", margin: "+7" },
    biggestMarginVal: 7,
    mvpAwards: [
      { tournament: "Tournament 2", player: "Rahul Sharma", matches: 5, wins: 4, points: 48 }
    ],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Neel & Harsh", score: "11-6", result: "WIN", points: "+10" },
      { tournament: "Tournament 4", opponent: "Jay & Kushal", score: "7-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Arjun & Rohan", score: "6-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Ved & Shaurya", score: "11-4", result: "WIN", points: "+10" },
      { tournament: "Tournament 1", opponent: "Dhruv & Yash", score: "11-7", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-4",
    name: "Aditya & Krish",
    tournamentsEntered: 5,
    matchesPlayed: 15,
    wins: 9,
    losses: 6,
    winPercentage: "60.00%",
    winPercentageVal: 60.00,
    pointsScored: 144,
    pointsAgainst: 131,
    pointDifference: "+13",
    pointDifferenceVal: 13,
    bestWinStreak: 4,
    currentStreak: 1,
    tournamentWins: 0,
    finals: 1,
    semifinals: 3,
    podiumFinishes: { first: 0, second: 1, third: 2, total: 3 },
    elevenPlusWins: 9,
    matchesTogether: 15,
    biggestMargin: { opponent: "Manav & Parth", score: "11-4", margin: "+7" },
    biggestMarginVal: 7,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Vikram & Sameer", score: "11-7", result: "WIN", points: "+10" },
      { tournament: "Tournament 4", opponent: "Arjun & Rohan", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Jay & Kushal", score: "11-9", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Manav & Parth", score: "11-4", result: "WIN", points: "+10" },
      { tournament: "Tournament 1", opponent: "Aarav & Vivaan", score: "8-11", result: "LOSS", points: "0" }
    ]
  },
  {
    id: "team-5",
    name: "Neel & Harsh",
    tournamentsEntered: 5,
    matchesPlayed: 15,
    wins: 8,
    losses: 7,
    winPercentage: "53.33%",
    winPercentageVal: 53.33,
    pointsScored: 138,
    pointsAgainst: 135,
    pointDifference: "+3",
    pointDifferenceVal: 3,
    bestWinStreak: 3,
    currentStreak: 1,
    tournamentWins: 0,
    finals: 1,
    semifinals: 2,
    podiumFinishes: { first: 0, second: 1, third: 1, total: 2 },
    elevenPlusWins: 8,
    matchesTogether: 15,
    biggestMargin: { opponent: "Dhruv & Yash", score: "11-5", margin: "+6" },
    biggestMarginVal: 6,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Rahul & Dev", score: "6-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Jay & Kushal", score: "4-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Dhruv & Yash", score: "11-5", result: "WIN", points: "+10" },
      { tournament: "Tournament 1", opponent: "Kabir & Reyansh", score: "11-8", result: "WIN", points: "+10" },
      { tournament: "Tournament 5", opponent: "Atharv & Karan", score: "11-7", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-6",
    name: "Dhruv & Yash",
    tournamentsEntered: 5,
    matchesPlayed: 14,
    wins: 7,
    losses: 7,
    winPercentage: "50.00%",
    winPercentageVal: 50.00,
    pointsScored: 129,
    pointsAgainst: 133,
    pointDifference: "-4",
    pointDifferenceVal: -4,
    bestWinStreak: 3,
    currentStreak: 0,
    tournamentWins: 0,
    finals: 0,
    semifinals: 2,
    podiumFinishes: { first: 0, second: 0, third: 2, total: 2 },
    elevenPlusWins: 7,
    matchesTogether: 14,
    biggestMargin: { opponent: "Rishi & Om", score: "11-5", margin: "+6" },
    biggestMarginVal: 6,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Aarav & Vivaan", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Manav & Parth", score: "11-7", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Neel & Harsh", score: "5-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Jay & Kushal", score: "6-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 5", opponent: "Rishi & Om", score: "11-5", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-7",
    name: "Aarav & Vivaan",
    tournamentsEntered: 5,
    matchesPlayed: 14,
    wins: 7,
    losses: 7,
    winPercentage: "50.00%",
    winPercentageVal: 50.00,
    pointsScored: 125,
    pointsAgainst: 132,
    pointDifference: "-7",
    pointDifferenceVal: -7,
    bestWinStreak: 4,
    currentStreak: 2,
    tournamentWins: 0,
    finals: 0,
    semifinals: 1,
    podiumFinishes: { first: 0, second: 0, third: 1, total: 1 },
    elevenPlusWins: 7,
    matchesTogether: 14,
    biggestMargin: { opponent: "Ved & Shaurya", score: "11-6", margin: "+5" },
    biggestMarginVal: 5,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Dhruv & Yash", score: "11-8", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Kabir & Reyansh", score: "11-9", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Rahul & Dev", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Aditya & Krish", score: "11-8", result: "WIN", points: "+10" },
      { tournament: "Tournament 5", opponent: "Arjun & Rohan", score: "5-11", result: "LOSS", points: "0" }
    ]
  },
  {
    id: "team-8",
    name: "Kabir & Reyansh",
    tournamentsEntered: 5,
    matchesPlayed: 14,
    wins: 6,
    losses: 8,
    winPercentage: "42.86%",
    winPercentageVal: 42.86,
    pointsScored: 122,
    pointsAgainst: 138,
    pointDifference: "-16",
    pointDifferenceVal: -16,
    bestWinStreak: 3,
    currentStreak: 0,
    tournamentWins: 0,
    finals: 0,
    semifinals: 1,
    podiumFinishes: { first: 0, second: 0, third: 1, total: 1 },
    elevenPlusWins: 6,
    matchesTogether: 14,
    biggestMargin: { opponent: "Atharv & Karan", score: "11-5", margin: "+6" },
    biggestMarginVal: 6,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Ved & Shaurya", score: "11-9", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Aarav & Vivaan", score: "9-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Jay & Kushal", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Neel & Harsh", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 5", opponent: "Atharv & Karan", score: "11-5", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-9",
    name: "Manav & Parth",
    tournamentsEntered: 5,
    matchesPlayed: 13,
    wins: 5,
    losses: 8,
    winPercentage: "38.46%",
    winPercentageVal: 38.46,
    pointsScored: 114,
    pointsAgainst: 135,
    pointDifference: "-21",
    pointDifferenceVal: -21,
    bestWinStreak: 2,
    currentStreak: 1,
    tournamentWins: 0,
    finals: 0,
    semifinals: 0,
    podiumFinishes: { first: 0, second: 0, third: 0, total: 0 },
    elevenPlusWins: 5,
    matchesTogether: 13,
    biggestMargin: { opponent: "Rishi & Om", score: "11-6", margin: "+5" },
    biggestMarginVal: 5,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Rishi & Om", score: "11-6", result: "WIN", points: "+10" },
      { tournament: "Tournament 3", opponent: "Dhruv & Yash", score: "7-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Aditya & Krish", score: "4-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Arjun & Rohan", score: "5-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 5", opponent: "Ved & Shaurya", score: "11-8", result: "WIN", points: "+10" }
    ]
  },
  {
    id: "team-10",
    name: "Ved & Shaurya",
    tournamentsEntered: 5,
    matchesPlayed: 13,
    wins: 4,
    losses: 9,
    winPercentage: "30.77%",
    winPercentageVal: 30.77,
    pointsScored: 108,
    pointsAgainst: 140,
    pointDifference: "-32",
    pointDifferenceVal: -32,
    bestWinStreak: 2,
    currentStreak: 0,
    tournamentWins: 0,
    finals: 0,
    semifinals: 0,
    podiumFinishes: { first: 0, second: 0, third: 0, total: 0 },
    elevenPlusWins: 4,
    matchesTogether: 13,
    biggestMargin: { opponent: "Atharv & Karan", score: "11-7", margin: "+4" },
    biggestMarginVal: 4,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Kabir & Reyansh", score: "9-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Atharv & Karan", score: "11-7", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Rahul & Dev", score: "4-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Aarav & Vivaan", score: "6-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 5", opponent: "Manav & Parth", score: "8-11", result: "LOSS", points: "0" }
    ]
  },
  {
    id: "team-11",
    name: "Rishi & Om",
    tournamentsEntered: 4,
    matchesPlayed: 11,
    wins: 3,
    losses: 8,
    winPercentage: "27.27%",
    winPercentageVal: 27.27,
    pointsScored: 89,
    pointsAgainst: 118,
    pointDifference: "-29",
    pointDifferenceVal: -29,
    bestWinStreak: 2,
    currentStreak: 0,
    tournamentWins: 0,
    finals: 0,
    semifinals: 0,
    podiumFinishes: { first: 0, second: 0, third: 0, total: 0 },
    elevenPlusWins: 3,
    matchesTogether: 11,
    biggestMargin: { opponent: "Atharv & Karan", score: "11-8", margin: "+3" },
    biggestMarginVal: 3,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Manav & Parth", score: "6-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Atharv & Karan", score: "11-8", result: "WIN", points: "+10" },
      { tournament: "Tournament 2", opponent: "Arjun & Rohan", score: "3-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Dhruv & Yash", score: "7-11", result: "LOSS", points: "0" }
    ]
  },
  {
    id: "team-12",
    name: "Atharv & Karan",
    tournamentsEntered: 4,
    matchesPlayed: 11,
    wins: 2,
    losses: 9,
    winPercentage: "18.18%",
    winPercentageVal: 18.18,
    pointsScored: 81,
    pointsAgainst: 122,
    pointDifference: "-41",
    pointDifferenceVal: -41,
    bestWinStreak: 1,
    currentStreak: 0,
    tournamentWins: 0,
    finals: 0,
    semifinals: 0,
    podiumFinishes: { first: 0, second: 0, third: 0, total: 0 },
    elevenPlusWins: 2,
    matchesTogether: 11,
    biggestMargin: { opponent: "Rishi & Om", score: "11-9", margin: "+2" },
    biggestMarginVal: 2,
    mvpAwards: [],
    matchHistory: [
      { tournament: "Tournament 4", opponent: "Jay & Kushal", score: "2-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 3", opponent: "Rishi & Om", score: "8-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 2", opponent: "Ved & Shaurya", score: "7-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 1", opponent: "Kabir & Reyansh", score: "5-11", result: "LOSS", points: "0" },
      { tournament: "Tournament 5", opponent: "Rishi & Om", score: "11-9", result: "WIN", points: "+10" }
    ]
  }
];

/**
 * Tournament Specific Winners & Runners-Up Records
 */
export const tournamentHistory = [
  {
    tournamentNumber: "01",
    name: "Tournament 4",
    location: "Crown Center Court",
    winner: "Jay & Kushal",
    runnerUp: "Arjun & Rohan",
    score: "11-9, 11-8",
    date: "Sep 2026",
    mvp: { name: "Jay Kushal", team: "Jay & Kushal", matches: 5, wins: 4, points: 52 }
  },
  {
    tournamentNumber: "02",
    name: "Tournament 3",
    location: "Metro Sports Arena",
    winner: "Arjun & Rohan",
    runnerUp: "Jay & Kushal",
    score: "11-8, 9-11, 11-7",
    date: "Aug 2026",
    mvp: { name: "Arjun Mehta", team: "Arjun & Rohan", matches: 5, wins: 4, points: 49 }
  },
  {
    tournamentNumber: "03",
    name: "Tournament 2",
    location: "Pickle Dome City",
    winner: "Rahul & Dev",
    runnerUp: "Neel & Harsh",
    score: "11-9, 11-6",
    date: "Jul 2026",
    mvp: { name: "Rahul Sharma", team: "Rahul & Dev", matches: 5, wins: 4, points: 48 }
  },
  {
    tournamentNumber: "04",
    name: "Tournament 1",
    location: "Summit Pickle Club",
    winner: "Jay & Kushal",
    runnerUp: "Aditya & Krish",
    score: "11-7, 11-6",
    date: "Jun 2026",
    mvp: { name: "Jay Kushal", team: "Jay & Kushal", matches: 5, wins: 5, points: 55 }
  }
];

/**
 * Categories & Sub-Statistics Configuration
 */
export const STAT_CATEGORIES = {
  STANDINGS: {
    id: "standings",
    name: "STANDINGS",
    stats: [
      {
        id: "win-percentage",
        name: "Wins & Win Percentage",
        description: "Players and teams ranked by overall match success rate",
        leaderMetric: "Win Percentage",
        getLeaderValue: (t) => t.winPercentage,
        sortFn: (a, b) => b.winPercentageVal - a.winPercentageVal,
        columns: ["Rank", "Player / Team", "Matches", "Wins", "Losses", "Win %"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-win-accent">${t.wins}</td>
          <td class="col-stat col-loss-accent">${t.losses}</td>
          <td class="col-stat col-highlight"><strong>${t.winPercentage}</strong></td>
        `
      },
      {
        id: "matches-won",
        name: "Matches Won",
        description: "Total individual match victories recorded this season",
        leaderMetric: "Matches Won",
        getLeaderValue: (t) => `${t.wins} Wins`,
        sortFn: (a, b) => b.wins - a.wins,
        columns: ["Rank", "Player / Team", "Matches Played", "Wins"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-highlight"><strong>${t.wins}</strong></td>
        `
      },
      {
        id: "matches-lost",
        name: "Matches Lost",
        description: "Total match defeats conceded across all tournaments",
        leaderMetric: "Fewest Losses",
        getLeaderValue: (t) => `${t.losses} Losses`,
        sortFn: (a, b) => a.losses - b.losses, // fewest losses first
        columns: ["Rank", "Player / Team", "Matches Played", "Losses"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-loss-accent"><strong>${t.losses}</strong></td>
        `
      }
    ]
  },
  PERFORMANCE: {
    id: "performance",
    name: "PERFORMANCE",
    stats: [
      {
        id: "best-win-streak",
        name: "Best Win Streak",
        description: "Consecutive match victories achieved without a defeat",
        leaderMetric: "Best Streak",
        getLeaderValue: (t) => `${t.bestWinStreak} in a row`,
        sortFn: (a, b) => b.bestWinStreak - a.bestWinStreak,
        columns: ["Rank", "Player / Team", "Current Streak", "Best Streak"],
        renderRow: (t) => `
          <td class="col-stat"><span class="streak-pill">${t.currentStreak} W</span></td>
          <td class="col-stat col-highlight"><strong>${t.bestWinStreak} Games</strong></td>
        `
      },
      {
        id: "most-match-wins",
        name: "Most Match Wins",
        description: "Leading players ranked by total match wins recorded",
        leaderMetric: "Total Wins",
        getLeaderValue: (t) => `${t.wins} Wins`,
        sortFn: (a, b) => b.wins - a.wins,
        columns: ["Rank", "Player / Team", "Matches Played", "Wins"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-highlight"><strong>${t.wins}</strong></td>
        `
      },
      {
        id: "most-tournament-wins",
        name: "Most Tournament Wins",
        description: "Championship titles claimed in the Premier Series",
        leaderMetric: "Tournaments Won",
        getLeaderValue: (t) => `${t.tournamentWins} Titles`,
        sortFn: (a, b) => b.tournamentWins - a.tournamentWins || b.finals - a.finals,
        columns: ["Rank", "Player / Team", "Tournaments", "Wins"],
        renderRow: (t) => `
          <td class="col-stat">${t.tournamentsEntered}</td>
          <td class="col-stat col-highlight"><strong>${t.tournamentWins}</strong></td>
        `
      },
      {
        id: "most-finals",
        name: "Most Finals",
        description: "Total appearances in tournament championship finals",
        leaderMetric: "Finals Reached",
        getLeaderValue: (t) => `${t.finals} Finals`,
        sortFn: (a, b) => b.finals - a.finals,
        columns: ["Rank", "Player / Team", "Finals"],
        renderRow: (t) => `
          <td class="col-stat col-highlight"><strong>${t.finals}</strong></td>
        `
      },
      {
        id: "most-semi-finals",
        name: "Most Semi-Finals",
        description: "Consistency reaching the final four playoff rounds",
        leaderMetric: "Semi-Finals",
        getLeaderValue: (t) => `${t.semifinals} Semis`,
        sortFn: (a, b) => b.semifinals - a.semifinals,
        columns: ["Rank", "Player / Team", "Semi-Finals"],
        renderRow: (t) => `
          <td class="col-stat col-highlight"><strong>${t.semifinals}</strong></td>
        `
      },
      {
        id: "most-podium-finishes",
        name: "Most Podium Finishes",
        description: "Top 3 finishes (1st, 2nd, 3rd) accumulated across tournaments",
        leaderMetric: "Total Podiums",
        getLeaderValue: (t) => `${t.podiumFinishes.total} Podiums`,
        sortFn: (a, b) => b.podiumFinishes.total - a.podiumFinishes.total || b.podiumFinishes.first - a.podiumFinishes.first,
        columns: ["Rank", "Player / Team", "1st", "2nd", "3rd", "Podiums"],
        renderRow: (t) => `
          <td class="col-stat col-gold-txt">${t.podiumFinishes.first}</td>
          <td class="col-stat col-silver-txt">${t.podiumFinishes.second}</td>
          <td class="col-stat col-bronze-txt">${t.podiumFinishes.third}</td>
          <td class="col-stat col-highlight"><strong>${t.podiumFinishes.total}</strong></td>
        `
      }
    ]
  },
  SCORING: {
    id: "scoring",
    name: "SCORING",
    stats: [
      {
        id: "most-points-scored",
        name: "Most Points Scored",
        description: "Aggregate points scored across all games and sets",
        leaderMetric: "Points Scored",
        getLeaderValue: (t) => `${t.pointsScored} Pts`,
        sortFn: (a, b) => b.pointsScored - a.pointsScored,
        columns: ["Rank", "Player / Team", "Matches", "Points Scored"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-highlight"><strong>${t.pointsScored}</strong></td>
        `
      },
      {
        id: "biggest-winning-margin",
        name: "Biggest Winning Margin",
        description: "Highest single-game victory margins recorded on tour",
        leaderMetric: "Winning Margin",
        getLeaderValue: (t) => `${t.biggestMargin.margin} (${t.biggestMargin.score})`,
        sortFn: (a, b) => b.biggestMarginVal - a.biggestMarginVal,
        columns: ["Rank", "Player / Team", "Opponent", "Score", "Margin"],
        renderRow: (t) => `
          <td class="col-opponent">${t.biggestMargin.opponent}</td>
          <td class="col-stat"><span class="score-pill">${t.biggestMargin.score}</span></td>
          <td class="col-stat col-highlight"><strong>${t.biggestMargin.margin}</strong></td>
        `
      },
      {
        id: "best-point-difference",
        name: "Best Point Difference",
        description: "Net point differential between points won and points conceded",
        leaderMetric: "Point Difference",
        getLeaderValue: (t) => t.pointDifference,
        sortFn: (a, b) => b.pointDifferenceVal - a.pointDifferenceVal,
        columns: ["Rank", "Player / Team", "Points For", "Points Against", "Difference"],
        renderRow: (t) => `
          <td class="col-stat">${t.pointsScored}</td>
          <td class="col-stat">${t.pointsAgainst}</td>
          <td class="col-stat col-highlight"><strong>${t.pointDifference}</strong></td>
        `
      },
      {
        id: "most-11-plus-wins",
        name: "Most 11+ Point Wins",
        description: "Total games won by reaching 11 or more winning points",
        leaderMetric: "11+ Point Wins",
        getLeaderValue: (t) => `${t.elevenPlusWins} Wins`,
        sortFn: (a, b) => b.elevenPlusWins - a.elevenPlusWins,
        columns: ["Rank", "Player / Team", "Matches", "11+ Point Wins"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-highlight"><strong>${t.elevenPlusWins}</strong></td>
        `
      }
    ]
  },
  TOURNAMENT: {
    id: "tournament",
    name: "TOURNAMENT",
    stats: [
      {
        id: "tournament-winners",
        name: "Tournament Winners",
        description: "Official champions crowned across each Series stop",
        type: "custom_winners"
      },
      {
        id: "tournament-runners-up",
        name: "Tournament Runners-Up",
        description: "Championship finalists and tournament silver medalists",
        type: "custom_runners_up"
      },
      {
        id: "most-tournament-appearances",
        name: "Most Tournament Appearances",
        description: "Player and team participation loyalty across the season",
        leaderMetric: "Appearances",
        getLeaderValue: (t) => `${t.tournamentsEntered} Tournaments`,
        sortFn: (a, b) => b.tournamentsEntered - a.tournamentsEntered,
        columns: ["Rank", "Player / Team", "Appearances"],
        renderRow: (t) => `
          <td class="col-stat col-highlight"><strong>${t.tournamentsEntered}</strong></td>
        `
      },
      {
        id: "most-finals-appearances",
        name: "Most Finals Appearances",
        description: "Total championship matches contested",
        leaderMetric: "Finals Reached",
        getLeaderValue: (t) => `${t.finals} Finals`,
        sortFn: (a, b) => b.finals - a.finals,
        columns: ["Rank", "Player / Team", "Finals"],
        renderRow: (t) => `
          <td class="col-stat col-highlight"><strong>${t.finals}</strong></td>
        `
      },
      {
        id: "tournament-mvp",
        name: "Tournament MVP",
        description: "Most Valuable Player honors awarded per tournament",
        type: "custom_mvp"
      }
    ]
  },
  DOUBLES: {
    id: "doubles",
    name: "DOUBLES / TEAM",
    stats: [
      {
        id: "best-doubles-team",
        name: "Best Doubles Team",
        description: "Top-ranked intermediate doubles partnerships on tour",
        type: "custom_best_doubles"
      },
      {
        id: "most-doubles-wins",
        name: "Most Doubles Wins",
        description: "Leading partnerships by match victories together",
        leaderMetric: "Doubles Wins",
        getLeaderValue: (t) => `${t.wins} Wins`,
        sortFn: (a, b) => b.wins - a.wins,
        columns: ["Rank", "Player / Team", "Matches", "Doubles Wins"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat col-highlight"><strong>${t.wins}</strong></td>
        `
      },
      {
        id: "highest-team-points",
        name: "Highest Team Points",
        description: "Overall series leaderboard points accumulated as a team",
        leaderMetric: "Team Points",
        getLeaderValue: (t) => `${t.pointsScored} Points`,
        sortFn: (a, b) => b.pointsScored - a.pointsScored,
        columns: ["Rank", "Player / Team", "Tournaments", "Team Points"],
        renderRow: (t) => `
          <td class="col-stat">${t.tournamentsEntered}</td>
          <td class="col-stat col-highlight"><strong>${t.pointsScored}</strong></td>
        `
      },
      {
        id: "best-team-win-pct",
        name: "Best Team Win %",
        description: "Highest match winning percentage for established partnerships",
        leaderMetric: "Team Win %",
        getLeaderValue: (t) => t.winPercentage,
        sortFn: (a, b) => b.winPercentageVal - a.winPercentageVal,
        columns: ["Rank", "Player / Team", "Matches", "Wins", "Win %"],
        renderRow: (t) => `
          <td class="col-stat">${t.matchesPlayed}</td>
          <td class="col-stat">${t.wins}</td>
          <td class="col-stat col-highlight"><strong>${t.winPercentage}</strong></td>
        `
      },
      {
        id: "most-matches-together",
        name: "Most Matches Together",
        description: "Longest standing doubles partnerships in the series",
        leaderMetric: "Matches Together",
        getLeaderValue: (t) => `${t.matchesTogether} Matches`,
        sortFn: (a, b) => b.matchesTogether - a.matchesTogether,
        columns: ["Rank", "Player / Team", "Matches Together", "Win %"],
        renderRow: (t) => `
          <td class="col-stat col-highlight"><strong>${t.matchesTogether}</strong></td>
          <td class="col-stat">${t.winPercentage}</td>
        `
      }
    ]
  }
};
