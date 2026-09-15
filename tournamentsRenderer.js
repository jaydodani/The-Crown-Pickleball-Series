/**
 * The Crown Pickleball Series - Tournaments Schedule & Results Renderer
 * Displays completed tournaments (1, 2, 3, 4) and upcoming tournament fixtures (5, 6, 7)
 * Directly listed without filter tabs and without "100 points awarded" tag
 */

import { dataStore } from "./dataStore.js";

/**
 * Initializes and renders the Tournaments schedule section
 */
export function initTournamentsModule() {
  const container = document.getElementById("tournaments-section");
  if (!container) return;

  renderTournamentsView(container);

  // Live sync with central data store
  dataStore.subscribe(() => {
    if (container && container.style.display !== "none") {
      renderTournamentsView(container);
    }
  });
}

function renderTournamentsView(container) {
  const tournaments = dataStore.getTournaments();
  const cardsHtml = tournaments.map(t => {
    const isCompleted = t.status === "COMPLETED";

    const detailBlockHtml = isCompleted ? `
      <div class="tourney-results-grid">
        <div class="result-box champion-box">
          <div class="result-rank-tag">
            <span class="trophy-gold-icon">🏆</span>
            <span>CHAMPIONS</span>
          </div>
          <span class="champ-team-name">${t.winner}</span>
        </div>

        <div class="result-box runnerup-box">
          <div class="result-rank-tag silver-tag">
            <span class="trophy-silver-icon">🥈</span>
            <span>RUNNER-UP</span>
          </div>
          <span class="runner-team-name">${t.runnerUp}</span>
        </div>

        <div class="result-meta-cell">
          <div class="meta-item">
            <span class="meta-lbl">Finals Score</span>
            <span class="meta-score-pill">${t.score}</span>
          </div>
          <div class="meta-item">
            <span class="meta-lbl">Tournament MVP</span>
            <span class="meta-val">${t.mvp}</span>
          </div>
        </div>
      </div>
    ` : `
      <div class="tourney-upcoming-grid">
        <div class="upcoming-info-cell">
          <span class="upcoming-category-lbl">Category &amp; Division</span>
          <span class="upcoming-category-val">${t.category}</span>
        </div>
        <div class="upcoming-info-cell">
          <span class="upcoming-category-lbl">Entry Status</span>
          <span class="upcoming-reg-badge">${t.registrationStatus}</span>
        </div>
        <div class="upcoming-info-cell">
          <span class="upcoming-category-lbl">Match Format</span>
          <span class="upcoming-category-val">Best of 3 Sets • 11 Pts</span>
        </div>
      </div>
      <p class="upcoming-preview-text">${t.description}</p>
    `;

    return `
      <article class="tournament-card ${isCompleted ? 'tourney-completed' : 'tourney-upcoming'}" id="${t.id}">
        <!-- Top Status & Number Row -->
        <div class="tourney-card-top">
          <div class="tourney-idx-group">
            <span class="tourney-idx-num">${t.number}</span>
            <span class="tourney-status-badge ${isCompleted ? 'status-done' : 'status-live'}">
              <span class="status-dot"></span>
              ${isCompleted ? 'COMPLETED' : 'UPCOMING FIXTURE'}
            </span>
          </div>
        </div>

        <!-- Main Title & Meta -->
        <div class="tourney-card-main">
          <h3 class="tourney-title">${t.name}</h3>
          <div class="tourney-meta-row">
            <div class="meta-group">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>${t.date}</span>
            </div>
            <span class="meta-dot-sep">&bull;</span>
            <div class="meta-group">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${t.venue}</span>
            </div>
          </div>
        </div>

        <!-- Specific Body Content -->
        <div class="tourney-card-body">
          ${detailBlockHtml}
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = `
    <div class="tournaments-container">
      <!-- Section Heading (Center Aligned) -->
      <div class="stat-section-heading">
        <div class="stat-title-group">
          <h2 class="stat-title">TOURNAMENT SCHEDULE &amp; RESULTS</h2>
          <p class="stat-desc">Completed championships and upcoming official tournament stops</p>
        </div>
        <span class="stat-count-pill">${tournaments.length} Tournaments</span>
      </div>

      <!-- Direct Tournaments Grid (No filter tabs) -->
      <div class="tournaments-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}
