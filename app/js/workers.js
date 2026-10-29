// Workers page: list + always-open detail panel with edit mode
let workers = Store.load();
let selectedId = null;
let editing = false;
let pendingPhoto = null;

const el = id => document.getElementById(id);
const filters = { search: el("f-search"), dept: el("f-dept"), ojt: el("f-ojt"), skill: el("f-skill") };
const STATUSES = ["Pending", "In Progress", "Done", "Failed"];

// Field layout for the detail panel (view + edit)
const SECTIONS = [
  { title: "Job Details", fields: [
    { key: "empId", label: "Employee ID", readonly: true },
    { key: "department", label: "Department", options: () => uniq("department") },
    { key: "function", label: "Process / Function" },
    { key: "line", label: "Line No." },
    { key: "doj", label: "Date of Joining", type: "date" },
    { key: "supervisor", label: "Supervisor / Reporting" },
  ]},
  { title: "Personal", fields: [
    { key: "gender", label: "Gender", options: () => ["Male", "Female", "Other"] },
    { key: "dob", label: "Date of Birth", type: "date" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "email", label: "Email", type: "email" },
    { key: "address", label: "Address", full: true },
  ]},
  { title: "Background", wide: true, fields: [
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience (yrs)", type: "number" },
    { key: "prevCompany", label: "Previous Company", full: true },
  ]},
];

const uniq = key => [...new Set(workers.map(w => w[key]))].sort();
const current = () => workers.find(w => w.empId === selectedId);

// ---------- List ----------
function filtered() {
  const q = filters.search.value.trim().toLowerCase();
  return workers.filter(w =>
    (!q || [w.name, w.empId, w.line, w.function].some(v => String(v).toLowerCase().includes(q))) &&
    (!filters.dept.value || w.department === filters.dept.value) &&
    (!filters.ojt.value || w.ojtStatus === filters.ojt.value) &&
    (!filters.skill.value || w.skillLevel == filters.skill.value)
  );
}

function renderList() {
  const list = filtered();
  el("count").textContent = `${list.length} of ${workers.length} workers`;
  el("worker-list").innerHTML = list.map(w => `
    <li class="worker-item ${w.empId === selectedId ? "active" : ""}" data-id="${w.empId}">
      <img src="${w.photo}" alt="" loading="lazy" onerror="avatarFallback(this, '${w.name}')">
      <div class="info">
        <div class="name">${w.name}</div>
        <div class="meta">${w.empId} · ${w.department} · ${w.line}</div>
      </div>
      <span class="lvl badge l${w.skillLevel}">L${w.skillLevel}</span>
    </li>`).join("") || `<li class="empty">No workers found</li>`;
}

// ---------- Detail ----------
function fieldView(f, w) {
  let v = w[f.key];
  if (f.type === "date") v = formatDate(v);
  if (f.key === "experience") v = v ? `${v} yrs` : "Fresher";
  return `<div class="field ${f.full ? "full" : ""}"><span class="k">${f.label}</span><span class="v">${v || "—"}</span></div>`;
}

function fieldEdit(f, w) {
  const val = w[f.key] ?? "";
  const input = f.options
    ? `<select name="${f.key}">${f.options().map(o => `<option ${o === val ? "selected" : ""}>${o}</option>`).join("")}</select>`
    : `<input name="${f.key}" type="${f.type || "text"}" value="${String(val).replace(/"/g, "&quot;")}" ${f.readonly ? "readonly" : ""}>`;
  return `<label class="field ${f.full ? "full" : ""}"><span class="k">${f.label}</span>${input}</label>`;
}

function timelineStep(title, statusKey, scoreKey, w) {
  const status = w[statusKey];
  const body = editing
    ? `<select name="${statusKey}">${STATUSES.map(s => `<option ${s === status ? "selected" : ""}>${s}</option>`).join("")}</select>
       <input name="${scoreKey}" type="number" min="0" max="20" placeholder="Score" value="${w[scoreKey] ?? ""}" style="margin-top:6px">`
    : `<div class="s">${w[scoreKey] ?? "—"}</div>${statusBadge(status)}`;
  return `<div class="tl-step ${statusClass(status)} field"><div class="t">${title}</div>${body}</div>`;
}

function renderDetail() {
  try { drawDetail(); }
  catch (err) {
    console.error(err);
    el("detail").innerHTML = `<div class="empty-detail">Could not show this worker (${err.message}).<br>
      Saved data in this browser may be outdated – use <b>Reset demo data</b> in the sidebar.</div>`;
  }
}

