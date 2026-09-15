/**
 * The Racquet Club Ahmedabad - Admin Dashboard Controller
 * Handles SPA navigation, views, modal forms, and live synchronization with dataStore.
 */

import { dataStore } from "../dataStore.js";

// DOM Elements
const viewContainer = document.getElementById("admin-view-container");
const pageTitleEl = document.getElementById("page-title");
const pageBreadcrumbEl = document.getElementById("page-breadcrumb");
const sidebarLinks = document.querySelectorAll(".sidebar-nav .nav-link");
const sidebarEl = document.getElementById("admin-sidebar");
const sidebarToggleBtn = document.getElementById("sidebar-toggle");
const modalBackdrop = document.getElementById("admin-modal-backdrop");
const modalCard = document.getElementById("admin-modal-card");
const toastContainer = document.getElementById("toast-container");
const logoutBtn = document.getElementById("btn-admin-logout");
const notifBtn = document.getElementById("notif-btn");

// Global Current State
let currentRoute = "dashboard";
let currentRouteParam = null;

/**
 * Initialize Admin App
 */
export function initAdminApp() {
  bindNavigation();
  bindSidebarToggle();
  bindGlobalEvents();

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashRouting);

  // Subscribe to data store updates
  dataStore.subscribe((event) => {
    // Re-render current view to reflect changes in real time
    renderCurrentRoute();
  });

  // Initial Route Resolution
  handleHashRouting();
}

/**
 * Hash Routing Handler
 */
