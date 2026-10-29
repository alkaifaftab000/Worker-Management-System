# Generates 50 dummy workers -> assets/data/dummy_workers.xlsx + app/js/data/workers.js
import random, json, datetime, openpyxl, os
random.seed(7)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
male = "Rahul Amit Sunil Rakesh Vikas Manoj Deepak Ajay Sanjay Ravi Pankaj Rohit Anil Mukesh Arjun Suresh Vijay Naveen Gaurav Karan Murari Sachin Dinesh Ashok Nitin".split()
female = "Neelam Shalu Pooja Priya Sunita Anjali Kavita Rekha Seema Meena Nisha Ritu Komal Sapna Jyoti Preeti Rani Geeta Monika Divya Asha Kiran Payal Sonia Babita".split()
last = "Kumar Sharma Singh Yadav Verma Gupta Chauhan Rawat Mishra Pal Saini Tyagi Bhati Nagar".split()
depts = {"Production": ["ITR-FATP", "MI", "Assembly", "Packing"], "AI/SMT": ["SMT Line", "AI Insertion"],
         "Quality": ["CTP/CTQ", "IQC", "OQC"], "Maintenance": ["Electrical", "Mechanical"]}
sups = ["Rajesh Kumar", "Neeraj Singh", "Vinod Sharma", "Manish Gupta"]
cities = ["Noida", "Greater Noida", "Ghaziabad", "Dadri", "Dankaur", "Bulandshahr"]
edu = ["10th", "12th", "ITI Electrician", "ITI Fitter", "Diploma (ECE)", "B.A.", "B.Sc."]
prev = ["Fresher", "Samsung (contract)", "Dixon Technologies", "LG Electronics", "Havells", "Oppo Mobiles", "Moser Baer", "Fresher"]
rows = []
today = datetime.date(2026, 10, 29)
for i in range(50):
    g = random.choice("MF")
    first = random.choice(male if g == "M" else female)
    name = f"{first} {random.choice(last)}"
    dept = random.choice(list(depts)); proc = random.choice(depts[dept])
    doj = today - datetime.timedelta(days=random.choice([0, 1, 2, 3, 5, 8] + list(range(10, 400, 7))))
    days = (today - doj).days
    ind_score = random.randint(12, 20) if days > 0 or random.random() < .5 else None
    ind_status = "Done" if ind_score and ind_score >= 14 else ("Failed" if ind_score else "Pending")
    if ind_status == "Done" and days >= 3:
        ojt_score = random.randint(10, 20); ojt_status = "Done" if ojt_score >= 12 else "Failed"
    else:
        ojt_score = None; ojt_status = "Pending"
    # Quarterly supervisor assessments (every 90 days after OJT) – SOP: total /40 -> level
    assessments, trainings = [], []
    topics = ["5S & 3R", "WI Awareness & SSI", "Work Safety", "ESD Awareness", "CTP/CTQ", "MES Awareness", "Defect Awareness"]
    level = 1
    if ojt_status == "Done":
        base = random.randint(8, 16)
        for q in range(1, days // 90 + 1):
            base = min(38, base + random.randint(2, 8))
            t = round(base * .375); sf = round(base * .25); ql = base - t - sf
            assessments.append({"date": (doj + datetime.timedelta(days=90 * q)).isoformat(), "cycle": f"Q{q}",
                                "technical": t, "safety": sf, "quality": ql, "total": base,
                                "reviewer": random.choice(sups),
                                "remarks": random.choice(["Good progress", "Needs focus on quality checks", "Consistent performer", "Can mentor new joiners", "Improve SOP adherence"])})
        if assessments:
            tot = assessments[-1]["total"]; level = 1 if tot <= 10 else 2 if tot <= 20 else 3 if tot <= 30 else 4
        # Monthly 1-hr trainings since joining
        for m in range(1, min(days // 30, 12) + 1):
            trainings.append({"date": (doj + datetime.timedelta(days=30 * m)).isoformat(), "topic": random.choice(topics),
                              "hours": 1, "trainer": random.choice(sups), "score": random.randint(5, 10)})
    pex = random.choice(prev)
    rows.append({
        "empId": f"PE{1200 + i * 7}", "name": name, "gender": "Male" if g == "M" else "Female",
        "photo": f"https://randomuser.me/api/portraits/{'men' if g == 'M' else 'women'}/{i + 1}.jpg",
        "department": dept, "function": proc, "line": f"L-{random.randint(1, 8):02d}",
        "doj": doj.isoformat(), "supervisor": random.choice(sups),
        "dob": datetime.date(random.randint(1985, 2006), random.randint(1, 12), random.randint(1, 28)).isoformat(),
        "inductionStatus": ind_status, "inductionScore": ind_score,
        "ojtStatus": ojt_status, "ojtScore": ojt_score, "skillLevel": level, "assessments": assessments, "trainings": trainings,
        "phone": f"9{random.randint(100000000, 999999999)}",
        "email": f"{name.lower().replace(' ', '.')}{i}@gmail.com",
        "address": f"H.No. {random.randint(1, 400)}, Sector {random.randint(1, 150)}, {random.choice(cities)}, U.P.",
        "education": random.choice(edu),
        "experience": 0 if pex == "Fresher" else random.randint(1, 8), "prevCompany": pex,
    })
wb = openpyxl.Workbook(); ws = wb.active; ws.title = "Workers"
flat = [k for k in rows[0] if k not in ("assessments", "trainings")]
ws.append(flat); [ws.append([r[k] for k in flat]) for r in rows]
ws2 = wb.create_sheet("Assessments"); ws2.append(["empId", "date", "cycle", "technical", "safety", "quality", "total", "reviewer", "remarks"])
ws3 = wb.create_sheet("Trainings"); ws3.append(["empId", "date", "topic", "hours", "trainer", "score"])
for r in rows:
    for a in r["assessments"]: ws2.append([r["empId"]] + list(a.values()))
    for t in r["trainings"]: ws3.append([r["empId"]] + list(t.values()))
wb.save(os.path.join(ROOT, "assets", "data", "dummy_workers.xlsx"))
os.makedirs(os.path.join(ROOT, "app", "js", "data"), exist_ok=True)
with open(os.path.join(ROOT, "app", "js", "data", "workers.js"), "w", encoding="utf-8") as f:
    f.write("// Dummy data generated by scripts/gen_dummy.py (same as assets/data/dummy_workers.xlsx)\n")
    f.write("const WORKERS = " + json.dumps(rows, indent=1) + ";\n")
print(len(rows), "workers")
