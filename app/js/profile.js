// Worker profile drawer
const Profile = (() => {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");

  function step(title, status, score) {
    return `<div class="step ${status.toLowerCase()}">${title}<strong>${score ?? "—"}</strong>${status}</div>`;
  }

  function open(w) {
    drawer.innerHTML = `
      <div class="drawer-hero">
        <button class="drawer-close" aria-label="Close">×</button>
        <img src="${w.photo}" alt="${w.name}" onerror="avatarFallback(this, '${w.name}')">
        <h3>${w.name}</h3>
        <p>${w.empId} · ${w.department} – ${w.function}</p>
        <p style="margin-top:8px">${skillBadge(w.skillLevel)}</p>
      </div>
      <div class="drawer-body">
        <div class="drawer-section">
          <h4>Onboarding</h4>
          <div class="steps">
            ${step("Induction", w.inductionStatus, w.inductionScore)}
            <span class="arrow">→</span>
            ${step("OJT (3 days)", w.ojtStatus, w.ojtScore)}
            <span class="arrow">→</span>
            <div class="step"><span>Skill</span><strong>L${w.skillLevel}</strong>${SKILL_LABELS[w.skillLevel]}</div>
          </div>
        </div>
        <div class="drawer-section">
          <h4>Job Details</h4>
          <div class="info-grid">
            <div><span class="k">Department</span>${w.department}</div>
            <div><span class="k">Process / Function</span>${w.function}</div>
            <div><span class="k">Line No.</span>${w.line}</div>
            <div><span class="k">Date of Joining</span>${formatDate(w.doj)}</div>
            <div class="full"><span class="k">Supervisor / Reporting</span>${w.supervisor}</div>
          </div>
        </div>
        <div class="drawer-section">
          <h4>Personal</h4>
          <div class="info-grid">
            <div><span class="k">Gender</span>${w.gender}</div>
            <div><span class="k">Date of Birth</span>${formatDate(w.dob)}</div>
            <div><span class="k">Phone</span><a href="tel:${w.phone}">${w.phone}</a></div>
            <div><span class="k">Email</span>${w.email}</div>
            <div class="full"><span class="k">Address</span>${w.address}</div>
          </div>
        </div>
        <div class="drawer-section">
          <h4>Background</h4>
          <div class="info-grid">
            <div><span class="k">Education</span>${w.education}</div>
            <div><span class="k">Experience</span>${w.experience ? w.experience + " yrs" : "Fresher"}</div>
            <div class="full"><span class="k">Previous Company</span>${w.prevCompany}</div>
          </div>
        </div>
      </div>`;
    drawer.querySelector(".drawer-close").onclick = close;
    drawer.classList.add("open");
    overlay.classList.add("show");
    drawer.setAttribute("aria-hidden", "false");
  }

  function close() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    drawer.setAttribute("aria-hidden", "true");
  }

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  return { open, close };
})();
