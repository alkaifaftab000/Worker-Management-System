// Reusable test engine: identify worker (ID / QR) -> sectioned MCQ + subjective -> auto score -> save
// TestEngine.mount({ container, key, defaultTest, label, onSaved(worker, result) })
const TestEngine = (() => {
  const T = Lang.bi;

  function mount(cfg) {
    const box = cfg.container;
    const test = Uploads.getTest(cfg.key) || cfg.defaultTest;
    const mcqs = test.sections.flatMap(s => s.questions.filter(q => q.type === "mcq"));
    const totalMarks = mcqs.reduce((s, q) => s + q.marks, 0);
    const workers = Store.load();
    let worker = null;

    const pageUrl = () => location.href.split(/[?#]/)[0];
    const testUrl = id => `${pageUrl()}?emp=${encodeURIComponent(id)}&test=${cfg.key}#${box.id}`;
    const find = id => workers.find(w => String(w.empId).toUpperCase() === String(id).trim().toUpperCase());
    const $ = sel => box.querySelector(sel);

    // ---------- Step 1: identify ----------
    function renderStart(msg = "") {
      box.innerHTML = `
        <div class="test-start">
          <div class="start-card">
            <h3>${T({ hi: "टेस्ट शुरू करें", en: "Start the test" })}</h3>
            <p class="muted">${T({ hi: "कर्मचारी आईडी डालें", en: "Enter the worker's Employee ID" })} · ${mcqs.length} MCQ · ${totalMarks} marks · Pass ${test.passPercent}%</p>
            <form class="start-form">
              <input placeholder="Employee ID e.g. PE1200" required>
              <button class="btn" type="submit">Start</button>
            </form>
            <button type="button" class="link-btn qr-btn">${T({ hi: "या वर्कर के फ़ोन के लिए QR बनाएं →", en: "or generate a QR for the worker's phone →" })}</button>
            <p class="test-msg">${msg}</p>
          </div>
          <div class="qr-card">
            <div class="qr-box"><span>QR</span></div>
            <h3>${T({ hi: "स्कैन करें और टेस्ट दें", en: "Scan to take test" })}</h3>
            <p class="muted">${T({ hi: "आईडी डालकर QR बनाएं – वर्कर फ़ोन से स्कैन करेगा, टेस्ट उसकी आईडी के साथ खुलेगा।", en: "Enter an ID and generate a QR – the worker scans it and the test opens with their ID." })}</p>
            <p class="note-sm">Pilot: phone scanning works once the app is hosted on the ILJIN server.</p>
          </div>
        </div>`;
      $(".start-form").onsubmit = e => { e.preventDefault(); begin($(".start-form input").value); };
      $(".qr-btn").onclick = () => {
        const w = find($(".start-form input").value);
        if (!w) return ($(".test-msg").textContent = "Enter a valid Employee ID first");
        const q = $(".qr-box");
        q.innerHTML = "";
        if (window.QRCode) new QRCode(q, { text: testUrl(w.empId), width: 170, height: 170, colorDark: "#0b1a5c", colorLight: "#ffffff" });
        else q.textContent = "QR library not loaded (offline)";
        q.insertAdjacentHTML("beforeend", `<div class="qr-who">${w.name} · ${w.empId}</div>`);
      };
    }

    // ---------- Step 2: questions ----------
    function begin(id) {
      worker = find(id);
      if (!worker) return renderStart("Employee ID not found");
      let n = 0;
      box.innerHTML = `
        <div class="test-worker">
          <img src="${worker.photo}" alt="" onerror="avatarFallback(this, '${worker.name}')">
          <div><b>${worker.name}</b><span>${worker.empId} · ${worker.department} – ${worker.function}</span></div>
          <div class="test-meta">${cfg.label} · ${totalMarks} marks · Pass ${test.passPercent}%</div>
        </div>
        <form class="test-form dual">
          ${test.sections.map(s => `
            <fieldset class="test-section">
              <legend><span>${s.icon || "📝"}</span> ${T(s.title)}</legend>
              ${s.questions.map(q => {
                const name = `q${++n}`;
                const head = `<div class="q-head"><span class="q-num">Q${n}</span><div class="q-text">${T({ en: q.q, hi: q.hi })}</div>
                  ${q.type === "mcq" ? `<span class="q-marks">${q.marks} marks</span>` : `<span class="q-marks subj">${T({ hi: "लिखित", en: "Subjective" })}</span>`}</div>`;
                const body = q.type === "mcq"
                  ? `<div class="options">${q.options.map((o, i) => `
                      <label class="opt"><input type="radio" name="${name}" value="${i}" required><span class="letter">${"ABCD"[i]}</span><span>${T(o)}</span></label>`).join("")}</div>`
                  : `<textarea name="${name}" rows="3" placeholder="हिंदी या English में उत्तर लिखें…"></textarea>`;
                return `<div class="question">${head}${body}</div>`;
              }).join("")}
            </fieldset>`).join("")}
          <div class="test-actions">
            <button type="button" class="nav-btn cancel">Cancel</button>
            <button type="submit" class="btn">${T({ hi: "जमा करें", en: "Submit" })}</button>
          </div>
        </form>`;
      $(".cancel").onclick = () => renderStart();
      $(".test-form").onsubmit = e => { e.preventDefault(); submit(new FormData(e.target)); };
      box.scrollIntoView({ behavior: "smooth" });
    }

    // ---------- Step 3: score + save ----------
    function submit(data) {
      let n = 0, score = 0;
      const perSection = test.sections.map(s => {
        let got = 0, max = 0;
        const answers = [];
        s.questions.forEach(q => {
          const v = data.get(`q${++n}`);
          if (q.type === "mcq") { max += q.marks; if (Number(v) === q.answer) got += q.marks; }
          else answers.push({ q: q.hi || q.q, a: v || "" });
        });
        score += got;
        return { title: s.title, icon: s.icon || "📝", got, max, answers };
      });
      const percent = Math.round((score / totalMarks) * 100);
      const passed = percent >= test.passPercent;
      const result = { date: new Date().toISOString().slice(0, 10), score, total: totalMarks, percent, passed, subjective: perSection.flatMap(s => s.answers) };

      const w = workers.find(x => x.empId === worker.empId);
      w.tests = { ...(w.tests || {}), [cfg.key]: result };
      cfg.onSaved?.(w, result);
      Store.save(workers);

      box.innerHTML = `
        <div class="result ${passed ? "pass" : "fail"}">
          <div class="result-ring" style="--p:${percent}"><span>${percent}%</span></div>
          <div>
            <h3>${passed ? T({ hi: "पास ✓", en: "Passed ✓" }) : T({ hi: "पास नहीं", en: "Not passed" })}</h3>
            <p><b>${worker.name}</b> – <b>${score} / ${totalMarks}</b> (pass ${test.passPercent}%)</p>
            <p class="muted">${cfg.label} · result saved to worker profile.</p>
          </div>
        </div>
        <div class="section-scores">
          ${perSection.map(s => `<div class="sec-score"><span>${s.icon} ${T(s.title)}</span><b>${s.got}/${s.max}</b>
            <div class="bar"><div style="width:${s.max ? (s.got / s.max) * 100 : 0}%"></div></div></div>`).join("")}
        </div>
        <p class="note-sm">Subjective answers are saved for HR review and not auto-scored.</p>
        <div class="test-actions"><button class="btn next">${T({ hi: "अगला वर्कर", en: "Next Worker" })}</button></div>`;
      $(".next").onclick = () => { history.replaceState(null, "", pageUrl() + "#" + box.id); renderStart(); };
    }

    // Opened from QR: ?emp=ID&test=key
    const p = new URLSearchParams(location.search);
    renderStart();
    if (p.get("emp") && (!p.get("test") || p.get("test") === cfg.key)) begin(p.get("emp"));
  }

  return { mount };
})();
