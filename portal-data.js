/* ==============================================================
   NORTHEAST ACADEMIC & CAREER HUB - MULTI-SHEET ENGINE v4.2
   ============================================================== */

// 1. Separate Google Sheet CSV Endpoints for each section
// Publish each sheet/tab: File -> Share -> Publish to web -> CSV
const SHEETS_CONFIG = {
  careers:  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRGWGj6X65GeWTNB4DP0Yz8j0v_Zm-ZwcyvY9IjGRXH8_aXPdDUqeUgJD4ks6EFJl4Q98RQYT0JxYMB/pub?output=csv",
  ebooks:   "https://docs.google.com/spreadsheets/d/e/2PACX-1vSopclGqls2YQTFCzNjgXeSOJzaRiusJGt5Z17XtGrSMSTkQpVDZfZ6oYwL9elKmdZ8dgp8EKNAkS2f/pub?gid=0&single=true&output=csv", // Paste your E-Books Sheet CSV URL here
  pyq:      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRVyMw7MT9f1TAjERp90ROIzfFjYRyz4qHCGVk5IJiadtuBAkE63ptYkMlIdR9ecC-ib2NzaL4GRZkN/pub?gid=0&single=true&output=csv", // Paste your PYQ Sheet CSV URL here
  journals: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRKxkxXDdMAdqcpbNro5JUrPpfHmM0ab1z4qt93AUDFiy7oeO_1ip_cuQyzKcLG5sgziZFOoEg_4xpk/pub?gid=0&single=true&output=csv", // Paste your Journals Sheet CSV URL here
  results:  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSZWlu7rveeuTK-X9kWsspWYTFSaznOFPuGT9KNN6cO2B7t5RFz5fSmT8vW41lZSA06ndiMRxthxnhZ/pub?gid=0&single=true&output=csv", // Paste your Results Sheet CSV URL here
  media:    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGjXLC7R2RF8GYIguShCH8pFM7ZEoRARX659libOOkKFqEtLaBn2S5eRd73Sfzo7z4NwnR3R0FzEww/pub?gid=0&single=true&output=csv"  // Paste your Media Sheet CSV URL here
};

// URL cleaner utility
function cleanUrl(url) {
  if (!url) return "#";
  const trimmed = String(url).trim();
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  return "https://" + trimmed;
}

// 2. Base Datasets & Fallbacks (Includes 'id' for separate post viewing)
let careerData = [
  {
    id: "nml-lia-2026",
    title: "National Medical Library Recruitment 2026",
    organization: "DGHS, Ministry of Health & Family Welfare",
    category: "Library & Apprentice",
    date: "2026-09-25",
    deadline: "2026-11-09",
    link: "https://dghs.gov.in/"
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
    id: "seba-10-math",
    title: "Class 10 General Mathematics Textbook",
    organization: "SEBA Board",
    category: "SEBA Class 10",
    date: "2026",
    link: "https://site.sebaonline.org/"
  },
  {
    id: "ahsec-12-bodo",
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
    id: "hslc-socsci-pyq",
    title: "HSLC / Class 10 Social Science Previous 5 Years",
    organization: "SEBA Board Assam",
    date: "2026 Edition",
    link: "https://site.sebaonline.org/"
  },
  {
    id: "ugcnet-lis-p2",
    title: "UGC NET Library & Information Science Paper II",
    organization: "National Testing Agency",
    date: "2025 Solved",
    link: "https://ugcnet.nta.ac.in/"
  }
];

let journalsData = [
  {
    id: "cfp-gu-heritage",
    title: "Call for Papers: Northeast Indian Studies & Cultural Heritage",
    organization: "Gauhati University Press",
    indexing: "UGC-CARE Listed",
    deadline: "2026-11-15",
    link: "https://gauhati.ac.in/"
  }
];

let resultsData = [
  {
    id: "adre-results-2026",
    title: "Assam Direct Recruitment Examination (ADRE) Results",
    organization: "State Level Recruitment Commission",
    date: "Recent",
    link: "https://sebaonline.org/"
  },
  {
    id: "gu-results-portal",
    title: "Gauhati University UG/PG Semester Results Portal",
    organization: "Gauhati University",
    date: "Active",
    link: "https://guportal.in/"
  }
];

