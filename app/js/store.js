// Worker data store – localStorage for now, swap for API later
const Store = (() => {
  const KEY = "wms-workers-v3";   // bump when data shape changes

  // Fill missing fields so older / imported records render safely
  const normalise = w => ({
    ...w,
    empId: String(w.empId ?? ""), name: String(w.name || "Unknown"), photo: w.photo || "",
    inductionStatus: w.inductionStatus || "Pending", ojtStatus: w.ojtStatus || "Pending",
    skillLevel: Number(w.skillLevel) || 1,
    assessments: Array.isArray(w.assessments) ? w.assessments : [],
    trainings: Array.isArray(w.trainings) ? w.trainings : [],
  });

  function load() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) return JSON.parse(saved).map(normalise);
    } catch (e) { /* storage unavailable / corrupt – fall back to dummy data */ }
    return WORKERS.map(normalise);
  }

  // Back to the bundled dummy data (clears imports & edits in this browser)
  function reset() {
    try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
  }

  function save(workers) {
    try { localStorage.setItem(KEY, JSON.stringify(workers)); } catch (e) { /* ignore */ }
  }

  // Excel import – columns must match dummy_workers.xlsx headers
  async function importExcel(file) {
    const wb = XLSX.read(await file.arrayBuffer());
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
    if (!rows.length || !("empId" in rows[0])) throw new Error("Excel format not recognised. Use the dummy_workers.xlsx column headers.");
    // Optional sheets: Assessments / Trainings, linked by empId
    const sheet = name => wb.Sheets[name] ? XLSX.utils.sheet_to_json(wb.Sheets[name], { defval: "" }) : [];
    const byEmp = list => list.reduce((m, x) => { const id = String(x.empId); delete x.empId; (m[id] ||= []).push(x); return m; }, {});
    const assessments = byEmp(sheet("Assessments"));
    const trainings = byEmp(sheet("Trainings"));
    const workers = rows.map(r => ({
      ...r,
      empId: String(r.empId),
      skillLevel: Number(r.skillLevel) || 1,
      inductionScore: r.inductionScore === "" ? null : r.inductionScore,
      ojtScore: r.ojtScore === "" ? null : r.ojtScore,
      assessments: assessments[String(r.empId)] || [],
      trainings: trainings[String(r.empId)] || [],
    }));
    save(workers);
    return workers;
  }

  return { load, save, reset, importExcel };
})();
