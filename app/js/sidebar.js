// Shared sidebar – rendered into <aside id="sidebar" data-page="...">
// Hamburger toggles between icons-only and icons + labels
(() => {
  const sidebar = document.getElementById("sidebar");
  const page = sidebar.dataset.page || new URLSearchParams(location.search).get("m");
  const icon = path => `<svg viewBox="0 0 24 24">${path}</svg>`;
  const links = [
    { id: "dashboard", href: "dashboard.html", label: "Dashboard", icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    { id: "workers", href: "workers.html", label: "Workers", icon: '<circle cx="9" cy="8" r="4"/><path d="M2 21c0-4 3-6 7-6s7 2 7 6"/><path d="M16 4a4 4 0 0 1 0 8M22 21c0-3-2-5-4-5.5"/>' },
    { id: "induction", href: "induction.html", label: "Induction", icon: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4M10 8.5v5l4-2.5z"/>' },
    { id: "ojt", href: "ojt.html", label: "OJT", icon: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>' },
    { id: "skills", href: "phase2.html?m=skills", label: "Skill Matrix", icon: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>' },
    { id: "licenses", href: "phase2.html?m=licenses", label: "Licenses", icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 10h5M14 14h3"/>' },
  ];

  sidebar.innerHTML = `
    <div class="sidebar-top">
      <button class="icon-btn" id="menu-toggle" aria-label="Toggle menu">${icon('<path d="M3 6h18M3 12h18M3 18h18"/>')}</button>
      <img class="sidebar-logo" src="../assets/logo/iljin_logo.png" alt="ILJIN">
    </div>
    <nav class="nav">
      ${links.map(l => `<a href="${l.href}" class="nav-item ${l.id === page ? "active" : ""}" title="${l.label}">${icon(l.icon)}<span>${l.label}</span></a>`).join("")}
      <label class="nav-item" title="Import Excel">
        ${icon('<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>')}<span>Import Excel</span>
        <input type="file" id="excel-input" accept=".xlsx,.xls" hidden>
      </label>
    </nav>
    <button class="admin-card" id="admin-card" title="Edit profile">
      <img id="admin-photo" src="" alt="">
      <span class="admin-text"><strong id="admin-name"></strong><small id="admin-role"></small></span>
    </button>
    <a href="index.html" class="nav-item logout" title="Logout">
      ${icon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>')}<span>Logout</span>
    </a>`;

  const toggle = document.getElementById("menu-toggle");
  const mobileBtn = toggle.cloneNode(true);   // floating hamburger for mobile
  mobileBtn.id = "";
  mobileBtn.classList.add("mobile-toggle");
  document.body.appendChild(mobileBtn);

  const flip = () => sidebar.classList.toggle("open");
  toggle.addEventListener("click", flip);
  mobileBtn.addEventListener("click", flip);
  sidebar.querySelectorAll("a.nav-item").forEach(a =>
    a.addEventListener("click", () => { if (innerWidth <= 768) sidebar.classList.remove("open"); })
  );

  document.getElementById("excel-input").addEventListener("change", async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const workers = await Store.importExcel(file);
      alert(`Imported ${workers.length} workers`);
      location.reload();
    } catch (err) { alert(err.message); }
  });
})();
