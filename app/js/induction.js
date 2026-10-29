// Induction slide viewer: modules (left) + slides (right). Text is bilingual via Lang.bi
(() => {
  const el = id => document.getElementById(id);
  const T = Lang.bi;
  // Flatten to one slide list so Next/Prev flows across modules
  const slides = INDUCTION.flatMap((m, mi) => m.slides.map((s, si) => ({ ...s, mi, si })));
  const seen = new Set();
  let idx = 0;

  const RENDER = {
    hero: s => `<div class="slide hero">
      <div class="eyebrow">${T(s.eyebrow)}</div><h2>${T(s.title)}</h2><div class="accent-line"></div><p>${T(s.text)}</p></div>`,
    points: s => `<div class="slide"><h2>${T(s.title)}</h2><div class="accent-line"></div>
      <ul class="points">${s.points.map(p => `<li>${T(p)}</li>`).join("")}</ul></div>`,
    stats: s => `<div class="slide"><h2>${T(s.title)}</h2><div class="accent-line"></div>
      <div class="stats">${s.stats.map(x => `<div class="stat"><b>${x.value}</b><span>${T(x.label)}</span></div>`).join("")}</div></div>`,
    grid: s => `<div class="slide"><h2>${T(s.title)}</h2><div class="accent-line"></div>
      <div class="grid">${s.items.map(c => `<div class="card"><div class="ci">${c.icon}</div><h3>${T(c.title)}</h3><p>${T(c.text)}</p></div>`).join("")}</div></div>`,
    flow: s => `<div class="slide"><h2>${T(s.title)}</h2><div class="accent-line"></div>
      <div class="flow">${s.steps.map((f, i) => `<div class="flow-step"><div class="n">${i + 1}</div><div><h3>${T(f.title)}</h3><p>${T(f.text)}</p></div></div>`).join("")}</div></div>`,
  };

  function renderModules() {
    const cur = slides[idx].mi;
    el("modules").innerHTML = INDUCTION.map((m, i) => {
      const done = m.slides.every((_, si) => seen.has(`${i}-${si}`));
      return `<button class="module ${i === cur ? "active" : ""} ${done ? "done" : ""}" data-m="${i}">
        <span class="ico">${m.icon}</span>${T(m.title)}<span class="num">${m.slides.length}</span></button>`;
    }).join("");
  }

  function render() {
    const s = slides[idx];
    seen.add(`${s.mi}-${s.si}`);
    const area = el("slide");
    area.innerHTML = RENDER[s.kind](s);
    area.style.animation = "none"; area.offsetHeight; area.style.animation = "";   // replay fade

    const mod = INDUCTION[s.mi];
    el("dots").innerHTML = mod.slides.map((_, i) => `<button class="dot ${i === s.si ? "active" : ""}" data-si="${i}" aria-label="Slide ${i + 1}"></button>`).join("");
    el("progress-bar").style.width = `${((idx + 1) / slides.length) * 100}%`;
    el("prev").disabled = idx === 0;
    el("next").innerHTML = idx === slides.length - 1 ? T({ hi: "टेस्ट दें ✓", en: "Take Test ✓" }) : T({ hi: "आगे →", en: "Next →" });
    renderModules();
  }

  const go = i => { idx = Math.max(0, Math.min(slides.length - 1, i)); render(); };
  const firstOf = mi => slides.findIndex(s => s.mi === mi);

  el("prev").onclick = () => go(idx - 1);
  el("next").onclick = () => idx === slides.length - 1
    ? el("induction-test").scrollIntoView({ behavior: "smooth" })
    : go(idx + 1);
  el("modules").onclick = e => { const b = e.target.closest("[data-m]"); if (b) go(firstOf(+b.dataset.m)); };
  el("dots").onclick = e => { const d = e.target.closest("[data-si]"); if (d) go(firstOf(slides[idx].mi) + +d.dataset.si); };
  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea, select")) return;
    if (e.key === "ArrowRight") go(idx + 1);
    if (e.key === "ArrowLeft") go(idx - 1);
  });
  el("present-btn").onclick = () => el("viewer").requestFullscreen?.();

  // Language switch, uploads, test
  Lang.toggle(el("lang"));
  Uploads.fileSlot(el("ppt-slot"), "induction-ppt", "Induction PPT");
  const mountTest = () => {
    Uploads.testUploader(el("test-upload"), "induction", mountTest);
    TestEngine.mount({
      container: el("test-body"), key: "induction", defaultTest: INDUCTION_TEST, label: "Induction Test",
      onSaved: (w, r) => Object.assign(w, { inductionScore: r.score, inductionStatus: r.passed ? "Done" : "Failed" }),
    });
  };
  mountTest();

  render();
})();