function handleHashRouting() {
  const rawHash = window.location.hash.replace(/^#\/?/, "") || "dashboard";
  const parts = rawHash.split("/");
  currentRoute = parts[0] || "dashboard";
  currentRouteParam = parts[1] || null;

  // Update active nav link
  sidebarLinks.forEach(link => {
    const linkView = link.getAttribute("data-view");
    if (linkView === currentRoute) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Close mobile sidebar on navigation
  if (sidebarEl) sidebarEl.classList.remove("open");

  renderCurrentRoute();
}

/**
 * Render View based on current route
 */
function renderCurrentRoute() {
  if (!viewContainer) return;

  switch (currentRoute) {
    case "dashboard":
      renderDashboardView();
      break;
    case "tournaments":
      renderTournamentsView();
      break;
    case "add-tournament":
      renderAddTournamentView();
      break;
    case "tournament-detail":
      renderTournamentDetailView(currentRouteParam);
      break;
    case "tournament-matches":
    case "matches":
      renderMatchesView();
      break;
    case "venues":
      renderVenuesView();
      break;
    case "categories":
      renderCategoriesView();
      break;
    case "players":
      renderPlayersView();
      break;
    case "doubles-teams":
      renderDoublesTeamsView();
      break;
    case "registrations":
      renderRegistrationsView();
      break;
    case "results":
      renderResultsView();
      break;
    case "points-table":
      renderPointsTableView();
      break;
    case "rankings":
      renderRankingsView();
      break;
    case "stats":
    case "tournament-records":
    case "player-records":
      renderStatsView();
      break;
    case "updates":
    case "community":
      renderUpdatesView();
      break;
    case "settings":
      renderSettingsView();
      break;
    case "admin-users":
      renderAdminUsersView();
      break;
    default:
      renderDashboardView();
      break;
  }
}

/**
 * Update Top Bar Breadcrumb & Title
 */
function setHeader(title, breadcrumb) {
  if (pageTitleEl) pageTitleEl.textContent = title;
  if (pageBreadcrumbEl) pageBreadcrumbEl.textContent = breadcrumb;
  document.title = `${title} • The Racquet Club Pickleball Series Admin`;
}

// ==========================================================================
// 1. DASHBOARD VIEW
// ==========================================================================
function renderDashboardView() {
  setHeader("Dashboard", "Pickleball Series Management Overview");

  const metrics = dataStore.getSummaryMetrics();
  const tournaments = dataStore.getTournaments();
  const recentTournaments = tournaments.slice(0, 5);
  const matches = dataStore.getMatches();
  const completedMatches = matches.filter(m => m.status === "Completed").slice(0, 4);

  viewContainer.innerHTML = `
    <!-- Top Greeting Banner -->
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Hello, Administrator</h2>
        <p class="view-sub-title">Pickleball Series Management Overview • Live Season 2026 Operations</p>
      </div>
      <div class="view-header-actions">
        <span class="date-pill-tag">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <a href="#add-tournament" class="btn-admin-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Tournament</span>
        </a>
      </div>
    </div>

    <!-- 6 Summary Metric Cards -->
    <div class="summary-cards-grid">
      
      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge blue">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
              <path d="M4 22h16"></path>
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
            </svg>
          </div>
          <span class="metric-pill-sub success">Season 2026</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number">${metrics.activeTournaments}</span>
          <span class="metric-label">Active Tournaments</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge green">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <span class="metric-pill-sub">Roster</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number">${metrics.playersCount}</span>
          <span class="metric-label">Players</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge amber">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <span class="metric-pill-sub">Doubles</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number">${metrics.teamsCount}</span>
          <span class="metric-label">Doubles Teams</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge purple">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="12 8 8 12 12 16 12 8"></polygon>
              <polygon points="12 8 16 12 12 16 12 8"></polygon>
            </svg>
          </div>
          <span class="metric-pill-sub success">Recorded</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number">${metrics.matchesPlayed}</span>
          <span class="metric-label">Matches Played</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge blue">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <span class="metric-pill-sub">Next Stop</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number text-pill">${metrics.upcomingTournament}</span>
          <span class="metric-label">Upcoming Tournament</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <div class="metric-icon-badge green">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          <span class="metric-pill-sub success">Confirmed</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number">${metrics.registeredTeams}</span>
          <span class="metric-label">Registered Teams</span>
        </div>
      </div>

    </div>

    <!-- Analytics & Activity Rail Grid -->
    <div class="analytics-spotlight-grid">
      
      <!-- Performance Analytics Chart (Inspired by Reference UI) -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title-group">
            <h3 class="admin-card-title">Performance & Match Scoring Distribution</h3>
            <span class="admin-card-subtitle">Points scoring curves across completed tournament brackets</span>
          </div>
          <span class="date-pill-tag">Season Progression</span>
        </div>
        <div class="admin-card-body">
          <div class="chart-container">
            <svg class="chart-svg" viewBox="0 0 600 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3B77E0" stop-opacity="0.25"></stop>
                  <stop offset="100%" stop-color="#3B77E0" stop-opacity="0.0"></stop>
                </linearGradient>
                <linearGradient id="chartGradGreen" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#009668" stop-opacity="0.22"></stop>
                  <stop offset="100%" stop-color="#009668" stop-opacity="0.0"></stop>
                </linearGradient>
              </defs>
              
              <!-- Subtle Grid lines -->
              <line x1="0" y1="30" x2="600" y2="30" stroke="#F1F5F9" stroke-width="1"></line>
              <line x1="0" y1="75" x2="600" y2="75" stroke="#F1F5F9" stroke-width="1"></line>
              <line x1="0" y1="120" x2="600" y2="120" stroke="#F1F5F9" stroke-width="1"></line>
              <line x1="0" y1="165" x2="600" y2="165" stroke="#E2E8F0" stroke-width="1.5"></line>

              <!-- Series 1 Area & Line (Tournament Winners Match Points) -->
              <path d="M 20 120 Q 80 80, 140 100 T 260 50 T 380 40 T 500 35 L 580 45 L 580 165 L 20 165 Z" fill="url(#chartGradBlue)"></path>
              <path d="M 20 120 Q 80 80, 140 100 T 260 50 T 380 40 T 500 35 L 580 45" fill="none" stroke="#3B77E0" stroke-width="3" stroke-linecap="round"></path>

              <!-- Series 2 Area & Line (League Average Match Points) -->
              <path d="M 20 145 Q 80 130, 140 125 T 260 95 T 380 85 T 500 70 L 580 80 L 580 165 L 20 165 Z" fill="url(#chartGradGreen)"></path>
              <path d="M 20 145 Q 80 130, 140 125 T 260 95 T 380 85 T 500 70 L 580 80" fill="none" stroke="#009668" stroke-width="2.5" stroke-linecap="round"></path>

              <!-- Data Markers -->
              <circle cx="260" cy="50" r="5" fill="#3B77E0" stroke="#FFFFFF" stroke-width="2"></circle>
              <circle cx="380" cy="40" r="5" fill="#3B77E0" stroke="#FFFFFF" stroke-width="2"></circle>
              <circle cx="500" cy="35" r="5" fill="#3B77E0" stroke="#FFFFFF" stroke-width="2"></circle>
            </svg>
          </div>

          <div class="chart-legend-row">
            <div class="legend-item">
              <span class="legend-dot blue"></span>
              <span>Tournament Winning Points Pace</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot green"></span>
              <span>League Average Scoring Index</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Status Rail -->
      <div class="admin-card">
        <div class="admin-card-header">
          <div class="admin-card-title-group">
            <h3 class="admin-card-title">Recent Match Results</h3>
            <span class="admin-card-subtitle">Latest verified scores</span>
          </div>
          <a href="#results" class="btn-table-action primary">View All</a>
        </div>
        <div class="admin-card-body">
          <div class="rail-status-list">
            ${completedMatches.map(m => `
              <div class="rail-status-item">
                <div class="rail-item-info">
                  <strong class="rail-item-title">${m.teamA} vs ${m.teamB}</strong>
                  <span class="rail-item-sub">${m.tournamentName.split("•")[0].trim()} • ${m.round}</span>
                </div>
                <span class="rail-item-stat">${m.score}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

    </div>

    <!-- Tournaments Overview Section (Requirement 7) -->
    <div class="admin-card">
      <div class="admin-card-header">
        <div class="admin-card-title-group">
          <h3 class="admin-card-title">Tournaments Overview</h3>
          <span class="admin-card-subtitle">Current status and master championship events</span>
        </div>
        <div class="view-header-actions">
          <a href="#tournaments" class="btn-admin-secondary">Manage All Tournaments</a>
          <a href="#add-tournament" class="btn-admin-primary">+ Add Tournament</a>
        </div>
      </div>
      
      <div class="admin-table-container">
        <table class="admin-data-table" aria-label="Tournaments Table">
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Category</th>
              <th style="text-align: right;">Teams</th>
              <th>Status</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${recentTournaments.map(t => {
              const isCompleted = t.status === "COMPLETED";
              const badgeCls = isCompleted ? "completed" : "upcoming";
              const badgeText = isCompleted ? "Completed" : "Upcoming";
              return `
                <tr>
                  <td>
                    <strong>${t.name}</strong>
                  </td>
                  <td>${t.date}</td>
                  <td>${t.venue}</td>
                  <td>${t.category}</td>
                  <td style="text-align: right; font-weight: 700;">${t.maxTeams || 24}</td>
                  <td>
                    <span class="badge-status ${badgeCls}">${badgeText}</span>
                  </td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <a href="#tournament-detail/${t.id}" class="btn-table-action primary" title="View Tournament Details">View</a>
                      <button class="btn-table-action btn-edit-tourney" data-tourney-id="${t.id}" title="Edit Tournament">Edit</button>
                      <a href="#tournament-matches/${t.id}" class="btn-table-action" title="Manage Matches">Manage Matches</a>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Bind quick edit buttons
  viewContainer.querySelectorAll(".btn-edit-tourney").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-tourney-id");
      openEditTournamentModal(id);
    });
  });
}

// ==========================================================================
// 2. TOURNAMENTS LIST VIEW
// ==========================================================================
function renderTournamentsView() {
  setHeader("Tournaments", "Manage all championship series tournaments");

  const tournaments = dataStore.getTournaments();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Tournaments Management</h2>
        <p class="view-sub-title">Review, create, and maintain all official championship stops</p>
      </div>
      <div class="view-header-actions">
        <a href="#add-tournament" class="btn-admin-primary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Add Tournament</span>
        </a>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Tournament Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Category</th>
              <th>Teams</th>
              <th>Status</th>
              <th>Winner / MVP</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${tournaments.map(t => {
              const isCompleted = t.status === "COMPLETED";
              const badgeCls = isCompleted ? "completed" : "upcoming";
              const badgeText = isCompleted ? "Completed" : "Upcoming";
              return `
                <tr>
                  <td>
                    <strong>${t.name}</strong>
                    <div style="font-size: 0.72rem; color: #64748B;">No. ${t.number} • ${t.pointsAwarded || '100 Pts'}</div>
                  </td>
                  <td>${t.date}</td>
                  <td>${t.venue}</td>
                  <td>${t.category}</td>
                  <td>${t.registeredTeams || 24} / ${t.maxTeams || 24}</td>
                  <td><span class="badge-status ${badgeCls}">${badgeText}</span></td>
                  <td>
                    ${t.winner ? `<strong>${t.winner}</strong> <span style="font-size: 0.72rem; color: #047857;">(${t.mvp || 'MVP'})</span>` : '<span style="color: #94A3B8;">—</span>'}
                  </td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <a href="#tournament-detail/${t.id}" class="btn-table-action primary">View</a>
                      <button class="btn-table-action btn-edit-tourney" data-tourney-id="${t.id}">Edit</button>
                      <a href="#tournament-matches/${t.id}" class="btn-table-action">Matches</a>
                      <button class="btn-table-action danger btn-del-tourney" data-tourney-id="${t.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  // Bind actions
  viewContainer.querySelectorAll(".btn-edit-tourney").forEach(btn => {
    btn.addEventListener("click", () => openEditTournamentModal(btn.getAttribute("data-tourney-id")));
  });

  viewContainer.querySelectorAll(".btn-del-tourney").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-tourney-id");
      const t = dataStore.getTournamentById(id);
      openConfirmModal({
        title: "Delete Tournament",
        message: "Are you sure you want to delete this tournament?",
        details: t ? `Tournament: <strong>${t.name}</strong> (${t.date})<br><span style="font-size: 0.8rem; color: #DC2626;">Associated matches and results will also be safely removed.</span>` : "",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          dataStore.deleteTournament(id);
          showToast("Tournament deleted successfully", "success");
          renderTournamentsView();
        }
      });
    });
  });
}

// ==========================================================================
// 3. ADD TOURNAMENT VIEW (Requirement 8)
// ==========================================================================
function renderAddTournamentView() {
  setHeader("Add Tournament", "Create a new series championship tournament");

  const venues = dataStore.getVenues();
  const categories = dataStore.getCategories();
  const players = dataStore.getPlayers();
  const teams = dataStore.getTeams();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Add Tournament</h2>
        <p class="view-sub-title">Configure official championship dates, venues, categories, and rules</p>
      </div>
      <a href="#tournaments" class="btn-admin-secondary">Back to Tournaments</a>
    </div>

    <div class="admin-card">
      <div class="admin-card-body">
        <form id="form-add-tournament">
          <div class="admin-form-grid">
            
            <div class="form-group">
              <label class="form-label" for="tourney-name">Tournament Name <span class="required">*</span></label>
              <input type="text" id="tourney-name" class="form-input" placeholder="e.g. Tournament 5 • Autumn Championship" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-num">Tournament Number <span class="required">*</span></label>
              <input type="number" id="tourney-num" class="form-input" placeholder="5" min="1" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-date">Date Range <span class="required">*</span></label>
              <input type="text" id="tourney-date" class="form-input" placeholder="e.g. Oct 16–18, 2026" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-venue">Venue <span class="required">*</span></label>
              <select id="tourney-venue" class="form-select" required>
                ${venues.map(v => `<option value="${v.name}" data-venue-id="${v.id}">${v.name} (${v.city})</option>`).join("")}
                <option value="__custom__">+ Enter Custom / New Venue...</option>
              </select>
              <input type="text" id="tourney-venue-custom" class="form-input" placeholder="e.g. Racquet Club Ahmedabad" style="display: none; margin-top: 6px;">
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-start-time">Start Time</label>
              <input type="time" id="tourney-start-time" class="form-input" value="08:00">
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-end-time">End Time</label>
              <input type="time" id="tourney-end-time" class="form-input" value="19:00">
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-category">Category <span class="required">*</span></label>
              <select id="tourney-category" class="form-select" required>
                ${categories.map(c => `<option value="${c.name}">${c.name} (${c.type})</option>`).join("")}
                <option value="__custom__">+ Enter Custom Category...</option>
              </select>
              <input type="text" id="tourney-cat-custom" class="form-input" placeholder="e.g. Intermediate Doubles" style="display: none; margin-top: 6px;">
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-max-teams">Maximum Teams / Players</label>
              <input type="number" id="tourney-max-teams" class="form-input" value="24" min="4" max="64">
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-reg-status">Registration Status</label>
              <select id="tourney-reg-status" class="form-select">
                <option value="Open">Open</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-status">Tournament Status</label>
              <select id="tourney-status" class="form-select">
                <option value="UPCOMING">Upcoming</option>
                <option value="LIVE">Live</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div class="form-group col-span-2">
              <label class="form-label" for="tourney-desc">Description</label>
              <textarea id="tourney-desc" class="form-textarea" placeholder="Provide event context, court rules, and player entry guidelines..."></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-winner">Winner (If Completed)</label>
              <select id="tourney-winner" class="form-select">
                <option value="">-- Select Winner Team --</option>
                ${teams.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-runnerup">Runner-Up (If Completed)</label>
              <select id="tourney-runnerup" class="form-select">
                <option value="">-- Select Runner-Up Team --</option>
                ${teams.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-mvp">MVP (If Completed)</label>
              <select id="tourney-mvp" class="form-select">
                <option value="">-- Select Tournament MVP Player --</option>
                ${players.map(p => `<option value="${p.name}">${p.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-points">Points Awarded</label>
              <input type="text" id="tourney-points" class="form-input" value="150 Series Pts">
            </div>

          </div>

          <div class="form-actions-bar">
            <button type="button" class="btn-admin-secondary" id="btn-cancel-tourney">Cancel</button>
            <button type="submit" class="btn-admin-primary" id="btn-save-tourney">SAVE TO DATABASE</button>
            <button type="button" class="btn-admin-primary" id="btn-save-manage-matches" style="background-color: var(--admin-court-green);">Save & Manage Matches</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("form-add-tournament");
  const cancelBtn = document.getElementById("btn-cancel-tourney");
  const saveManageBtn = document.getElementById("btn-save-manage-matches");

  const venueSelect = document.getElementById("tourney-venue");
  const venueCustom = document.getElementById("tourney-venue-custom");
  venueSelect.addEventListener("change", () => {
    if (venueSelect.value === "__custom__") {
      venueCustom.style.display = "block";
      venueCustom.focus();
    } else {
      venueCustom.style.display = "none";
    }
  });

  const catSelect = document.getElementById("tourney-category");
  const catCustom = document.getElementById("tourney-cat-custom");
  catSelect.addEventListener("change", () => {
    if (catSelect.value === "__custom__") {
      catCustom.style.display = "block";
      catCustom.focus();
    } else {
      catCustom.style.display = "none";
    }
  });

  cancelBtn.addEventListener("click", () => {
    window.location.hash = "#tournaments";
  });

  const handleSave = (goToMatches = false) => {
    const name = document.getElementById("tourney-name").value.trim();
    const num = document.getElementById("tourney-num").value.trim();
    const date = document.getElementById("tourney-date").value.trim();
    
    let venue = venueSelect.value;
    let venueId = venueSelect.selectedOptions[0]?.getAttribute("data-venue-id") || "";
    if (venue === "__custom__") {
      venue = venueCustom.value.trim() || "The Racquet Club Ahmedabad";
      venueId = `venue-${Date.now()}`;
    }

    let category = catSelect.value;
    if (category === "__custom__") {
      category = catCustom.value.trim() || "Intermediate Doubles";
    }

    const startTime = document.getElementById("tourney-start-time").value;
    const endTime = document.getElementById("tourney-end-time").value;
    const maxTeams = Number(document.getElementById("tourney-max-teams").value) || 24;
    const regStatus = document.getElementById("tourney-reg-status").value;
    const status = document.getElementById("tourney-status").value;
    const desc = document.getElementById("tourney-desc").value.trim();
    const winner = document.getElementById("tourney-winner").value;
    const runnerUp = document.getElementById("tourney-runnerup").value;
    const mvp = document.getElementById("tourney-mvp").value;
    const points = document.getElementById("tourney-points").value.trim() || "100 Pts";

    if (!name || !date) {
      showToast("Please fill in required fields", "danger");
      return;
    }

    const newTourney = dataStore.addTournament({
      number: String(num).padStart(2, "0"),
      name,
      status,
      date,
      startTime,
      endTime,
      venueId,
      venue,
      category,
      maxTeams,
      registrationStatus: regStatus,
      description: desc,
      winner,
      runnerUp,
      mvp,
      pointsAwarded: points,
      city: "Ahmedabad"
    });

    showToast(`${name} saved to database`, "success");

    if (goToMatches) {
      window.location.hash = `#tournament-matches/${newTourney.id}`;
    } else {
      window.location.hash = "#tournaments";
    }
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSave(false);
  });

  saveManageBtn.addEventListener("click", () => {
    handleSave(true);
  });
}

// ==========================================================================
// 4. TOURNAMENT DETAIL VIEW (Requirement 9)
// ==========================================================================
function renderTournamentDetailView(tourneyId) {
  const tournaments = dataStore.getTournaments();
  const tourney = tournaments.find(t => t.id === tourneyId) || tournaments[0];
  if (!tourney) {
    window.location.hash = "#tournaments";
    return;
  }

  setHeader(tourney.name, `Tournament Detail • ${tourney.venue}`);

  const matches = dataStore.getMatches().filter(m => m.tournamentId === tourney.id);
  const registrations = dataStore.getRegistrations().filter(r => r.tournament.includes(tourney.number) || r.tournament.includes(tourney.name.split("•")[0].trim()));
  const isCompleted = tourney.status === "COMPLETED";

  viewContainer.innerHTML = `
    <!-- Detail Hero Card -->
    <div class="tourney-detail-hero">
      <div class="detail-hero-top">
        <span class="badge-status ${isCompleted ? 'completed' : 'upcoming'}">${isCompleted ? 'Completed' : 'Upcoming'}</span>
        <div class="view-header-actions">
          <button class="btn-admin-secondary btn-edit-this-tourney">Edit Details</button>
          <a href="#tournament-matches/${tourney.id}" class="btn-admin-primary">+ Add Match</a>
        </div>
      </div>
      <h2 class="detail-hero-name">${tourney.name}</h2>
      <div class="detail-meta-triplet">
        <span><strong>Date:</strong> ${tourney.date}</span>
        <span>•</span>
        <span><strong>Venue:</strong> ${tourney.venue}</span>
        <span>•</span>
        <span><strong>Category:</strong> ${tourney.category}</span>
        <span>•</span>
        <span><strong>Max Teams:</strong> ${tourney.maxTeams || 24}</span>
        ${tourney.winner ? `<span>•</span><span><strong>Champion:</strong> ${tourney.winner}</span>` : ''}
      </div>
    </div>

    <!-- Detail Sub-Navigation Tabs -->
    <div class="tourney-tabs-nav" id="tourney-subtabs">
      <button class="tourney-tab-btn active" data-tab="overview">Overview</button>
      <button class="tourney-tab-btn" data-tab="teams">Teams (${registrations.length || 24})</button>
      <button class="tourney-tab-btn" data-tab="matches">Matches (${matches.length})</button>
      <button class="tourney-tab-btn" data-tab="results">Results</button>
      <button class="tourney-tab-btn" data-tab="points">Points Table</button>
      <button class="tourney-tab-btn" data-tab="stats">Stats</button>
    </div>

    <!-- Tab Pane Container -->
    <div class="admin-card" id="tourney-tab-content">
      <!-- Injected by tab handler -->
    </div>
  `;

  // Bind tab switching
  const tabBtns = viewContainer.querySelectorAll(".tourney-tab-btn");
  const tabContent = document.getElementById("tourney-tab-content");

  const switchTab = (tabName) => {
    tabBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-tab") === tabName));
    if (tabName === "overview") {
      tabContent.innerHTML = `
        <div class="admin-card-body">
          <h3 class="admin-card-title" style="margin-bottom: 12px;">Tournament Overview & Technical Specifications</h3>
          <p style="color: #475569; margin-bottom: 20px; line-height: 1.6;">${tourney.description || "Official championship stop hosted by The Racquet Club Ahmedabad series."}</p>
          <div class="admin-form-grid">
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Start & End Hours</strong>
                <span>${tourney.startTime || '08:00 AM'} – ${tourney.endTime || '07:30 PM'}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Series Points Awarded</strong>
                <span>${tourney.pointsAwarded || '100 Pts'}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Registration Window</strong>
                <span>${tourney.registrationStatus || 'Open'}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Tournament MVP</strong>
                <span>${tourney.mvp || 'TBD upon tournament conclusion'}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (tabName === "matches" || tabName === "results") {
      tabContent.innerHTML = `
        <div class="admin-card-header">
          <h3 class="admin-card-title">Tournament Matches</h3>
          <a href="#tournament-matches/${tourney.id}" class="btn-admin-primary">+ Add Match</a>
        </div>
        <div class="admin-table-container">
          <table class="admin-data-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Team A</th>
                <th>Team B</th>
                <th>Court</th>
                <th>Date & Time</th>
                <th>Score</th>
                <th>Winner</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${matches.length ? matches.map(m => `
                <tr>
                  <td><strong>${m.round}</strong></td>
                  <td>${m.teamA}</td>
                  <td>${m.teamB}</td>
                  <td>${m.court}</td>
                  <td>${m.date} • ${m.time}</td>
                  <td><strong>${m.score}</strong></td>
                  <td><span style="color: #047857; font-weight: 700;">${m.winner || '—'}</span></td>
                  <td><span class="badge-status ${m.status.toLowerCase()}">${m.status}</span></td>
                </tr>
              `).join("") : '<tr><td colspan="8" style="text-align: center; color: #94A3B8; padding: 24px;">No matches recorded for this tournament yet. Click "+ Add Match" to schedule matches.</td></tr>'}
            </tbody>
          </table>
        </div>
      `;
    } else {
      // Default Teams / Points preview
      const points = dataStore.getPointsTable().slice(0, 10);
      tabContent.innerHTML = `
        <div class="admin-card-body">
          <h3 class="admin-card-title" style="margin-bottom: 14px;">Series Standings Snapshot</h3>
          <div class="admin-table-container">
            <table class="admin-data-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player / Team</th>
                  <th>Games</th>
                  <th>Won</th>
                  <th>Loss</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                ${points.map(p => `
                  <tr>
                    <td><strong>#${p.rank}</strong></td>
                    <td>${p.name}</td>
                    <td>${p.games}</td>
                    <td>${p.won}</td>
                    <td>${p.loss}</td>
                    <td><strong style="color: var(--admin-primary);">${p.points}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => switchTab(btn.getAttribute("data-tab")));
  });

  // Default tab
  switchTab("overview");

  viewContainer.querySelector(".btn-edit-this-tourney")?.addEventListener("click", () => {
    openEditTournamentModal(tourney.id);
  });
}

// ==========================================================================
// 5. TOURNAMENT MATCHES & MATCH CREATOR (Requirement 10 & 16)
// ==========================================================================
function renderMatchesView() {
  setHeader("Matches Management", "Central Match Database • Schedules, Live Scores & Verification");

  const matches = dataStore.getMatches();
  const tournaments = dataStore.getTournaments();
  const teams = dataStore.getTeams();
  const venues = dataStore.getVenues();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Tournament Matches</h2>
        <p class="view-sub-title">Central unified match database driving live points tables and championship analytics</p>
      </div>
      <div class="view-header-actions">
        <button class="btn-admin-primary" id="btn-open-add-match">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>+ Add Match</span>
        </button>
      </div>
    </div>

    <!-- Match Filters Bar -->
    <div class="admin-card" style="margin-bottom: 20px;">
      <div class="admin-card-body" style="padding: 14px 20px;">
        <div style="display: flex; align-items: center; gap: 14px; flex-wrap: wrap;">
          <label style="font-weight: 700; font-size: 0.8rem; color: #475569; text-transform: uppercase;">Filter By Tournament:</label>
          <select id="filter-match-tourney" class="form-select" style="width: auto; min-width: 240px; padding: 6px 12px;">
            <option value="ALL">All Tournaments</option>
            ${tournaments.map(t => `<option value="${t.id}" ${currentRouteParam === t.id ? 'selected' : ''}>${t.name}</option>`).join("")}
          </select>
        </div>
      </div>
    </div>

    <!-- Matches Table -->
    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table" id="table-matches">
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Round</th>
              <th>Team A</th>
              <th>Team B</th>
              <th>Court</th>
              <th>Date & Time</th>
              <th>Score</th>
              <th>Winner</th>
              <th>Status</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody id="matches-tbody">
            <!-- Populated dynamically -->
          </tbody>
        </table>
      </div>
    </div>
  `;

  const filterSelect = document.getElementById("filter-match-tourney");
  const tbody = document.getElementById("matches-tbody");

  const renderTableRows = () => {
    const selectedTourney = filterSelect.value;
    const filtered = selectedTourney === "ALL" 
      ? dataStore.getMatches() 
      : dataStore.getMatches().filter(m => m.tournamentId === selectedTourney);

    if (!filtered.length) {
      tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; color: #94A3B8; padding: 32px;">No matches found matching filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(m => `
      <tr>
        <td><strong>${m.tournamentName ? m.tournamentName.split("•")[0].trim() : 'Series Match'}</strong></td>
        <td><span style="font-weight: 700; color: #475569;">${m.round}</span></td>
        <td><strong>${m.teamA}</strong></td>
        <td><strong>${m.teamB}</strong></td>
        <td>${m.court}</td>
        <td>${m.date} • ${m.time}</td>
        <td><span class="badge-status ${m.status === 'Completed' ? 'completed' : 'upcoming'}">${m.score}</span></td>
        <td><strong style="color: #047857;">${m.winner || '—'}</strong></td>
        <td><span class="badge-status ${m.status.toLowerCase()}">${m.status}</span></td>
        <td style="text-align: center;">
          <div class="table-actions-cell" style="justify-content: center;">
            <button class="btn-table-action btn-edit-match" data-match-id="${m.id}">Edit</button>
            <button class="btn-table-action danger btn-del-match" data-match-id="${m.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join("");

    // Bind edit/delete
    tbody.querySelectorAll(".btn-edit-match").forEach(btn => {
      btn.addEventListener("click", () => openEditMatchModal(btn.getAttribute("data-match-id")));
    });

    tbody.querySelectorAll(".btn-del-match").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-match-id");
        const m = dataStore.getMatchById(id);
        openConfirmModal({
          title: "Delete Match Record",
          message: "Are you sure you want to delete this match record?",
          details: m ? `Match: <strong>${m.teamA} vs ${m.teamB}</strong> (${m.score})<br><span style="font-size: 0.8rem; color: #DC2626;">Standings and points table will be automatically updated.</span>` : "",
          confirmText: "Delete",
          cancelText: "Cancel",
          onConfirm: () => {
            dataStore.deleteMatch(id);
            showToast("Match removed successfully", "success");
            renderTableRows();
          }
        });
      });
    });
  };

  filterSelect.addEventListener("change", renderTableRows);
  renderTableRows();

  // Bind Add Match Modal
  document.getElementById("btn-open-add-match").addEventListener("click", () => {
    openAddMatchModal();
  });
}

// ==========================================================================
// 6. VENUES VIEW (Requirement 11)
// ==========================================================================
function renderVenuesView() {
  setHeader("Venues & Courts", "Tournament Venues, Facilities & Court Assignments");

  const venues = dataStore.getVenues();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Official Tournament Venues</h2>
        <p class="view-sub-title">Manage club locations, courts count, playing surfaces, and amenities</p>
      </div>
      <button class="btn-admin-primary" id="btn-add-venue">+ Add Venue</button>
    </div>

    <div class="admin-card" style="margin-bottom: 24px;">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>City / Address</th>
              <th>Courts</th>
              <th>Surface</th>
              <th>Environment</th>
              <th>Status</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${venues.map(v => `
              <tr>
                <td><strong>${v.name}</strong></td>
                <td>${v.address}</td>
                <td><span style="font-weight: 800; color: var(--admin-primary);">${v.courtsCount || 6} Courts</span></td>
                <td>${v.surface}</td>
                <td>${v.environment}</td>
                <td><span class="badge-status active">Active</span></td>
                <td style="text-align: center;">
                  <div class="table-actions-cell" style="justify-content: center;">
                    <a href="${v.mapUrl}" target="_blank" class="btn-table-action primary">Map</a>
                    <button class="btn-table-action btn-edit-venue" data-venue-id="${v.id}">Edit</button>
                    <button class="btn-table-action danger btn-del-venue" data-venue-id="${v.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btn-add-venue").addEventListener("click", () => {
    openAddVenueModal();
  });

  viewContainer.querySelectorAll(".btn-edit-venue").forEach(btn => {
    btn.addEventListener("click", () => openEditVenueModal(btn.getAttribute("data-venue-id")));
  });

  viewContainer.querySelectorAll(".btn-del-venue").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-venue-id");
      const v = dataStore.getVenueById(id);
      openConfirmModal({
        title: "Delete Venue",
        message: "Are you sure you want to delete this venue?",
        details: v ? `Venue: <strong>${v.name}</strong> (${v.city})` : "",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          dataStore.deleteVenue(id);
          showToast("Venue deleted successfully", "success");
          renderVenuesView();
        }
      });
    });
  });
}

// ==========================================================================
// 7. CATEGORIES VIEW (Requirement 12)
// ==========================================================================
function renderCategoriesView() {
  setHeader("Categories", "Tournament Categories, Skill Divisions & Formats");

  const categories = dataStore.getCategories();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Tournament Categories</h2>
        <p class="view-sub-title">Define divisions, match formats, and eligibility criteria</p>
      </div>
      <button class="btn-admin-primary" id="btn-add-category">+ Add Category</button>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Type</th>
              <th>Format</th>
              <th>Division</th>
              <th>Status</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${categories.map(c => `
              <tr>
                <td><strong>${c.name}</strong></td>
                <td>${c.type}</td>
                <td>${c.format}</td>
                <td>${c.gender}</td>
                <td><span class="badge-status active">${c.status}</span></td>
                <td style="text-align: center;">
                  <div class="table-actions-cell" style="justify-content: center;">
                    <button class="btn-table-action btn-edit-cat" data-cat-id="${c.id}">Edit</button>
                    <button class="btn-table-action danger btn-del-cat" data-cat-id="${c.id}">Delete</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btn-add-category").addEventListener("click", () => {
    openAddCategoryModal();
  });

  viewContainer.querySelectorAll(".btn-edit-cat").forEach(btn => {
    btn.addEventListener("click", () => openEditCategoryModal(btn.getAttribute("data-cat-id")));
  });

  viewContainer.querySelectorAll(".btn-del-cat").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-cat-id");
      const c = dataStore.getCategories().find(x => x.id === id);
      openConfirmModal({
        title: "Delete Category",
        message: "Are you sure you want to delete this category?",
        details: c ? `Category: <strong>${c.name}</strong> (${c.type})` : "",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          dataStore.deleteCategory(id);
          showToast("Category deleted successfully", "success");
          renderCategoriesView();
        }
      });
    });
  });
}

