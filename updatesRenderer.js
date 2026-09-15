/**
 * The Crown Pickleball Series - Updates & Registration Renderer
 * Displays upcoming tournament details, registration links, team signup modal, and official bulletins
 */

import { upcomingRegistrations, seriesAnnouncements } from "./updatesData.js";
import { dataStore } from "./dataStore.js";

function getEffectiveRegistrations() {
  const upcomingTourneys = dataStore.getTournaments().filter(t => t.status === "UPCOMING");

  return upcomingTourneys.map(t => {
    const staticReg = upcomingRegistrations.find(r => r.id === `reg-${t.id}` || r.name.toLowerCase().includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(r.name.toLowerCase()));

    const statusType = t.registrationStatus === "Open" ? "open" : (t.registrationStatus === "Coming Soon" ? "soon" : "invitational");
    const statusBadge = t.registrationStatus === "Open" ? "REGISTRATIONS OPEN" : (t.registrationStatus === "Coming Soon" ? "COMING SOON" : "INVITATIONAL ONLY");

    const maxTeams = t.maxTeams || 24;
    const registeredTeams = t.registeredTeams || 0;
    const remaining = Math.max(0, maxTeams - registeredTeams);
    const percentage = Math.round((registeredTeams / maxTeams) * 100);

    return {
      id: staticReg ? staticReg.id : `reg-${t.id}`,
      tournamentId: t.id,
      tournamentNumber: t.number,
      name: t.name,
      statusBadge: staticReg?.statusBadge || statusBadge,
      statusType: staticReg?.statusType || statusType,
      dates: t.date,
      venueName: t.venue,
      location: staticReg?.location || "Ahmedabad, Gujarat",
      deadline: staticReg?.deadline || "1 week prior to event",
      entryFee: staticReg?.entryFee || "₹1,500 per team",
      categories: staticReg?.categories || (Array.isArray(t.category) ? t.category : [t.category || "Intermediate Doubles"]),
      pointsReward: t.pointsAwarded || "150 Series Championship Points",
      prizePool: staticReg?.prizePool || "₹50,000 Prize Purse + Official Crown Trophies",
      slotsRemaining: staticReg?.slotsRemaining || `${remaining} Slots Left (${registeredTeams}/${maxTeams} Registered)`,
      slotsPercentage: staticReg ? staticReg.slotsPercentage : percentage,
      registrationUrl: staticReg?.registrationUrl || "https://forms.gle/the-crown-pickleball",
      directorContact: staticReg?.directorContact || "+91 98250 12345",
      description: t.description || staticReg?.description || `Official tournament fixture at ${t.venue}.`
    };
  });
}

/**
 * Initializes and renders the Updates tab
 */
export function initUpdatesModule() {
  const container = document.getElementById("updates-section");
  if (!container) return;

  renderUpdatesView(container);
  bindUpdatesEvents(container);

  // Live sync with central data store
  dataStore.subscribe(() => {
    if (container && container.style.display !== "none") {
      renderUpdatesView(container);
      bindUpdatesEvents(container);
    }
  });
}

