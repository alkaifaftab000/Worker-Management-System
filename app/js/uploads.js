// Uploads: test papers (Excel -> questions, localStorage) and PPT/PDF material (IndexedDB)
const Uploads = (() => {
  const TEST_KEY = k => `wms-test-${k}`;
  const PASS_KEY = k => `wms-pass-${k}`;

  // HR-defined minimum pass % per test (falls back to the paper's default)
  function getPass(key, fallback = 40) {
    try { const v = Number(localStorage.getItem(PASS_KEY(key))); return v > 0 ? v : fallback; } catch (e) { return fallback; }
  }
  function setPass(key, v) {
    try { localStorage.setItem(PASS_KEY(key), String(v)); } catch (e) { /* ignore */ }
  }

  // ---------- Test papers ----------
  // Template columns: Section | Type | Question (English) | Question (Hindi) | Option A-D | Answer | Marks
  const HEADERS = ["Section", "Type", "Question (English)", "Question (Hindi)", "Option A", "Option B", "Option C", "Option D", "Answer", "Marks"];

  function getTest(key) {
    try { return JSON.parse(localStorage.getItem(TEST_KEY(key))); } catch (e) { return null; }
  }

  async function parseTestExcel(file, passPercent = 40) {
    const wb = XLSX.read(await file.arrayBuffer());
    const rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { defval: "" });
    if (!rows.length || !("Question (English)" in rows[0] || "Question (Hindi)" in rows[0]))
      throw new Error("Format not recognised – please use the template (Download template).");
    const sections = [];
    rows.forEach(r => {
      const title = String(r.Section || "General").trim();
      let sec = sections.find(s => s.title === title);
      if (!sec) sections.push(sec = { id: title.toLowerCase().replace(/\W+/g, "-"), title, icon: "📝", questions: [] });
      const isText = /text|subj/i.test(r.Type);
      const options = ["Option A", "Option B", "Option C", "Option D"].map(k => String(r[k]).trim()).filter(Boolean);
      const q = { type: isText ? "text" : "mcq", q: String(r["Question (English)"]).trim(), hi: String(r["Question (Hindi)"]).trim() };
      if (!isText) Object.assign(q, { options, answer: "ABCD".indexOf(String(r.Answer).trim().toUpperCase()), marks: Number(r.Marks) || 1 });
      sec.questions.push(q);
    });
    const missingKey = sections.flatMap(s => s.questions).filter(q => q.type === "mcq" && q.answer < 0).length;
    return { passPercent, sections, uploaded: { name: file.name, date: new Date().toISOString().slice(0, 10) }, missingKey };
  }

  function downloadTemplate(name = "test_paper_template.xlsx") {
    const sample = [
      HEADERS,
      ["General", "MCQ", "What is the full form of WI?", "WI की फुल फॉर्म क्या होती है?", "Work Instruction", "Work Information", "", "", "A", 2],
      ["General", "Text", "Why do we use a red bin?", "रेड बिन क्यों यूज की जाती है?", "", "", "", "", "", ""],
    ];
    const ws = XLSX.utils.aoa_to_sheet(sample);
    ws["!cols"] = HEADERS.map((_, i) => ({ wch: i < 2 ? 10 : 32 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Questions");
    XLSX.writeFile(wb, name);
  }

  // Renders upload / template / reset controls for a test. onChange() is called after upload or reset.
  function testUploader(target, key, onChange, defaultPass = 40) {
    const up = getTest(key);
    const pass = getPass(key, defaultPass);
    target.innerHTML = `
      <div class="upload-bar">
        <span class="up-ico">📄</span>
        <div class="up-info"><b>Test paper</b><small>${up ? `Uploaded: ${up.uploaded.name} · ${up.uploaded.date}` : "Using default questions"}</small></div>
        <label class="up-btn">Upload Excel<input type="file" accept=".xlsx,.xls" hidden></label>
        <button type="button" class="up-link" data-act="tpl">Template</button>
        ${up ? `<button type="button" class="up-link" data-act="reset">Reset</button>` : ""}
        <label class="pass-set" title="Minimum marks to pass">Pass mark
          <input type="number" min="1" max="100" value="${pass}"> %
        </label>
      </div>`;
    target.querySelector(".pass-set input").onchange = e => {
      const v = Math.min(100, Math.max(1, Number(e.target.value) || defaultPass));
      setPass(key, v);
      onChange();
    };
    target.querySelector("input").onchange = async e => {
      try {
        const test = await parseTestExcel(e.target.files[0]);
        localStorage.setItem(TEST_KEY(key), JSON.stringify(test));
        alert(`Uploaded ${test.sections.reduce((n, s) => n + s.questions.length, 0)} questions.` + (test.missingKey ? `\n⚠ ${test.missingKey} MCQ(s) have no Answer (A–D).` : ""));
        onChange();
      } catch (err) { alert(err.message); }
    };
    target.querySelector('[data-act="tpl"]').onclick = () => downloadTemplate(`${key}_template.xlsx`);
    const reset = target.querySelector('[data-act="reset"]');
    if (reset) reset.onclick = () => { if (confirm("Remove uploaded paper and use default questions?")) { localStorage.removeItem(TEST_KEY(key)); onChange(); } };
  }

  // ---------- Files (PPT / PDF) in IndexedDB ----------
  const db = new Promise((res, rej) => {
    const r = indexedDB.open("wms-files", 1);
    r.onupgradeneeded = () => r.result.createObjectStore("files");
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  const tx = async (mode, fn) => { const d = await db; return new Promise((res, rej) => { const q = fn(d.transaction("files", mode).objectStore("files")); q.onsuccess = () => res(q.result); q.onerror = () => rej(q.error); }); };
  const putFile = (key, file) => tx("readwrite", s => s.put({ name: file.name, type: file.type, date: new Date().toISOString().slice(0, 10), blob: file }, key));
  const getFile = key => tx("readonly", s => s.get(key));
  const delFile = key => tx("readwrite", s => s.delete(key));

  // Renders a material slot: upload PPT/PDF, view PDF inline, download PPT
  async function fileSlot(target, key, label = "Presentation") {
    let f = null;
    try { f = await getFile(key); } catch (e) { /* IndexedDB unavailable */ }
    const isPdf = f && (f.type === "application/pdf" || /\.pdf$/i.test(f.name));
    const url = f ? URL.createObjectURL(f.blob) : "";
    target.innerHTML = `
      <div class="upload-bar">
        <span class="up-ico">📊</span>
        <div class="up-info"><b>${label}</b><small>${f ? `${f.name} · ${f.date}` : "No file uploaded – PDF shows here; PPT/PPTX can be downloaded"}</small></div>
        <label class="up-btn">Upload PPT / PDF<input type="file" accept=".pdf,.ppt,.pptx" hidden></label>
        ${f ? `<a class="up-link" href="${url}" download="${f.name}">Download</a><button type="button" class="up-link" data-act="del">Remove</button>` : ""}
      </div>
      ${isPdf ? `<iframe class="pdf-view" src="${url}" title="${f.name}"></iframe>` : ""}
      ${f && !isPdf ? `<p class="up-hint">PowerPoint can't be shown inside the browser – use <b>Download</b>, or upload it as PDF (PowerPoint → Save As → PDF) to view here.</p>` : ""}`;
    target.querySelector("input").onchange = async e => { await putFile(key, e.target.files[0]); fileSlot(target, key, label); };
    const del = target.querySelector('[data-act="del"]');
    if (del) del.onclick = async () => { await delFile(key); fileSlot(target, key, label); };
  }

  return { getTest, getPass, testUploader, fileSlot, downloadTemplate };
})();