// ==========================================================================
// 8. PLAYERS & DOUBLES TEAMS VIEWS (Requirements 13 & 14)
// ==========================================================================
function renderPlayersView() {
  setHeader("Players Roster", "Individual Player Records, Profiles & Contacts");

  const players = dataStore.getPlayers();
  const standings = dataStore.getPointsTable();
  const standingsMap = new Map(standings.map(s => [s.name, s]));

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Players Directory (${players.length})</h2>
        <p class="view-sub-title">Complete registry of official championship athletes</p>
      </div>
      <button class="btn-admin-primary" id="btn-add-player">+ Add Player</button>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Doubles Team</th>
              <th>Category</th>
              <th>Contact</th>
              <th style="text-align: center;">Matches</th>
              <th style="text-align: center;">Wins</th>
              <th style="text-align: center;">Losses</th>
              <th style="text-align: center;">Win %</th>
              <th style="text-align: center;">Points</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${players.map(p => {
              const record = standingsMap.get(p.name) || { games: 0, won: 0, loss: 0, points: 0 };
              const winPct = record.games > 0 ? Math.round((record.won / record.games) * 100) : 0;
              return `
                <tr>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.team || '—'}</td>
                  <td>${p.category}</td>
                  <td style="font-size: 0.8rem; color: #64748B;">${p.contact || p.email}</td>
                  <td style="text-align: center;">${record.games}</td>
                  <td style="text-align: center; color: #047857; font-weight: 700;">${record.won}</td>
                  <td style="text-align: center; color: #DC2626;">${record.loss}</td>
                  <td style="text-align: center; font-weight: 700;">${winPct}%</td>
                  <td style="text-align: center;"><strong style="color: var(--admin-primary);">${record.points}</strong></td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <button class="btn-table-action btn-edit-player" data-player-id="${p.id}">Edit</button>
                      <button class="btn-table-action danger btn-del-player" data-player-id="${p.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btn-add-player").addEventListener("click", () => openAddPlayerModal());

  viewContainer.querySelectorAll(".btn-edit-player").forEach(btn => {
    btn.addEventListener("click", () => openEditPlayerModal(btn.getAttribute("data-player-id")));
  });

  viewContainer.querySelectorAll(".btn-del-player").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-player-id");
      const p = dataStore.getPlayers().find(x => x.id === id);
      openConfirmModal({
        title: "Delete Player",
        message: "Are you sure you want to delete this player?",
        details: p ? `Player: <strong>${p.name}</strong> (${p.team || 'Independent'})` : "",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          dataStore.deletePlayer(id);
          showToast("Player deleted successfully", "success");
          renderPlayersView();
        }
      });
    });
  });
}

function renderDoublesTeamsView() {
  setHeader("Doubles Teams", "24 Official Series Doubles Partnerships");

  const teams = dataStore.getTeams();
  const matches = dataStore.getMatches().filter(m => m.status === "Completed");

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Doubles Partnerships (${teams.length})</h2>
        <p class="view-sub-title">Registered team rosters and head-to-head records</p>
      </div>
      <button class="btn-admin-primary" id="btn-add-team">+ Add Doubles Team</button>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Player 1</th>
              <th>Player 2</th>
              <th>Category</th>
              <th>Matches</th>
              <th>Wins</th>
              <th>Status</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${teams.map(t => {
              const played = matches.filter(m => m.teamA === t.name || m.teamB === t.name).length;
              const won = matches.filter(m => m.winner === t.name).length;
              return `
                <tr>
                  <td><strong>${t.name}</strong></td>
                  <td>${t.player1}</td>
                  <td>${t.player2}</td>
                  <td>${t.category}</td>
                  <td>${played}</td>
                  <td><strong style="color: #047857;">${won}</strong></td>
                  <td><span class="badge-status active">${t.status}</span></td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <button class="btn-table-action btn-edit-team" data-team-id="${t.id}">Edit</button>
                      <button class="btn-table-action danger btn-del-team" data-team-id="${t.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  document.getElementById("btn-add-team").addEventListener("click", () => openAddTeamModal());

  viewContainer.querySelectorAll(".btn-edit-team").forEach(btn => {
    btn.addEventListener("click", () => openEditTeamModal(btn.getAttribute("data-team-id")));
  });

  viewContainer.querySelectorAll(".btn-del-team").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-team-id");
      const t = dataStore.getTeams().find(x => x.id === id);
      openConfirmModal({
        title: "Delete Doubles Team",
        message: "Are you sure you want to delete this doubles team?",
        details: t ? `Team: <strong>${t.name}</strong> (${t.player1} & ${t.player2})` : "",
        confirmText: "Delete",
        cancelText: "Cancel",
        onConfirm: () => {
          dataStore.deleteTeam(id);
          showToast("Doubles team deleted successfully", "success");
          renderDoublesTeamsView();
        }
      });
    });
  });
}

