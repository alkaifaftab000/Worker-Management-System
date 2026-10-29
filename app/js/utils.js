// Shared helpers
const SKILL_LABELS = { 1: "Unskilled", 2: "Semi-skilled", 3: "Skilled", 4: "Multi-skilled" };

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function statusBadge(status) {
  return `<span class="badge ${status.toLowerCase()}">${status}</span>`;
}

function skillBadge(level) {
  return `<span class="badge l${level}">L${level} · ${SKILL_LABELS[level]}</span>`;
}

// Fallback avatar (initials) when the photo URL fails
function avatarFallback(img, name) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  img.onerror = null;
  img.src = `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' fill='#1d2c8f'/><text x='50%' y='55%' fill='#fff' font-family='Arial' font-size='15' text-anchor='middle' dominant-baseline='middle'>${initials}</text></svg>`
  )}`;
}
