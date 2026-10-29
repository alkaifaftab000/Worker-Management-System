// Language: Hindi (default) / English. Text is rendered in both and CSS shows the selected one.
const Lang = (() => {
  const KEY = "wms-lang";
  let lang = "hi";
  try { lang = localStorage.getItem(KEY) || "hi"; } catch (e) { /* default */ }

  // Accepts {en, hi}, "English / हिंदी" or a plain string
  function split(v) {
    if (v && typeof v === "object") return v;
    const s = String(v ?? "");
    const i = s.indexOf(" / ");
    if (i > -1 && /[ऀ-ॿ]/.test(s.slice(i))) return { en: s.slice(0, i).trim(), hi: s.slice(i + 3).trim() };
    return /[ऀ-ॿ]/.test(s) ? { hi: s } : { en: s };
  }

  // HTML with both languages; CSS decides which shows
  function bi(v) {
    const { en, hi } = split(v);
    if (!en || !hi) return en || hi || "";
    return `<span class="bi"><span class="hi">${hi}</span><span class="en">${en}</span></span>`;
  }

  function apply() {
    document.body.classList.toggle("lang-hi", lang === "hi");
    document.body.classList.toggle("lang-en", lang === "en");
    document.querySelectorAll(".lang-toggle button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  }

  function set(l) {
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) { /* ignore */ }
    apply();
  }

  // Renders a हिंदी | English switch into the given element
  function toggle(target) {
    target.innerHTML = `<div class="lang-toggle"><button data-lang="hi">हिंदी</button><button data-lang="en">English</button></div>`;
    target.querySelectorAll("button").forEach(b => b.onclick = () => set(b.dataset.lang));
    apply();
  }

  document.addEventListener("DOMContentLoaded", apply);
  return { bi, split, toggle, get: () => lang };
})();
