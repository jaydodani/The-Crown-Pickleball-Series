import{d as s}from"./dataStore-CekUmtw6.js";const d=document.getElementById("admin-view-container"),F=document.getElementById("page-title"),H=document.getElementById("page-breadcrumb"),z=document.querySelectorAll(".sidebar-nav .nav-link"),x=document.getElementById("admin-sidebar"),N=document.getElementById("sidebar-toggle"),y=document.getElementById("admin-modal-backdrop"),k=document.getElementById("admin-modal-card"),j=document.getElementById("toast-container"),O=document.getElementById("btn-admin-logout"),U=document.getElementById("notif-btn");let L="dashboard",I=null;function Q(){Te(),Ce(),xe(),window.addEventListener("hashchange",W),s.subscribe(n=>{$()}),W()}function W(){const e=(window.location.hash.replace(/^#\/?/,"")||"dashboard").split("/");L=e[0]||"dashboard",I=e[1]||null,z.forEach(t=>{t.getAttribute("data-view")===L?t.classList.add("active"):t.classList.remove("active")}),x&&x.classList.remove("open"),$()}function $(){if(d)switch(L){case"dashboard":G();break;case"tournaments":ie();break;case"add-tournament":le();break;case"tournament-detail":oe(I);break;case"tournament-matches":case"matches":de();break;case"venues":P();break;case"categories":D();break;case"players":B();break;case"doubles-teams":R();break;case"registrations":re();break;case"results":K();break;case"points-table":J();break;case"rankings":ce();break;case"stats":case"tournament-records":case"player-records":me();break;case"updates":case"community":ue();break;case"settings":Z();break;case"admin-users":pe();break;default:G();break}}function p(n,e){F&&(F.textContent=n),H&&(H.textContent=e),document.title=`${n} • The Racquet Club Pickleball Series Admin`}function G(){p("Dashboard","Pickleball Series Management Overview");const n=s.getSummaryMetrics(),t=s.getTournaments().slice(0,5),o=s.getMatches().filter(i=>i.status==="Completed").slice(0,4);d.innerHTML=`
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
          ${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
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
          <span class="metric-number">${n.activeTournaments}</span>
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
          <span class="metric-number">${n.playersCount}</span>
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
          <span class="metric-number">${n.teamsCount}</span>
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
          <span class="metric-number">${n.matchesPlayed}</span>
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
          <span class="metric-number text-pill">${n.upcomingTournament}</span>
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
          <span class="metric-number">${n.registeredTeams}</span>
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
            ${o.map(i=>`
              <div class="rail-status-item">
                <div class="rail-item-info">
                  <strong class="rail-item-title">${i.teamA} vs ${i.teamB}</strong>
                  <span class="rail-item-sub">${i.tournamentName.split("•")[0].trim()} • ${i.round}</span>
                </div>
                <span class="rail-item-stat">${i.score}</span>
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
            ${t.map(i=>{const l=i.status==="COMPLETED",v=l?"completed":"upcoming",r=l?"Completed":"Upcoming";return`
                <tr>
                  <td>
                    <strong>${i.name}</strong>
                  </td>
                  <td>${i.date}</td>
                  <td>${i.venue}</td>
                  <td>${i.category}</td>
                  <td style="text-align: right; font-weight: 700;">${i.maxTeams||24}</td>
                  <td>
                    <span class="badge-status ${v}">${r}</span>
                  </td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <a href="#tournament-detail/${i.id}" class="btn-table-action primary" title="View Tournament Details">View</a>
                      <button class="btn-table-action btn-edit-tourney" data-tourney-id="${i.id}" title="Edit Tournament">Edit</button>
                      <a href="#tournament-matches/${i.id}" class="btn-table-action" title="Manage Matches">Manage Matches</a>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,d.querySelectorAll(".btn-edit-tourney").forEach(i=>{i.addEventListener("click",()=>{const l=i.getAttribute("data-tourney-id");V(l)})})}function ie(){p("Tournaments","Manage all championship series tournaments");const n=s.getTournaments();d.innerHTML=`
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
            ${n.map(e=>{const t=e.status==="COMPLETED",a=t?"completed":"upcoming",o=t?"Completed":"Upcoming";return`
                <tr>
                  <td>
                    <strong>${e.name}</strong>
                    <div style="font-size: 0.72rem; color: #64748B;">No. ${e.number} • ${e.pointsAwarded||"100 Pts"}</div>
                  </td>
                  <td>${e.date}</td>
                  <td>${e.venue}</td>
                  <td>${e.category}</td>
                  <td>${e.registeredTeams||24} / ${e.maxTeams||24}</td>
                  <td><span class="badge-status ${a}">${o}</span></td>
                  <td>
                    ${e.winner?`<strong>${e.winner}</strong> <span style="font-size: 0.72rem; color: #047857;">(${e.mvp||"MVP"})</span>`:'<span style="color: #94A3B8;">—</span>'}
                  </td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <a href="#tournament-detail/${e.id}" class="btn-table-action primary">View</a>
                      <button class="btn-table-action btn-edit-tourney" data-tourney-id="${e.id}">Edit</button>
                      <a href="#tournament-matches/${e.id}" class="btn-table-action">Matches</a>
                      <button class="btn-table-action danger btn-del-tourney" data-tourney-id="${e.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,d.querySelectorAll(".btn-edit-tourney").forEach(e=>{e.addEventListener("click",()=>V(e.getAttribute("data-tourney-id")))}),d.querySelectorAll(".btn-del-tourney").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-tourney-id");confirm("Are you sure you want to delete this tournament and its associated matches?")&&(s.deleteTournament(t),c("Tournament deleted successfully","success"))})})}function le(){p("Add Tournament","Create a new series championship tournament");const n=s.getVenues(),e=s.getCategories(),t=s.getPlayers(),a=s.getTeams();d.innerHTML=`
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
                ${n.map(r=>`<option value="${r.name}" data-venue-id="${r.id}">${r.name} (${r.city})</option>`).join("")}
              </select>
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
                ${e.map(r=>`<option value="${r.name}">${r.name} (${r.type})</option>`).join("")}
              </select>
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
                ${a.map(r=>`<option value="${r.name}">${r.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-runnerup">Runner-Up (If Completed)</label>
              <select id="tourney-runnerup" class="form-select">
                <option value="">-- Select Runner-Up Team --</option>
                ${a.map(r=>`<option value="${r.name}">${r.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-mvp">MVP (If Completed)</label>
              <select id="tourney-mvp" class="form-select">
                <option value="">-- Select Tournament MVP Player --</option>
                ${t.map(r=>`<option value="${r.name}">${r.name}</option>`).join("")}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="tourney-points">Points Awarded</label>
              <input type="text" id="tourney-points" class="form-input" value="150 Series Pts">
            </div>

          </div>

          <div class="form-actions-bar">
            <button type="button" class="btn-admin-secondary" id="btn-cancel-tourney">Cancel</button>
            <button type="submit" class="btn-admin-primary" id="btn-save-tourney">Save Tournament</button>
            <button type="button" class="btn-admin-primary" id="btn-save-manage-matches" style="background-color: var(--admin-court-green);">Save & Manage Matches</button>
          </div>
        </form>
      </div>
    </div>
  `;const o=document.getElementById("form-add-tournament"),i=document.getElementById("btn-cancel-tourney"),l=document.getElementById("btn-save-manage-matches");i.addEventListener("click",()=>{window.location.hash="#tournaments"});const v=(r=!1)=>{var q;const f=document.getElementById("tourney-name").value.trim(),u=document.getElementById("tourney-num").value.trim(),m=document.getElementById("tourney-date").value.trim(),g=document.getElementById("tourney-venue"),M=g.value,A=((q=g.selectedOptions[0])==null?void 0:q.getAttribute("data-venue-id"))||"",w=document.getElementById("tourney-start-time").value,E=document.getElementById("tourney-end-time").value,S=document.getElementById("tourney-category").value,T=Number(document.getElementById("tourney-max-teams").value)||24,C=document.getElementById("tourney-reg-status").value,Y=document.getElementById("tourney-status").value,X=document.getElementById("tourney-desc").value.trim(),ee=document.getElementById("tourney-winner").value,te=document.getElementById("tourney-runnerup").value,ae=document.getElementById("tourney-mvp").value,ne=document.getElementById("tourney-points").value.trim()||"100 Pts";if(!f||!m){c("Please fill in required fields","danger");return}const se=s.addTournament({number:String(u).padStart(2,"0"),name:f,status:Y,date:m,startTime:w,endTime:E,venueId:A,venue:M,category:S,maxTeams:T,registrationStatus:C,description:X,winner:ee,runnerUp:te,mvp:ae,pointsAwarded:ne,city:"Ahmedabad"});c("Tournament created successfully!","success"),r?window.location.hash=`#tournament-matches/${se.id}`:window.location.hash="#tournaments"};o.addEventListener("submit",r=>{r.preventDefault(),v(!1)}),l.addEventListener("click",()=>{v(!0)})}function oe(n){var f;const e=s.getTournaments(),t=e.find(u=>u.id===n)||e[0];if(!t){window.location.hash="#tournaments";return}p(t.name,`Tournament Detail • ${t.venue}`);const a=s.getMatches().filter(u=>u.tournamentId===t.id),o=s.getRegistrations().filter(u=>u.tournament.includes(t.number)||u.tournament.includes(t.name.split("•")[0].trim())),i=t.status==="COMPLETED";d.innerHTML=`
    <!-- Detail Hero Card -->
    <div class="tourney-detail-hero">
      <div class="detail-hero-top">
        <span class="badge-status ${i?"completed":"upcoming"}">${i?"Completed":"Upcoming"}</span>
        <div class="view-header-actions">
          <button class="btn-admin-secondary btn-edit-this-tourney">Edit Details</button>
          <a href="#tournament-matches/${t.id}" class="btn-admin-primary">+ Add Match</a>
        </div>
      </div>
      <h2 class="detail-hero-name">${t.name}</h2>
      <div class="detail-meta-triplet">
        <span><strong>Date:</strong> ${t.date}</span>
        <span>•</span>
        <span><strong>Venue:</strong> ${t.venue}</span>
        <span>•</span>
        <span><strong>Category:</strong> ${t.category}</span>
        <span>•</span>
        <span><strong>Max Teams:</strong> ${t.maxTeams||24}</span>
        ${t.winner?`<span>•</span><span><strong>Champion:</strong> ${t.winner}</span>`:""}
      </div>
    </div>

    <!-- Detail Sub-Navigation Tabs -->
    <div class="tourney-tabs-nav" id="tourney-subtabs">
      <button class="tourney-tab-btn active" data-tab="overview">Overview</button>
      <button class="tourney-tab-btn" data-tab="teams">Teams (${o.length||24})</button>
      <button class="tourney-tab-btn" data-tab="matches">Matches (${a.length})</button>
      <button class="tourney-tab-btn" data-tab="results">Results</button>
      <button class="tourney-tab-btn" data-tab="points">Points Table</button>
      <button class="tourney-tab-btn" data-tab="stats">Stats</button>
    </div>

    <!-- Tab Pane Container -->
    <div class="admin-card" id="tourney-tab-content">
      <!-- Injected by tab handler -->
    </div>
  `;const l=d.querySelectorAll(".tourney-tab-btn"),v=document.getElementById("tourney-tab-content"),r=u=>{if(l.forEach(m=>m.classList.toggle("active",m.getAttribute("data-tab")===u)),u==="overview")v.innerHTML=`
        <div class="admin-card-body">
          <h3 class="admin-card-title" style="margin-bottom: 12px;">Tournament Overview & Technical Specifications</h3>
          <p style="color: #475569; margin-bottom: 20px; line-height: 1.6;">${t.description||"Official championship stop hosted by The Racquet Club Ahmedabad series."}</p>
          <div class="admin-form-grid">
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Start & End Hours</strong>
                <span>${t.startTime||"08:00 AM"} – ${t.endTime||"07:30 PM"}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Series Points Awarded</strong>
                <span>${t.pointsAwarded||"100 Pts"}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Registration Window</strong>
                <span>${t.registrationStatus||"Open"}</span>
              </div>
            </div>
            <div class="rail-status-item">
              <div class="rail-item-info">
                <strong>Tournament MVP</strong>
                <span>${t.mvp||"TBD upon tournament conclusion"}</span>
              </div>
            </div>
          </div>
        </div>
      `;else if(u==="matches"||u==="results")v.innerHTML=`
        <div class="admin-card-header">
          <h3 class="admin-card-title">Tournament Matches</h3>
          <a href="#tournament-matches/${t.id}" class="btn-admin-primary">+ Add Match</a>
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
              ${a.length?a.map(m=>`
                <tr>
                  <td><strong>${m.round}</strong></td>
                  <td>${m.teamA}</td>
                  <td>${m.teamB}</td>
                  <td>${m.court}</td>
                  <td>${m.date} • ${m.time}</td>
                  <td><strong>${m.score}</strong></td>
                  <td><span style="color: #047857; font-weight: 700;">${m.winner||"—"}</span></td>
                  <td><span class="badge-status ${m.status.toLowerCase()}">${m.status}</span></td>
                </tr>
              `).join(""):'<tr><td colspan="8" style="text-align: center; color: #94A3B8; padding: 24px;">No matches recorded for this tournament yet. Click "+ Add Match" to schedule matches.</td></tr>'}
            </tbody>
          </table>
        </div>
      `;else{const m=s.getPointsTable().slice(0,10);v.innerHTML=`
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
                ${m.map(g=>`
                  <tr>
                    <td><strong>#${g.rank}</strong></td>
                    <td>${g.name}</td>
                    <td>${g.games}</td>
                    <td>${g.won}</td>
                    <td>${g.loss}</td>
                    <td><strong style="color: var(--admin-primary);">${g.points}</strong></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `}};l.forEach(u=>{u.addEventListener("click",()=>r(u.getAttribute("data-tab")))}),r("overview"),(f=d.querySelector(".btn-edit-this-tourney"))==null||f.addEventListener("click",()=>{V(t.id)})}function de(){p("Matches Management","Central Match Database • Schedules, Live Scores & Verification"),s.getMatches();const n=s.getTournaments();s.getTeams(),s.getVenues(),d.innerHTML=`
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
            ${n.map(o=>`<option value="${o.id}" ${I===o.id?"selected":""}>${o.name}</option>`).join("")}
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
  `;const e=document.getElementById("filter-match-tourney"),t=document.getElementById("matches-tbody"),a=()=>{const o=e.value,i=o==="ALL"?s.getMatches():s.getMatches().filter(l=>l.tournamentId===o);if(!i.length){t.innerHTML='<tr><td colspan="10" style="text-align: center; color: #94A3B8; padding: 32px;">No matches found matching filter.</td></tr>';return}t.innerHTML=i.map(l=>`
      <tr>
        <td><strong>${l.tournamentName?l.tournamentName.split("•")[0].trim():"Series Match"}</strong></td>
        <td><span style="font-weight: 700; color: #475569;">${l.round}</span></td>
        <td><strong>${l.teamA}</strong></td>
        <td><strong>${l.teamB}</strong></td>
        <td>${l.court}</td>
        <td>${l.date} • ${l.time}</td>
        <td><span class="badge-status ${l.status==="Completed"?"completed":"upcoming"}">${l.score}</span></td>
        <td><strong style="color: #047857;">${l.winner||"—"}</strong></td>
        <td><span class="badge-status ${l.status.toLowerCase()}">${l.status}</span></td>
        <td style="text-align: center;">
          <div class="table-actions-cell" style="justify-content: center;">
            <button class="btn-table-action btn-edit-match" data-match-id="${l.id}">Edit</button>
            <button class="btn-table-action danger btn-del-match" data-match-id="${l.id}">Delete</button>
          </div>
        </td>
      </tr>
    `).join(""),t.querySelectorAll(".btn-edit-match").forEach(l=>{l.addEventListener("click",()=>_(l.getAttribute("data-match-id")))}),t.querySelectorAll(".btn-del-match").forEach(l=>{l.addEventListener("click",()=>{const v=l.getAttribute("data-match-id");confirm("Delete this match? Live standings will automatically update.")&&(s.deleteMatch(v),c("Match removed","success"),a())})})};e.addEventListener("change",a),a(),document.getElementById("btn-open-add-match").addEventListener("click",()=>{ve()})}function P(){p("Venues & Courts","Tournament Venues, Facilities & Court Assignments");const n=s.getVenues();d.innerHTML=`
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
            ${n.map(e=>`
              <tr>
                <td><strong>${e.name}</strong></td>
                <td>${e.address}</td>
                <td><span style="font-weight: 800; color: var(--admin-primary);">${e.courtsCount||6} Courts</span></td>
                <td>${e.surface}</td>
                <td>${e.environment}</td>
                <td><span class="badge-status active">Active</span></td>
                <td style="text-align: center;">
                  <div class="table-actions-cell" style="justify-content: center;">
                    <a href="${e.mapUrl}" target="_blank" class="btn-table-action primary">Map</a>
                    <button class="btn-table-action btn-edit-venue" data-venue-id="${e.id}">Edit</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.getElementById("btn-add-venue").addEventListener("click",()=>{be()}),d.querySelectorAll(".btn-edit-venue").forEach(e=>{e.addEventListener("click",()=>ge(e.getAttribute("data-venue-id")))})}function D(){p("Categories","Tournament Categories, Skill Divisions & Formats");const n=s.getCategories();d.innerHTML=`
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
            ${n.map(e=>`
              <tr>
                <td><strong>${e.name}</strong></td>
                <td>${e.type}</td>
                <td>${e.format}</td>
                <td>${e.gender}</td>
                <td><span class="badge-status active">${e.status}</span></td>
                <td style="text-align: center;">
                  <button class="btn-table-action btn-edit-cat" data-cat-id="${e.id}">Edit</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.getElementById("btn-add-category").addEventListener("click",()=>{we()}),d.querySelectorAll(".btn-edit-cat").forEach(e=>{e.addEventListener("click",()=>Ee(e.getAttribute("data-cat-id")))})}function B(){p("Players Roster","Individual Player Records, Profiles & Contacts");const n=s.getPlayers(),e=s.getPointsTable(),t=new Map(e.map(a=>[a.name,a]));d.innerHTML=`
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Players Directory (${n.length})</h2>
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
            ${n.map(a=>{const o=t.get(a.name)||{games:0,won:0,loss:0,points:0},i=o.games>0?Math.round(o.won/o.games*100):0;return`
                <tr>
                  <td><strong>${a.name}</strong></td>
                  <td>${a.team||"—"}</td>
                  <td>${a.category}</td>
                  <td style="font-size: 0.8rem; color: #64748B;">${a.contact||a.email}</td>
                  <td style="text-align: center;">${o.games}</td>
                  <td style="text-align: center; color: #047857; font-weight: 700;">${o.won}</td>
                  <td style="text-align: center; color: #DC2626;">${o.loss}</td>
                  <td style="text-align: center; font-weight: 700;">${i}%</td>
                  <td style="text-align: center;"><strong style="color: var(--admin-primary);">${o.points}</strong></td>
                  <td style="text-align: center;">
                    <div class="table-actions-cell" style="justify-content: center;">
                      <button class="btn-table-action btn-edit-player" data-player-id="${a.id}">Edit</button>
                      <button class="btn-table-action danger btn-del-player" data-player-id="${a.id}">Delete</button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.getElementById("btn-add-player").addEventListener("click",()=>he()),d.querySelectorAll(".btn-edit-player").forEach(a=>{a.addEventListener("click",()=>ye(a.getAttribute("data-player-id")))}),d.querySelectorAll(".btn-del-player").forEach(a=>{a.addEventListener("click",()=>{const o=a.getAttribute("data-player-id");confirm("Delete this player?")&&(s.deletePlayer(o),c("Player deleted","success"),B())})})}function R(){p("Doubles Teams","24 Official Series Doubles Partnerships");const n=s.getTeams(),e=s.getMatches().filter(t=>t.status==="Completed");d.innerHTML=`
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Doubles Partnerships (${n.length})</h2>
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
            ${n.map(t=>{const a=e.filter(i=>i.teamA===t.name||i.teamB===t.name).length,o=e.filter(i=>i.winner===t.name).length;return`
                <tr>
                  <td><strong>${t.name}</strong></td>
                  <td>${t.player1}</td>
                  <td>${t.player2}</td>
                  <td>${t.category}</td>
                  <td>${a}</td>
                  <td><strong style="color: #047857;">${o}</strong></td>
                  <td><span class="badge-status active">${t.status}</span></td>
                  <td style="text-align: center;">
                    <button class="btn-table-action btn-edit-team" data-team-id="${t.id}">Edit</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,document.getElementById("btn-add-team").addEventListener("click",()=>fe()),d.querySelectorAll(".btn-edit-team").forEach(t=>{t.addEventListener("click",()=>$e(t.getAttribute("data-team-id")))})}function re(){p("Registrations","Championship Tournament Sign-ups & Entry Fees");const n=s.getRegistrations();d.innerHTML=`
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Tournament Registrations (${n.length})</h2>
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
            ${n.map(e=>{const t=e.status.toLowerCase();return`
                <tr>
                  <td><strong>${e.team}</strong></td>
                  <td>${e.players}</td>
                  <td>${e.category}</td>
                  <td><strong>${e.tournament}</strong></td>
                  <td>${e.date}</td>
                  <td>${e.payment}</td>
                  <td><span class="badge-status ${t}">${e.status}</span></td>
                  <td style="text-align: center;">
                    <select class="form-select select-reg-status" data-reg-id="${e.id}" style="padding: 4px 8px; font-size: 0.78rem; width: auto;">
                      <option value="Confirmed" ${e.status==="Confirmed"?"selected":""}>Confirmed</option>
                      <option value="Pending" ${e.status==="Pending"?"selected":""}>Pending</option>
                      <option value="Waitlisted" ${e.status==="Waitlisted"?"selected":""}>Waitlisted</option>
                      <option value="Cancelled" ${e.status==="Cancelled"?"selected":""}>Cancelled</option>
                    </select>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,d.querySelectorAll(".select-reg-status").forEach(e=>{e.addEventListener("change",t=>{const a=e.getAttribute("data-reg-id");s.updateRegistration(a,{status:e.value}),c("Registration status updated","success")})})}function K(){p("Results Verification","Review Completed Match Scores & Official Signs");const n=s.getMatches().filter(e=>e.status==="Completed");d.innerHTML=`
    <div class="view-header">
      <div class="view-header-title-block">
        <h2 class="view-main-title">Match Results Management (${n.length})</h2>
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
            ${n.map(e=>`
              <tr>
                <td><strong>${e.tournamentName.split("•")[0].trim()}</strong></td>
                <td>${e.round}</td>
                <td>${e.teamA} vs ${e.teamB}</td>
                <td><strong style="font-size: 1rem;">${e.score}</strong></td>
                <td><strong style="color: #047857;">${e.winner}</strong></td>
                <td>
                  <span class="badge-status ${e.verified?"verified":"pending"}">
                    ${e.verified?"Verified":"Pending"}
                  </span>
                </td>
                <td style="text-align: center;">
                  <div class="table-actions-cell" style="justify-content: center;">
                    <button class="btn-table-action btn-edit-match" data-match-id="${e.id}">Correct Score</button>
                    <button class="btn-table-action ${e.verified?"":"primary"} btn-toggle-verify" data-match-id="${e.id}">
                      ${e.verified?"Mark Pending":"Verify"}
                    </button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,d.querySelectorAll(".btn-edit-match").forEach(e=>{e.addEventListener("click",()=>_(e.getAttribute("data-match-id")))}),d.querySelectorAll(".btn-toggle-verify").forEach(e=>{e.addEventListener("click",()=>{const t=e.getAttribute("data-match-id"),a=s.getMatchById(t);a&&(s.updateMatch(t,{verified:!a.verified}),c(a.verified?"Marked as pending review":"Result officially verified","success"),K())})})}function J(){p("Points Table","Calculated Championship Standings from Central Matches");const n=s.getPointsTable();d.innerHTML=`
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
            ${n.map(e=>{const t=e.games>0?Math.round(e.won/e.games*100):0;return`
                <tr>
                  <td style="text-align: center;"><strong>#${e.rank}</strong></td>
                  <td><strong>${e.name}</strong></td>
                  <td style="text-align: center;">${e.tournaments}</td>
                  <td style="text-align: center;">${e.games}</td>
                  <td style="text-align: center; color: #047857; font-weight: 700;">${e.won}</td>
                  <td style="text-align: center; color: #DC2626;">${e.loss}</td>
                  <td style="text-align: center; font-weight: 700;">${t}%</td>
                  <td style="text-align: center;">
                    <span style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--admin-text-main); background: #F1F5F9; padding: 3px 10px; border-radius: 6px;">
                      ${e.points}
                    </span>
                  </td>
                  <td>
                    ${e.form.map(a=>`<span style="display: inline-block; width: 18px; height: 18px; line-height: 18px; text-align: center; font-size: 0.65rem; font-weight: 800; border-radius: 50%; margin-right: 3px; background: ${a==="W"?"#ECFDF5":"#FEE2E2"}; color: ${a==="W"?"#047857":"#DC2626"};">${a}</span>`).join("")}
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function ce(){J()}function me(){p("Series Statistics & Records","Official Season Performance & Analytics");const e=s.getPointsTable()[0]||{name:"Jay & Kushal",points:120,won:6,loss:2},t=s.getTournaments().filter(a=>a.status==="COMPLETED");d.innerHTML=`
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
          <span class="metric-pill-sub">${e.points} Pts</span>
        </div>
        <div class="metric-card-body">
          <span class="metric-number text-pill">${e.name}</span>
          <span class="metric-label">Record: ${e.won}W – ${e.loss}L</span>
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
            ${t.map(a=>`
              <tr>
                <td><strong>${a.name}</strong></td>
                <td>${a.venue}</td>
                <td><strong style="color: #047857;">${a.winner}</strong></td>
                <td>${a.runnerUp}</td>
                <td><span class="badge-status completed">${a.score}</span></td>
                <td><span style="font-weight: 700; color: #D97706;">${a.mvp}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function ue(){p("Content & Updates","Publish Bulletins, Schedule Changes & Community News"),d.innerHTML=`
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
  `,document.getElementById("btn-create-news").addEventListener("click",()=>{c("Feature ready: New announcement modal","success")})}function Z(){p("Series Settings","Scoring Rules, Season Dates & Contact Information");const n=s.getSettings();d.innerHTML=`
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
              <input type="text" id="set-series-name" class="form-input" value="${n.seriesName}">
            </div>
            <div class="form-group">
              <label class="form-label">Season Label</label>
              <input type="text" id="set-season" class="form-input" value="${n.season}">
            </div>
            <div class="form-group">
              <label class="form-label">Points Per Win</label>
              <input type="number" id="set-pts-win" class="form-input" value="${n.pointsPerWin}">
            </div>
            <div class="form-group">
              <label class="form-label">Points Per Loss</label>
              <input type="number" id="set-pts-loss" class="form-input" value="${n.pointsPerLoss}">
            </div>
            <div class="form-group">
              <label class="form-label">Admin Email</label>
              <input type="email" id="set-email" class="form-input" value="${n.contactEmail}">
            </div>
            <div class="form-group">
              <label class="form-label">Helpline Contact</label>
              <input type="text" id="set-phone" class="form-input" value="${n.emergencyContact}">
            </div>
          </div>
          <div class="form-actions-bar">
            <button type="button" class="btn-admin-secondary" id="btn-reset-seed">Reset to Initial Seed</button>
            <button type="submit" class="btn-admin-primary">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  `,document.getElementById("form-settings").addEventListener("submit",e=>{e.preventDefault(),s.updateSettings({seriesName:document.getElementById("set-series-name").value,season:document.getElementById("set-season").value,pointsPerWin:Number(document.getElementById("set-pts-win").value),pointsPerLoss:Number(document.getElementById("set-pts-loss").value),contactEmail:document.getElementById("set-email").value,emergencyContact:document.getElementById("set-phone").value}),c("Settings updated successfully","success")}),document.getElementById("btn-reset-seed").addEventListener("click",()=>{confirm("Reset data store to default initial seed? All custom additions will be restored to initial values.")&&(s.resetToDefault(),c("Data store reset to initial seed","success"),Z())})}function pe(){p("Admin Users","Authorized Administrators & Access Roles"),d.innerHTML=`
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
  `}function ve(n=null){const e=s.getTournaments(),t=s.getTeams();s.getVenues();const a=`
    <form id="form-modal-add-match">
      <div class="admin-form-grid">
        
        <div class="form-group col-span-2">
          <label class="form-label">Tournament <span class="required">*</span></label>
          <select id="mm-tourney" class="form-select" required>
            ${e.map(i=>`<option value="${i.id}" ${n===i.id?"selected":""} data-tname="${i.name}">${i.name}</option>`).join("")}
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
            ${t.map((i,l)=>`<option value="${i.name}" ${l===0?"selected":""}>${i.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Team B <span class="required">*</span></label>
          <select id="mm-teamb" class="form-select" required>
            ${t.map((i,l)=>`<option value="${i.name}" ${l===1?"selected":""}>${i.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" id="mm-date" class="form-input" value="${new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}">
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
  `;h("Add Tournament Match",a),document.getElementById("form-modal-add-match").addEventListener("submit",i=>{var C;i.preventDefault();const l=document.getElementById("mm-tourney"),v=l.value,r=((C=l.selectedOptions[0])==null?void 0:C.getAttribute("data-tname"))||"Tournament",f=document.getElementById("mm-round").value,u=document.getElementById("mm-court").value,m=document.getElementById("mm-teama").value,g=document.getElementById("mm-teamb").value,M=document.getElementById("mm-date").value,A=document.getElementById("mm-time").value,w=document.getElementById("mm-scorea").value,E=document.getElementById("mm-scoreb").value,S=document.getElementById("mm-winner").value.trim(),T=document.getElementById("mm-status").value;s.addMatch({tournamentId:v,tournamentName:r,round:f,court:u,teamA:m,teamB:g,date:M,time:A,scoreA:w!==""?Number(w):null,scoreB:E!==""?Number(E):null,winner:S,status:T,verified:T==="Completed"}),b(),c("Match saved and points table updated!","success"),$()})}function _(n){const e=s.getMatchById(n);if(!e)return;const t=`
    <form id="form-modal-edit-match">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Match</label>
          <div style="font-weight: 800; font-size: 1rem;">${e.teamA} vs ${e.teamB}</div>
          <span style="font-size: 0.78rem; color: #64748B;">${e.tournamentName} • ${e.round}</span>
        </div>

        <div class="form-group">
          <label class="form-label">Team A Score (${e.teamA})</label>
          <input type="number" id="edit-mm-scorea" class="form-input" value="${e.scoreA!==null?e.scoreA:""}" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Team B Score (${e.teamB})</label>
          <input type="number" id="edit-mm-scoreb" class="form-input" value="${e.scoreB!==null?e.scoreB:""}" min="0">
        </div>

        <div class="form-group">
          <label class="form-label">Winner</label>
          <input type="text" id="edit-mm-winner" class="form-input" value="${e.winner||""}" placeholder="Winner Team">
        </div>

        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="edit-mm-status" class="form-select">
            <option value="Completed" ${e.status==="Completed"?"selected":""}>Completed</option>
            <option value="Live" ${e.status==="Live"?"selected":""}>Live</option>
            <option value="Scheduled" ${e.status==="Scheduled"?"selected":""}>Scheduled</option>
            <option value="Cancelled" ${e.status==="Cancelled"?"selected":""}>Cancelled</option>
          </select>
        </div>
      </div>

      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Update Match</button>
      </div>
    </form>
  `;h(`Edit Match • ${e.round}`,t),document.getElementById("form-modal-edit-match").addEventListener("submit",a=>{a.preventDefault();const o=document.getElementById("edit-mm-scorea").value,i=document.getElementById("edit-mm-scoreb").value,l=document.getElementById("edit-mm-winner").value.trim(),v=document.getElementById("edit-mm-status").value;s.updateMatch(n,{scoreA:o!==""?Number(o):null,scoreB:i!==""?Number(i):null,winner:l,status:v,verified:v==="Completed"}),b(),c("Match updated successfully","success"),$()})}function V(n){const e=s.getTournamentById(n);if(!e)return;const t=`
    <form id="form-modal-edit-tourney">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Tournament Name</label>
          <input type="text" id="et-name" class="form-input" value="${e.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="text" id="et-date" class="form-input" value="${e.date}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select id="et-status" class="form-select">
            <option value="COMPLETED" ${e.status==="COMPLETED"?"selected":""}>Completed</option>
            <option value="UPCOMING" ${e.status==="UPCOMING"?"selected":""}>Upcoming</option>
            <option value="LIVE" ${e.status==="LIVE"?"selected":""}>Live</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Winner</label>
          <input type="text" id="et-winner" class="form-input" value="${e.winner||""}">
        </div>
        <div class="form-group">
          <label class="form-label">Runner-Up</label>
          <input type="text" id="et-runnerup" class="form-input" value="${e.runnerUp||""}">
        </div>
        <div class="form-group">
          <label class="form-label">MVP</label>
          <input type="text" id="et-mvp" class="form-input" value="${e.mvp||""}">
        </div>
        <div class="form-group">
          <label class="form-label">Final Score</label>
          <input type="text" id="et-score" class="form-input" value="${e.score||""}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;h(`Edit ${e.name}`,t),document.getElementById("form-modal-edit-tourney").addEventListener("submit",a=>{a.preventDefault(),s.updateTournament(n,{name:document.getElementById("et-name").value,date:document.getElementById("et-date").value,status:document.getElementById("et-status").value,winner:document.getElementById("et-winner").value,runnerUp:document.getElementById("et-runnerup").value,mvp:document.getElementById("et-mvp").value,score:document.getElementById("et-score").value}),b(),c("Tournament updated","success"),$()})}function be(){h("Add Tournament Venue",`
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
  `),document.getElementById("form-modal-venue").addEventListener("submit",e=>{e.preventDefault(),s.addVenue({name:document.getElementById("nv-name").value,address:document.getElementById("nv-address").value,courtsCount:Number(document.getElementById("nv-courts").value)||6,surface:document.getElementById("nv-surface").value,environment:document.getElementById("nv-env").value,mapUrl:document.getElementById("nv-map").value||"https://maps.google.com",city:"Ahmedabad, Gujarat"}),b(),c("Venue added successfully","success"),P()})}function ge(n){const e=s.getVenueById(n);if(!e)return;const t=`
    <form id="form-modal-edit-venue">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Venue Name</label>
          <input type="text" id="ev-name" class="form-input" value="${e.name}" required>
        </div>
        <div class="form-group col-span-2">
          <label class="form-label">Address</label>
          <input type="text" id="ev-address" class="form-input" value="${e.address}">
        </div>
        <div class="form-group">
          <label class="form-label">Number of Courts</label>
          <input type="number" id="ev-courts" class="form-input" value="${e.courtsCount||6}">
        </div>
        <div class="form-group">
          <label class="form-label">Surface</label>
          <input type="text" id="ev-surface" class="form-input" value="${e.surface}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;h(`Edit ${e.name}`,t),document.getElementById("form-modal-edit-venue").addEventListener("submit",a=>{a.preventDefault(),s.updateVenue(n,{name:document.getElementById("ev-name").value,address:document.getElementById("ev-address").value,courtsCount:Number(document.getElementById("ev-courts").value),surface:document.getElementById("ev-surface").value}),b(),c("Venue updated","success"),P()})}function he(){const n=s.getTeams(),e=s.getCategories(),t=`
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
            ${n.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Category</label>
          <select id="np-category" class="form-select">
            ${e.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
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
  `;h("Add New Player",t),document.getElementById("form-modal-player").addEventListener("submit",a=>{a.preventDefault(),s.addPlayer({name:document.getElementById("np-name").value.trim(),team:document.getElementById("np-team").value,category:document.getElementById("np-category").value,contact:document.getElementById("np-phone").value,email:document.getElementById("np-email").value}),b(),c("Player registered","success"),B()})}function ye(n){const e=s.getPlayers().find(a=>a.id===n);if(!e)return;const t=`
    <form id="form-modal-edit-player">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Player Name</label>
          <input type="text" id="ep-name" class="form-input" value="${e.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Contact</label>
          <input type="text" id="ep-phone" class="form-input" value="${e.contact||""}">
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" id="ep-email" class="form-input" value="${e.email||""}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;h(`Edit Player • ${e.name}`,t),document.getElementById("form-modal-edit-player").addEventListener("submit",a=>{a.preventDefault(),s.updatePlayer(n,{name:document.getElementById("ep-name").value.trim(),contact:document.getElementById("ep-phone").value,email:document.getElementById("ep-email").value}),b(),c("Player profile updated","success"),B()})}function fe(){const n=s.getPlayers(),e=s.getCategories(),t=`
    <form id="form-modal-team">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Partnership / Team Name <span class="required">*</span></label>
          <input type="text" id="nt-name" class="form-input" placeholder="e.g. Jay & Kushal" required>
        </div>
        <div class="form-group">
          <label class="form-label">Player 1 <span class="required">*</span></label>
          <select id="nt-p1" class="form-select" required>
            ${n.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Player 2 <span class="required">*</span></label>
          <select id="nt-p2" class="form-select" required>
            ${n.map((a,o)=>`<option value="${a.name}" ${o===1?"selected":""}>${a.name}</option>`).join("")}
          </select>
        </div>
        <div class="form-group col-span-2">
          <label class="form-label">Category</label>
          <select id="nt-category" class="form-select">
            ${e.map(a=>`<option value="${a.name}">${a.name}</option>`).join("")}
          </select>
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Register Team</button>
      </div>
    </form>
  `;h("Add Doubles Team",t),document.getElementById("form-modal-team").addEventListener("submit",a=>{a.preventDefault(),s.addTeam({name:document.getElementById("nt-name").value.trim(),player1:document.getElementById("nt-p1").value,player2:document.getElementById("nt-p2").value,category:document.getElementById("nt-category").value}),b(),c("Doubles team added","success"),R()})}function $e(n){const e=s.getTeams().find(a=>a.id===n);if(!e)return;const t=`
    <form id="form-modal-edit-team">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Team Name</label>
          <input type="text" id="et-name" class="form-input" value="${e.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Player 1</label>
          <input type="text" id="et-p1" class="form-input" value="${e.player1}">
        </div>
        <div class="form-group">
          <label class="form-label">Player 2</label>
          <input type="text" id="et-p2" class="form-input" value="${e.player2}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;h(`Edit Team • ${e.name}`,t),document.getElementById("form-modal-edit-team").addEventListener("submit",a=>{a.preventDefault(),s.updateTeam(n,{name:document.getElementById("et-name").value.trim(),player1:document.getElementById("et-p1").value.trim(),player2:document.getElementById("et-p2").value.trim()}),b(),c("Team partnership updated","success"),R()})}function we(){h("Add Tournament Category",`
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
  `),document.getElementById("form-modal-cat").addEventListener("submit",e=>{e.preventDefault(),s.addCategory({name:document.getElementById("nc-name").value.trim(),type:document.getElementById("nc-type").value,gender:document.getElementById("nc-gender").value,format:"Round Robin + Knockout"}),b(),c("Category created","success"),D()})}function Ee(n){const e=s.getCategories().find(a=>a.id===n);if(!e)return;const t=`
    <form id="form-modal-edit-cat">
      <div class="admin-form-grid">
        <div class="form-group col-span-2">
          <label class="form-label">Category Name</label>
          <input type="text" id="ec-name" class="form-input" value="${e.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <input type="text" id="ec-type" class="form-input" value="${e.type}">
        </div>
        <div class="form-group">
          <label class="form-label">Format</label>
          <input type="text" id="ec-format" class="form-input" value="${e.format}">
        </div>
      </div>
      <div class="form-actions-bar">
        <button type="button" class="btn-admin-secondary btn-modal-close">Cancel</button>
        <button type="submit" class="btn-admin-primary">Save Changes</button>
      </div>
    </form>
  `;h(`Edit Category • ${e.name}`,t),document.getElementById("form-modal-edit-cat").addEventListener("submit",a=>{a.preventDefault(),s.updateCategory(n,{name:document.getElementById("ec-name").value.trim(),type:document.getElementById("ec-type").value.trim(),format:document.getElementById("ec-format").value.trim()}),b(),c("Category updated","success"),D()})}function h(n,e){!y||!k||(k.innerHTML=`
    <div class="modal-head-bar">
      <h3 class="modal-title">${n}</h3>
      <button class="modal-close-btn" aria-label="Close dialog">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
    <div class="modal-body">
      ${e}
    </div>
  `,y.classList.add("open"),y.setAttribute("aria-hidden","false"),k.querySelectorAll(".modal-close-btn, .btn-modal-close").forEach(t=>{t.addEventListener("click",b)}))}function b(){y&&(y.classList.remove("open"),y.setAttribute("aria-hidden","true"))}function c(n,e="info"){if(!j)return;const t=document.createElement("div");t.className=`toast ${e}`,t.innerHTML=`
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${n}</span>
  `,j.appendChild(t),setTimeout(()=>{t.style.opacity="0",t.style.transform="translateY(8px)",t.style.transition="all 0.2s ease",setTimeout(()=>t.remove(),200)},3200)}function Te(){z.forEach(n=>{n.addEventListener("click",e=>{})})}function Ce(){N&&x&&N.addEventListener("click",()=>{x.classList.toggle("open")}),y&&y.addEventListener("click",n=>{n.target===y&&b()}),document.addEventListener("keydown",n=>{n.key==="Escape"&&y.classList.contains("open")&&b()})}function xe(){O&&O.addEventListener("click",()=>{confirm("Are you sure you want to log out of the admin panel?")&&(window.location.href="/")}),U&&U.addEventListener("click",()=>{c("All match records and points tables are currently verified & synced.","info")})}document.addEventListener("DOMContentLoaded",Q);(document.readyState==="complete"||document.readyState==="interactive")&&Q();
