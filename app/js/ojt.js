// OJT page: tabs (General + processes) -> 3-day plan, material upload, test with paper upload
(() => {
  const el = id => document.getElementById(id);
  const T = Lang.bi;
  const fromUrl = new URLSearchParams(location.search).get("test");   // QR link: test=ojt-<tab>
  let active = OJT.find(t => `ojt-${t.id}` === fromUrl)?.id || OJT[0].id;

  function renderTabs() {
    el("ojt-tabs").innerHTML = OJT.map(t =>
      `<button class="ojt-tab ${t.id === active ? "active" : ""}" data-id="${t.id}"><span>${t.icon}</span>${T(t.title)}</button>`).join("");
  }

  function renderTab() {
    const tab = OJT.find(t => t.id === active);
    const key = `ojt-${tab.id}`;
    renderTabs();

    el("ojt-intro").innerHTML = `<span class="ico">${tab.icon}</span><div><h2>${T(tab.title)}</h2><p>${T(tab.intro)}</p></div>`;
    el("plan").innerHTML = tab.plan.map(d => `
      <div class="day"><h4>${T({ hi: `दिन ${d.day}`, en: `Day ${d.day}` })}</h4>
        <ul>${d.topics.map(x => `<li>${T(x)}</li>`).join("")}</ul></div>`).join("");
    el("test-title").innerHTML = `${T({ hi: "OJT टेस्ट", en: "OJT Test" })} – ${T(tab.title)}`;

    Uploads.fileSlot(el("ojt-material"), `${key}-ppt`, "Training PPT / PDF");
    const mountTest = () => {
      Uploads.testUploader(el("test-upload"), key, mountTest);
      TestEngine.mount({
        container: el("test-body"), key, defaultTest: tab.test,
        label: `OJT – ${Lang.split(tab.title).en}`,
        // Latest OJT result drives the worker's OJT status on the profile
        onSaved: (w, r) => Object.assign(w, { ojtScore: r.percent, ojtStatus: r.passed ? "Done" : "Failed" }),
      });
    };
    mountTest();
  }

  el("ojt-tabs").onclick = e => {
    const b = e.target.closest("[data-id]");
    if (!b || b.dataset.id === active) return;
    active = b.dataset.id;
    history.replaceState(null, "", location.pathname);   // drop QR params when switching tab
    renderTab();
  };

  Lang.toggle(el("lang"));
  renderTab();
})();
