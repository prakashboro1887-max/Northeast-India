// Replace with your published Google Sheet CSV link
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0y4e3_-teBXQcNZXKbXNca_bzYGi5wF-klG2pJnkHIKOA5TizIZjSRvqhd5ewrCk8wb6EH9xUGESy/pub?gid=0&single=true&output=csv";

// Fetch and Parse Google Sheet Data Automatically
async function fetchSheetData() {
  if (GOOGLE_SHEET_CSV_URL === "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0y4e3_-teBXQcNZXKbXNca_bzYGi5wF-klG2pJnkHIKOA5TizIZjSRvqhd5ewrCk8wb6EH9xUGESy/pub?gid=0&single=true&output=csv") return;

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const csvText = await response.text();
    
    // Parse CSV rows into objects
    const rows = csvText.split("\n").map(r => r.split(","));
    const headers = rows[0].map(h => h.trim().toLowerCase());

    const liveData = rows.slice(1).map(row => {
      let obj = {};
      headers.forEach((h, index) => {
        obj[h] = row[index] ? row[index].trim().replace(/^"|"$/g, '') : "";
      });
      return obj;
    });

    // Populate data by type
    const liveJobs = liveData.filter(d => d.type === "job");
    const liveEbooks = liveData.filter(d => d.type === "ebook");

    if (liveJobs.length > 0) {
      renderCareers(liveJobs.map(j => ({
        title: j.title,
        department: j.organization,
        category: j.category || "General",
        published: j.date || "Recent",
        lastDate: j.deadline || "Open",
        link: j.link
      })));
    }

    if (liveEbooks.length > 0) {
      renderEbooks(liveEbooks.map(b => ({
        title: b.title,
        subject: b.organization,
        category: b.category,
        published: b.date || "2026",
        source: "Govt Open Repository",
        docUrl: b.link
      })));
    }
  } catch (error) {
    console.warn("Could not fetch Google Sheet data, showing default records.", error);
  }
}

// Call on startup
document.addEventListener("DOMContentLoaded", () => {
  fetchSheetData();
});
/* ==============================================================
   ALL-GRID RENDER ENGINES (TITLE, DATES, CATEGORIES IN CARDS)
   ============================================================== */

// 1. Career Grid
function renderCareers(list) {
  const grid = document.getElementById("careerGrid");
  grid.innerHTML = list.map(item => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-briefcase"></i> ${item.category}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar-check"></i> ${item.published}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="card-subtext"><strong>Organization:</strong> ${item.department}</p>
      <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Deadline:</strong> ${item.lastDate}</p>
      <div class="card-action-bar">
        <a href="${item.link}" target="_blank" class="btn-card-primary">Official Notification &rarr;</a>
      </div>
    </div>
  `).join("");
}

// 2. E-Books Grid
function renderEbooks(list) {
  const grid = document.getElementById("ebooksGrid");
  grid.innerHTML = list.map(b => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-book"></i> ${b.category}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar"></i> ${b.published}</span>
      </div>
      <h3>${b.title}</h3>
      <p class="card-subtext"><strong>Subject:</strong> ${b.subject}</p>
      <p class="card-subtext"><strong>Source:</strong> ${b.source}</p>
      <div class="card-action-bar">
        <button onclick="openProtectedViewer('${b.title}', '${b.docUrl}')" class="btn-card-secondary">
          <i class="fa-regular fa-eye"></i> View on Site
        </button>
      </div>
    </div>
  `).join("");
}

