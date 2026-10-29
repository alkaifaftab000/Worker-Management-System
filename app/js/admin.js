// HR admin profile: sidebar card + edit modal (saved in localStorage for now)
(() => {
  const KEY = "wms-admin";
  const defaults = {
    name: "HR Admin", empId: "HR001", designation: "HR Executive", department: "Human Resources",
    email: "hr@iljin.com", phone: "", location: "ILJIN – Noida Plant", photo: "",
  };
  document.body.insertAdjacentHTML("beforeend", `
    <div class="modal" id="admin-modal" aria-hidden="true">
      <form class="modal-card" id="admin-form">
        <header class="modal-head">
          <h3>My Profile</h3>
          <button type="button" class="modal-close" data-close aria-label="Close">×</button>
        </header>
        <div class="photo-edit">
          <img id="admin-photo-preview" src="" alt="">
          <label class="photo-btn">Change Photo<input type="file" id="admin-photo-input" accept="image/*" hidden></label>
        </div>
        <div class="form-grid">
          <label>Full Name<input name="name" required></label>
          <label>Employee ID<input name="empId"></label>
          <label>Designation<input name="designation"></label>
          <label>Department<input name="department"></label>
          <label>Email<input name="email" type="email"></label>
          <label>Phone<input name="phone" type="tel"></label>
          <label class="full">Plant / Location<input name="location"></label>
        </div>
        <footer class="modal-foot">
          <button type="button" class="reset-btn" data-close>Cancel</button>
          <button type="submit" class="btn">Save</button>
        </footer>
      </form>
    </div>`);

  const el = id => document.getElementById(id);
  const modal = el("admin-modal");
  const form = el("admin-form");
  let admin = load();
  let pendingPhoto = null;

  function load() {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; }
    catch (e) { return { ...defaults }; }
  }

  function setPhoto(img, a) {
    img.onerror = () => avatarFallback(img, a.name);
    img.src = a.photo || "x";   // empty photo -> triggers initials fallback
  }

  function renderCard() {
    setPhoto(el("admin-photo"), admin);
    el("admin-name").textContent = admin.name;
    el("admin-role").textContent = admin.designation;
  }

  function openModal() {
    pendingPhoto = null;
    Object.keys(defaults).forEach(k => { if (form.elements[k]) form.elements[k].value = admin[k]; });
    setPhoto(el("admin-photo-preview"), admin);
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // Photo: read as data URL, downscale to keep localStorage small
  el("admin-photo-input").addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const size = 200, c = document.createElement("canvas");
        c.width = c.height = size;
        const s = Math.min(img.width, img.height);
        c.getContext("2d").drawImage(img, (img.width - s) / 2, (img.height - s) / 2, s, s, 0, 0, size, size);
        pendingPhoto = c.toDataURL("image/jpeg", .85);
        el("admin-photo-preview").src = pendingPhoto;
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    Object.keys(defaults).forEach(k => { if (form.elements[k]) admin[k] = form.elements[k].value.trim(); });
    if (pendingPhoto) admin.photo = pendingPhoto;
    try { localStorage.setItem(KEY, JSON.stringify(admin)); } catch (err) { /* ignore */ }
    renderCard();
    closeModal();
  });

  el("admin-card").addEventListener("click", openModal);
  modal.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", closeModal));
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  renderCard();
})();
