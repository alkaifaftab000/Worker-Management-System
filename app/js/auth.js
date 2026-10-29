// Mock auth – replace with real API calls later
const Auth = (() => {
  const staff = [
    { email: "hr@iljin.com", password: "admin123", role: "HR" },
  ];

  // Worker login = Employee ID + DOB against the worker data (Store)
  function loginWorker(id, dob) {
    return Store.load().find(w => String(w.empId).toUpperCase() === id.trim().toUpperCase() && w.dob === dob) || null;
  }

  function loginStaff(email, password) {
    return staff.find(s => s.email === email.trim().toLowerCase() && s.password === password) || null;
  }

  return { loginWorker, loginStaff };
})();
