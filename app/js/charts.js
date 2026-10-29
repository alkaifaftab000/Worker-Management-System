// Dashboard charts (Chart.js)
const Charts = (() => {
  const LEVEL_COLORS = ["#b8bfd6", "#6b7fd7", "#1d2c8f", "#f26522"];   // L1 → L4
  let skillChart, onboardChart;

  if (window.Chart) {
    Chart.defaults.font.family = getComputedStyle(document.body).fontFamily;
    Chart.defaults.color = "#6b7280";
  }

  // Stacked bar: departments × skill level
  function renderSkill(workers) {
    const depts = [...new Set(workers.map(w => w.department))].sort();
    const datasets = [1, 2, 3, 4].map(l => ({
      label: `L${l} ${SKILL_LABELS[l]}`,
      data: depts.map(d => workers.filter(w => w.department === d && w.skillLevel === l).length),
      backgroundColor: LEVEL_COLORS[l - 1],
      borderRadius: 4,
      maxBarThickness: 46,
    }));
    skillChart?.destroy();
    skillChart = new Chart(document.getElementById("chart-skill"), {
      type: "bar",
      data: { labels: depts, datasets },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#eef0f5" } },
        },
      },
    });
  }

  // Doughnut: where each worker is in onboarding
  function renderOnboard(workers) {
    const stage = w =>
      w.inductionStatus !== "Done" ? "Induction pending/failed"
      : w.ojtStatus === "Pending" ? "OJT pending"
      : w.ojtStatus === "Failed" ? "OJT failed"
      : "On line (OJT done)";
    const labels = ["On line (OJT done)", "OJT pending", "OJT failed", "Induction pending/failed"];
    const data = labels.map(l => workers.filter(w => stage(w) === l).length);
    onboardChart?.destroy();
    onboardChart = new Chart(document.getElementById("chart-onboard"), {
      type: "doughnut",
      data: { labels, datasets: [{ data, backgroundColor: ["#1e8449", "#f26522", "#c0392b", "#b8bfd6"], borderWidth: 2, borderColor: "#fff" }] },
      options: {
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } } },
      },
    });
  }

  function render(workers) {
    if (!window.Chart) return;   // CDN not loaded (offline)
    renderSkill(workers);
    renderOnboard(workers);
  }

  return { render };
})();