function renderUpdatesView(container) {
  const registrationsState = getEffectiveRegistrations();
  const cardsHtml = registrationsState.map(reg => {
    const isOpen = reg.statusType === "open";
    const isSoon = reg.statusType === "soon";
    const isInvitational = reg.statusType === "invitational";

    // Category tags
    const categoryTags = reg.categories.map(cat => 
      `<span class="reg-category-tag">${cat}</span>`
    ).join("");

    // Slot progress bar (if open)
    const slotHtml = isOpen ? `
      <div class="slots-progress-wrapper">
        <div class="slots-header-row">
          <span class="slots-label">Registration Capacity</span>
          <span class="slots-count-highlight">${reg.slotsRemaining}</span>
        </div>
        <div class="slots-bar-track">
          <div class="slots-bar-fill" style="width: ${reg.slotsPercentage}%;"></div>
        </div>
      </div>
    ` : `
      <div class="slots-notice-box ${isInvitational ? 'invitational-notice' : ''}">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>${reg.slotsRemaining}</span>
      </div>
    `;

    // Action buttons based on status
    let actionButtonsHtml = "";
    if (isOpen) {
      actionButtonsHtml = `
        <button class="btn-register-action btn-primary-reg" data-open-modal="${reg.id}" data-tourney-name="${reg.name}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <line x1="20" y1="8" x2="20" y2="14"></line>
            <line x1="23" y1="11" x2="17" y2="11"></line>
          </svg>
          Register Team Now
        </button>
        <a href="${reg.registrationUrl}" target="_blank" rel="noopener noreferrer" class="btn-register-action btn-secondary-reg">
          Official Google Form
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
    } else if (isSoon) {
      actionButtonsHtml = `
        <button class="btn-register-action btn-notify-reg" data-notify-tourney="${reg.name}">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          Notify Me When Open
        </button>
        <a href="${reg.registrationUrl}" target="_blank" rel="noopener noreferrer" class="btn-register-action btn-secondary-reg">
          Pre-Registration Form
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      `;
    } else {
      actionButtonsHtml = `
        <a href="#points-tables" class="btn-register-action btn-invitational-reg goto-points-table-btn">
          View Current Top 8 Standings
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      `;
    }

    return `
      <article class="registration-card ${isOpen ? 'card-open' : ''}" id="${reg.id}">
        <!-- Top Status & Number Row -->
        <div class="reg-card-header">
          <div class="reg-num-badge-group">
            <span class="reg-tourney-num">${reg.tournamentNumber}</span>
            <span class="reg-status-badge status-${reg.statusType}">
              <span class="reg-pulse-dot"></span>
              ${reg.statusBadge}
            </span>
          </div>
          <div class="reg-fee-badge">
            <span class="fee-lbl">Entry Fee:</span>
            <span class="fee-val">${reg.entryFee}</span>
          </div>
        </div>

        <!-- Tournament Title & Description -->
        <div class="reg-title-block">
          <h3 class="reg-tourney-title">${reg.name}</h3>
          <p class="reg-tourney-desc">${reg.description}</p>
        </div>

        <!-- Venue & Date Meta Bar -->
        <div class="reg-meta-bar">
          <div class="reg-meta-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <div>
              <span class="meta-small-lbl">Tournament Dates</span>
              <strong class="meta-strong-val">${reg.dates}</strong>
            </div>
          </div>

          <div class="reg-meta-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <span class="meta-small-lbl">Host Venue</span>
              <strong class="meta-strong-val">${reg.venueName}</strong>
              <span class="meta-location-sub">${reg.location}</span>
            </div>
          </div>

          <div class="reg-meta-item highlight-deadline">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <div>
              <span class="meta-small-lbl">Registration Deadline</span>
              <strong class="meta-strong-val deadline-text">${reg.deadline}</strong>
            </div>
          </div>
        </div>

        <!-- Specifics Grid (Categories, Prize, Points) -->
        <div class="reg-details-grid">
          <div class="reg-detail-cell">
            <span class="reg-cell-lbl">Eligible Categories</span>
            <div class="reg-categories-list">
              ${categoryTags}
            </div>
          </div>

          <div class="reg-detail-cell">
            <span class="reg-cell-lbl">Prize &amp; Honors</span>
            <span class="reg-cell-val prize-val">${reg.prizePool}</span>
          </div>

          <div class="reg-detail-cell">
            <span class="reg-cell-lbl">Tournament Contact</span>
            <span class="reg-cell-val contact-val">${reg.directorContact}</span>
          </div>
        </div>

        <!-- Capacity Progress or Status -->
        ${slotHtml}

        <!-- Action Links & Registration Button -->
        <div class="reg-actions-row">
          ${actionButtonsHtml}
        </div>
      </article>
    `;
  }).join("");

  const bulletinsHtml = seriesAnnouncements.map(item => `
    <article class="bulletin-card" id="${item.id}">
      <div class="bulletin-top">
        <span class="bulletin-tag">${item.tag}</span>
        <span class="bulletin-date">${item.date}</span>
      </div>
      <h4 class="bulletin-title">${item.title}</h4>
      <p class="bulletin-summary">${item.summary}</p>
    </article>
  `).join("");

  container.innerHTML = `
    <div class="updates-container">
      <!-- Section Header -->
      <div class="stat-section-heading">
        <div class="stat-title-group">
          <h2 class="stat-title">UPCOMING TOURNAMENTS &amp; REGISTRATION</h2>
          <p class="stat-desc">Official team registration portals, deadlines, and schedule updates</p>
        </div>
        <span class="stat-count-pill">${upcomingRegistrations.length} Upcoming Events</span>
      </div>

      <!-- Upcoming Registrations List -->
      <div class="registrations-list">
        ${cardsHtml}
      </div>

      <!-- Official Series Bulletins -->
      <div class="bulletins-section-wrap">
        <div class="stat-section-heading" style="margin-top: 48px;">
          <div class="stat-title-group">
            <h2 class="stat-title" style="font-size: 1.15rem;">OFFICIAL SERIES BULLETINS</h2>
            <p class="stat-desc">Recent announcements, rule updates and partnership notices</p>
          </div>
        </div>
        <div class="bulletins-grid">
          ${bulletinsHtml}
        </div>
      </div>
    </div>

    <!-- Registration Modal Dialog -->
    <div id="reg-modal-backdrop" class="modal-backdrop" style="display: none;">
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="modal-header">
          <div>
            <span class="modal-sup-tag">ONLINE REGISTRATION</span>
            <h3 id="modal-title" class="modal-heading">Tournament 5 • Team Registration</h3>
          </div>
          <button type="button" class="modal-close-btn" id="btn-close-modal" aria-label="Close registration modal">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form id="tournament-reg-form" class="reg-form">
          <input type="hidden" id="form-tourney-id" value="reg-tourney-5">
          
          <div class="form-group">
            <label for="input-team-name" class="form-label">Team / Club Name <span class="required">*</span></label>
            <input type="text" id="input-team-name" class="form-input" placeholder="e.g. Ahmedabad Dinkers" required>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="input-player-1" class="form-label">Player 1 (Captain) <span class="required">*</span></label>
              <input type="text" id="input-player-1" class="form-input" placeholder="Full name" required>
            </div>
            <div class="form-group">
              <label for="input-player-2" class="form-label">Player 2 (Partner) <span class="required">*</span></label>
              <input type="text" id="input-player-2" class="form-input" placeholder="Full name" required>
            </div>
          </div>

          <div class="form-row-2">
            <div class="form-group">
              <label for="input-phone" class="form-label">WhatsApp Contact <span class="required">*</span></label>
              <input type="tel" id="input-phone" class="form-input" placeholder="+91 98765 43210" required>
            </div>
            <div class="form-group">
              <label for="select-category" class="form-label">Division / Category <span class="required">*</span></label>
              <select id="select-category" class="form-select" required>
                <option value="Premier Doubles">Premier Doubles (Open)</option>
                <option value="Intermediate Doubles">Intermediate Doubles</option>
                <option value="Mixed Doubles">Mixed Doubles</option>
              </select>
            </div>
          </div>

          <div class="reg-fee-summary-box">
            <div class="fee-summary-line">
              <span>Registration Entry Fee</span>
              <strong>₹1,500 / Team</strong>
            </div>
            <p class="fee-note">Payment to be completed via UPI QR at venue registration desk on match day.</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn-cancel-modal" id="btn-cancel-modal">Cancel</button>
            <button type="submit" class="btn-submit-registration">Confirm Team Registration</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Notification Toast Container -->
    <div id="reg-toast" class="reg-toast" style="display: none;" role="status"></div>
  `;
}

/**
 * Binds user interaction events (modal open/close, form submission, notifications)
 */
function bindUpdatesEvents(container) {
  const modalBackdrop = document.getElementById("reg-modal-backdrop");
  const btnClose = document.getElementById("btn-close-modal");
  const btnCancel = document.getElementById("btn-cancel-modal");
  const form = document.getElementById("tournament-reg-form");
  const toast = document.getElementById("reg-toast");

  function showToast(msg, duration = 4000) {
    if (!toast) return;
    toast.innerHTML = msg;
    toast.style.display = "flex";
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => { toast.style.display = "none"; }, 300);
    }, duration);
  }

  function openModal(tourneyName) {
    if (!modalBackdrop) return;
    const modalTitle = document.getElementById("modal-title");
    if (modalTitle && tourneyName) {
      modalTitle.textContent = `${tourneyName} - Team Registration`;
    }
    modalBackdrop.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.style.display = "none";
    document.body.style.overflow = "";
    if (form) form.reset();
  }

  // Open modal buttons
  container.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const tourneyId = btn.getAttribute("data-open-modal");
      const tourneyName = btn.getAttribute("data-tourney-name");
      const hiddenInput = document.getElementById("form-tourney-id");
      if (hiddenInput && tourneyId) hiddenInput.value = tourneyId;
      openModal(tourneyName);
    });
  });

  // Notify buttons
  container.querySelectorAll("[data-notify-tourney]").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-notify-tourney");
      showToast(`🔔 Reminder set! You will be notified when registrations open for <strong>${name}</strong>.`);
    });
  });

  // Close modal events
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (btnCancel) btnCancel.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Submit form
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const teamName = document.getElementById("input-team-name")?.value.trim() || "Your Team";
      const p1 = document.getElementById("input-player-1")?.value.trim() || "Player 1";
      const p2 = document.getElementById("input-player-2")?.value.trim() || "Player 2";
      const category = document.getElementById("select-category")?.value || "Premier Doubles";
      const phone = document.getElementById("input-phone")?.value.trim() || "";
      const tourneyId = document.getElementById("form-tourney-id")?.value || "reg-tourney-5";

      // Match tournament in dataStore
      const allTourneys = dataStore.getTournaments();
      const matched = allTourneys.find(t => t.id === tourneyId || `reg-${t.id}` === tourneyId || t.name.includes(tourneyId));
      if (matched) {
        dataStore.updateTournament(matched.id, {
          registeredTeams: Math.min(matched.maxTeams || 24, (matched.registeredTeams || 0) + 1)
        });
      }

      // Add registration to central dataStore
      dataStore.addRegistration({
        teamName,
        player1: p1,
        player2: p2,
        category,
        tournamentName: matched ? matched.name : "Tournament 5",
        phone
      });

      closeModal();
      renderUpdatesView(container);
      bindUpdatesEvents(container);

      showToast(`
        <div class="toast-content">
          <span class="toast-icon">🎉</span>
          <div>
            <strong>Registration Confirmed!</strong>
            <p>${teamName} (${p1} &amp; ${p2}) registered for ${category}. Confirmation sent to your WhatsApp.</p>
          </div>
        </div>
      `, 6000);
    });
  }

  // Handle "View Current Top 8 Standings" link
  container.querySelectorAll(".goto-points-table-btn").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pointsTableTab = document.querySelector('.series-tab[href="#points-tables"]');
      if (pointsTableTab) {
        pointsTableTab.click();
      }
    });
  });
}
