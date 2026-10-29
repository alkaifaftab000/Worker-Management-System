// Shared helpers
const SKILL_LABELS = { 1: "Unskilled", 2: "Semi-skilled", 3: "Skilled", 4: "Multi-skilled" };

function formatDate(iso) {
  const d = new Date(iso);
  if (!iso || isNaN(d)) return iso || "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function addDays(iso, days) {
  const d = new Date(iso);
  if (isNaN(d)) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// "In Progress" -> class "progress"
const statusClass = s => String(s).toLowerCase().replace("in progress", "progress");

function statusBadge(status, label = status) {
  return `<span class="badge ${statusClass(status)}">${label}</span>`;
}

// Onboarding: Day 1 joining + induction, Day 2-4 OJT (3 days), Day 5+ on line
function onboardingStage(w) {
  if (w.inductionStatus !== "Done") return { key: "induction", label: "Induction (Day 1)" };
  if (w.ojtStatus === "In Progress") return { key: "ojt", label: `OJT Day ${w.ojtDay || 1} of 3` };
  if (w.ojtStatus === "Pending") return { key: "ojt", label: "OJT starts next day" };
  if (w.ojtStatus === "Failed") return { key: "retrain", label: "OJT re-training" };
  return { key: "line", label: "On line" };
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
