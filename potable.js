/* ==============================================================
   NORTHEAST SUPER PORTAL - CENTRAL DATA REPOSITORY
   ============================================================== */

// 1. LIVE NOTICES & LATEST ANNOUNCEMENTS
const announcements = [
  {
    title: "Gauhati University KKHL Library Apprentice / Trainee Verification List Released",
    published: "2026-10-01 08:30 AM",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    title: "APSC Combined Competitive Examination (CCE) Preliminary Schedule Announced",
    published: "2026-09-30 02:15 PM",
    link: "https://apsc.nic.in/"
  },
  {
    title: "AHSEC Class 12 Previous 5-Year Question Banks Uploaded to Portal",
    published: "2026-09-29 11:45 AM",
    link: "#section-pyq"
  },
  {
    title: "UGC Care Listed Journal Call for Papers (Winter 2026 Edition)",
    published: "2026-09-28 09:00 AM",
    link: "#section-journals"
  }
];

// 2. CAREER & RECRUITMENT DATABASE
const careerData = [
  {
    title: "Library Apprenticeship / Trainee",
    department: "Krishna Kanta Handiqui Library (GU)",
    category: "Library & Apprentice",
    published: "2026-10-01",
    lastDate: "2026-10-24",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    title: "Combined Competitive Examination (CCE)",
    department: "Assam Public Service Commission (APSC)",
    category: "State Govt",
    published: "2026-09-28",
    lastDate: "2026-10-31",
    link: "https://apsc.nic.in/"
  },
  {
    title: "Post Graduate Teacher (PGT) Positions",
    department: "Directorate of Secondary Education, Assam",
    category: "State Govt",
    published: "2026-09-25",
    lastDate: "2026-10-20",
    link: "https://madhyamik.assam.gov.in/"
  },
  {
    title: "Technical Assistant & Digital Trainee",
    department: "IIT Guwahati Central Library / Tech Inst.",
    category: "Central Govt",
    published: "2026-09-20",
    lastDate: "2026-10-15",
    link: "https://www.iitg.ac.in/"
  }
];

