/* ==============================================================
   NORTHEAST ACADEMIC & CAREER HUB - MULTI-SHEET ENGINE
   ============================================================== */

// 1. Separate Google Sheet CSV Endpoints for each section
// Publish each sheet/tab: File -> Share -> Publish to web -> CSV
const SHEETS_CONFIG = {
  careers: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGWGj6X65GeWTNB4DP0Yz8j0v_Zm-ZwcyvY9IjGRXH8_aXPdDUqeUgJD4ks6EFJl4Q98RQYT0JxYMB/pub?output=csv",
  ebooks:  "", // Paste your E-Books Sheet CSV URL here (or leave empty to use fallback)
  pyq:     "", // Paste your PYQ Sheet CSV URL here
  journals:"", // Paste your Journals Sheet CSV URL here
  results: "", // Paste your Results Sheet CSV URL here
  media:   ""  // Paste your Media Sheet CSV URL here
};

// URL cleaner utility
function cleanUrl(url) {
  if (!url) return "#";
  const trimmed = url.trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return "https://" + trimmed;
}

// 2. Base Fallback Datasets (used when a sheet URL is empty or fails)
let careerData = [
  {
    id: "nml-lia-2026",
    title: "Library Trainee & Apprenticeship Program",
    organization: "Gauhati University / KKHL",
    category: "Library & Apprentice",
    date: "2026-10-01",
    deadline: "2026-10-31",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    id: "apsc-cce-2026",
    title: "Combined Competitive Examination Updates",
    organization: "Assam Public Service Commission",
    category: "State Govt",
    date: "2026-09-20",
    deadline: "2026-10-25",
    link: "https://apsc.nic.in/"
  },
  {
    id: "iitg-staff-2026",
    title: "Project & Non-Faculty Staff Recruitment",
    organization: "IIT Guwahati",
    category: "Central Govt",
    date: "2026-09-28",
    deadline: "2026-10-20",
    link: "https://iitg.ac.in/"
  }
];

