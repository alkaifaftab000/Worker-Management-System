// Tab switching + form handling for login page
const tabs = document.querySelectorAll(".tab");
const forms = { worker: document.getElementById("worker-form"), staff: document.getElementById("staff-form") };
const message = document.getElementById("message");

function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    Object.values(forms).forEach(f => f.classList.remove("active"));
    tab.classList.add("active");
    forms[tab.dataset.tab].classList.add("active");
    showMessage("", "");
  });
});

forms.worker.addEventListener("submit", e => {
  e.preventDefault();
  const worker = Auth.loginWorker(
    document.getElementById("emp-id").value,
    document.getElementById("dob").value
  );
  if (worker) {
    try { sessionStorage.setItem("wms-worker", worker.empId); } catch (err) { /* ignore */ }
    window.location.href = `worker-profile.html?id=${encodeURIComponent(worker.empId)}`;
  }
  else showMessage("Invalid Employee ID or Date of Birth", "error");
});

forms.staff.addEventListener("submit", e => {
  e.preventDefault();
  const user = Auth.loginStaff(
    document.getElementById("email").value,
    document.getElementById("password").value
  );
  if (user) window.location.href = "dashboard.html";
  else showMessage("Invalid email or password", "error");
});
