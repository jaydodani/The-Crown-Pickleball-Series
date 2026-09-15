/**
 * The Crown Pickleball Series - Stats Analytics Renderer
 * Dynamic statistical leaderboards, category navigation, leader highlight & match histories
 */

import { statsTeams, tournamentHistory, STAT_CATEGORIES } from "./statsData.js";

// Active State
let currentCategoryKey = "STANDINGS";
let currentStatId = "win-percentage";
let selectedTournamentFilter = "all";

/**
 * Initializes the entire Stats view
 */
export function initStatsModule() {
  const container = document.getElementById("stats-section");
  if (!container) return;

  renderStatsLayout(container);
  bindFilterEvents();
}

/**
 * Renders the top-level stats scaffolding
 */
function renderStatsLayout(container) {
  container.innerHTML = `
    <!-- Stats Header Section -->
    <section class="stats-header-section">
      <div class="stats-title-block">
        <h2 class="stats-main-title">SERIES STATS</h2>
        <p class="stats-sub-title">Performance, records and tournament leaders</p>
      </div>

      <!-- Integrated Custom Filter Bar (Tournament Only) -->
      <div class="stats-filter-bar" role="search" aria-label="Stats filters">
        <div class="custom-select-wrapper">
          <label for="filter-tournament-select" class="sr-only">Filter by Tournament</label>
          <select id="filter-tournament-select" class="custom-select" aria-label="Filter by tournament">
            <option value="all" ${selectedTournamentFilter === 'all' ? 'selected' : ''}>All Tournaments</option>
            <option value="Tournament 4" ${selectedTournamentFilter === 'Tournament 4' ? 'selected' : ''}>Tournament 4</option>
            <option value="Tournament 3" ${selectedTournamentFilter === 'Tournament 3' ? 'selected' : ''}>Tournament 3</option>
            <option value="Tournament 2" ${selectedTournamentFilter === 'Tournament 2' ? 'selected' : ''}>Tournament 2</option>
            <option value="Tournament 1" ${selectedTournamentFilter === 'Tournament 1' ? 'selected' : ''}>Tournament 1</option>
          </select>
          <svg class="select-chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>
    </section>

    <!-- Horizontal Category Navigation Cards (No metric counts) -->
    <nav class="stats-category-nav" aria-label="Primary statistical categories">
      ${Object.keys(STAT_CATEGORIES).map(catKey => {
        const cat = STAT_CATEGORIES[catKey];
        const isActive = catKey === currentCategoryKey;
        return `
          <button class="category-card-btn ${isActive ? 'active' : ''}" data-cat="${catKey}">
            <span class="category-card-name">${cat.name}</span>
          </button>
        `;
      }).join("")}
    </nav>

    <!-- Secondary Sub-Statistic Chips Navigation -->
    <div class="sub-stats-nav" id="sub-stats-bar" aria-label="Secondary individual statistics">
      <!-- Injected dynamically -->
    </div>

    <!-- Main Ranking Display Container -->
    <div class="stats-content-area" id="stats-content-area">
      <!-- Injected dynamically -->
    </div>
  `;

  bindCategoryEvents();
  renderSubStatsBar();
  renderMainStatDisplay();
}

/**
 * Binds category tab clicks
 */
function bindCategoryEvents() {
  const catButtons = document.querySelectorAll(".category-card-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const catKey = btn.getAttribute("data-cat");
      if (catKey && catKey !== currentCategoryKey) {
        currentCategoryKey = catKey;
        const cat = STAT_CATEGORIES[catKey];
        currentStatId = cat.stats[0].id; // Select first stat in category by default

        // Update active styling
        catButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        renderSubStatsBar();
        renderMainStatDisplay();
      }
    });
  });
}

/**
 * Binds filter dropdowns
 */
function bindFilterEvents() {
  const tournamentSelect = document.getElementById("filter-tournament-select");

  if (tournamentSelect) {
    tournamentSelect.addEventListener("change", (e) => {
      selectedTournamentFilter = e.target.value;
      renderMainStatDisplay();
    });
  }
}

/**
 * Renders sub-stats horizontal chips
 */
