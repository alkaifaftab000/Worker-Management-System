// HR Dashboard: KPIs, filters, worker list, Excel import
let workers = Store.load();

const el = id => document.getElementById(id);
const filters = { search: el("f-search"), dept: el("f-dept"), func: el("f-func"), ojt: el("f-ojt"), skill: el("f-skill") };

function fillOptions(select, values) {
  const first = select.options[0];
  select.innerHTML = "";
  select.appendChild(first);
  [...new Set(values)].sort().forEach(v => select.add(new Option(v, v)));
}

function renderKpis() {
  const count = fn => workers.filter(fn).length;
  const cards = [
    { label: "Total Joined", value: workers.length, hint: "All workers", color: "var(--navy)", set: {} },
    { label: "Multi / Skilled", value: count(w => w.skillLevel >= 3), hint: "Level 3 & 4", color: "#1e8449", set: { skill: "3" } },
    { label: "Semi-skilled", value: count(w => w.skillLevel === 2), hint: "Level 2", color: "#3b5bdb", set: { skill: "2" } },
    { label: "Unskilled", value: count(w => w.skillLevel === 1), hint: "Level 1", color: "#888", set: { skill: "1" } },
    { label: "Induction Pending", value: count(w => w.inductionStatus !== "Done"), hint: "Pending / failed", color: "#c0392b", set: {} },
    { label: "In OJT", value: count(w => w.ojtStatus === "In Progress"), hint: "Day 2–4 · 3-day OJT", color: "#3b5bdb", set: { ojt: "In Progress" } },
    { label: "OJT Pending", value: count(w => w.ojtStatus === "Pending"), hint: "Induction done / due", color: "var(--orange)", set: { ojt: "Pending" } },
  ];
  el("kpis").innerHTML = cards.map((c, i) => `
    <div class="kpi" data-i="${i}" style="--kpi:${c.color}">
      <div class="label">${c.label}</div>
      <div class="value">${c.value}</div>
      <div class="hint">${c.hint}</div>
    </div>`).join("");

  // Click a KPI card to filter the list
  el("kpis").querySelectorAll(".kpi").forEach(k => k.onclick = () => {
    resetFilters(false);
    Object.entries(cards[k.dataset.i].set).forEach(([key, v]) => filters[key].value = v);
    renderTable();
  });
}

function filtered() {
  const q = filters.search.value.trim().toLowerCase();
  return workers.filter(w =>
    (!q || w.name.toLowerCase().includes(q) || String(w.empId).toLowerCase().includes(q)) &&
    (!filters.dept.value || w.department === filters.dept.value) &&
    (!filters.func.value || w.function === filters.func.value) &&
    (!filters.ojt.value || w.ojtStatus === filters.ojt.value) &&
    // "3" from the Skilled KPI means L3 and above
    (!filters.skill.value || (filters.skill.value === "3" ? w.skillLevel >= 3 : w.skillLevel == filters.skill.value))
  );
}

function renderTable() {
  const list = filtered();
  el("count").textContent = `${list.length} of ${workers.length}`;
  el("worker-rows").innerHTML = list.length ? list.map(w => `
    <tr data-id="${w.empId}">
      <td><div class="person">
        <img src="${w.photo}" alt="" loading="lazy" onerror="avatarFallback(this, '${w.name}')">
        <div><div class="name">${w.name}</div><div class="id">${w.empId}</div></div>
      </div></td>
      <td>${w.department}</td>
      <td>${w.function}</td>
      <td>${w.line}</td>
      <td>${formatDate(w.doj)}</td>
      <td>${statusBadge(w.inductionStatus)}</td>
      <td>${statusBadge(w.ojtStatus)}</td>
      <td>${skillBadge(w.skillLevel)}</td>
    </tr>`).join("") : `<tr><td colspan="8" class="empty">No workers match these filters</td></tr>`;
}

function resetFilters(render = true) {
  Object.values(filters).forEach(f => f.value = "");
  if (render) renderTable();
}

function refreshAll() {
  fillOptions(filters.dept, workers.map(w => w.department));
  fillOptions(filters.func, workers.map(w => w.function));
  renderKpis();
  Charts.render(workers);
  renderTable();
}

// Department filter narrows the process list
filters.dept.addEventListener("change", () => {
  const src = filters.dept.value ? workers.filter(w => w.department === filters.dept.value) : workers;
  fillOptions(filters.func, src.map(w => w.function));
});
Object.values(filters).forEach(f => f.addEventListener("input", renderTable));
el("f-reset").addEventListener("click", () => resetFilters());

el("worker-rows").addEventListener("click", e => {
  const row = e.target.closest("tr[data-id]");
  if (row) Profile.open(workers.find(w => String(w.empId) === row.dataset.id));
});

refreshAll();
