// Training & Performance section of the worker profile
// Assumed flow (to confirm with ILJIN): OJT score -> monthly 1-hr trainings -> quarterly supervisor assessment (/40 -> level)
const Performance = (() => {
  let chart;

  const addDays = (iso, d) => { const x = new Date(iso); x.setDate(x.getDate() + d); return x.toISOString().slice(0, 10); };

  function nextAssessment(w) {
    if (w.ojtStatus !== "Done") return "After OJT";
    const last = w.assessments?.at(-1)?.date || w.doj;
    return formatDate(addDays(last, 90));
  }

  function html(w) {
    const a = w.assessments || [], t = w.trainings || [];
    const hours = t.reduce((s, x) => s + Number(x.hours || 0), 0);
    const last = a.at(-1);
    return `
      <div class="panel-box wide">
        <h4>Training & Performance</h4>
        <div class="assume-note">
          <strong>To confirm with client:</strong> assumed flow is OJT score → 1 hr training per month →
          supervisor assessment every 3 months (Technical 15 + Safety 10 + Quality 15 = 40 marks → skill level).
        </div>
        <div class="perf-kpis">
          <div><span class="k">Training Hours</span><b>${hours}</b></div>
          <div><span class="k">Trainings</span><b>${t.length}</b></div>
          <div><span class="k">Last Review</span><b>${last ? `${last.total}/40` : "—"}</b></div>
          <div><span class="k">Next Assessment</span><b>${nextAssessment(w)}</b></div>
        </div>
        ${a.length ? `<div class="perf-chart"><canvas id="perf-chart"></canvas></div>` : `<p class="muted-line">No supervisor assessments yet – first review due 3 months after OJT.</p>`}
      </div>

      <div class="panel-box wide">
        <h4>Supervisor Reviews</h4>
        ${a.length ? `<div class="mini-table"><table>
          <thead><tr><th>Cycle</th><th>Date</th><th>Technical /15</th><th>Safety /10</th><th>Quality /15</th><th>Total /40</th><th>Reviewer</th><th>Remarks</th></tr></thead>
          <tbody>${a.slice().reverse().map(r => `<tr>
            <td><b>${r.cycle}</b></td><td>${formatDate(r.date)}</td><td>${r.technical}</td><td>${r.safety}</td><td>${r.quality}</td>
            <td><b>${r.total}</b></td><td>${r.reviewer}</td><td>${r.remarks}</td></tr>`).join("")}</tbody>
        </table></div>` : `<p class="muted-line">No reviews yet.</p>`}
      </div>

      <div class="panel-box wide">
        <h4>Training Log</h4>
        ${t.length ? `<div class="mini-table"><table>
          <thead><tr><th>Date</th><th>Topic</th><th>Hours</th><th>Trainer</th><th>Score /10</th></tr></thead>
          <tbody>${t.slice().reverse().map(x => `<tr>
            <td>${formatDate(x.date)}</td><td>${x.topic}</td><td>${x.hours}</td><td>${x.trainer}</td><td>${x.score}</td></tr>`).join("")}</tbody>
        </table></div>` : `<p class="muted-line">No trainings recorded yet.</p>`}
      </div>`;
  }

  // Stacked bars (Technical/Safety/Quality) + total line, with level bands at 10/20/30
  function renderChart(w) {
    chart?.destroy();
    const canvas = document.getElementById("perf-chart");
    if (!canvas || !window.Chart) return;
    const a = w.assessments;
    chart = new Chart(canvas, {
      data: {
        labels: a.map(r => `${r.cycle} · ${formatDate(r.date)}`),
        datasets: [
          { type: "line", label: "Total /40", data: a.map(r => r.total), borderColor: "#f26522", backgroundColor: "#f26522", tension: .3, pointRadius: 4 },
          { type: "bar", label: "Technical", data: a.map(r => r.technical), backgroundColor: "#1d2c8f", stack: "s", maxBarThickness: 36 },
          { type: "bar", label: "Safety", data: a.map(r => r.safety), backgroundColor: "#6b7fd7", stack: "s", maxBarThickness: 36 },
          { type: "bar", label: "Quality", data: a.map(r => r.quality), backgroundColor: "#b8bfd6", stack: "s", maxBarThickness: 36 },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, usePointStyle: true } } },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: {
            stacked: true, min: 0, max: 40,
            ticks: { stepSize: 10, callback: v => ({ 10: "10 · L1", 20: "20 · L2", 30: "30 · L3", 40: "40 · L4" })[v] ?? v },
            grid: { color: ctx => [10, 20, 30].includes(ctx.tick.value) ? "#f2c3a9" : "#eef0f5" },
          },
        },
      },
    });
  }

  return { html, renderChart };
})();