let ebooksData = [
  {
    id: "seba-10",
    title: "Class 10 General Mathematics Textbook",
    organization: "SEBA Board",
    category: "SEBA Class 10",
    date: "2026",
    link: "https://site.sebaonline.org/"
  },
  {
    id: "ahsec-12",
    title: "Class 12 Modern Indian Language (Bodo)",
    organization: "AHSEC Council",
    category: "AHSEC Class 12",
    date: "2026",
    link: "https://ahsec.assam.gov.in/"
  },
  {
    id: "dspace-docs",
    title: "Digital Archiving & Metadata Systems (DSpace 9 / Dublin Core)",
    organization: "Guwahati Open Repository",
    category: "Higher Ed",
    date: "2026",
    link: "https://dspace.lyrasis.org/"
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
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

/* ==============================================================
   PAGINATION STATE & CONTROLS (6 POSTS PER SECTION)
   ============================================================== */

const ITEMS_PER_PAGE = 6;
const pageState = { career: 1, ebooks: 1, pyq: 1, journals: 1, results: 1, media: 1 };

function renderPaginationControls(totalItems, currentPage, containerId, onPageChangeCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = `
    <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeCallback}(${currentPage - 1})">
      &laquo; Prev
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="${onPageChangeCallback}(${i})">
        ${i}
      </button>
    `;
  }

  html += `
    <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeCallback}(${currentPage + 1})">
      Next &raquo;
    </button>
  `;

  container.innerHTML = html;
}

/* ==============================================================
   RENDER FUNCTIONS (6 POSTS PER PAGE)
   ============================================================== */

function renderCareers(items, page = pageState.career) {
  pageState.career = page;
  const container = document.getElementById("careerGrid") || document.getElementById("careersGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(c => {
    // If post has an ID, send them to your detailed post.html; otherwise fallback to external link
    const targetUrl = c.id ? `post.html?id=${encodeURIComponent(c.id)}` : cleanUrl(c.link);

    return `
      <div class="portal-card">
        <div class="card-meta-top">
          <span class="badge-cat"><i class="fa-solid fa-briefcase"></i> ${c.category || "Notice"}</span>
          <span class="date-badge">${c.date || "Active"}</span>
        </div>
        <h3>${c.title}</h3>
        <p class="card-subtext"><strong>Organization:</strong> ${c.organization || "Public Sector"}</p>
        ${c.deadline ? `<p class="card-deadline" style="color: #e11d48; margin-top: 0.4rem;"><i class="fa-regular fa-clock"></i> Deadline: <strong>${c.deadline}</strong></p>` : ''}
        
        <div class="card-action-bar" style="display: flex; gap: 0.5rem; align-items: center; margin-top: 1rem;">
          <a href="${targetUrl}" class="btn-card-primary" style="flex: 1; text-align: center; text-decoration: none;">
            Official Notification &rarr;
          </a>
          <button onclick="shareCardToSocial('${c.title.replace(/'/g, "\\'")}', '${(c.organization || '').replace(/'/g, "\\'")}', '${c.deadline || c.date}', '${targetUrl}', 'whatsapp')" 
                  title="Share to WhatsApp" 
                  style="background: #25D366; color: white; border: none; border-radius: 6px; padding: 0.65rem 0.85rem; cursor: pointer;">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
          <button onclick="shareCardToSocial('${c.title.replace(/'/g, "\\'")}', '${(c.organization || '').replace(/'/g, "\\'")}', '${c.deadline || c.date}', '${targetUrl}', 'copy')" 
                  title="Copy formatted post" 
                  style="background: #e2e8f0; color: #334155; border: none; border-radius: 6px; padding: 0.65rem 0.85rem; cursor: pointer;">
            <i class="fa-regular fa-copy"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");

  renderPaginationControls(items.length, page, "careerPagination", "changeCareerPage");
}

function changeCareerPage(p) {
  renderCareers(careerData, p);
  document.getElementById("section-career")?.scrollIntoView({ behavior: 'smooth' });
}

function renderEbooks(items, page = pageState.ebooks) {
  pageState.ebooks = page;
  const container = document.getElementById("ebooksGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(b => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-book-bookmark"></i> ${b.category || "Textbook"}</span>
        <span class="date-badge">${b.date || "2026"}</span>
      </div>
      <h3>${b.title}</h3>
      <p class="card-subtext"><strong>Board / Publisher:</strong> ${b.organization || "Official"}</p>
      <div class="card-action-bar">
        <button onclick="openViewerModal('${b.title.replace(/'/g, "\\'")}', '${b.link}')" class="btn-card-primary" style="cursor: pointer; width: 100%; text-align: center;">
          <i class="fa-regular fa-eye"></i> Open Resource &rarr;
        </button>
      </div>
    </div>
  `).join("");

  renderPaginationControls(items.length, page, "ebooksPagination", "changeEbooksPage");
}

function changeEbooksPage(p) {
  renderEbooks(ebooksData, p);
  document.getElementById("section-ebooks")?.scrollIntoView({ behavior: 'smooth' });
}

function renderPYQ(items, page = pageState.pyq) {
  pageState.pyq = page;
  const container = document.getElementById("pyqGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(p => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-file-pdf"></i> Question Paper</span>
        <span class="date-badge">${p.date || "Latest"}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="card-subtext"><strong>Source:</strong> ${p.organization || "Education Board"}</p>
      <div class="card-action-bar">
        <button onclick="openViewerModal('${p.title.replace(/'/g, "\\'")}', '${p.link}')" class="btn-card-primary" style="cursor: pointer; width: 100%; text-align: center;">
          <i class="fa-regular fa-eye"></i> View Paper &rarr;
        </button>
      </div>
    </div>
  `).join("");

  renderPaginationControls(items.length, page, "pyqPagination", "changePYQPage");
}

function changePYQPage(p) {
  renderPYQ(pyqData, p);
  document.getElementById("section-pyq")?.scrollIntoView({ behavior: 'smooth' });
}

function renderJournals(items, page = pageState.journals) {
  pageState.journals = page;
  const container = document.getElementById("journalsGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(jn => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat" style="background:#ecfdf5;color:#059669;"><i class="fa-solid fa-award"></i> ${jn.indexing || "UGC-CARE Listed"}</span>
        <span class="date-badge">CFP</span>
      </div>
      <h3>${jn.title}</h3>
      <p class="card-subtext"><strong>Publisher:</strong> ${jn.organization || "University / Journal"}</p>
      <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Submit By:</strong> ${jn.deadline || "Open"}</p>
      <div class="card-action-bar">
        <a href="${cleanUrl(jn.link)}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Submission Guidelines &rarr;</a>
      </div>
    </div>
  `).join("");

  renderPaginationControls(items.length, page, "journalsPagination", "changeJournalsPage");
}

