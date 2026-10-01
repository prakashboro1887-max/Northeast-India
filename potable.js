/* ==============================================================
   NORTHEAST SUPER PORTAL - DATA & SYNC ENGINE
   ============================================================== */

// 1. Paste your published Google Sheet CSV link here:
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS0y4e3_-teBXQcNZXKbXNca_bzYGi5wF-klG2pJnkHIKOA5TizIZjSRvqhd5ewrCk8wb6EH9xUGESy/pub?gid=0&single=true&output=csv";

// 2. Default Fallback Career Data
let careerList = [
  {
    title: "Library Apprenticeship / Trainee 2026",
    department: "Krishna Kanta Handiqui Library (GU)",
    category: "Library & Apprentice",
    published: "2026-10-01",
    lastDate: "2026-10-31",
    link: "https://kkhl.gauhati.ac.in/"
  },
  {
    title: "Combined Competitive Examination (CCE)",
    department: "Assam Public Service Commission (APSC)",
    category: "State Govt",
    published: "2026-09-28",
    lastDate: "2026-10-31",
    link: "https://apsc.nic.in/"
  }
];

// Helper function to safely render cards into whichever ID exists
function renderCareers(data) {
  const container = document.getElementById("careerGrid") || document.getElementById("jobsGrid");
  if (!container) return;

  container.innerHTML = data.map(item => `
    <div class="portal-card">
      <div class="card-meta-top">
        <span class="badge-cat"><i class="fa-solid fa-briefcase"></i> ${item.category || "General"}</span>
        <span class="date-badge"><i class="fa-regular fa-calendar-check"></i> ${item.published || item.date || "Recent"}</span>
      </div>
      <h3>${item.title}</h3>
      <p class="card-subtext"><strong>Organization:</strong> ${item.department || item.organization || "Govt Org"}</p>
      <p class="card-subtext"><strong style="color: #e11d48;"><i class="fa-regular fa-clock"></i> Deadline:</strong> ${item.lastDate || item.deadline || "Open"}</p>
      <div class="card-action-bar">
        <a href="${item.link || '#'}" target="_blank" class="btn-card-primary">Official Notification &rarr;</a>
      </div>
    </div>
  `).join("");
}

// Live Google Sheets Fetcher
async function syncGoogleSheet() {
  if (!GOOGLE_SHEET_CSV_URL || GOOGLE_SHEET_CSV_URL === "PASTE_YOUR_PUBLISHED_CSV_URL_HERE") {
    renderCareers(careerList);
    return;
  }

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL);
    const text = await res.text();
    
    // Parse CSV rows cleanly
    const lines = text.trim().split("\n");
    if (lines.length <= 1) return;

    const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

    const parsedData = lines.slice(1).map(line => {
      // Split by comma outside quotes
      const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
      let obj = {};
      headers.forEach((header, i) => {
        obj[header] = values[i] ? values[i].trim().replace(/^"|"$/g, '') : "";
      });
      return obj;
    });

    // Filter jobs
    const jobs = parsedData.filter(d => (d.type || "").toLowerCase() === "job");
    if (jobs.length > 0) {
      careerList = jobs.map(j => ({
        title: j.title || j.tittle || "Recruitment Post",
        department: j.organization || "Govt Department",
        category: j.category || "General",
        published: j.date || "2026-10-01",
        lastDate: j.deadline || "Active",
        link: j.link || "#"
      }));
      renderCareers(careerList);
    } else {
      renderCareers(careerList);
    }
  } catch (err) {
    console.error("Sheet sync error:", err);
    renderCareers(careerList);
  }
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCareers(careerList);
  syncGoogleSheet();
});