function renderSubStatsBar() {
  const bar = document.getElementById("sub-stats-bar");
  if (!bar) return;

  const currentCat = STAT_CATEGORIES[currentCategoryKey];
  if (!currentCat) return;

  bar.innerHTML = currentCat.stats.map(stat => {
    const isActive = stat.id === currentStatId;
    return `
      <button class="sub-stat-chip ${isActive ? 'active' : ''}" data-stat-id="${stat.id}">
        ${stat.name}
      </button>
    `;
  }).join("");

  const chips = bar.querySelectorAll(".sub-stat-chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const statId = chip.getAttribute("data-stat-id");
      if (statId && statId !== currentStatId) {
        currentStatId = statId;
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderMainStatDisplay();
      }
    });
  });
}

/**
 * Helper to get currently active stat config
 */
function getActiveStatConfig() {
  const currentCat = STAT_CATEGORIES[currentCategoryKey];
  return currentCat.stats.find(s => s.id === currentStatId) || currentCat.stats[0];
}

/**
 * Renders the main statistics ranking or visual view
 */
function renderMainStatDisplay() {
  const container = document.getElementById("stats-content-area");
  if (!container) return;

  const statConfig = getActiveStatConfig();

  // Handle custom view types
  if (statConfig.type === "custom_winners") {
    renderTournamentWinnersView(container, statConfig);
    return;
  }
  if (statConfig.type === "custom_runners_up") {
    renderTournamentRunnersUpView(container, statConfig);
    return;
  }
  if (statConfig.type === "custom_mvp") {
    renderTournamentMvpView(container, statConfig);
    return;
  }
  if (statConfig.type === "custom_best_doubles") {
    renderBestDoublesView(container, statConfig);
    return;
  }

  // Standard dynamic ranking table
  renderStandardRankingTable(container, statConfig);
}

/**
 * Renders standard dynamic ranking table (starts directly without leader spotlight)
 */
