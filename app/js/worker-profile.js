// Worker self-service profile (read-only). Opened after Worker login (Employee ID + DOB).
(() => {
  const id = new URLSearchParams(location.search).get("id") || (() => { try { return sessionStorage.getItem("wms-worker"); } catch (e) { return null; } })();
  const w = Store.load().find(x => String(x.empId) === String(id));
  const root = document.getElementById("wp");
  document.getElementById("logout").onclick = () => { try { sessionStorage.removeItem("wms-worker"); } catch (e) { /* ignore */ } };

  if (!w) {
    root.innerHTML = `<div class="wp-card not-found">Profile not found. Please <a href="index.html">log in again</a>.</div>`;
    return;
  }

  // Day 1 joining + induction, Day 2-4 OJT, Day 5+ on line
  function journey() {
    const indDone = w.inductionStatus === "Done";
    const ojtFinished = ["Done", "Failed"].includes(w.ojtStatus);
    const ojtDayState = n =>
      ojtFinished || (w.ojtStatus === "In Progress" && w.ojtDay > n) ? "done"
      : w.ojtStatus === "In Progress" && w.ojtDay === n ? "current"
      : indDone && w.ojtStatus === "Pending" && n === 1 ? "current" : "";
    const steps = [
      { n: "1", t: "Joining & Induction", d: w.doj, s: indDone ? "done" : w.inductionStatus === "Failed" ? "failed" : "current",
        sub: w.inductionScore != null ? `Score ${w.inductionScore}` : formatDate(w.doj) },
      ...[1, 2, 3].map(n => ({ n: String(n + 1), t: `OJT Day ${n}`, s: ojtDayState(n), sub: formatDate(addDays(w.doj, n)) })),
      { n: "✓", t: "OJT Test", s: w.ojtStatus === "Done" ? "done" : w.ojtStatus === "Failed" ? "failed" : "", sub: w.ojtScore != null ? `Score ${w.ojtScore}` : "After Day 3" },
      { n: "★", t: "On Line", s: w.ojtStatus === "Done" ? "done" : "", sub: w.ojtStatus === "Done" ? w.line : "From Day 5" },
    ];
    return `<div class="journey">${steps.map(s => `
      <div class="j-step ${s.s}"><div class="j-dot">${s.n}</div><div><b>${s.t}</b><small>${s.sub}</small></div></div>`).join("")}</div>
      <div class="stage-banner">Current stage: ${onboardingStage(w).label}</div>`;
  }

  const field = (k, v, full) => `<div class="field ${full ? "full" : ""}"><span class="k">${k}</span><span class="v">${v || "—"}</span></div>`;

  root.innerHTML = `
    <section class="wp-card">
      <div class="detail-hero">
        <div class="photo-wrap"><img src="${w.photo}" alt="${w.name}" onerror="avatarFallback(this, '${w.name}')"></div>
        <div>
          <h2>${w.name}</h2>
          <p class="sub">${w.empId} · ${w.department} – ${w.function} · ${w.line}</p>
          <div class="hero-badges">${skillBadge(w.skillLevel)} ${statusBadge(w.inductionStatus, "Induction " + w.inductionStatus)} ${statusBadge(w.ojtStatus, "OJT " + w.ojtStatus)}</div>
        </div>
      </div>
    </section>

    <section class="wp-card"><div class="inner"><h4>My Onboarding Journey</h4>${journey()}</div></section>

    <div class="wp-grid">
      <section class="wp-card"><div class="inner"><h4>Job Details</h4><div class="fields">
        ${field("Employee ID", w.empId)}${field("Department", w.department)}
        ${field("Process / Function", w.function)}${field("Line No.", w.line)}
        ${field("Date of Joining", formatDate(w.doj))}${field("Supervisor", w.supervisor)}
      </div></div></section>
      <section class="wp-card"><div class="inner"><h4>Personal</h4><div class="fields">
        ${field("Phone", w.phone)}${field("Email", w.email)}
        ${field("Education", w.education)}${field("Experience", w.experience ? w.experience + " yrs" : "Fresher")}
        ${field("Address", w.address, true)}
      </div></div></section>
    </div>

    <section class="wp-card"><div class="inner detail-body" style="padding:0">${Performance.html(w)}</div></section>
    <p class="note-sm" style="text-align:center;color:var(--muted);font-size:.8rem">Details wrong? Please contact HR. This page is read-only.</p>`;

  Performance.renderChart(w);
})();