function changeJournalsPage(p) {
  renderJournals(journalsData, p);
  document.getElementById("section-journals")?.scrollIntoView({ behavior: 'smooth' });
}

function renderResults(items, page = pageState.results) {
  pageState.results = page;
  const container = document.getElementById("resultsGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(r => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-square-poll-vertical"></i> Portal Gateway</span>
      </div>
      <h3>${r.title}</h3>
      <p class="card-subtext"><strong>Authority:</strong> ${r.organization || "Official Board"}</p>
      <div class="card-action-bar">
        <a href="${cleanUrl(r.link)}" target="_blank" rel="noopener noreferrer" class="btn-card-primary">Check Result Now &rarr;</a>
      </div>
    </div>
  `).join("");

  renderPaginationControls(items.length, page, "resultsPagination", "changeResultsPage");
}

function changeResultsPage(p) {
  renderResults(resultsData, p);
  document.getElementById("section-results")?.scrollIntoView({ behavior: 'smooth' });
}

function renderMedia(items, page = pageState.media) {
  pageState.media = page;
  const container = document.getElementById("mediaGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(m => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-brands fa-youtube"></i> Lecture Video</span>
      </div>
      <h3>${m.title}</h3>
      <p class="card-subtext"><strong>Instructor / Channel:</strong> ${m.organization || "Education Stream"}</p>
      <div class="card-action-bar">
        <button onclick="openViewerModal('${m.title.replace(/'/g, "\\'")}', '${m.link}')" class="btn-card-primary" style="cursor: pointer; width: 100%; text-align: center;">
          <i class="fa-solid fa-play"></i> Watch Lecture &rarr;
        </button>
      </div>
    </div>
  `).join("");

  renderPaginationControls(items.length, page, "mediaPagination", "changeMediaPage");
}

function changeMediaPage(p) {
  renderMedia(mediaData, p);
  document.getElementById("section-media")?.scrollIntoView({ behavior: 'smooth' });
}

function renderTicker(items) {
  const track = document.getElementById("tickerTrack");
  if (!track || !items || items.length === 0) return;

  const content = items.map(item => `
    <span class="ticker-node">
      <span class="pill-new">NEW</span>
      <a href="${item.id ? `post.html?id=${item.id}` : cleanUrl(item.link)}" class="ticker-anchor">${item.title}</a>
      <span class="ticker-date">(${item.date || 'Active'})</span>
    </span>
  `).join(" • ");

  track.innerHTML = content + " • " + content;
}

/* ==============================================================
   FILTERS & INTERACTIONS
   ============================================================== */

function filterCareer(category) {
  document.querySelectorAll('#section-career .pill-filter').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === category.toLowerCase());
  });

  if (category === 'All') {
    renderCareers(careerData, 1);
  } else {
    renderCareers(careerData.filter(item => (item.category || '').toLowerCase() === category.toLowerCase()), 1);
  }
}

function filterEbooks(category) {
  document.querySelectorAll('#section-ebooks .pill-filter').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === category.toLowerCase());
  });

  if (category === 'All') {
    renderEbooks(ebooksData, 1);
  } else {
    renderEbooks(ebooksData.filter(item => (item.category || '').toLowerCase() === category.toLowerCase()), 1);
  }
}