// 3. Question Papers (PYQ) Grid
function renderPYQ(list) {
  const grid = document.getElementById("pyqGrid");
  grid.innerHTML = list.map(p => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-graduation-cap"></i> ${p.year}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar"></i> ${p.published}</span>
      </div>
      <h3>${p.title}</h3>
      <p class="card-subtext"><strong>Conducting Body:</strong> ${p.body}</p>
      <p class="card-subtext"><strong>Status:</strong> Verified Paper Archive</p>
      <div class="card-action-bar">
        <button onclick="openProtectedViewer('${p.title}', '${p.docUrl}')" class="btn-card-secondary">
          <i class="fa-regular fa-eye"></i> View Question Paper
        </button>
      </div>
    </div>
  `).join("");
}

// 4. Academic Journals Grid
function renderJournals(list) {
  const grid = document.getElementById("journalsGrid");
  grid.innerHTML = list.map(j => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat indexing"><i class="fa-solid fa-award"></i> ${j.indexing}</span>
        <span class="date-badge"><i class="fa-solid fa-arrows-rotate"></i> ${j.frequency}</span>
      </div>
      <h3>${j.title}</h3>
      <p class="card-subtext"><strong style="color: #d97706;"><i class="fa-regular fa-hourglass-half"></i> Submission Deadline:</strong> ${j.deadline}</p>
      <div class="card-action-bar">
        <a href="${j.link}" target="_blank" class="btn-card-primary">Call for Papers (CFP) &rarr;</a>
      </div>
    </div>
  `).join("");
}

// 5. Results Grid
function renderResults(list) {
  const grid = document.getElementById("resultsGrid");
  grid.innerHTML = list.map(r => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-square-poll-vertical"></i> ${r.status}</span>
      </div>
      <h3>${r.title}</h3>
      <p class="card-subtext"><strong>Issuing Authority:</strong> ${r.agency}</p>
      <div class="card-action-bar">
        <a href="${r.link}" target="_blank" class="btn-card-primary">Verify Result &rarr;</a>
      </div>
    </div>
  `).join("");
}

// 6. Media Lectures Grid
function renderMedia(list) {
  const grid = document.getElementById("mediaGrid");
  grid.innerHTML = list.map(m => `
    <div class="portal-card">
      <div class="video-thumbnail-box" onclick="openVideoModal('${m.title}', '${m.videoId}')">
        <img src="https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg" alt="${m.title}" />
        <div class="video-play-btn"><i class="fa-solid fa-play"></i></div>
      </div>
      <h3 style="margin-top: 12px;">${m.title}</h3>
      <p class="card-subtext"><strong>Instructor / Topic:</strong> ${m.author}</p>
      <div class="card-action-bar">
        <button onclick="openVideoModal('${m.title}', '${m.videoId}')" class="btn-card-secondary">
          <i class="fa-brands fa-youtube"></i> Watch Video Lecture
        </button>
      </div>
    </div>
  `).join("");
}

// Master Search across all Grids
function executeGlobalSearch() {
  const query = document.getElementById("masterSearch").value.toLowerCase();

  renderCareers(careerData.filter(c => 
    c.title.toLowerCase().includes(query) || c.department.toLowerCase().includes(query)
  ));

  renderEbooks(ebooksData.filter(b => 
    b.title.toLowerCase().includes(query) || b.subject.toLowerCase().includes(query)
  ));

  renderPYQ(pyqData.filter(p => 
    p.title.toLowerCase().includes(query) || p.body.toLowerCase().includes(query)
  ));

  renderJournals(journalsData.filter(j =>
    j.title.toLowerCase().includes(query) || j.indexing.toLowerCase().includes(query)
  ));

  renderResults(resultsData.filter(r =>
    r.title.toLowerCase().includes(query) || r.agency.toLowerCase().includes(query)
  ));
}
/* ==============================================================
   THEME TOGGLE (DARK/LIGHT MODE) & SCROLL TO TOP
   ============================================================== */

// Check saved theme or system preference on startup
function initTheme() {
  const savedTheme = localStorage.getItem("portalTheme");
  const icon = document.getElementById("themeIcon");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (icon) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }
  }
}

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("portalTheme", "dark");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    localStorage.setItem("portalTheme", "light");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// Show/Hide Floating Back-to-Top Button
window.addEventListener("scroll", () => {
  const topBtn = document.getElementById("backToTopBtn");
  if (topBtn) {
    if (window.scrollY > 300) {
      topBtn.style.display = "flex";
    } else {
      topBtn.style.display = "none";
    }
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Initialize theme when DOM is loaded
initTheme();
