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