function renderStandardRankingTable(container, statConfig) {
  let list = [...statsTeams];

  // Sort according to active stat
  if (statConfig.sortFn) {
    list.sort(statConfig.sortFn);
  }

  // Build Table Rows
  const tableRowsHtml = list.map((team, idx) => {
    const rankFormatted = String(idx + 1).padStart(2, "0");
    const isTopThree = idx < 3;

    const matchesToShow = selectedTournamentFilter === "all"
      ? team.matchHistory
      : team.matchHistory.filter(m => m.tournament === selectedTournamentFilter);

    const pastMatchesHtml = matchesToShow.map(m => `
      <tr class="pm-row">
        <td class="pm-tournament">${m.tournament}</td>
        <td class="pm-opponent">${m.opponent}</td>
        <td class="pm-score"><span class="score-pill">${m.score}</span></td>
        <td class="pm-result"><span class="result-badge ${m.result === 'WIN' ? 'res-win' : 'res-loss'}">${m.result}</span></td>
        <td class="pm-points"><span class="pts-tag ${m.result === 'WIN' ? 'pts-win' : 'pts-zero'}">${m.points}</span></td>
      </tr>
    `).join("");

    return `
      <tr class="stats-row ${isTopThree ? 'stats-top-row' : ''}" data-row-team="${team.id}" tabindex="0" role="button" aria-expanded="false">
        <td class="col-rank">
          <span class="rank-num-styled ${isTopThree ? `rank-top-${idx+1}` : ''}">${rankFormatted}</span>
        </td>
        <td class="col-team">
          <span class="team-name-strong">${team.name}</span>
        </td>
        ${statConfig.renderRow(team)}
        <td class="col-action">
          <button class="stats-expand-btn" aria-label="Toggle match history for ${team.name}">
            <svg class="stats-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </td>
      </tr>
      <tr class="stats-detail-row" id="stats-detail-${team.id}" aria-hidden="true">
        <td colspan="${statConfig.columns.length + 1}" class="stats-detail-cell">
          <div class="stats-accordion-wrapper">
            <div class="stats-subcard">
              <div class="stats-subcard-header">
                <span class="subcard-title">MATCH HISTORY &bull; ${team.name}</span>
                <span class="subcard-record">${team.wins} Wins &bull; ${team.losses} Losses (${team.winPercentage})</span>
              </div>
              <table class="stats-subtable">
                <thead>
                  <tr>
                    <th scope="col">Tournament</th>
                    <th scope="col">Opponent</th>
                    <th scope="col">Score</th>
                    <th scope="col">Result</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  ${pastMatchesHtml.length > 0 ? pastMatchesHtml : `
                    <tr><td colspan="5" style="text-align:center; padding:16px; color:#64748B;">No matches recorded in ${selectedTournamentFilter}</td></tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  container.innerHTML = `
    <!-- Stat Section Heading & Info (Center Aligned) -->
    <div class="stat-section-heading">
      <div class="stat-title-group">
        <h3 class="stat-title">${statConfig.name.toUpperCase()}</h3>
        <p class="stat-desc">${statConfig.description}</p>
      </div>
      <span class="stat-count-pill">${list.length} Records</span>
    </div>

    <!-- Ranking Table Card -->
    <div class="stats-table-card">
      <div class="table-responsive">
        <table class="stats-table">
          <thead>
            <tr>
              ${statConfig.columns.map(col => `<th scope="col">${col}</th>`).join("")}
              <th scope="col" class="th-action" aria-label="Expand match history"></th>
            </tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;

  bindAccordionEvents();
}

/**
 * Visual View: Tournament Winners
 */
function renderTournamentWinnersView(container, statConfig) {
  const activeTournaments = selectedTournamentFilter === "all"
    ? tournamentHistory
    : tournamentHistory.filter(th => th.name === selectedTournamentFilter);

  const cardsHtml = activeTournaments.map(th => `
    <div class="trophy-timeline-card">
      <div class="trophy-badge-col">
        <span class="tournament-idx">${th.tournamentNumber}</span>
        <span class="trophy-icon-gold">🏆</span>
      </div>
      <div class="trophy-info-col">
        <span class="tournament-date">${th.date} &bull; ${th.location}</span>
        <h4 class="tournament-card-name">${th.name}</h4>
        <div class="tournament-winner-box">
          <span class="trophy-tag">CHAMPION</span>
          <span class="winner-team-name">${th.winner}</span>
        </div>
      </div>
      <div class="trophy-score-col">
        <span class="runnerup-label">Runner-Up: <strong>${th.runnerUp}</strong></span>
        <span class="finals-score-pill">Finals: ${th.score}</span>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="stat-section-heading">
      <div class="stat-title-group">
        <h3 class="stat-title">TOURNAMENT WINNERS</h3>
        <p class="stat-desc">Official champions crowned across each Series stop</p>
      </div>
      <span class="stat-count-pill">${activeTournaments.length} Tournaments</span>
    </div>
    <div class="trophy-timeline-grid">
      ${cardsHtml.length > 0 ? cardsHtml : `
        <div style="text-align:center; padding: 32px; color: var(--text-muted); font-weight:600;">No tournaments found matching ${selectedTournamentFilter}</div>
      `}
    </div>
  `;
}

/**
 * Visual View: Tournament Runners-Up
 */
function renderTournamentRunnersUpView(container, statConfig) {
  const activeTournaments = selectedTournamentFilter === "all"
    ? tournamentHistory
    : tournamentHistory.filter(th => th.name === selectedTournamentFilter);

  const cardsHtml = activeTournaments.map(th => `
    <div class="trophy-timeline-card runnerup-style">
      <div class="trophy-badge-col">
        <span class="tournament-idx">${th.tournamentNumber}</span>
        <span class="trophy-icon-silver">🥈</span>
      </div>
      <div class="trophy-info-col">
        <span class="tournament-date">${th.date} &bull; ${th.location}</span>
        <h4 class="tournament-card-name">${th.name}</h4>
        <div class="tournament-winner-box silver-box">
          <span class="trophy-tag silver-tag">RUNNER-UP</span>
          <span class="winner-team-name">${th.runnerUp}</span>
        </div>
      </div>
      <div class="trophy-score-col">
        <span class="runnerup-label">Defeated by: <strong>${th.winner}</strong></span>
        <span class="finals-score-pill">Finals: ${th.score}</span>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="stat-section-heading">
      <div class="stat-title-group">
        <h3 class="stat-title">TOURNAMENT RUNNERS-UP</h3>
        <p class="stat-desc">Championship finalists and tournament silver medalists</p>
      </div>
      <span class="stat-count-pill">${activeTournaments.length} Tournaments</span>
    </div>
    <div class="trophy-timeline-grid">
      ${cardsHtml.length > 0 ? cardsHtml : `
        <div style="text-align:center; padding: 32px; color: var(--text-muted); font-weight:600;">No tournaments found matching ${selectedTournamentFilter}</div>
      `}
    </div>
  `;
}

/**
 * Visual View: Tournament MVP
 */
function renderTournamentMvpView(container, statConfig) {
  const activeTournaments = selectedTournamentFilter === "all"
    ? tournamentHistory
    : tournamentHistory.filter(th => th.name === selectedTournamentFilter);

  const mvpCardsHtml = activeTournaments.map(th => `
    <div class="mvp-showcase-card">
      <div class="mvp-card-header">
        <span class="mvp-tournament-tag">${th.name}</span>
        <span class="mvp-medal">MVP 🎖️</span>
      </div>
      <div class="mvp-card-body">
        <h4 class="mvp-player-name">${th.mvp.name}</h4>
        <span class="mvp-team-affiliation">${th.mvp.team}</span>
      </div>
      <div class="mvp-card-stats">
        <div class="mvp-stat-cell">
          <span class="mvp-stat-number">${th.mvp.matches}</span>
          <span class="mvp-stat-title">Matches</span>
        </div>
        <div class="mvp-stat-cell">
          <span class="mvp-stat-number">${th.mvp.wins}</span>
          <span class="mvp-stat-title">Wins</span>
        </div>
        <div class="mvp-stat-cell">
          <span class="mvp-stat-number">${th.mvp.points}</span>
          <span class="mvp-stat-title">Points</span>
        </div>
      </div>
    </div>
  `).join("");

  container.innerHTML = `
    <div class="stat-section-heading">
      <div class="stat-title-group">
        <h3 class="stat-title">TOURNAMENT MVP AWARDS</h3>
        <p class="stat-desc">Most Valuable Player honors recognized per tournament stop</p>
      </div>
      <span class="stat-count-pill">${activeTournaments.length} MVPs</span>
    </div>
    <div class="mvp-grid">
      ${mvpCardsHtml.length > 0 ? mvpCardsHtml : `
        <div style="text-align:center; padding: 32px; color: var(--text-muted); font-weight:600; grid-column: 1 / -1;">No MVPs found matching ${selectedTournamentFilter}</div>
      `}
    </div>
  `;
}

/**
 * Visual View: Best Doubles Team (Direct Table without hero spotlight)
 */
function renderBestDoublesView(container, statConfig) {
  const sorted = [...statsTeams].sort((a, b) => b.winPercentageVal - a.winPercentageVal);

  const allRowsHtml = sorted.map((team, idx) => {
    const rankFormatted = String(idx + 1).padStart(2, "0");
    const isTopThree = idx < 3;

    const matchesToShow = selectedTournamentFilter === "all"
      ? team.matchHistory
      : team.matchHistory.filter(m => m.tournament === selectedTournamentFilter);

    const pastMatchesHtml = matchesToShow.map(m => `
      <tr class="pm-row">
        <td class="pm-tournament">${m.tournament}</td>
        <td class="pm-opponent">${m.opponent}</td>
        <td class="pm-score"><span class="score-pill">${m.score}</span></td>
        <td class="pm-result"><span class="result-badge ${m.result === 'WIN' ? 'res-win' : 'res-loss'}">${m.result}</span></td>
        <td class="pm-points"><span class="pts-tag ${m.result === 'WIN' ? 'pts-win' : 'pts-zero'}">${m.points}</span></td>
      </tr>
    `).join("");

    return `
      <tr class="stats-row ${isTopThree ? 'stats-top-row' : ''}" data-row-team="${team.id}" tabindex="0" role="button" aria-expanded="false">
        <td class="col-rank"><span class="rank-num-styled ${isTopThree ? `rank-top-${idx+1}` : ''}">${rankFormatted}</span></td>
        <td class="col-team"><span class="team-name-strong">${team.name}</span></td>
        <td class="col-stat">${team.matchesTogether}</td>
        <td class="col-stat">${team.wins}</td>
        <td class="col-stat">${team.losses}</td>
        <td class="col-stat">${team.pointDifference}</td>
        <td class="col-stat col-highlight"><strong>${team.winPercentage}</strong></td>
        <td class="col-action">
          <button class="stats-expand-btn" aria-label="Toggle match history for ${team.name}">
            <svg class="stats-chevron" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </td>
      </tr>
      <tr class="stats-detail-row" id="stats-detail-${team.id}" aria-hidden="true">
        <td colspan="8" class="stats-detail-cell">
          <div class="stats-accordion-wrapper">
            <div class="stats-subcard">
              <div class="stats-subcard-header">
                <span class="subcard-title">MATCH HISTORY &bull; ${team.name}</span>
                <span class="subcard-record">${team.wins} Wins &bull; ${team.losses} Losses (${team.winPercentage})</span>
              </div>
              <table class="stats-subtable">
                <thead>
                  <tr>
                    <th scope="col">Tournament</th>
                    <th scope="col">Opponent</th>
                    <th scope="col">Score</th>
                    <th scope="col">Result</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  ${pastMatchesHtml.length > 0 ? pastMatchesHtml : `
                    <tr><td colspan="5" style="text-align:center; padding:16px; color:#64748B;">No matches recorded in ${selectedTournamentFilter}</td></tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  container.innerHTML = `
    <!-- Center-aligned table heading -->
    <div class="stat-section-heading">
      <div class="stat-title-group">
        <h3 class="stat-title">DOUBLES PARTNERSHIP RANKINGS</h3>
        <p class="stat-desc">Intermediate doubles pairs ranked by win percentage and team synergy</p>
      </div>
      <span class="stat-count-pill">${sorted.length} Teams</span>
    </div>

    <div class="stats-table-card">
      <div class="table-responsive">
        <table class="stats-table">
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Player / Team</th>
              <th scope="col">Matches</th>
              <th scope="col">Wins</th>
              <th scope="col">Losses</th>
              <th scope="col">Diff</th>
              <th scope="col">Win %</th>
              <th scope="col" class="th-action" aria-label="Expand match history"></th>
            </tr>
          </thead>
          <tbody>
            ${allRowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;

  bindAccordionEvents();
}

/**
 * Binds row expansion accordions
 */
function bindAccordionEvents() {
  const rows = document.querySelectorAll(".stats-row");
  rows.forEach(row => {
    const teamId = row.getAttribute("data-row-team");
    const detailRow = document.getElementById(`stats-detail-${teamId}`);
    if (!detailRow) return;

    const toggle = (e) => {
      const isExpanded = row.classList.contains("expanded");
      const btn = row.querySelector(".stats-expand-btn");

      if (isExpanded) {
        row.classList.remove("expanded");
        detailRow.classList.remove("open");
        row.setAttribute("aria-expanded", "false");
        if (btn) btn.setAttribute("aria-expanded", "false");
        detailRow.setAttribute("aria-hidden", "true");
      } else {
        // Automatically close any other open stats row
        const table = row.closest("table") || document;
        table.querySelectorAll(".stats-row.expanded").forEach((openRow) => {
          if (openRow !== row) {
            openRow.classList.remove("expanded");
            openRow.setAttribute("aria-expanded", "false");
            const otherBtn = openRow.querySelector(".stats-expand-btn");
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
            const otherTeamId = openRow.getAttribute("data-row-team");
            const otherDetail = document.getElementById(`stats-detail-${otherTeamId}`);
            if (otherDetail) {
              otherDetail.classList.remove("open");
              otherDetail.setAttribute("aria-hidden", "true");
            }
          }
        });

        row.classList.add("expanded");
        detailRow.classList.add("open");
        row.setAttribute("aria-expanded", "true");
        if (btn) btn.setAttribute("aria-expanded", "true");
        detailRow.setAttribute("aria-hidden", "false");
      }
    };

    const expandBtn = row.querySelector(".stats-expand-btn");
    if (expandBtn) {
      expandBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggle();
      });
    }

    row.addEventListener("click", toggle);
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        if (e.target && (e.target.classList.contains("stats-expand-btn") || e.target.closest(".stats-expand-btn"))) {
          return;
        }
        e.preventDefault();
        toggle();
      }
    });
  });
}
