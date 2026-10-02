/* ==============================================================
   NORTHEAST ACADEMIC & CAREER HUB - UNIFIED ENGINE
   ============================================================== */

// 1. Google Sheets CSV Endpoint
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0y4e3_-teBXQcNZXKbXNca_bzYGi5wF-klG2pJnkHIKOA5TizIZjSRvqhd5ewrCk8wb6EH9xUGESy/pub?gid=0&single=true&output=csv";

// 2. Base Fallback Datasets (Ensures portal is never empty)
let careerData = [
  {
    title: "Library Apprenticeship / Trainee 2026",
    organization: "Krishna Kanta Handiqui Library (GU)",
    category: "Library & Apprentice",
    date: "2026-10-01",
    deadline: "2026-10-31",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    title: "Combined Competitive Exam (CCE)",
    organization: "Assam Public Service Commission (APSC)",
    category: "State Govt",
    date: "2026-09-28",
    deadline: "2026-10-31",
    link: "https://apsc.nic.in/"
  }
];

let ebooksData = [
  {
    title: "Class 10 General Mathematics Textbook",
    organization: "SEBA Board",
    category: "SEBA Class 10",
    date: "2026",
    link: "https://site.sebaonline.org/"
  },
  {
    title: "Class 12 Modern Indian Language (Bodo)",
    organization: "AHSEC Council",
    category: "AHSEC Class 12",
    date: "2026",
    link: "https://ahsec.assam.gov.in/"
  },
  {
    title: "Digital Archiving & Metadata Systems (DSpace 9 / Dublin Core)",
    organization: "Guwahati Open Repository",
    category: "Higher Ed",
    date: "2026",
    link: "https://dspace.org/"
  }
];

let pyqData = [
  {
    title: "HSLC / Class 10 Social Science Previous 5 Years",
    organization: "SEBA Board Assam",
    date: "2026 Edition",
    link: "https://site.sebaonline.org/"
  },
  {
    title: "UGC NET Library & Information Science Paper II",
    organization: "National Testing Agency",
    date: "2025 Solved",
    link: "https://ugcnet.nta.ac.in/"
  }
];

let journalsData = [
  {
    title: "Call for Papers: Northeast Indian Studies & Cultural Heritage",
    organization: "Gauhati University Press",
    indexing: "UGC-CARE Listed",
    deadline: "2026-11-15",
    link: "https://gauhati.ac.in/"
  }
];

let resultsData = [
  {
    title: "Assam Direct Recruitment Examination (ADRE) Results",
    organization: "State Level Recruitment Commission",
    link: "https://sebaonline.org/"
  },
  {
    title: "Gauhati University UG/PG Semester Results Portal",
    organization: "Gauhati University",
    link: "https://guportal.in/"
  }
];

let mediaData = [
  {
    title: "DSpace 9 Setup & Institutional Repository Cataloguing",
    organization: "DLIS Tech Workshop",
    videoId: "dQw4w9WgXcQ"
  }
];

/* ==============================================================
   RENDER FUNCTIONS
   ============================================================== */