function executeGlobalSearch() {
  const q = (document.getElementById("masterSearch")?.value || "").toLowerCase().trim();
  
  if (!q) {
    renderCareers(careerData, 1);
    renderEbooks(ebooksData, 1);
    renderPYQ(pyqData, 1);
    renderJournals(journalsData, 1);
    renderResults(resultsData, 1);
    renderMedia(mediaData, 1);
    return;
  }

  const match = obj => Object.values(obj).some(val => String(val).toLowerCase().includes(q));
  renderCareers(careerData.filter(match), 1);
  renderEbooks(ebooksData.filter(match), 1);
  renderPYQ(pyqData.filter(match), 1);
  renderJournals(journalsData.filter(match), 1);
  renderResults(resultsData.filter(match), 1);
  renderMedia(mediaData.filter(match), 1);
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
   GENERIC CSV FETCHER HELPER
   ============================================================== */

async function fetchCSV(url) {
  if (!url || !url.startsWith("http")) return null;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = text.trim().split(/\r?\n/).filter(r => r.trim().length > 0);
    if (rows.length <= 1) return null;

    const headers = rows[0].split(',').map(h => h.replace(/^["\s]+|["\s]+$/g, '').toLowerCase());

    return rows.slice(1).map(row => {
      const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      let obj = {};
      headers.forEach((h, i) => {
        obj[h] = cols[i] ? cols[i].replace(/^["\s]+|["\s]+$/g, '') : "";
      });
      return obj;
    });
  } catch (e) {
    console.warn("CSV Fetch error for:", url, e);
    return null;
  }
}

/* ==============================================================
   MULTI-SHEET SYNC LOGIC
   ============================================================== */

async function syncAllSheets() {
  // 1. Sync Careers Sheet
  const careersParsed = await fetchCSV(SHEETS_CONFIG.careers);
  if (careersParsed && careersParsed.length > 0) {
    careerData = careersParsed.map(j => ({
      id: j.id || "",
      title: j.title || j.tittle || "Recruitment Post",
      organization: j.organization || "Govt Department",
      category: j.category || "General",
      date: j.start_date || j.date || "Recent",
      deadline: j.last_date || j.deadline || "Open",
      link: j.official_site || j.notification_link || j.link || "#"
    }));
    renderCareers(careerData, 1);
    renderTicker(careerData);
  }

  // 2. Sync E-Books Sheet (if provided)
  const ebooksParsed = await fetchCSV(SHEETS_CONFIG.ebooks);
  if (ebooksParsed && ebooksParsed.length > 0) {
    ebooksData = ebooksParsed.map(b => ({
      id: b.id || "",
      title: b.title || "E-Book Resource",
      organization: b.organization || "Academic Board",
      category: b.category || "General",
      date: b.date || "2026",
      link: b.link || "#"
    }));
    renderEbooks(ebooksData, 1);
  }

  // 3. Sync PYQ Sheet (if provided)
  const pyqParsed = await fetchCSV(SHEETS_CONFIG.pyq);
  if (pyqParsed && pyqParsed.length > 0) {
    pyqData = pyqParsed.map(p => ({
      title: p.title || "Question Paper",
      organization: p.organization || "Education Board",
      date: p.date || "Latest",
      link: p.link || "#"
    }));
    renderPYQ(pyqData, 1);
  }

  // 4. Sync Journals Sheet (if provided)
  const journalsParsed = await fetchCSV(SHEETS_CONFIG.journals);
  if (journalsParsed && journalsParsed.length > 0) {
    journalsData = journalsParsed.map(jn => ({
      title: jn.title || "Call for Papers",
      organization: jn.organization || "University / Journal",
      indexing: jn.category || "UGC-CARE Listed",
      deadline: jn.deadline || "Open",
      link: jn.link || "#"
    }));
    renderJournals(journalsData, 1);
  }

  // 5. Sync Results Sheet (if provided)
  const resultsParsed = await fetchCSV(SHEETS_CONFIG.results);
  if (resultsParsed && resultsParsed.length > 0) {
    resultsData = resultsParsed.map(r => ({
      title: r.title || "Official Notice",
      organization: r.organization || "Examination Authority",
      link: r.link || "#"
    }));
    renderResults(resultsData, 1);
  }

  // 6. Sync Media Sheet (if provided)
  const mediaParsed = await fetchCSV(SHEETS_CONFIG.media);
  if (mediaParsed && mediaParsed.length > 0) {
    mediaData = mediaParsed.map(m => ({
      title: m.title || "Educational Lecture",
      organization: m.organization || "DLIS Tech Workshop",
      link: m.link || "https://youtube.com"
    }));
    renderMedia(mediaData, 1);
  }
}