// 3. E-BOOKS & READING MATERIALS
const ebooksData = [
  {
    title: "General Science (Class 10 Text & Solutions)",
    subject: "Science & Technology",
    category: "SEBA Class 10",
    published: "2026-09-20",
    source: "Govt Textbook Division",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "Higher Mathematics (Class 10 Core Curriculum)",
    subject: "Mathematics",
    category: "SEBA Class 10",
    published: "2026-09-18",
    source: "State Education Board",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "Political Science & Regional History (Class 12)",
    subject: "Social Sciences",
    category: "AHSEC Class 12",
    published: "2026-09-15",
    source: "AHSEC Portal",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "Digital Archiving & Institutional Repositories (DSpace/Koha)",
    subject: "Library & Information Science",
    category: "Higher Ed",
    published: "2026-09-12",
    source: "Open Educational Resource",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

// 4. PREVIOUS YEAR QUESTION PAPERS (PYQ)
const pyqData = [
  {
    title: "SEBA HSLC Mathematics & General Science Solved Paper",
    body: "Board of Secondary Education, Assam",
    year: "2025 Session",
    published: "2026-09-28",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "AHSEC Class 12 English & Modern Languages",
    body: "Assam Higher Secondary Education Council",
    year: "2024–2025 Session",
    published: "2026-09-27",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "UGC NET Paper 1 & Library Science Paper 2 (Solved)",
    body: "National Testing Agency (NTA)",
    year: "Dec 2025 Cycle",
    published: "2026-09-20",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

// 5. ACADEMIC JOURNALS & CFP
const journalsData = [
  {
    title: "Journal of North East India Studies",
    indexing: "UGC-CARE Listed / Peer Reviewed",
    frequency: "Bi-annual (June & Dec)",
    deadline: "October 31, 2026",
    link: "http://www.jneis.com/"
  },
  {
    title: "DESIDOC Journal of Library & Information Technology",
    indexing: "Scopus, UGC-CARE Group II",
    frequency: "Bi-Monthly",
    deadline: "Rolling Submissions",
    link: "https://publications.drdo.gov.in/ojs/index.php/djlit"
  },
  {
    title: "Assam University Journal of Science & Technology",
    indexing: "Peer Reviewed / Institutional",
    frequency: "Annual",
    deadline: "November 25, 2026",
    link: "https://www.aus.ac.in/"
  }
];

// 6. RESULT CHECKERS
const resultsData = [
  {
    title: "SEBA HSLC Class 10 Results",
    agency: "Board of Secondary Education, Assam",
    status: "Active Portal",
    link: "https://sebaonline.org/"
  },
  {
    title: "AHSEC Class 12 (Arts/Sc/Com) Results",
    agency: "Assam Higher Secondary Education Council",
    status: "Active Portal",
    link: "https://ahsec.assam.gov.in/"
  },
  {
    title: "Gauhati University UG & PG Semester Portals",
    agency: "Gauhati University Portal",
    status: "Regular Verification",
    link: "https://guportal.in/"
  },
  {
    title: "National Scholarship Disbursal Status",
    agency: "National Scholarship Portal (NSP)",
    status: "Live Tracking",
    link: "https://scholarships.gov.in/"
  }
];

// 7. VIDEO WORKSHOPS & ARCHIVES
const mediaData = [
  {
    title: "DSpace 9 Architecture, Metadata & Institutional Setup",
    author: "Digital Archive Engineering",
    videoId: "dQw4w9WgXcQ"
  },
  {
    title: "MARC 21 & Dublin Core Standards Masterclass",
    author: "Library Science Technical Workshop",
    videoId: "dQw4w9WgXcQ"
  }
];

/* ==============================================================
   RENDER ENGINES
   ============================================================== */

let currentResourceTitle = "";

function renderTicker() {
  const container = document.getElementById("tickerTrack");
  const html = announcements.map((item, index) => `
    <div class="ticker-node">
      ${index === 0 ? '<span class="pill-new">NEW</span>' : ''}
      <span class="ticker-date"><i class="fa-regular fa-clock"></i> ${item.published}</span>
      <a href="${item.link}" class="ticker-anchor">${item.title}</a>
    </div>
  `).join("");
  container.innerHTML = html + html;
}

function renderCareers(list) {
  const tbody = document.getElementById("careerTableBody");
  tbody.innerHTML = list.map(item => `
    <tr>
      <td>
        <div class="row-main-title">${item.title}</div>
        <span class="badge-cat">${item.category}</span>
      </td>
      <td><strong>${item.department}</strong></td>
      <td><span class="date-badge"><i class="fa-regular fa-calendar-check"></i> ${item.published}</span></td>
      <td><span class="deadline-badge"><i class="fa-regular fa-hourglass-half"></i> ${item.lastDate}</span></td>
      <td style="text-align: center;">
        <a href="${item.link}" target="_blank" class="btn-table-action">Official Notice &rarr;</a>
      </td>
    </tr>
  `).join("");
}

function renderEbooks(list) {
  const grid = document.getElementById("ebooksGrid");
  grid.innerHTML = list.map(b => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat">${b.category}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar"></i> ${b.published}</span>
      </div>
      <h3>${b.title}</h3>
      <p class="card-subtext"><strong>Subject:</strong> ${b.subject}</p>
      <p class="card-subtext"><strong>Source:</strong> ${b.source}</p>
      <div class="card-action-bar">
        <button onclick="openProtectedViewer('${b.title}', '${b.docUrl}')" class="btn-view-card">
          <i class="fa-regular fa-eye"></i> View on Site
        </button>
      </div>
    </div>
  `).join("");
}

function renderPYQ(list) {
  const tbody = document.getElementById("pyqTableBody");
  tbody.innerHTML = list.map(p => `
    <tr>
      <td><div class="row-main-title">${p.title}</div></td>
      <td><strong>${p.body}</strong></td>
      <td><span class="badge-cat">${p.year}</span></td>
      <td><span class="date-badge"><i class="fa-regular fa-calendar"></i> ${p.published}</span></td>
      <td style="text-align: center;">
        <button onclick="openProtectedViewer('${p.title}', '${p.docUrl}')" class="btn-table-action">
          <i class="fa-regular fa-eye"></i> View Paper
        </button>
      </td>
    </tr>
  `).join("");
}

function renderJournals(list) {
  const tbody = document.getElementById("journalsTableBody");
  tbody.innerHTML = list.map(j => `
    <tr>
      <td><strong>${j.title}</strong></td>
      <td><span class="badge-indexing">${j.indexing}</span></td>
      <td>${j.frequency}</td>
      <td><span class="deadline-badge">${j.deadline}</span></td>
      <td style="text-align: center;">
        <a href="${j.link}" target="_blank" class="btn-table-action">CFP Details &rarr;</a>
      </td>
    </tr>
  `).join("");
}

function renderResults(list) {
  const grid = document.getElementById("resultsGrid");
  grid.innerHTML = list.map(r => `
    <div class="portal-card result-tile">
      <div class="result-tile-icon"><i class="fa-solid fa-square-poll-vertical"></i></div>
      <div class="result-tile-content">
        <h3>${r.title}</h3>
        <p>${r.agency}</p>
        <a href="${r.link}" target="_blank" class="btn-table-action" style="margin-top: 8px;">Check Result &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderMedia(list) {
  const grid = document.getElementById("mediaGrid");
  grid.innerHTML = list.map(m => `
    <div class="portal-card">
      <div class="video-thumbnail-box" onclick="openVideoModal('${m.title}', '${m.videoId}')">
        <img src="https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg" alt="${m.title}" />
        <div class="video-play-btn"><i class="fa-solid fa-play"></i></div>
      </div>
      <h3 style="margin-top: 12px;">${m.title}</h3>
      <p class="card-subtext">${m.author}</p>
    </div>
  `).join("");
}

/* ==============================================================
   MODAL CONTROLLER & SOCIAL SHARING
   ============================================================== */

function openProtectedViewer(title, docUrl) {
  currentResourceTitle = title;
  document.getElementById("modalHeading").innerText = title;
  document.getElementById("modalFrameContainer").innerHTML = `
    <iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(docUrl)}&embedded=true#toolbar=0" 
      width="100%" height="600px" frameborder="0"></iframe>
  `;
  document.getElementById("portalModal").style.display = "flex";
}

function openVideoModal(title, videoId) {
  currentResourceTitle = title;
  document.getElementById("modalHeading").innerText = title;
  document.getElementById("modalFrameContainer").innerHTML = `
    <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden;">
      <iframe style="position:absolute; top:0; left:0; width:100%; height:100%;" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
  document.getElementById("portalModal").style.display = "flex";
}

function closePortalModal() {
  document.getElementById("modalFrameContainer").innerHTML = "";
  document.getElementById("portalModal").style.display = "none";
}

window.onclick = function(e) {
  if (e.target === document.getElementById("portalModal")) {
    closePortalModal();
  }
};

function dispatchShare(platform) {
  const pageUrl = window.location.href;
  const shareMsg = encodeURIComponent(`Access "${currentResourceTitle}" on Northeast Academic Portal: `);
  const target = encodeURIComponent(pageUrl);

  let url = "";
  if (platform === 'whatsapp') url = `https://api.whatsapp.com/send?text=${shareMsg}${target}`;
  if (platform === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${target}`;
  if (platform === 'telegram') url = `https://t.me/share/url?url=${target}&text=${shareMsg}`;
  if (platform === 'x') url = `https://twitter.com/intent/tweet?text=${shareMsg}&url=${target}`;
  if (platform === 'copy') {
    navigator.clipboard.writeText(pageUrl).then(() => alert("Link copied to clipboard!"));
    return;
  }
  if (url) window.open(url, '_blank', 'width=600,height=500');
}

/* ==============================================================
   FILTERING & UNIFIED SEARCH
   ============================================================== */

function filterCareer(cat) {
  updatePillState(event.target);
  if (cat === 'All') renderCareers(careerData);
  else renderCareers(careerData.filter(c => c.category === cat));
}

function filterEbooks(cat) {
  updatePillState(event.target);
  if (cat === 'All') renderEbooks(ebooksData);
  else renderEbooks(ebooksData.filter(e => e.category === cat));
}

function updatePillState(btn) {
  btn.parentNode.querySelectorAll(".pill-filter").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

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
}

// Initial Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  renderTicker();
  renderCareers(careerData);
  renderEbooks(ebooksData);
  renderPYQ(pyqData);
  renderJournals(journalsData);
  renderResults(resultsData);
  renderMedia(mediaData);
});
