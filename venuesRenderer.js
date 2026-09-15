/**
 * The Crown Pickleball Series - Venues Renderer
 * Renders venue list cards with photos, tournament hosting counts, facility specs and Google Maps links
 * Directly synchronized with the central database store.
 */

import { dataStore } from "./dataStore.js";

/**
 * Initializes and renders the Venues section
 */
export function initVenuesModule() {
  const container = document.getElementById("venues-section");
  if (!container) return;

  renderVenuesList(container);

  // Re-render when admin updates venues
  dataStore.subscribe(() => {
    if (container && container.style.display !== "none") {
      renderVenuesList(container);
    }
  });
}

function renderVenuesList(container) {
  const venues = dataStore.getVenues();
  const allTournaments = dataStore.getTournaments();

  const venueCardsHtml = venues.map((venue, idx) => {
    const hostedTournaments = allTournaments.filter(t => (t.venue === venue.name || t.venueId === venue.id) && t.status === "COMPLETED");
    const upcomingTournaments = allTournaments.filter(t => (t.venue === venue.name || t.venueId === venue.id) && t.status !== "COMPLETED");
    const count = hostedTournaments.length;

    const hostedText = count > 0 
      ? `${count} ${count === 1 ? 'Tournament' : 'Tournaments'} Hosted`
      : 'Upcoming Host Venue';

    const hostedTournamentsList = hostedTournaments.length > 0
      ? hostedTournaments.map(t => `<span class="venue-tourney-pill">${t.name} (${t.date.split(",")[0]})</span>`).join("")
      : (upcomingTournaments.length > 0 ? `<span class="venue-tourney-pill upcoming">${upcomingTournaments[0].name} (Next)</span>` : '<span style="font-size: 0.76rem; color: #94A3B8;">Host Venue</span>');

    const courtsCountStr = venue.courts || (venue.courtsCount ? `${venue.courtsCount} Courts` : "6 Courts");
    const surfaceStr = venue.surface || "Championship Acrylic Pro";
    const envStr = venue.environment || "Outdoor Covered Floodlit";
    const featuresList = venue.features || ["Stadium Lighting", "Pro Shop", "Player Lounge"];
    const imageSrc = venue.image || "https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?auto=format&fit=crop&w=800&q=80";

    return `
      <article class="venue-card" id="${venue.id}" aria-labelledby="title-${venue.id}">
        <!-- Venue Media Visual -->
        <div class="venue-media-wrapper">
          <img 
            src="${imageSrc}" 
            alt="Courts at ${venue.name}" 
            class="venue-img" 
            loading="lazy"
          >
          <div class="venue-media-overlay">
            <span class="venue-index-tag">0${idx + 1}</span>
            <span class="venue-courts-tag">${courtsCountStr.split(" ")[0]} Courts</span>
          </div>
        </div>

        <!-- Venue Content & Details -->
        <div class="venue-body">
          <div class="venue-header-row">
            <div class="venue-name-group">
              <h3 id="title-${venue.id}" class="venue-name">${venue.name}</h3>
              <div class="venue-location-row">
                <svg class="venue-pin-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span class="venue-city">${venue.city || "Ahmedabad"}</span>
                <span class="venue-dot-sep">&bull;</span>
                <span class="venue-address">${venue.address}</span>
              </div>
            </div>

            <!-- Tournaments Hosted Count Badge -->
            <div class="venue-badge-box">
              <span class="venue-hosted-badge ${count > 0 ? 'badge-hosted' : 'badge-upcoming'}">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                  <path d="M4 22h16"></path>
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7"></path>
                  <path d="M14 14.66V17c0 .55.45 1 1 1h2"></path>
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
                </svg>
                <span>${hostedText}</span>
              </span>
            </div>
          </div>

          <!-- Tournaments List at Venue -->
          <div class="venue-tournaments-row">
            <span class="venue-tournaments-lbl">Series History:</span>
            <div class="venue-tourney-pills-group">
              ${hostedTournamentsList}
            </div>
          </div>

          <!-- Facility Specs Grid -->
          <div class="venue-specs-grid">
            <div class="venue-spec-item">
              <span class="spec-label">Courts</span>
              <span class="spec-value">${courtsCountStr}</span>
            </div>
            <div class="venue-spec-item">
              <span class="spec-label">Surface</span>
              <span class="spec-value">${surfaceStr}</span>
            </div>
            <div class="venue-spec-item">
              <span class="spec-label">Setting</span>
              <span class="spec-value">${envStr}</span>
            </div>
          </div>

          <!-- Features Tags -->
          <div class="venue-features-row">
            ${featuresList.map(f => `<span class="feature-tag">${f}</span>`).join("")}
          </div>

          <!-- Action Row with Direct Map Link -->
          <div class="venue-action-row">
            <a 
              href="${venue.mapUrl || 'https://maps.google.com'}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="venue-map-btn" 
              aria-label="View ${venue.name} on Google Maps (opens in new tab)"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                <line x1="8" y1="2" x2="8" y2="18"></line>
                <line x1="16" y1="6" x2="16" y2="22"></line>
              </svg>
              <span>View on Google Maps</span>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </article>
    `;
  }).join("");

  container.innerHTML = `
    <div class="venues-container">
      <!-- Section Heading -->
      <div class="stat-section-heading">
        <div class="stat-title-group">
          <h2 class="stat-title">SERIES VENUES</h2>
          <p class="stat-desc">Official championship arenas, academies and tournament courts</p>
        </div>
        <span class="stat-count-pill">${venues.length} Venues</span>
      </div>

      <!-- Venues Cards List -->
      <div class="venues-list">
        ${venueCardsHtml}
      </div>
    </div>
  `;
}