let mediaData = [
  {
    id: "dspace9-workshop",
    title: "DSpace 9 Setup & Institutional Repository Cataloguing",
    organization: "DLIS Tech Workshop",
    date: "2026",
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
   NEW BADGE EVALUATION LOGIC
   ============================================================== */
function checkIsNew(dateStr) {
  if (!dateStr) return false;
  try {
    const cleanStr = String(dateStr).trim();
    const parts = cleanStr.split('-');
    let postDate;
    if (parts[0].length === 4) {
      postDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
    } else {
      postDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    }
    const diffDays = (new Date() - postDate) / (1000 * 60 * 60 * 24);
    return diffDays >= -1 && diffDays <= 15;
  } catch (e) {
    return false;
  }
}

/* ==============================================================
   1. RENDER CAREERS (ROUTER TO POST.HTML)
   ============================================================== */
function renderCareers(items, page = pageState.career) {
  pageState.career = page;
  const container = document.getElementById("careerGrid") || document.getElementById("careersGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(c => {
    const targetUrl = c.id ? `post.html?id=${encodeURIComponent(c.id)}&type=careers` : cleanUrl(c.link);
    const isRecent = checkIsNew(c.date || c.start_date || c.deadline);
    const newBadgeHtml = isRecent 
      ? `<span class="badge-new-pulse"><span class="badge-new-dot"></span> NEW</span>` 
      : '';

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span class="badge-cat"><i class="fa-solid fa-briefcase"></i> ${c.category || "Notice"}</span>
              ${newBadgeHtml}
            </div>
            <span class="date-badge"><i class="fa-regular fa-calendar"></i> ${c.date || "Active"}</span>
          </div>

          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${c.title}</a></h3>
          <p class="card-subtext"><strong>Organization:</strong> ${c.organization || "Public Sector"}</p>
          ${c.deadline ? `<p class="card-deadline" style="color: #e11d48; font-weight: 700; margin-top: 0.4rem;"><i class="fa-regular fa-clock"></i> Deadline: <strong>${c.deadline}</strong></p>` : ''}
        </div>

        <div class="card-action-row">
          <a href="${targetUrl}" class="btn-card-primary">
            Official Notification &rarr;
          </a>
          <button class="btn-card-icon btn-icon-wa" 
                  onclick="triggerSocialShare('${encodeURIComponent(c.title \vert{}\vert{} '')}', '${encodeURIComponent(c.organization || '')}', '${encodeURIComponent(c.deadline \vert{}\vert{} c.date \vert{}\vert{} '')}', '${encodeURIComponent(targetUrl)}', 'whatsapp')" 
                  title="Share to WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
          <button class="btn-card-icon btn-icon-copy" 
                  onclick="triggerSocialShare('${encodeURIComponent(c.title \vert{}\vert{} '')}', '${encodeURIComponent(c.organization || '')}', '${encodeURIComponent(c.deadline \vert{}\vert{} c.date \vert{}\vert{} '')}', '${encodeURIComponent(targetUrl)}', 'copy')" 
                  title="Copy Link">
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

/* ==============================================================
   2. RENDER E-BOOKS (ROUTER TO POST.HTML)
   ============================================================== */
function renderEbooks(items, page = pageState.ebooks) {
  pageState.ebooks = page;
  const container = document.getElementById("ebooksGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(b => {
    const targetUrl = b.id ? `post.html?id=${encodeURIComponent(b.id)}&type=ebooks` : cleanUrl(b.link);
    const safeTitle = (b.title || "E-Book").replace(/'/g, "\\'");

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top">
            <span class="badge-cat"><i class="fa-solid fa-book-bookmark"></i> ${b.category || "Textbook"}</span>
            <span class="date-badge">${b.date || "2026"}</span>
          </div>
          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${b.title}</a></h3>
          <p class="card-subtext"><strong>Board / Publisher:</strong> ${b.organization || "Official"}</p>
        </div>
        <div class="card-action-bar" style="margin-top: 1rem;">
          <a href="${targetUrl}" class="btn-card-primary" style="display: block; text-align: center;">
            <i class="fa-solid fa-book-open"></i> View Details & Download &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  renderPaginationControls(items.length, page, "ebooksPagination", "changeEbooksPage");
}

function changeEbooksPage(p) {
  renderEbooks(ebooksData, p);
  document.getElementById("section-ebooks")?.scrollIntoView({ behavior: 'smooth' });
}

/* ==============================================================
   3. RENDER PYQ (ROUTER TO POST.HTML)
   ============================================================== */
function renderPYQ(items, page = pageState.pyq) {
  pageState.pyq = page;
  const container = document.getElementById("pyqGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(p => {
    const targetUrl = p.id ? `post.html?id=${encodeURIComponent(p.id)}&type=pyq` : cleanUrl(p.link);

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top">
            <span class="badge-cat"><i class="fa-solid fa-file-pdf"></i> Question Paper</span>
            <span class="date-badge">${p.date || "Latest"}</span>
          </div>
          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${p.title}</a></h3>
          <p class="card-subtext"><strong>Source:</strong> ${p.organization || "Education Board"}</p>
        </div>
        <div class="card-action-bar" style="margin-top: 1rem;">
          <a href="${targetUrl}" class="btn-card-primary" style="display: block; text-align: center;">
            <i class="fa-solid fa-file-lines"></i> View Paper & Solutions &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  renderPaginationControls(items.length, page, "pyqPagination", "changePYQPage");
}

function changePYQPage(p) {
  renderPYQ(pyqData, p);
  document.getElementById("section-pyq")?.scrollIntoView({ behavior: 'smooth' });
}

/* ==============================================================
   4. RENDER JOURNALS (ROUTER TO POST.HTML)
   ============================================================== */
function renderJournals(items, page = pageState.journals) {
  pageState.journals = page;
  const container = document.getElementById("journalsGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(jn => {
    const targetUrl = jn.id ? `post.html?id=${encodeURIComponent(jn.id)}&type=journals` : cleanUrl(jn.link);

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top">
            <span class="badge-cat" style="background:#ecfdf5;color:#059669;"><i class="fa-solid fa-award"></i> ${jn.indexing || "UGC-CARE Listed"}</span>
            <span class="date-badge">CFP</span>
          </div>
          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${jn.title}</a></h3>
          <p class="card-subtext"><strong>Publisher:</strong> ${jn.organization || "University / Journal"}</p>
          <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Submit By:</strong> ${jn.deadline || "Open"}</p>
        </div>
        <div class="card-action-bar" style="margin-top: 1rem;">
          <a href="${targetUrl}" class="btn-card-primary" style="display: block; text-align: center;">
            Call for Papers & Guidelines &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  renderPaginationControls(items.length, page, "journalsPagination", "changeJournalsPage");
}

function changeJournalsPage(p) {
  renderJournals(journalsData, p);
  document.getElementById("section-journals")?.scrollIntoView({ behavior: 'smooth' });
}

/* ==============================================================
   5. RENDER RESULTS (ROUTER TO POST.HTML)
   ============================================================== */
function renderResults(items, page = pageState.results) {
  pageState.results = page;
  const container = document.getElementById("resultsGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(r => {
    const targetUrl = r.id ? `post.html?id=${encodeURIComponent(r.id)}&type=results` : cleanUrl(r.link);

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top">
            <span class="badge-cat"><i class="fa-solid fa-square-poll-vertical"></i> Portal Gateway</span>
          </div>
          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${r.title}</a></h3>
          <p class="card-subtext"><strong>Authority:</strong> ${r.organization || "Official Board"}</p>
        </div>
        <div class="card-action-bar" style="margin-top: 1rem;">
          <a href="${targetUrl}" class="btn-card-primary" style="display: block; text-align: center;">
            Check Result & Merit List &rarr;
          </a>
        </div>
      </div>
    `;
  }).join("");

  renderPaginationControls(items.length, page, "resultsPagination", "changeResultsPage");
}

function changeResultsPage(p) {
  renderResults(resultsData, p);
  document.getElementById("section-results")?.scrollIntoView({ behavior: 'smooth' });
}

/* ==============================================================
   6. RENDER MEDIA (ROUTER TO POST.HTML)
   ============================================================== */
function renderMedia(items, page = pageState.media) {
  pageState.media = page;
  const container = document.getElementById("mediaGrid");
  if (!container) return;

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = pageItems.map(m => {
    const targetUrl = m.id ? `post.html?id=${encodeURIComponent(m.id)}&type=media` : cleanUrl(m.link);

    return `
      <div class="portal-card">
        <div>
          <div class="card-meta-top">
            <span class="badge-cat"><i class="fa-brands fa-youtube"></i> Video Class</span>
          </div>
          <h3><a href="${targetUrl}" style="text-decoration: none; color: inherit;">${m.title}</a></h3>
          <p class="card-subtext"><strong>Instructor / Channel:</strong> ${m.organization || "Education Stream"}</p>
        </div>
        <div class="card-action-bar" style="margin-top:
