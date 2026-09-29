/* ======================================================
   DATABASE STORAGE FOR NORTHEAST SUPER PORTAL
   ====================================================== */

// 1. JOBS DATABASE
const jobsData = [
  {
    title: "Library Trainee / Apprentice",
    organization: "Krishna Kanta Handiqui Library (GU) / Central Inst.",
    category: "Library & Trainee",
    eligibility: "BLISc / MLISc Completed",
    lastDate: "Check Portal",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    title: "Combined Competitive Exam (CCE)",
    organization: "Assam Public Service Commission (APSC)",
    category: "State Govt",
    eligibility: "Graduate in any discipline",
    lastDate: "Active Cycle",
    link: "https://apsc.nic.in/"
  },
  {
    title: "Staff Selection Commission (SSC GD & CGL)",
    organization: "Staff Selection Commission (NER)",
    category: "Central Govt",
    eligibility: "10th / 12th / Graduate",
    lastDate: "Upcoming",
    link: "https://www.sscner.org.in/"
  },
  {
    title: "State School Teacher Recruitment",
    organization: "Directorate of Secondary Education, Assam",
    category: "State Govt",
    eligibility: "B.Ed / Post Graduation",
    lastDate: "Notification Pending",
    link: "https://madhyamik.assam.gov.in/"
  }
];

// 2. E-BOOKS & QUESTION PAPERS DATABASE
const ebooksData = [
  {
    title: "General Science (English/Assamese/Bodo)",
    subject: "Science",
    category: "SEBA Class 10",
    source: "SCERT / Govt Textbooks",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Replace with direct PDF URL
  },
  {
    title: "Mathematics (Class 10 Complete Syllabus)",
    subject: "Mathematics",
    category: "SEBA Class 10",
    source: "Govt E-Textbook Portal",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "Library Automation & Networking (Koha & DSpace)",
    subject: "Library & Info Science",
    category: "MLIS / BLIS",
    source: "e-PG Pathshala Open Source",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "SEBA HSLC Previous Year Question Papers (5-Year Bank)",
    subject: "All Subjects",
    category: "Previous Year QPs",
    source: "SEBA Archive",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    title: "AHSEC Class 12 Political Science & History Notes",
    subject: "Social Sciences",
    category: "AHSEC Class 12",
    source: "Assam Higher Secondary Edu Council",
    docUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
];

// 3. JOURNALS & CALL FOR PAPERS
const journalsData = [
  {
    title: "Journal of North East India Studies",
    publisher: "Association for North East India Studies",
    indexing: "Peer-Reviewed / Social Science",
    frequency: "Bi-annual (June & Dec)",
    deadline: "October 31, 2026",
    link: "http://www.jneis.com/"
  },
  {
    title: "DESIDOC Journal of Library & Information Technology",
    publisher: "DRDO / INFLIBNET",
    indexing: "Scopus, UGC-CARE Listed",
    frequency: "Bi-monthly",
    deadline: "Rolling Submissions",
    link: "https://publications.drdo.gov.in/ojs/index.php/djlit"
  },
  {
    title: "Assam University Journal of Science & Technology",
    publisher: "Assam University Silchar",
    indexing: "Institutional Peer-Reviewed",
    frequency: "Annual",
    deadline: "November 15, 2026",
    link: "https://www.aus.ac.in/"
  }
];

// 4. RESULTS DATABASE
const resultsData = [
  {
    title: "SEBA HSLC Class 10 Results",
    agency: "Board of Secondary Education, Assam",
    link: "https://sebaonline.org/"
  },
  {
    title: "AHSEC Higher Secondary (Arts/Sc/Com) Results",
    agency: "Assam Higher Secondary Education Council",
    link: "https://ahsec.assam.gov.in/"
  },
  {
    title: "Gauhati University UG/PG Semester Results",
    agency: "GU Portal (Guwahati)",
    link: "https://guportal.in/"
  },
  {
    title: "NSP Scholarship Disbursal Status",
    agency: "National Scholarship Portal",
    link: "https://scholarships.gov.in/"
  }
];

// 5. VIDEO REPOSITORY (YOUTUBE EMBEDDED)
const mediaData = [
  {
    title: "DSpace 9 Installation, Metadata & Communities Setup",
    instructor: "Digital Repository Archival Tutorial",
    videoId: "dQw4w9WgXcQ" // Replace with actual YouTube Video ID
  },
  {
    title: "MARC 21 & Dublin Core Cataloguing Masterclass",
    instructor: "Library Science Technical Series",
    videoId: "dQw4w9WgXcQ" // Replace with actual YouTube Video ID
  }
];

/* ======================================================
   RENDER ENGINES
   ====================================================== */

function renderJobs(data) {
  const container = document.getElementById("jobsGrid");
  container.innerHTML = data.map(j => `
    <div class="card item-card">
      <span class="tag-badge"><i class="fa-solid fa-briefcase"></i> ${j.category}</span>
      <h3>${j.title}</h3>
      <p><strong>Org:</strong> ${j.organization}</p>
      <p><strong>Eligibility:</strong> ${j.eligibility}</p>
      <div class="card-footer-action">
        <span class="deadline"><i class="fa-regular fa-clock"></i> ${j.lastDate}</span>
        <a href="${j.link}" target="_blank" class="action-btn">Apply / Notice &rarr;</a>
      </div>
    </div>
  `).join("");
}

function renderEbooks(data) {
  const container = document.getElementById("ebooksGrid");
  container.innerHTML = data.map(b => `
    <div class="card item-card">
      <span class="tag-badge"><i class="fa-solid fa-book"></i> ${b.category}</span>
      <h3>${b.title}</h3>
      <p><strong>Subject:</strong> ${b.subject}</p>
      <p><strong>Source:</strong> ${b.source}</p>
      <div class="card-footer-action">
        <button onclick="openViewer('${b.title}', '${b.docUrl}')" class="action-btn secondary">
          <i class="fa-regular fa-eye"></i> View on Site
        </button>
        <a href="${b.docUrl}" target="_blank" download class="action-btn"><i class="fa-solid fa-download"></i> PDF</a>
      </div>
    </div>
  `).join("");
}

function renderJournals(data) {
  const container = document.querySelector("#journalTable tbody");
  container.innerHTML = data.map(jn => `
    <tr>
      <td><strong>${jn.title}</strong><br><small style="color: #64748b">${jn.publisher}</small></td>
      <td><span class="table-tag">${jn.indexing}</span></td>
      <td>${jn.frequency}</td>
      <td><span class="due-date">${jn.deadline}</span></td>
      <td><a href="${jn.link}" target="_blank" class="table-link">Official CFP &rarr;</a></td>
    </tr>
  `).join("");
}

function renderResults(data) {
  const container = document.getElementById("resultsGrid");
  container.innerHTML = data.map(r => `
    <div class="card item-card result-box">
      <i class="fa-solid fa-square-poll-vertical result-icon"></i>
      <div>
        <h3>${r.title}</h3>
        <p>${r.agency}</p>
      </div>
      <a href="${r.link}" target="_blank" class="action-btn" style="margin-top: 10px;">Check Result &rarr;</a>
    </div>
  `).join("");
}

function renderMedia(data) {
  const container = document.getElementById("mediaGrid");
  container.innerHTML = data.map(m => `
    <div class="card item-card">
      <div class="video-preview-wrapper" onclick="openVideoModal('${m.title}', '${m.videoId}')">
        <img src="https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg" alt="${m.title}" class="video-thumb" />
        <div class="play-overlay"><i class="fa-solid fa-play"></i></div>
      </div>
      <h3 style="margin-top: 10px;">${m.title}</h3>
      <p style="color: #64748b;">${m.instructor}</p>
    </div>
  `).join("");
}

/* ======================================================
   MODAL CONTROLLERS (PDF / YOUTUBE VIEWER IN-SITE)
   ====================================================== */

function openViewer(title, url) {
  const modal = document.getElementById("mediaModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContainer = document.getElementById("modalContainer");

  modalTitle.innerText = title;
  // Fallback to Google Docs viewer for cross-domain viewing
  modalContainer.innerHTML = `
    <iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true" width="100%" height="600px" frameborder="0"></iframe>
  `;
  modal.style.display = "block";
}

function openVideoModal(title, videoId) {
  const modal = document.getElementById("mediaModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContainer = document.getElementById("modalContainer");

  modalTitle.innerText = title;
  modalContainer.innerHTML = `
    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
      <iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </div>
  `;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("mediaModal");
  document.getElementById("modalContainer").innerHTML = "";
  modal.style.display = "none";
}

window.onclick = function(event) {
  const modal = document.getElementById("mediaModal");
  if (event.target == modal) {
    closeModal();
  }
};

/* ======================================================
   FILTERING CONTROLLERS
   ====================================================== */

function filterJobs(category) {
  updatePills(event.target);
  if (category === "All") renderJobs(jobsData);
  else renderJobs(jobsData.filter(j => j.category === category));
}

function filterEbooks(category) {
  updatePills(event.target);
  if (category === "All") renderEbooks(ebooksData);
  else renderEbooks(ebooksData.filter(b => b.category === category));
}

function updatePills(targetBtn) {
  const siblings = targetBtn.parentNode.querySelectorAll(".pill-btn");
  siblings.forEach(s => s.classList.remove("active"));
  targetBtn.classList.add("active");
}

function filterAllData() {
  const query = document.getElementById("globalSearch").value.toLowerCase();
  renderJobs(jobsData.filter(j => j.title.toLowerCase().includes(query) || j.organization.toLowerCase().includes(query)));
  renderEbooks(ebooksData.filter(b => b.title.toLowerCase().includes(query) || b.subject.toLowerCase().includes(query)));
}

// Initial Bootstrapping
document.addEventListener("DOMContentLoaded", () => {
  renderJobs(jobsData);
  renderEbooks(ebooksData);
  renderJournals(journalsData);
  renderResults(resultsData);
  renderMedia(mediaData);
});
