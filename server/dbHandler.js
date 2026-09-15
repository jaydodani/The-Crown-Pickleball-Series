import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.resolve(__dirname, "../data/database.json");

export function getDb() {
  if (!fs.existsSync(DB_FILE)) {
    throw new Error(`Database file not found at ${DB_FILE}`);
  }
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw);
}

export function saveDb(data) {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function handleApiRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = url.pathname;
  const method = req.method.toUpperCase();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const readBody = () => new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });

  (async () => {
    try {
      const db = getDb();

      // Full Database Snapshot
      if (pathname === "/api/db") {
        if (method === "GET") {
          return res.end(JSON.stringify(db));
        }
        if (method === "POST") {
          const body = await readBody();
          saveDb(body);
          return res.end(JSON.stringify({ success: true, message: "Database saved" }));
        }
      }

      // Reset to original seed
      if (pathname === "/api/reset" && method === "POST") {
        const seedPath = path.resolve(__dirname, "../data/database.seed.json");
        if (fs.existsSync(seedPath)) {
          const seedData = JSON.parse(fs.readFileSync(seedPath, "utf-8"));
          saveDb(seedData);
          return res.end(JSON.stringify({ success: true, message: "Reset to seed data", db: seedData }));
        }
      }

      // ==================== TOURNAMENTS ====================
      if (pathname === "/api/tournaments" && method === "GET") {
        return res.end(JSON.stringify(db.tournaments || []));
      }

      if (pathname === "/api/tournaments" && method === "POST") {
        const body = await readBody();
        const id = body.id || `tourney-${Date.now()}`;
        const newTourney = {
          id,
          number: body.number || "01",
          name: body.name || "New Tournament",
          status: body.status || "UPCOMING",
          date: body.date || "",
          startTime: body.startTime || "08:00 AM",
          endTime: body.endTime || "07:00 PM",
          venueId: body.venueId || "",
          venue: body.venue || "The Racquet Club Ahmedabad",
          category: body.category || "Intermediate Doubles",
          maxTeams: body.maxTeams || 24,
          registeredTeams: body.registeredTeams || 0,
          registrationStatus: body.registrationStatus || "Open",
          city: body.city || "Ahmedabad",
          winner: body.winner || "",
          runnerUp: body.runnerUp || "",
          score: body.score || "",
          mvp: body.mvp || "",
          matchesPlayed: 0,
          pointsAwarded: body.pointsAwarded || "100 Pts",
          description: body.description || ""
        };
        db.tournaments = db.tournaments || [];
        db.tournaments.push(newTourney);
        saveDb(db);
        return res.end(JSON.stringify({ success: true, tournament: newTourney }));
      }

      const tourneyMatch = pathname.match(/^\/api\/tournaments\/([^/]+)$/);
      if (tourneyMatch) {
        const id = tourneyMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.tournaments || []).findIndex(t => t.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Tournament not found" }));
          }
          db.tournaments[idx] = { ...db.tournaments[idx], ...updates, id };
          saveDb(db);
          return res.end(JSON.stringify({ success: true, tournament: db.tournaments[idx] }));
        }

        if (method === "DELETE") {
          db.tournaments = (db.tournaments || []).filter(t => t.id !== id);
          // Safe cascade: remove matches belonging to this tournament
          db.matches = (db.matches || []).filter(m => m.tournamentId !== id);
          saveDb(db);
          return res.end(JSON.stringify({ success: true, id, message: "Tournament and associated matches deleted safely" }));
        }
      }

      // ==================== VENUES ====================
      if (pathname === "/api/venues" && method === "GET") {
        return res.end(JSON.stringify(db.venues || []));
      }

      if (pathname === "/api/venues" && method === "POST") {
        const body = await readBody();
        const id = body.id || `venue-${Date.now()}`;
        const newVenue = {
          id,
          name: body.name,
          city: body.city || "Ahmedabad, Gujarat",
          address: body.address || "Ahmedabad",
          courts: `${body.courtsCount || 6} Courts`,
          courtsCount: body.courtsCount || 6,
          surface: body.surface || "Championship Acrylic Pro",
          environment: body.environment || "Outdoor Covered Floodlit",
          mapUrl: body.mapUrl || "https://maps.google.com",
          tournamentsCount: 0,
          tournamentsHosted: [],
          upcomingTournaments: [],
          image: body.image || "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=800&q=80"
        };
        db.venues = db.venues || [];
        db.venues.push(newVenue);
        saveDb(db);
        return res.end(JSON.stringify({ success: true, venue: newVenue }));
      }

      const venueMatch = pathname.match(/^\/api\/venues\/([^/]+)$/);
      if (venueMatch) {
        const id = venueMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.venues || []).findIndex(v => v.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Venue not found" }));
          }
          db.venues[idx] = { ...db.venues[idx], ...updates, id };
          saveDb(db);
          return res.end(JSON.stringify({ success: true, venue: db.venues[idx] }));
        }

        if (method === "DELETE") {
          db.venues = (db.venues || []).filter(v => v.id !== id);
          saveDb(db);
          return res.end(JSON.stringify({ success: true, id }));
        }
      }

      // ==================== CATEGORIES ====================
      if (pathname === "/api/categories" && method === "GET") {
        return res.end(JSON.stringify(db.categories || []));
      }

      if (pathname === "/api/categories" && method === "POST") {
        const body = await readBody();
        const id = body.id || `cat-${Date.now()}`;
        const newCat = {
          id,
          name: body.name,
          type: body.type || "Doubles",
          format: body.format || "Best of 3 Sets • 11 Pts",
          gender: body.gender || "Open / Mixed",
          status: body.status || "Active"
        };
        db.categories = db.categories || [];
        db.categories.push(newCat);
        saveDb(db);
        return res.end(JSON.stringify({ success: true, category: newCat }));
      }

      const catMatch = pathname.match(/^\/api\/categories\/([^/]+)$/);
      if (catMatch) {
        const id = catMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.categories || []).findIndex(c => c.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Category not found" }));
          }
          db.categories[idx] = { ...db.categories[idx], ...updates, id };
          saveDb(db);
          return res.end(JSON.stringify({ success: true, category: db.categories[idx] }));
        }

        if (method === "DELETE") {
          db.categories = (db.categories || []).filter(c => c.id !== id);
          saveDb(db);
          return res.end(JSON.stringify({ success: true, id }));
        }
      }

      // ==================== PLAYERS ====================
      if (pathname === "/api/players" && method === "GET") {
        return res.end(JSON.stringify(db.players || []));
      }

      if (pathname === "/api/players" && method === "POST") {
        const body = await readBody();
        const id = body.id || `p-${Date.now()}`;
        const newPlayer = {
          id,
          name: body.name,
          team: body.team || "Independent",
          category: body.category || "Intermediate Doubles",
          phone: body.phone || "",
          email: body.email || "",
          duprRating: body.duprRating || "3.5 DUPR",
          tournaments: 0,
          games: 0,
          won: 0,
          loss: 0,
          points: 0,
          form: ["-"],
          pastMatches: []
        };
        db.players = db.players || [];
        db.players.push(newPlayer);
        saveDb(db);
        return res.end(JSON.stringify({ success: true, player: newPlayer }));
      }

      const playerMatch = pathname.match(/^\/api\/players\/([^/]+)$/);
      if (playerMatch) {
        const id = playerMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.players || []).findIndex(p => p.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Player not found" }));
          }
          db.players[idx] = { ...db.players[idx], ...updates, id };
          saveDb(db);
          return res.end(JSON.stringify({ success: true, player: db.players[idx] }));
        }

        if (method === "DELETE") {
          db.players = (db.players || []).filter(p => p.id !== id);
          saveDb(db);
          return res.end(JSON.stringify({ success: true, id }));
        }
      }

      // ==================== TEAMS ====================
      if (pathname === "/api/teams" && method === "GET") {
        return res.end(JSON.stringify(db.teams || []));
      }

      if (pathname === "/api/teams" && method === "POST") {
        const body = await readBody();
        const id = body.id || `team-${Date.now()}`;
        const newTeam = {
          id,
          name: body.name || `${body.player1} & ${body.player2}`,
          player1: body.player1,
          player2: body.player2,
          category: body.category || "Intermediate Doubles",
          matches: 0,
          wins: 0,
          losses: 0,
          points: 0,
          winRate: "0%"
        };
        db.teams = db.teams || [];
        db.teams.push(newTeam);
        saveDb(db);
        return res.end(JSON.stringify({ success: true, team: newTeam }));
      }

      const teamMatch = pathname.match(/^\/api\/teams\/([^/]+)$/);
      if (teamMatch) {
        const id = teamMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.teams || []).findIndex(t => t.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Team not found" }));
          }
          db.teams[idx] = { ...db.teams[idx], ...updates, id };
          saveDb(db);
          return res.end(JSON.stringify({ success: true, team: db.teams[idx] }));
        }

        if (method === "DELETE") {
          db.teams = (db.teams || []).filter(t => t.id !== id);
          saveDb(db);
          return res.end(JSON.stringify({ success: true, id }));
        }
      }

      // ==================== MATCHES ====================
      if (pathname === "/api/matches" && method === "GET") {
        return res.end(JSON.stringify(db.matches || []));
      }

      if (pathname === "/api/matches" && method === "POST") {
        const body = await readBody();
        const id = body.id || `m-${Date.now()}`;
        const scoreA = body.scoreA !== undefined && body.scoreA !== null ? Number(body.scoreA) : null;
        const scoreB = body.scoreB !== undefined && body.scoreB !== null ? Number(body.scoreB) : null;
        
        let winner = body.winner || "";
        if (!winner && scoreA !== null && scoreB !== null && scoreA !== scoreB) {
          winner = scoreA > scoreB ? body.teamA : body.teamB;
        }

        const newMatch = {
          id,
          tournamentId: body.tournamentId,
          tournamentName: body.tournamentName || "Championship Match",
          round: body.round || "Group Stage",
          teamA: body.teamA,
          teamB: body.teamB,
          court: body.court || "Court 1",
          date: body.date || "",
          time: body.time || "09:00 AM",
          scoreA,
          scoreB,
          score: (scoreA !== null && scoreB !== null) ? `${scoreA}-${scoreB}` : (body.score || "vs"),
          winner,
          status: body.status || "Scheduled",
          verified: body.verified || (body.status === "Completed")
        };

        db.matches = db.matches || [];
        db.matches.unshift(newMatch);

        // Update tournament matchesPlayed count if completed
        if (newMatch.status === "Completed" && newMatch.tournamentId) {
          const tIdx = (db.tournaments || []).findIndex(t => t.id === newMatch.tournamentId);
          if (tIdx !== -1) {
            const count = db.matches.filter(m => m.tournamentId === newMatch.tournamentId && m.status === "Completed").length;
            db.tournaments[tIdx].matchesPlayed = count;
          }
        }

        saveDb(db);
        return res.end(JSON.stringify({ success: true, match: newMatch }));
      }

      const matchMatch = pathname.match(/^\/api\/matches\/([^/]+)$/);
      if (matchMatch) {
        const id = matchMatch[1];
        if (method === "PUT") {
          const updates = await readBody();
          const idx = (db.matches || []).findIndex(m => m.id === id);
          if (idx === -1) {
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: "Match not found" }));
          }

          const existing = db.matches[idx];
          const merged = { ...existing, ...updates, id };

          if (merged.scoreA !== undefined && merged.scoreB !== undefined && merged.scoreA !== null && merged.scoreB !== null) {
            merged.scoreA = Number(merged.scoreA);
            merged.scoreB = Number(merged.scoreB);
            merged.score = `${merged.scoreA}-${merged.scoreB}`;
            if (!updates.winner && merged.scoreA !== merged.scoreB) {
              merged.winner = merged.scoreA > merged.scoreB ? merged.teamA : merged.teamB;
            }
          }

          db.matches[idx] = merged;

          // Recalculate matchesPlayed on tournament
          if (merged.tournamentId) {
            const tIdx = (db.tournaments || []).findIndex(t => t.id === merged.tournamentId);
            if (tIdx !== -1) {
              const count = db.matches.filter(m => m.tournamentId === merged.tournamentId && m.status === "Completed").length;
              db.tournaments[tIdx].matchesPlayed = count;
            }
          }

          saveDb(db);
          return res.end(JSON.stringify({ success: true, match: db.matches[idx] }));
        }

        if (method === "DELETE") {
          const match = (db.matches || []).find(m => m.id === id);
          db.matches = (db.matches || []).filter(m => m.id !== id);

          if (match && match.tournamentId) {
            const tIdx = (db.tournaments || []).findIndex(t => t.id === match.tournamentId);
            if (tIdx !== -1) {
              const count = db.matches.filter(m => m.tournamentId === match.tournamentId && m.status === "Completed").length;
              db.tournaments[tIdx].matchesPlayed = count;
            }
          }

          saveDb(db);
          return res.end(JSON.stringify({ success: true, id }));
        }
      }

      // Not found
      res.statusCode = 404;
      return res.end(JSON.stringify({ error: `Not found: ${pathname}` }));

    } catch (err) {
      console.error("API error:", err);
      res.statusCode = 500;
      return res.end(JSON.stringify({ error: err.message || "Internal server error" }));
    }
  })();
}