function drawDetail() {
  const w = current();
  const panel = el("detail");
  if (!w) { panel.innerHTML = `<div class="empty-detail">Select a worker to see details</div>`; return; }

  const skillBox = editing
    ? `<select name="skillLevel">${[1, 2, 3, 4].map(l => `<option value="${l}" ${l == w.skillLevel ? "selected" : ""}>L${l} ${SKILL_LABELS[l]}</option>`).join("")}</select>`
    : `<div class="s">L${w.skillLevel}</div><span class="badge l${w.skillLevel}">${SKILL_LABELS[w.skillLevel]}</span>`;

  panel.innerHTML = `
    <form id="worker-form" class="${editing ? "editing" : ""}">
      <div class="detail-hero">
        <button type="button" class="back-btn" id="back-btn">← Back</button>
        <div class="photo-wrap">
          <img id="w-photo" src="${pendingPhoto || w.photo}" alt="${w.name}" onerror="avatarFallback(this, '${w.name}')">
          ${editing ? `<label class="photo-change" title="Change photo">✎<input type="file" id="w-photo-input" accept="image/*" hidden></label>` : ""}
        </div>
        <div>
          ${editing
            ? `<div class="field"><input name="name" value="${w.name}" required style="font-size:1.1rem"></div>`
            : `<h2>${w.name}</h2>`}
          <p class="sub">${w.empId} · ${w.department} – ${w.function} · ${w.line}</p>
          <div class="hero-badges">${skillBadge(w.skillLevel)} ${statusBadge(w.inductionStatus, "Induction " + w.inductionStatus)} ${statusBadge(w.ojtStatus, "OJT " + w.ojtStatus)} <span class="badge l2">${onboardingStage(w).label}</span></div>
        </div>
        <div class="hero-actions">
          ${editing
            ? `<button type="button" id="cancel-btn">Cancel</button><button type="submit" class="primary">Save</button>`
            : `<button type="button" class="primary" id="edit-btn">✎ Edit</button>`}
        </div>
      </div>

      <div class="detail-body">
        <div class="panel-box wide">
          <h4>Onboarding & Skill</h4>
          <div class="timeline">
            ${timelineStep("HR Induction", "inductionStatus", "inductionScore", w)}
            ${timelineStep("OJT (3 days)", "ojtStatus", "ojtScore", w)}
            <div class="tl-step field"><div class="t">Skill Level</div>${skillBox}</div>
          </div>
        </div>
        ${SECTIONS.map(s => `
          <div class="panel-box ${s.wide ? "wide" : ""}">
            <h4>${s.title}</h4>
            <div class="fields">${s.fields.map(f => (editing ? fieldEdit : fieldView)(f, w)).join("")}</div>
          </div>`).join("")}
        ${Performance.html(w)}
      </div>
    </form>`;

  bindDetail();
  Performance.renderChart(w);
}

function bindDetail() {
  const form = el("worker-form");
  el("back-btn").onclick = () => el("detail").classList.remove("show");
  el("edit-btn")?.addEventListener("click", () => { editing = true; pendingPhoto = null; renderDetail(); });
  el("cancel-btn")?.addEventListener("click", () => { editing = false; pendingPhoto = null; renderDetail(); });
  el("w-photo-input")?.addEventListener("change", e => readPhoto(e.target.files[0]));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const w = current();
    const data = Object.fromEntries(new FormData(form));
    delete data["w-photo-input"];
    Object.assign(w, data, {
      skillLevel: Number(data.skillLevel),
      experience: Number(data.experience) || 0,
      inductionScore: data.inductionScore === "" ? null : Number(data.inductionScore),
      ojtScore: data.ojtScore === "" ? null : Number(data.ojtScore),
    });
    if (pendingPhoto) w.photo = pendingPhoto;
    Store.save(workers);
    editing = false; pendingPhoto = null;
    fillDeptOptions();
    renderList(); renderDetail();
    toast("Worker profile saved");
  });
}

// Square-crop + downscale photo so it fits in localStorage
function readPhoto(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const size = 240, c = document.createElement("canvas"), s = Math.min(img.width, img.height);
      c.width = c.height = size;
      c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
      pendingPhoto = c.toDataURL("image/jpeg", .85);
      el("w-photo").src = pendingPhoto;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function toast(msg) {
  const t = Object.assign(document.createElement("div"), { className: "toast", textContent: msg });
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function select(id) {
  if (editing && id !== selectedId && !confirm("Discard unsaved changes?")) return;
  selectedId = id; editing = false; pendingPhoto = null;
  renderList(); renderDetail();
  el("detail").classList.add("show");   // mobile slide-over
}

function fillDeptOptions() {
  const keep = filters.dept.value;
  filters.dept.innerHTML = `<option value="">All Departments</option>` + uniq("department").map(d => `<option>${d}</option>`).join("");
  filters.dept.value = keep;
}

// ---------- Init ----------
Object.values(filters).forEach(f => f.addEventListener("input", renderList));
el("worker-list").addEventListener("click", e => {
  const li = e.target.closest("[data-id]");
  if (li) select(li.dataset.id);
});

fillDeptOptions();
selectedId = workers[0]?.empId ?? null;   // panel always open: preselect first worker
renderList();
renderDetail();
