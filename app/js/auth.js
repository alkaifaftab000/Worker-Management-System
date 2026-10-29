// Mock auth – replace with real API calls later
const Auth = (() => {
  const workers = [
    { id: "PE1272", dob: "1995-05-10", name: "Neelam" },
    { id: "94889", dob: "1998-01-22", name: "Shalu" },
  ];
  const staff = [
    { email: "hr@iljin.com", password: "admin123", role: "HR" },
  ];

  function loginWorker(id, dob) {
    return workers.find(w => w.id.toUpperCase() === id.trim().toUpperCase() && w.dob === dob) || null;
  }

  function loginStaff(email, password) {
    return staff.find(s => s.email === email.trim().toLowerCase() && s.password === password) || null;
  }

  return { loginWorker, loginStaff };
})();
