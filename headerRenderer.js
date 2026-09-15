/**
 * The Crown Series - Pickleball Championship
 * The Racquet Club Ahmedabad - Header Strip & Navigation Engine
 * Handles full-width header branding, desktop dropdown panels, mobile drawer accordions,
 * sticky scroll effects, and community hub dialog.
 */

import { tournamentData } from "./app.js";

/**
 * Initializes all header and navigation interactions
 */
export function initHeaderModule() {
  const header = document.getElementById("site-header");
  if (!header) return;

  setupDropdowns(header);
  setupMobileNav(header);
  setupScrollEffect(header);
  setupCommunityModal();
}

/**
 * Handles desktop dropdown behavior (hover & click)
 */
function setupDropdowns(header) {
  const dropdownItems = header.querySelectorAll(".header-nav-item.has-dropdown");
  let activeDropdown = null;

  function openDropdown(item) {
    if (activeDropdown && activeDropdown !== item) {
      closeDropdown(activeDropdown);
    }
    item.classList.add("is-open");
    const btn = item.querySelector(".header-nav-btn");
    if (btn) btn.setAttribute("aria-expanded", "true");
    activeDropdown = item;
  }

  function closeDropdown(item) {
    if (!item) return;
    item.classList.remove("is-open");
    const btn = item.querySelector(".header-nav-btn");
    if (btn) btn.setAttribute("aria-expanded", "false");
    if (activeDropdown === item) activeDropdown = null;
  }

  dropdownItems.forEach(item => {
    const btn = item.querySelector(".header-nav-btn");

    // Click trigger
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains("is-open");
        if (isOpen) {
          closeDropdown(item);
        } else {
          openDropdown(item);
        }
      });
    }

    // Hover trigger with subtle debounce for smooth feel
    let hoverTimeout = null;

    item.addEventListener("mouseenter", () => {
      if (window.innerWidth >= 1024) {
        clearTimeout(hoverTimeout);
        openDropdown(item);
      }
    });

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth >= 1024) {
        hoverTimeout = setTimeout(() => {
          closeDropdown(item);
        }, 180);
      }
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-nav-item.has-dropdown")) {
      dropdownItems.forEach(item => closeDropdown(item));
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      dropdownItems.forEach(item => closeDropdown(item));
    }
  });

  // Handle dropdown link routing
  header.querySelectorAll("[data-nav-target]").forEach(link => {
    link.addEventListener("click", (e) => {
      const target = link.getAttribute("data-nav-target");
      if (target) {
        e.preventDefault();
        dropdownItems.forEach(item => closeDropdown(item));
        closeMobileMenu(header);
        
        // Find series-tab and trigger click
        const tabEl = document.querySelector(`.series-tab[href="#${target}"]`);
        if (tabEl) {
          tabEl.click();
        } else {
          history.pushState(null, "", `#${target}`);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }

        // Smooth scroll down to main content area if past banner
        const mainTitle = document.getElementById("main-heading");
        if (mainTitle && window.scrollY > 200) {
          mainTitle.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}

/**
 * Handles mobile hamburger toggle and accordion menus
 */
function setupMobileNav(header) {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const drawer = document.getElementById("mobile-nav-drawer");
  if (!toggleBtn || !drawer) return;

  function toggleMobileMenu() {
    const isOpen = header.classList.toggle("mobile-nav-open");
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    drawer.setAttribute("aria-hidden", isOpen ? "false" : "true");
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Mobile accordions
  header.querySelectorAll(".mobile-accordion-btn").forEach(accBtn => {
    accBtn.addEventListener("click", () => {
      const parentGroup = accBtn.closest(".mobile-nav-group");
      const isExpanded = accBtn.getAttribute("aria-expanded") === "true";

      // Collapse sibling accordions
      header.querySelectorAll(".mobile-nav-group").forEach(grp => {
        if (grp !== parentGroup) {
          grp.classList.remove("is-expanded");
          const b = grp.querySelector(".mobile-accordion-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        }
      });

      if (isExpanded) {
        parentGroup.classList.remove("is-expanded");
        accBtn.setAttribute("aria-expanded", "false");
      } else {
        parentGroup.classList.add("is-expanded");
        accBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Close when clicking outside drawer
  document.addEventListener("click", (e) => {
    if (header.classList.contains("mobile-nav-open") && !header.contains(e.target)) {
      closeMobileMenu(header);
    }
  });
}

function closeMobileMenu(header) {
  if (!header) return;
  header.classList.remove("mobile-nav-open");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  if (toggleBtn) toggleBtn.setAttribute("aria-expanded", "false");
  const drawer = document.getElementById("mobile-nav-drawer");
  if (drawer) drawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

/**
 * Sticky header visual change on scroll
 */
function setupScrollEffect(header) {
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          header.classList.add("is-scrolled");
        } else {
          header.classList.remove("is-scrolled");
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Community Hub Interactive Dialog
 */
function setupCommunityModal() {
  const modalBackdrop = document.getElementById("community-modal-backdrop");
  const modalBody = document.getElementById("comm-modal-body");
  const btnClose = document.getElementById("btn-close-comm-modal");
  if (!modalBackdrop || !modalBody) return;

  function renderCommunityTab(tabName) {
    // Update tab active states
    document.querySelectorAll(".comm-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    if (tabName === "players") {
      const playerRows = tournamentData.map(p => `
        <div class="comm-player-card">
          <div class="comm-player-rank">#${p.rank}</div>
          <div class="comm-player-info">
            <strong class="comm-player-name">${p.name}</strong>
            <span class="comm-player-meta">${p.games} Games • ${p.won}W / ${p.loss}L</span>
          </div>
          <div class="comm-player-pts">${p.points} Pts</div>
        </div>
      `).join("");

      modalBody.innerHTML = `
        <div class="comm-section-head">
          <h4>Championship Series Competitors</h4>
          <p>24 officially registered tournament players in The Crown 2026 Season</p>
        </div>
        <div class="comm-players-grid">
          ${playerRows}
        </div>
      `;
    } else if (tabName === "events") {
      modalBody.innerHTML = `
        <div class="comm-section-head">
          <h4>Racquet Club Ahmedabad • Events &amp; Open Play</h4>
          <p>Regular weekly schedules, competitive drills &amp; mixer tournaments</p>
        </div>
        <div class="comm-events-list">
          <div class="comm-event-card">
            <div class="event-date-pill">SATURDAY &bull; 6:00 PM</div>
            <h5>Weekend Twilight Mixer</h5>
            <p>Rotating doubles social mixer with 4 skill-graded courts. Open to all registered members.</p>
            <span class="event-venue-tag">Bainbridge Pickleball Club &bull; Court 1–4</span>
          </div>
          <div class="comm-event-card">
            <div class="event-date-pill">SUNDAY &bull; 8:00 AM</div>
            <h5>Junior &amp; Premier Masterclass</h5>
            <p>Advanced dinking strategies, third-shot drops and transition zone footwork drills.</p>
            <span class="event-venue-tag">Shaishya Pickleball Areena &bull; Stadium Court</span>
          </div>
          <div class="comm-event-card">
            <div class="event-date-pill">WEDNESDAY &bull; 7:30 PM</div>
            <h5>Mid-Week League Nights</h5>
            <p>Fast-paced doubles ladder round-robin with real-time rating updates.</p>
            <span class="event-venue-tag">Yu Pikkle Pickleball Arena &bull; Indoor Courts</span>
          </div>
        </div>
      `;
    } else if (tabName === "groups") {
      modalBody.innerHTML = `
        <div class="comm-section-head">
          <h4>Official Community Groups</h4>
          <p>Connect directly with local players, schedule games, and receive official alerts</p>
        </div>
        <div class="comm-groups-list">
          <div class="comm-group-card">
            <div class="group-icon-wrap">💬</div>
            <div class="group-info">
              <h5>The Racquet Club &bull; Official Community</h5>
              <p>Primary announcement and discussion channel with over 450 active players in Ahmedabad.</p>
            </div>
            <button type="button" class="btn-group-join" onclick="alert('You are being redirected to The Racquet Club WhatsApp Community invite link.')">Join Group</button>
          </div>
          <div class="comm-group-card">
            <div class="group-icon-wrap">⚡</div>
            <div class="group-info">
              <h5>Premier &amp; Open Players WhatsApp</h5>
              <p>Dedicated coordination channel for competitive players rated 3.5+ for tournament prep.</p>
            </div>
            <button type="button" class="btn-group-join" onclick="alert('Redirecting to Premier WhatsApp channel.')">Join Group</button>
          </div>
        </div>
      `;
    } else {
      // Default: Overview
      modalBody.innerHTML = `
        <div class="comm-overview-card">
          <div class="overview-branding">
            <img src="/racquet-club-logo.png" alt="The Racquet Club Ahmedabad" class="comm-modal-logo">
            <div>
              <h4>The Racquet Club Ahmedabad</h4>
              <p class="overview-sub">Gujarat's Premier Racquet Sports &amp; Pickleball Community</p>
            </div>
          </div>
          <p class="overview-copy">
            The Racquet Club Ahmedabad is the official organizing body behind <strong>The Crown Series Pickleball Championship</strong>. Our mission is to provide professional-grade tournament infrastructure, transparent rankings, and community-driven sports platforms for players across Gujarat.
          </p>
          <div class="comm-stats-triplet">
            <div class="triplet-item">
              <strong>450+</strong>
              <span>Active Players</span>
            </div>
            <div class="triplet-item">
              <strong>4</strong>
              <span>Championship Arenas</span>
            </div>
            <div class="triplet-item">
              <strong>7</strong>
              <span>Season Stops</span>
            </div>
          </div>
        </div>
      `;
    }
  }

  function openCommunityModal(tab = "overview") {
    modalBackdrop.style.display = "flex";
    document.body.style.overflow = "hidden";
    renderCommunityTab(tab);
  }

  function closeCommunityModal() {
    modalBackdrop.style.display = "none";
    document.body.style.overflow = "";
  }

  // Bind trigger buttons
  document.querySelectorAll(".community-dialog-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const tab = btn.getAttribute("data-community-tab") || "overview";
      closeMobileMenu(document.getElementById("site-header"));
      openCommunityModal(tab);
    });
  });

  // Modal navigation tabs
  modalBackdrop.querySelectorAll(".comm-tab-btn").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
      const tab = tabBtn.getAttribute("data-tab");
      renderCommunityTab(tab);
    });
  });

  // Close handlers
  if (btnClose) btnClose.addEventListener("click", closeCommunityModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeCommunityModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalBackdrop.style.display === "flex") {
      closeCommunityModal();
    }
  });
}