/* ==============================================================
   IN-SITE VIEWER MODAL
   ============================================================== */

let currentActiveResourceUrl = "";

function openViewerModal(title, url) {
  const modal = document.getElementById("portalModal");
  const heading = document.getElementById("modalHeading");
  const container = document.getElementById("modalFrameContainer");
  if (!modal || !container) return;

  currentActiveResourceUrl = cleanUrl(url);
  heading.innerHTML = `<i class="fa-solid fa-file-lines"></i> ${title}`;

  let embedUrl = currentActiveResourceUrl;
  if (embedUrl.includes("drive.google.com/file/d/")) {
    embedUrl = embedUrl.replace(/\/view(\?.*)?$/, "/preview");
  } else if (embedUrl.includes("youtube.com/watch?v=")) {
    const videoId = embedUrl.split("v=")[1]?.split("&")[0];
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  } else if (embedUrl.includes("youtu.be/")) {
    const videoId = embedUrl.split("youtu.be/")[1]?.split("?")[0];
    embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
  } else if (embedUrl.toLowerCase().endsWith(".pdf")) {
    embedUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(embedUrl)}`;
  }

  container.innerHTML = `
    <div style="position: relative; width: 100%; height: 100%; min-height: 520px; display: flex; flex-direction: column;">
      <iframe src="${embedUrl}" style="width: 100%; height: 100%; flex: 1; border: none; border-radius: 0 0 10px 10px;" allowfullscreen></iframe>
      <div style="padding: 0.6rem 1rem; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem;">
        <span style="color: #64748b;">Having trouble viewing in frame?</span>
        <a href="${currentActiveResourceUrl}" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 600; text-decoration: none;">
          Open in New Tab <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closePortalModal() {
  const modal = document.getElementById("portalModal");
  const container = document.getElementById("modalFrameContainer");
  if (modal) modal.style.display = "none";
  if (container) container.innerHTML = "";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", (e) => {
  const modal = document.getElementById("portalModal");
  if (e.target === modal) closePortalModal();
});

/* ==============================================================
   SOCIAL SHARE
   ============================================================== */

function shareCardToSocial(title, org, date, link, platform) {
  const shareText = 
`📢 *NE Academic Hub Update*

📌 *${title}*
🏢 Organization: ${org || "Public Authority"}
📅 Date/Deadline: ${date || "Check Details"}

🔗 Read Details & Apply:
${link.startsWith("http") ? link : window.location.origin + window.location.pathname.replace('index.html', '') + link}`;

  const encodedMsg = encodeURIComponent(shareText);

  if (platform === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${encodedMsg}`, '_blank');
  } else if (platform === 'telegram') {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodedMsg}`, '_blank');
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Formatted update copied to clipboard!");
    });
  }
}

/* ==============================================================
   INIT
   ============================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('themeIcon');
    if (icon) icon.className = 'fa-solid fa-sun';
  }

  // Render initial fallback cards immediately
  renderCareers(careerData, 1);
  renderEbooks(ebooksData, 1);
  renderPYQ(pyqData, 1);
  renderJournals(journalsData, 1);
  renderResults(resultsData, 1);
  renderMedia(mediaData, 1);
  renderTicker(careerData);

  // Sync with live Google Sheets
  syncAllSheets();
});