// ==========================================================================
// 9. REGISTRATIONS VIEW (Requirement 15)
// ==========================================================================
function renderRegistrationsView() {
  setHeader("Registrations", "Championship Tournament Sign-ups & Entry Fees");

  const regs = dataStore.getRegistrations();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Tournament Registrations (${regs.length})</h2>
        <p class="view-sub-title">Track player enrollments, payment receipts, and bracket seedings</p>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Players</th>
              <th>Category</th>
              <th>Tournament</th>
              <th>Registration Date</th>
              <th>Payment</th>
              <th>Status</th>
              <th style="text-align: center;">Update Status</th>
            </tr>
          </thead>
          <tbody>
            ${regs.map(r => {
              const badgeCls = r.status.toLowerCase();
              return `
                <tr>
                  <td><strong>${r.team}</strong></td>
                  <td>${r.players}</td>
                  <td>${r.category}</td>
                  <td><strong>${r.tournament}</strong></td>
                  <td>${r.date}</td>
                  <td>${r.payment}</td>
                  <td><span class="badge-status ${badgeCls}">${r.status}</span></td>
                  <td style="text-align: center;">
                    <select class="form-select select-reg-status" data-reg-id="${r.id}" style="padding: 4px 8px; font-size: 0.78rem; width: auto;">
                      <option value="Confirmed" ${r.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                      <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
                      <option value="Waitlisted" ${r.status === 'Waitlisted' ? 'selected' : ''}>Waitlisted</option>
                      <option value="Cancelled" ${r.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  viewContainer.querySelectorAll(".select-reg-status").forEach(select => {
    select.addEventListener("change", (e) => {
      const id = select.getAttribute("data-reg-id");
      dataStore.updateRegistration(id, { status: select.value });
      showToast("Registration status updated", "success");
    });
  });
}

// ==========================================================================
// 10. RESULTS MANAGEMENT (Requirement 19)
// ==========================================================================
function renderResultsView() {
  setHeader("Results Verification", "Review Completed Match Scores & Official Signs");

  const completed = dataStore.getMatches().filter(m => m.status === "Completed");

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Match Results Management (${completed.length})</h2>
        <p class="view-sub-title">Verify game scores, adjust point allocations, and approve official sheets</p>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Round</th>
              <th>Matchup</th>
              <th>Official Score</th>
              <th>Winner</th>
              <th>Verification</th>
              <th style="text-align: center;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${completed.map(m => `
              <tr>
                <td><strong>${m.tournamentName.split("•")[0].trim()}</strong></td>
                <td>${m.round}</td>
                <td>${m.teamA} vs ${m.teamB}</td>
                <td><strong style="font-size: 1rem;">${m.score}</strong></td>
                <td><strong style="color: #047857;">${m.winner}</strong></td>
                <td>
                  <span class="badge-status ${m.verified ? 'verified' : 'pending'}">
                    ${m.verified ? 'Verified' : 'Pending'}
                  </span>
                </td>
                <td style="text-align: center;">
                  <div class="table-actions-cell" style="justify-content: center;">
                    <button class="btn-table-action btn-edit-match" data-match-id="${m.id}">Correct Score</button>
                    <button class="btn-table-action ${m.verified ? '' : 'primary'} btn-toggle-verify" data-match-id="${m.id}">
                      ${m.verified ? 'Mark Pending' : 'Verify'}
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;

  viewContainer.querySelectorAll(".btn-edit-match").forEach(btn => {
    btn.addEventListener("click", () => openEditMatchModal(btn.getAttribute("data-match-id")));
  });

  viewContainer.querySelectorAll(".btn-toggle-verify").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-match-id");
      const match = dataStore.getMatchById(id);
      if (match) {
        dataStore.updateMatch(id, { verified: !match.verified });
        showToast(match.verified ? "Marked as pending review" : "Result officially verified", "success");
        renderResultsView();
      }
    });
  });
}