function renderCareers(items) {
  const container = document.getElementById("careerGrid");
  if (!container) return;

  container.innerHTML = items.map(j => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-briefcase"></i> ${j.category || "General"}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar-check"></i> ${j.date || "Recent"}</span>
      </div>
      <h3>${j.title}</h3>
      <p class="card-subtext"><strong>Organization:</strong> ${j.organization || "Govt Org"}</p>
      <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Deadline:</strong> ${j.deadline || "Open"}</p>
      <div class="card-action-bar">
        <a href="${j.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Official Notification &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderEbooks(items) {
  const container = document.getElementById("ebooksGrid");
  if (!container) return;

  container.innerHTML = items.map(b => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-book-bookmark"></i> ${b.category || "Textbook"}</span>
        <span class="date-badge">${b.date || "2026"}</span>
      </div>
      <h3>${b.title}</h3>
      <p class="card-subtext"><strong>Board / Publisher:</strong> ${b.organization || "Official"}</p>
      <div class="card-action-bar">
        <a href="${b.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Open Resource &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderPYQ(items) {
  const container = document.getElementById("pyqGrid");
  if (!container) return;

  container.innerHTML = items.map(p => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-file-pdf"></i> Question Paper</span>
        <span class="date-badge">${p.date}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="card-subtext"><strong>Source:</strong> ${p.organization}</p>
      <div class="card-action-bar">
        <a href="${p.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Download Paper &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderJournals(items) {
  const container = document.getElementById("journalsGrid");
  if (!container) return;

  container.innerHTML = items.map(jn => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat" style="background:#ecfdf5;color:#059669;"><i class="fa-solid fa-award"></i> ${jn.indexing || "Indexed"}</span>
        <span class="date-badge">CFP</span>
      </div>
      <h3>${jn.title}</h3>
      <p class="card-subtext"><strong>Publisher:</strong> ${jn.organization}</p>
      <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Submit By:</strong> ${jn.deadline || "Open"}</p>
      <div class="card-action-bar">
        <a href="${jn.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Submission Guidelines &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderResults(items) {
  const container = document.getElementById("resultsGrid");
  if (!container) return;

  container.innerHTML = items.map(r => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-square-poll-vertical"></i> Portal Gateway</span>
      </div>
      <h3>${r.title}</h3>
      <p class="card-subtext"><strong>Authority:</strong> ${r.organization}</p>
      <div class="card-action-bar">
        <a href="${r.link || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Check Result Now &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderMedia(items) {
  const container = document.getElementById("mediaGrid");
  if (!container) return;

  container.innerHTML = items.map(m => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-brands fa-youtube"></i> Lecture Video</span>
      </div>
      <h3>${m.title}</h3>
      <p class="card-subtext"><strong>Instructor / Channel:</strong> ${m.organization}</p>
      <div class="card-action-bar">
        <a href="https://www.youtube.com/watch?v=${m.videoId}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Watch Lecture &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderTicker(items) {
  const track = document.getElementById("tickerTrack");
  if (!track) return;

  const content = items.map(item => `
    <span class="ticker-node">
      <span class="pill-new">NEW</span>
      <a href="${item.link || '#'}" class="ticker-anchor" target="_blank">${item.title}</a>
      <span class="ticker-date">(${item.date || 'Active'})</span>
    </span>
  `).join(" • ");

  track.innerHTML = content + " • " + content; // Duplicate for smooth looping
}

/* ==============================================================
   FILTERS & INTERACTIONS
   ============================================================== */

function filterCareer(category) {
  document.querySelectorAll('#section-career .pill-filter').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === category.toLowerCase());
  });

  if (category === 'All') {
    renderCareers(careerData);
  } else {
    renderCareers(careerData.filter(item => (item.category || '').toLowerCase() === category.toLowerCase()));
  }
}

function filterEbooks(category) {
  document.querySelectorAll('#section-ebooks .pill-filter').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === category.toLowerCase());
  });

  if (category === 'All') {
    renderEbooks(ebooksData);
  } else {
    renderEbooks(ebooksData.filter(item => (item.category || '').toLowerCase() === category.toLowerCase()));
  }
}

function executeGlobalSearch() {
  const q = (document.getElementById("masterSearch")?.value || "").toLowerCase().trim();
  
  if (!q) {
    renderCareers(careerData);
    renderEbooks(ebooksData);
    return;
  }

  const match = obj => Object.values(obj).some(val => String(val).toLowerCase().includes(q));
  renderCareers(careerData.filter(match));
  renderEbooks(ebooksData.filter(match));
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

/* ==============================================================
   LIVE GOOGLE SHEET FETCHER & CSV SYNC
   ============================================================== */

async function syncGoogleSheet() {
  if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL.includes("YOUR_GOOGLE_SHEET")) return;

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!res.ok) return;

    const text = await res.text();
    const rows = text.trim().split(/\r?\n/).filter(r => r.trim().length > 0);
    if (rows.length <= 1) return;

    // Parse header row
    const headers = rows[0].split(',').map(h => h.replace(/^["\s]+|["\s]+$/g, '').toLowerCase());

    const parsed = rows.slice(1).map(row => {
      // Split preserving values
      const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = cols[i] ? cols[i].replace(/^["\s]+|["\s]+$/g, '') : "";
      });
      return obj;
    });

    // Categorize entries by 'type'
    const liveJobs = parsed.filter(d => (d.type || "").toLowerCase() === "job");
    const liveEbooks = parsed.filter(d => (d.type || "").toLowerCase() === "ebook");
    const livePYQs = parsed.filter(d => (d.type || "").toLowerCase() === "pyq");

    if (liveJobs.length > 0) {
      careerData = liveJobs.map(j => ({
        title: j.title || j.tittle || "Recruitment Post",
        organization: j.organization || "Govt Department",
        category: j.category || "General",
        date: j.date || "Recent",
        deadline: j.deadline || "Open",
        link: j.link || "#"
      }));
      renderCareers(careerData);
      renderTicker(careerData);
    }

    if (liveEbooks.length > 0) {
      ebooksData = liveEbooks.map(b => ({
        title: b.title || b.tittle || "E-Book",
        organization: b.organization || "Academic Repository",
        category: b.category || "General",
        date: b.date || "2026",
        link: b.link || "#"
      }));
      renderEbooks(ebooksData);
    }

    if (livePYQs.length > 0) {
      pyqData = livePYQs.map(p => ({
        title: p.title || p.tittle || "Question Paper",
        organization: p.organization || "Education Board",
        date: p.date || "Latest",
        link: p.link || "#"
      }));
      renderPYQ(pyqData);
    }
  } catch (err) {
    console.warn("Using fallback datasets. Google Sheet fetch warning:", err);
  }
}

/* ==============================================================
   INITIALIZATION
   ============================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Theme check
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  // Render initial data immediately
  renderCareers(careerData);
  renderEbooks(ebooksData);
  renderPYQ(pyqData);
  renderJournals(journalsData);
  renderResults(resultsData);
  renderMedia(mediaData);
  renderTicker(careerData);

  // Sync latest from Google Sheets
  syncGoogleSheet();
});