// ==========================================================================
// 11. POINTS TABLE VIEW (Requirement 17)
// ==========================================================================
function renderPointsTableView() {
  setHeader("Points Table", "Calculated Championship Standings from Central Matches");

  const standings = dataStore.getPointsTable();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Official Points Table</h2>
        <p class="view-sub-title">Real-time standings automatically derived from verified match outcomes</p>
      </div>
      <a href="/" target="_blank" class="btn-admin-secondary">Open Public Points Table</a>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th style="width: 70px; text-align: center;">Rank</th>
              <th>Player / Partnership</th>
              <th style="text-align: center;">Tournaments</th>
              <th style="text-align: center;">Games</th>
              <th style="text-align: center;">Won</th>
              <th style="text-align: center;">Loss</th>
              <th style="text-align: center;">Win %</th>
              <th style="text-align: center;">Points</th>
              <th>Form</th>
            </tr>
          </thead>
          <tbody>
            ${standings.map(s => {
              const winPct = s.games > 0 ? Math.round((s.won / s.games) * 100) : 0;
              return `
                <tr>
                  <td style="text-align: center;"><strong>#${s.rank}</strong></td>
                  <td><strong>${s.name}</strong></td>
                  <td style="text-align: center;">${s.tournaments}</td>
                  <td style="text-align: center;">${s.games}</td>
                  <td style="text-align: center; color: #047857; font-weight: 700;">${s.won}</td>
                  <td style="text-align: center; color: #DC2626;">${s.loss}</td>
                  <td style="text-align: center; font-weight: 700;">${winPct}%</td>
                  <td style="text-align: center;">
                    <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--admin-text-main); background: #F1F5F9; padding: 3px 10px; border-radius: 6px;">
                      ${s.points}
                    </span>
                  </td>
                  <td>
                    ${s.form.map(f => `<span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; font-size: 0.65rem; font-weight: 800; border-radius: 50%; margin-right: 3px; background: ${f === 'W' ? '#ECFDF5' : '#FEE2E2'}; color: ${f === 'W' ? '#047857' : '#DC2626'};">${f}</span>`).join("")}
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================================================
// 12. RANKINGS & STATS VIEWS (Requirement 18)
// ==========================================================================
function renderRankingsView() {
  renderPointsTableView();
}

function renderStatsView() {
  setHeader("Series Statistics & Records", "Official Season Performance & Analytics");

  const standings = dataStore.getPointsTable();
  const leader = standings[0] || { name: "Jay & Kushal", points: 120, won: 6, loss: 2 };
  const tournaments = dataStore.getTournaments().filter(t => t.status === "COMPLETED");

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Championship Records & Records</h2>
        <p class="view-sub-title">Aggregated scoring metrics, titles, and team achievements</p>
      </div>
      <a href="/#stats" target="_blank" class="btn-admin-secondary">View Public Stats Page</a>
    </div>

    <!-- Triple Records Cards -->
    <div class="summary-cards-grid" style="grid-template-columns: repeat(3, 1fr);">
      <div class="metric-card">
        <div class="metric-card-top">
          <span class="badge-status completed">Rank #1 Leader</span>
          <span class="metric-pill-sub">${leader.points} Pts</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number text-pill">${leader.name}</span>
          <span class="metric-label">Record: ${leader.won}W – ${leader.loss}L</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <span class="badge-status upcoming">Most Tournament Titles</span>
          <span class="metric-pill-sub">2 Titles</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number text-pill">Jay & Kushal</span>
          <span class="metric-label">Tournaments 1 & 4 Champions</span>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-card-top">
          <span class="badge-status verified">Best Win Streak</span>
          <span class="metric-pill-sub">6 Straight Wins</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number text-pill">Rahul & Dev</span>
          <span class="metric-label">Unbroken Match Streak</span>
        </div>
      </div>
    </div>

    <!-- Completed Tournament Champions Table -->
    <div class="admin-card">
      <div class="admin-card-header">
        <h3 class="admin-card-title">Tournament Champions Timeline</h3>
      </div>
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>Tournament</th>
              <th>Venue</th>
              <th>Champion</th>
              <th>Runner-Up</th>
              <th>Finals Score</th>
              <th>MVP</th>
            </tr>
          </thead>
          <tbody>
            ${tournaments.map(t => `
              <tr>
                <td><strong>${t.name}</strong></td>
                <td>${t.venue}</td>
                <td><strong style="color: #047857;">${t.winner}</strong></td>
                <td>${t.runnerUp}</td>
                <td><span class="badge-status completed">${t.score}</span></td>
                <td><span style="font-weight: 700; color: #D97706;">${t.mvp}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================================================
// 13. CONTENT, SETTINGS & USERS
// ==========================================================================
function renderUpdatesView() {
  setHeader("Content & Updates", "Publish Bulletins, Schedule Changes & Community News");

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Series News & Bulletins</h2>
        <p class="view-sub-title">Push announcements to the public updates page</p>
      </div>
      <button class="btn-admin-primary" id="btn-create-news">+ Post New Bulletin</button>
    </div>

    <div class="admin-card">
      <div class="admin-card-body">
        <div class="rail-status-list">
          <div class="rail-status-item">
            <div class="rail-item-info">
              <strong class="rail-item-title">Registrations Open for Tournament 5 at Dinkers Pickleball Academy</strong>
              <span class="rail-item-sub">Published Sep 20, 2026 • 24 doubles team capacity</span>
            </div>
            <span class="badge-status active">Published</span>
          </div>
          <div class="rail-status-item">
            <div class="rail-item-info">
              <strong class="rail-item-title">Jay & Kushal Clinch Tournament 4 Championship in Thrilling Final</strong>
              <span class="rail-item-sub">Published Sep 13, 2026 • Match recap & highlight reel</span>
            </div>
            <span class="badge-status active">Published</span>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("btn-create-news").addEventListener("click", () => {
    showToast("Feature ready: New announcement modal", "success");
  });
}

function renderSettingsView() {
  setHeader("Series Settings", "Scoring Rules, Season Dates & Contact Information");

  const s = dataStore.getSettings();

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Platform Settings</h2>
        <p class="view-sub-title">Customize tournament series rules, scoring values and platform metadata</p>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-card-body">
        <form id="form-settings">
          <div class="admin-form-grid">
            <div class="form-group">
              <label class="form-label">Series Name</label>
              <input type="text" id="set-series-name" class="form-input" value="${s.seriesName}">
            </div>
            <div class="form-group">
              <label class="form-label">Season Label</label>
              <input type="text" id="set-season" class="form-input" value="${s.season}">
            </div>
            <div class="form-group">
              <label class="form-label">Points Per Win</label>
              <input type="number" id="set-pts-win" class="form-input" value="${s.pointsPerWin}">
            </div>
            <div class="form-group">
              <label class="form-label">Points Per Loss</label>
              <input type="number" id="set-pts-loss" class="form-input" value="${s.pointsPerLoss}">
            </div>
            <div class="form-group">
              <label class="form-label">Admin Email</label>
              <input type="email" id="set-email" class="form-input" value="${s.contactEmail}">
            </div>
            <div class="form-group">
              <label class="form-label">Helpline Contact</label>
              <input type="text" id="set-phone" class="form-input" value="${s.emergencyContact}">
            </div>
          </div>
          <div class="form-actions-bar">
            <button type="button" class="btn-admin-secondary" id="btn-reset-seed">Reset to Initial Seed</button>
            <button type="submit" class="btn-admin-primary">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.getElementById("form-settings").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.updateSettings({
      seriesName: document.getElementById("set-series-name").value,
      season: document.getElementById("set-season").value,
      pointsPerWin: Number(document.getElementById("set-pts-win").value),
      pointsPerLoss: Number(document.getElementById("set-pts-loss").value),
      contactEmail: document.getElementById("set-email").value,
      emergencyContact: document.getElementById("set-phone").value
    });
    showToast("Settings updated successfully", "success");
  });

  document.getElementById("btn-reset-seed").addEventListener("click", () => {
    if (confirm("Reset data store to default initial seed? All custom additions will be restored to initial values.")) {
      dataStore.resetToDefault();
      showToast("Data store reset to initial seed", "success");
      renderSettingsView();
    }
  });
}

function renderAdminUsersView() {
  setHeader("Admin Users", "Authorized Administrators & Access Roles");

  viewContainer.innerHTML = `
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Administrator Access Control</h2>
        <p class="view-sub-title">Manage team operators and scoring officials</p>
      </div>
    </div>

    <div class="admin-card">
      <div class="admin-table-container">
        <table class="admin-data-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Access Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Administrator</strong></td>
              <td>admin@racquetclub.in</td>
              <td><span class="badge-status primary">Super Admin</span></td>
              <td>Full Access (All Series, Matches, Rules)</td>
              <td><span class="badge-status active">Active</span></td>
            </tr>
            <tr>
              <td><strong>Tournament Director</strong></td>
              <td>director@racquetclub.in</td>
              <td><span class="badge-status">Operations</span></td>
              <td>Matches, Schedules & Verification</td>
              <td><span class="badge-status active">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ==========================================================================
// MODALS (MATCH, TOURNAMENT, VENUE, PLAYER)
// ==========================================================================

/**
 * Open Match Creation Modal (Requirement 10)
 */
function openAddMatchModal(prefilledTourneyId = null) {
  const tournaments = dataStore.getTournaments();
  const teams = dataStore.getTeams();
  const venues = dataStore.getVenues();

  const contentHtml = `
    <form id="form-modal-add-match">
      <div class="admin-form-grid">
        
        <div class="form-group col-span-2">
          <label class="form-label">Tournament <span class="required">*</span></label>
          <select id="mm-tourney" class="form-select" required>
            ${tournaments.map(t => `<option value="${t.id}" ${prefilledTourneyId === t.id ? 'selected' : ''} data-tname="${t.name}">${t.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Round <span class="required">*</span></label>
          <select id="mm-round" class="form-select" required>
            <option value="Group Stage">Group Stage</option>
            <option value="Round of 16">Round of 16</option>
            <option value="Quarter Final">Quarter Final</option>
            <option value="Semi Final">Semi Final</option>
            <option value="Final">Final</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Court</label>
          <input type="text" id="mm-court" class="form-input" value="Court 1" placeholder="e.g. Court 1">
        </div>

        <div class="form-group">
          <label class="form-label">Team A <span class="required">*</span></label>
          <select id="mm-teama" class="form-select" required>
            ${teams.map((t, idx) => `<option value="${t.name}" ${idx === 0 ? 'selected' : ''}>${t.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Team B <span class="required">*</span></label>
          <select id="mm-teamb" class="form-select" required>
            ${teams.map((t, idx) => `<option value="${t.name}" ${idx === 1 ? 'selected' : ''}>${t.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" id="mm-date" class="form-input" value="${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}">
        </div>

        <div class="form-group">
          <label class="form-label">Time</label>
          <input type="text" id="mm-time" class="form-input" value="10:00 AM">
        </div>

        <div class="form-group">
          <label class="form-label">Team A Score</label>
          <input type="number" id="mm-scorea" class="form-input" placeholder="e.g. 11" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Team B Score</label>
          <input type="number" id="mm-scoreb" class="form-input" placeholder="e.g. 9" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Winner (Auto-determined or manual)</label>
          <input type="text" id="mm-winner" class="form-input" placeholder="Leave empty for auto-detection">
        </div>

        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="mm-status" class="form-select">
            <option value="Completed">Completed</option>
            <option value="Live">Live</option>
            <option value="Scheduled" selected>Scheduled</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

      </div>

      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Match</button>
      </div>
    </form>
  `;

  openModal("Add Tournament Match", contentHtml);

  const form = document.getElementById("form-modal-add-match");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const tourneySelect = document.getElementById("mm-tourney");
    const tournamentId = tourneySelect.value;
    const tournamentName = tourneySelect.selectedOptions[0]?.getAttribute("data-tname") || "Tournament";
    const round = document.getElementById("mm-round").value;
    const court = document.getElementById("mm-court").value;
    const teamA = document.getElementById("mm-teama").value;
    const teamB = document.getElementById("mm-teamb").value;
    const date = document.getElementById("mm-date").value;
    const time = document.getElementById("mm-time").value;
    const scoreA = document.getElementById("mm-scorea").value;
    const scoreB = document.getElementById("mm-scoreb").value;
    const winnerManual = document.getElementById("mm-winner").value.trim();
    const status = document.getElementById("mm-status").value;

    dataStore.addMatch({
      tournamentId,
      tournamentName,
      round,
      court,
      teamA,
      teamB,
      date,
      time,
      scoreA: scoreA !== "" ? Number(scoreA) : null,
      scoreB: scoreB !== "" ? Number(scoreB) : null,
      winner: winnerManual,
      status,
      verified: status === "Completed"
    });

    closeModal();
    showToast("Match saved and points table updated!", "success");
    renderCurrentRoute();
  });
}

/**
 * Open Match Edit Modal
 */
function openEditMatchModal(matchId) {
  const match = dataStore.getMatchById(matchId);
  if (!match) return;

  const contentHtml = `
    <form id="form-modal-edit-match">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Match</label>
          <div style="font-weight: 800; font-size: 1rem;">${match.teamA} vs ${match.teamB}</div>
          <span style="font-size: 0.78rem; color: #64748B;">${match.tournamentName} • ${match.round}</span>
        </div>

        <div class="form-group">
          <label class="form-label">Team A Score (${match.teamA})</label>
          <input type="number" id="edit-mm-scorea" class="form-input" value="${match.scoreA !== null ? match.scoreA : ''}" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Team B Score (${match.teamB})</label>
          <input type="number" id="edit-mm-scoreb" class="form-input" value="${match.scoreB !== null ? match.scoreB : ''}" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Winner</label>
          <input type="text" id="edit-mm-winner" class="form-input" value="${match.winner || ''}" placeholder="Winner Team">
        </div>

        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="edit-mm-status" class="form-select">
            <option value="Completed" ${match.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Live" ${match.status === 'Live' ? 'selected' : ''}>Live</option>
            <option value="Scheduled" ${match.status === 'Scheduled' ? 'selected' : ''}>Scheduled</option>
            <option value="Cancelled" ${match.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </div>
      </div>

      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Update Match</button>
      </div>
    </form>
  `;

  openModal(`Edit Match • ${match.round}`, contentHtml);

  document.getElementById("form-modal-edit-match").addEventListener("submit", (e) => {
    e.preventDefault();
    const scoreA = document.getElementById("edit-mm-scorea").value;
    const scoreB = document.getElementById("edit-mm-scoreb").value;
    const winner = document.getElementById("edit-mm-winner").value.trim();
    const status = document.getElementById("edit-mm-status").value;

    dataStore.updateMatch(matchId, {
      scoreA: scoreA !== "" ? Number(scoreA) : null,
      scoreB: scoreB !== "" ? Number(scoreB) : null,
      winner,
      status,
      verified: status === "Completed"
    });

    closeModal();
    showToast("Match updated successfully", "success");
    renderCurrentRoute();
  });
}

/**
 * Open Edit Tournament Modal
 */
function openEditTournamentModal(tourneyId) {
  const t = dataStore.getTournamentById(tourneyId);
  if (!t) return;

  const venues = dataStore.getVenues();
  const categories = dataStore.getCategories();
  const isVenueInList = venues.some(v => v.name === t.venue);
  const isCatInList = categories.some(c => c.name === t.category);

  const contentHtml = `
    <form id="form-modal-edit-tourney">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label" for="et-name">Tournament Name <span class="required">*</span></label>
          <input type="text" id="et-name" class="form-input" value="${t.name}" required>
        </div>

        <div class="form-group">
          <label class="form-label" for="et-num">Tournament Number</label>
          <input type="text" id="et-num" class="form-input" value="${t.number || ''}">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-date">Date Range <span class="required">*</span></label>
          <input type="text" id="et-date" class="form-input" value="${t.date}" required>
        </div>

        <div class="form-group col-span-2">
          <label class="form-label" for="et-venue">Venue <span class="required">*</span></label>
          <select id="et-venue" class="form-select">
            ${venues.map(v => `<option value="${v.name}" ${v.name === t.venue ? 'selected' : ''}>${v.name} (${v.city})</option>`).join("")}
            <option value="__custom__" ${!isVenueInList ? 'selected' : ''}>+ Enter Custom / New Venue...</option>
          </select>
          <input type="text" id="et-venue-custom" class="form-input" placeholder="e.g. New Venue" style="${!isVenueInList ? 'display:block;' : 'display:none;'} margin-top: 8px;" value="${!isVenueInList ? (t.venue || '') : ''}">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-category">Category</label>
          <select id="et-category" class="form-select">
            ${categories.map(c => `<option value="${c.name}" ${c.name === t.category ? 'selected' : ''}>${c.name} (${c.type})</option>`).join("")}
            <option value="__custom__" ${!isCatInList ? 'selected' : ''}>+ Other Category...</option>
          </select>
          <input type="text" id="et-category-custom" class="form-input" placeholder="Enter Category Name" style="${!isCatInList ? 'display:block;' : 'display:none;'} margin-top: 8px;" value="${!isCatInList ? (t.category || '') : ''}">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-status">Status</label>
          <select id="et-status" class="form-select">
            <option value="UPCOMING" ${t.status === 'UPCOMING' ? 'selected' : ''}>Upcoming</option>
            <option value="COMPLETED" ${t.status === 'COMPLETED' ? 'selected' : ''}>Completed</option>
            <option value="LIVE" ${t.status === 'LIVE' ? 'selected' : ''}>Live</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="et-reg-status">Registration Status</label>
          <select id="et-reg-status" class="form-select">
            <option value="Open" ${t.registrationStatus === 'Open' ? 'selected' : ''}>Open</option>
            <option value="Closed" ${t.registrationStatus === 'Closed' ? 'selected' : ''}>Closed</option>
            <option value="Waitlist Only" ${t.registrationStatus === 'Waitlist Only' ? 'selected' : ''}>Waitlist Only</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="et-points">Points Awarded</label>
          <input type="text" id="et-points" class="form-input" value="${t.pointsAwarded || '100 Pts'}">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-winner">Winner (If Completed)</label>
          <input type="text" id="et-winner" class="form-input" value="${t.winner || ''}" placeholder="Winner team">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-runnerup">Runner-Up (If Completed)</label>
          <input type="text" id="et-runnerup" class="form-input" value="${t.runnerUp || ''}" placeholder="Runner-Up team">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-mvp">MVP</label>
          <input type="text" id="et-mvp" class="form-input" value="${t.mvp || ''}">
        </div>

        <div class="form-group">
          <label class="form-label" for="et-score">Finals Score</label>
          <input type="text" id="et-score" class="form-input" value="${t.score || ''}">
        </div>

        <div class="form-group col-span-2">
          <label class="form-label" for="et-desc">Description</label>
          <textarea id="et-desc" class="form-input" rows="2">${t.description || ''}</textarea>
        </div>
      </div>

      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">SAVE CHANGES</button>
      </div>
    </form>
  `;

  openModal(`Edit ${t.name}`, contentHtml);

  const venueSelect = document.getElementById("et-venue");
  const venueCustom = document.getElementById("et-venue-custom");
  venueSelect.addEventListener("change", () => {
    if (venueSelect.value === "__custom__") {
      venueCustom.style.display = "block";
      venueCustom.focus();
    } else {
      venueCustom.style.display = "none";
    }
  });

  const catSelect = document.getElementById("et-category");
  const catCustom = document.getElementById("et-category-custom");
  catSelect.addEventListener("change", () => {
    if (catSelect.value === "__custom__") {
      catCustom.style.display = "block";
      catCustom.focus();
    } else {
      catCustom.style.display = "none";
    }
  });

  document.getElementById("form-modal-edit-tourney").addEventListener("submit", (e) => {
    e.preventDefault();

    let finalVenue = venueSelect.value;
    if (finalVenue === "__custom__") {
      finalVenue = venueCustom.value.trim() || t.venue;
    }

    let finalCat = catSelect.value;
    if (finalCat === "__custom__") {
      finalCat = catCustom.value.trim() || t.category;
    }

    dataStore.updateTournament(tourneyId, {
      name: document.getElementById("et-name").value.trim(),
      number: document.getElementById("et-num").value.trim(),
      date: document.getElementById("et-date").value.trim(),
      venue: finalVenue,
      category: finalCat,
      status: document.getElementById("et-status").value,
      registrationStatus: document.getElementById("et-reg-status").value,
      pointsAwarded: document.getElementById("et-points").value.trim(),
      winner: document.getElementById("et-winner").value.trim(),
      runnerUp: document.getElementById("et-runnerup").value.trim(),
      mvp: document.getElementById("et-mvp").value.trim(),
      score: document.getElementById("et-score").value.trim(),
      description: document.getElementById("et-desc").value.trim()
    });

    closeModal();
    showToast("Tournament updated successfully", "success");
    renderCurrentRoute();
  });
}

/**
 * Open Venue Modals
 */
function openAddVenueModal() {
  const contentHtml = `
    <form id="form-modal-venue">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Venue Name <span class="required">*</span></label>
          <input type="text" id="nv-name" class="form-input" placeholder="e.g. The Racquet Club Bodakdev" required>
        </div>
        <div class="form-group col-span-2">
          <label class="form-label">Address</label>
          <input type="text" id="nv-address" class="form-input" placeholder="Address, Bodakdev, Ahmedabad">
        </div>
        <div class="form-group">
          <label class="form-label">Number of Courts</label>
          <input type="number" id="nv-courts" class="form-input" value="6" min="1">
        </div>
        <div class="form-group">
          <label class="form-label">Playing Surface</label>
          <input type="text" id="nv-surface" class="form-input" value="Championship Acrylic Pro">
        </div>
        <div class="form-group">
          <label class="form-label">Environment</label>
          <input type="text" id="nv-env" class="form-input" value="Outdoor Covered Floodlit">
        </div>
        <div class="form-group">
          <label class="form-label">Google Maps URL</label>
          <input type="text" id="nv-map" class="form-input" placeholder="https://maps.google.com/...">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Add Venue</button>
      </div>
    </form>
  `;

  openModal("Add Tournament Venue", contentHtml);

  document.getElementById("form-modal-venue").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.addVenue({
      name: document.getElementById("nv-name").value,
      address: document.getElementById("nv-address").value,
      courtsCount: Number(document.getElementById("nv-courts").value) || 6,
      surface: document.getElementById("nv-surface").value,
      environment: document.getElementById("nv-env").value,
      mapUrl: document.getElementById("nv-map").value || "https://maps.google.com",
      city: "Ahmedabad, Gujarat"
    });
    closeModal();
    showToast("Venue added successfully", "success");
    renderVenuesView();
  });
}

function openEditVenueModal(venueId) {
  const v = dataStore.getVenueById(venueId);
  if (!v) return;

  const contentHtml = `
    <form id="form-modal-edit-venue">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Venue Name</label>
          <input type="text" id="ev-name" class="form-input" value="${v.name}" required>
        </div>
        <div class="form-group col-span-2">
          <label class="form-label">Address</label>
          <input type="text" id="ev-address" class="form-input" value="${v.address}">
        </div>
        <div class="form-group">
          <label class="form-label">Number of Courts</label>
          <input type="number" id="ev-courts" class="form-input" value="${v.courtsCount || 6}">
        </div>
        <div class="form-group">
          <label class="form-label">Surface</label>
          <input type="text" id="ev-surface" class="form-input" value="${v.surface}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;

  openModal(`Edit ${v.name}`, contentHtml);

  document.getElementById("form-modal-edit-venue").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.updateVenue(venueId, {
      name: document.getElementById("ev-name").value,
      address: document.getElementById("ev-address").value,
      courtsCount: Number(document.getElementById("ev-courts").value),
      surface: document.getElementById("ev-surface").value
    });
    closeModal();
    showToast("Venue updated", "success");
    renderVenuesView();
  });
}

/**
 * Open Player / Team Modals
 */
function openAddPlayerModal() {
  const teams = dataStore.getTeams();
  const categories = dataStore.getCategories();

  const contentHtml = `
    <form id="form-modal-player">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Player Full Name <span class="required">*</span></label>
          <input type="text" id="np-name" class="form-input" placeholder="e.g. Kushal Shah" required>
        </div>
        <div class="form-group">
          <label class="form-label">Doubles Team</label>
          <select id="np-team" class="form-select">
            <option value="">Independent</option>
            ${teams.map(t => `<option value="${t.name}">${t.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select id="np-category" class="form-select">
            ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Contact Phone</label>
          <input type="text" id="np-phone" class="form-input" placeholder="+91 98765 43210">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" id="np-email" class="form-input" placeholder="player@gmail.com">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Add Player</button>
      </div>
    </form>
  `;

  openModal("Add New Player", contentHtml);

  document.getElementById("form-modal-player").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.addPlayer({
      name: document.getElementById("np-name").value.trim(),
      team: document.getElementById("np-team").value,
      category: document.getElementById("np-category").value,
      contact: document.getElementById("np-phone").value,
      email: document.getElementById("np-email").value
    });
    closeModal();
    showToast("Player registered", "success");
    renderPlayersView();
  });
}

function openEditPlayerModal(playerId) {
  const p = dataStore.getPlayers().find(x => x.id === playerId);
  if (!p) return;

  const contentHtml = `
    <form id="form-modal-edit-player">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Player Name</label>
          <input type="text" id="ep-name" class="form-input" value="${p.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Contact</label>
          <input type="text" id="ep-phone" class="form-input" value="${p.contact || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" id="ep-email" class="form-input" value="${p.email || ''}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;

  openModal(`Edit Player • ${p.name}`, contentHtml);

  document.getElementById("form-modal-edit-player").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.updatePlayer(playerId, {
      name: document.getElementById("ep-name").value.trim(),
      contact: document.getElementById("ep-phone").value,
      email: document.getElementById("ep-email").value
    });
    closeModal();
    showToast("Player profile updated", "success");
    renderPlayersView();
  });
}

function openAddTeamModal() {
  const players = dataStore.getPlayers();
  const categories = dataStore.getCategories();

  const contentHtml = `
    <form id="form-modal-team">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Partnership / Team Name <span class="required">*</span></label>
          <input type="text" id="nt-name" class="form-input" placeholder="e.g. Jay & Kushal" required>
        </div>
        <div class="form-group">
          <label class="form-label">Player 1 <span class="required">*</span></label>
          <select id="nt-p1" class="form-select" required>
            ${players.map(p => `<option value="${p.name}">${p.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Player 2 <span class="required">*</span></label>
          <select id="nt-p2" class="form-select" required>
            ${players.map((p, i) => `<option value="${p.name}" ${i === 1 ? 'selected' : ''}>${p.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group col-span-2">
          <label class="form-label">Category</label>
          <select id="nt-category" class="form-select">
            ${categories.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Register Team</button>
      </div>
    </form>
  `;

  openModal("Add Doubles Team", contentHtml);

  document.getElementById("form-modal-team").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.addTeam({
      name: document.getElementById("nt-name").value.trim(),
      player1: document.getElementById("nt-p1").value,
      player2: document.getElementById("nt-p2").value,
      category: document.getElementById("nt-category").value
    });
    closeModal();
    showToast("Doubles team added", "success");
    renderDoublesTeamsView();
  });
}

function openEditTeamModal(teamId) {
  const t = dataStore.getTeams().find(x => x.id === teamId);
  if (!t) return;

  const contentHtml = `
    <form id="form-modal-edit-team">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Team Name</label>
          <input type="text" id="et-name" class="form-input" value="${t.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Player 1</label>
          <input type="text" id="et-p1" class="form-input" value="${t.player1}">
        </div>
        <div class="form-group">
          <label class="form-label">Player 2</label>
          <input type="text" id="et-p2" class="form-input" value="${t.player2}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;

  openModal(`Edit Team • ${t.name}`, contentHtml);

  document.getElementById("form-modal-edit-team").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.updateTeam(teamId, {
      name: document.getElementById("et-name").value.trim(),
      player1: document.getElementById("et-p1").value.trim(),
      player2: document.getElementById("et-p2").value.trim()
    });
    closeModal();
    showToast("Team partnership updated", "success");
    renderDoublesTeamsView();
  });
}

function openAddCategoryModal() {
  const contentHtml = `
    <form id="form-modal-cat">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Category Name <span class="required">*</span></label>
          <input type="text" id="nc-name" class="form-input" placeholder="e.g. Mixed Doubles Premier" required>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select id="nc-type" class="form-select">
            <option value="Doubles">Doubles</option>
            <option value="Singles">Singles</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Division / Gender</label>
          <input type="text" id="nc-gender" class="form-input" value="Open" placeholder="Open / Men / Women">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Create Category</button>
      </div>
    </form>
  `;

  openModal("Add Tournament Category", contentHtml);

  document.getElementById("form-modal-cat").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.addCategory({
      name: document.getElementById("nc-name").value.trim(),
      type: document.getElementById("nc-type").value,
      gender: document.getElementById("nc-gender").value,
      format: "Round Robin + Knockout"
    });
    closeModal();
    showToast("Category created", "success");
    renderCategoriesView();
  });
}

function openEditCategoryModal(catId) {
  const c = dataStore.getCategories().find(x => x.id === catId);
  if (!c) return;

  const contentHtml = `
    <form id="form-modal-edit-cat">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Category Name</label>
          <input type="text" id="ec-name" class="form-input" value="${c.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <input type="text" id="ec-type" class="form-input" value="${c.type}">
        </div>
        <div class="form-group">
          <label class="form-label">Format</label>
          <input type="text" id="ec-format" class="form-input" value="${c.format}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;

  openModal(`Edit Category • ${c.name}`, contentHtml);

  document.getElementById("form-modal-edit-cat").addEventListener("submit", (e) => {
    e.preventDefault();
    dataStore.updateCategory(catId, {
      name: document.getElementById("ec-name").value.trim(),
      type: document.getElementById("ec-type").value.trim(),
      format: document.getElementById("ec-format").value.trim()
    });
    closeModal();
    showToast("Category updated", "success");
    renderCategoriesView();
  });
}

// ==========================================================================
// MODAL HELPER & TOASTS
// ==========================================================================
function openModal(title, contentHtml) {
  if (!modalBackdrop || !modalCard) return;

  modalCard.innerHTML = `
    <div class="modal-head-bar">
      <h3 class="modal-title">${title}</h3>
      <button class="modal-close-btn" aria-label="Close dialog">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      ${contentHtml}
    </div>
  `;

  modalBackdrop.classList.add("open");
  modalBackdrop.setAttribute("aria-hidden", "false");

  // Bind close buttons
  modalCard.querySelectorAll(".modal-close-btn, .btn-modal-close").forEach(btn => {
    btn.addEventListener("click", closeModal);
  });
}

function closeModal() {
  if (!modalBackdrop) return;
  modalBackdrop.classList.remove("open");
  modalBackdrop.setAttribute("aria-hidden", "true");
}

function openConfirmModal({ title, message, details = "", confirmText = "Delete", cancelText = "Cancel", onConfirm }) {
  const contentHtml = `
    <div class="confirm-modal-box">
      <div class="confirm-modal-icon-wrap">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#DC2626" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <div class="confirm-modal-info">
        <h3 class="confirm-modal-title" style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 6px;">${title}</h3>
        <p class="confirm-modal-msg" style="font-size: 0.95rem; color: #334155; font-weight: 600; margin-bottom: 10px;">${message}</p>
        ${details ? `<div class="confirm-modal-details" style="font-size: 0.84rem; color: #64748B; background: #F8FAFC; padding: 10px 14px; border-radius: 6px; border: 1px solid #E2E8F0; margin-bottom: 16px;">${details}</div>` : ''}
      </div>
    </div>
    <div class="form-actions-bar" style="justify-content: flex-end; gap: 10px; padding-top: 14px; border-top: 1px solid #E2E8F0;">
      <button type="button" class="btn-admin-secondary btn-modal-close" id="btn-confirm-cancel">${cancelText}</button>
      <button type="button" class="btn-admin-primary" id="btn-confirm-proceed" style="background-color: #DC2626; border-color: #DC2626; color: #fff;">${confirmText}</button>
    </div>
  `;

  openModal(title, contentHtml);

  const proceedBtn = document.getElementById("btn-confirm-proceed");
  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      closeModal();
      if (typeof onConfirm === "function") {
        onConfirm();
      }
    });
  }
}

function showToast(message, type = "info") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 200);
  }, 3200);
}

// ==========================================================================
// GLOBAL EVENT BINDINGS
// ==========================================================================
function bindNavigation() {
  sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Standard hash change event will trigger handleHashRouting
    });
  });
}

function bindSidebarToggle() {
  if (sidebarToggleBtn && sidebarEl) {
    sidebarToggleBtn.addEventListener("click", () => {
      sidebarEl.classList.toggle("open");
    });
  }

  // Close modal when clicking backdrop outside card
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.classList.contains("open")) {
      closeModal();
    }
  });
}

function bindGlobalEvents() {
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to log out of the admin panel?")) {
        window.location.href = "/";
      }
    });
  }

  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      showToast("All match records and points tables are currently verified & synced.", "info");
    });
  }
}

// Start admin on load
document.addEventListener("DOMContentLoaded", initAdminApp);
if (document.readyState === "complete" || document.readyState === "interactive") {
  initAdminApp();
}
