# ILJIN Worker Management System – Understanding

## Problem
- **Client:** IL JIN Electronics India (Amber Group). Makes home appliances and is expanding into automotive and defense.
- **Customer question:** customers ask, *"Is the worker on this line skilled enough?"* ILJIN needs to prove the competency of each worker on each production line.
- **Demand swings:** October to April is peak season and the rest of the year is lean. Hiring happens daily, and attrition is about 30%.
- **Data today:** employee data is in Officenet and Excel, and the skill matrix is kept as a separate Excel file per department. Training isn't tracked in any system. (Interpreted from the note "Employee training - no".)

## Worker Flow (Employee Life Cycle)
1. **Day 1:** hire, then HR induction, then a test the worker must pass.
2. **OJT:** 3 days of on-the-job training, then a test the worker must pass. The worker is then assigned to a production line.
3. **Skill matrix:** department-wise, with each skill rated 1–4.
   - 9 skills: 5S & 3R, WI & SSI, OJT, Work Safety, ESD, CTP/CTQ, MES, Defect Awareness, Improvement Ideas.
   - Levels by test marks out of 40: 1 Beginner (≤10), 2 Learner (11–20), 3 Advanced (21–30), 4 Mentor (31–40).
4. **Assessment:** every 3 months, run jointly by HR and the department. A failed assessment leads to re-training and a re-test. A second failure keeps the worker at their current level until the next cycle.
5. **Growth:** the target is multi-skilled workers within 12 months. Level 1 workers get 1 hour of training per month.
6. **License card:** issued with a unique ID after skill certification.

## What the System Needs
- **Employee master:** imported from Officenet or Excel.
- **Onboarding and OJT tracking:** includes online tests with auto-scoring, using the question bank in the HRD40-F-36 test paper.
- **Digital skill matrix:** per line and department, with history over time.
- **Assessment scheduling:** quarterly cycle, new-joiner assessments, and the re-training and re-test loop.
- **Training hours and TNI:** log training hours and report training needs.
- **Operator license cards:** with unique IDs, ideally QR codes for on-line verification.
- **Customer view:** shows the skill level of each worker on a line.
- **Productivity dashboard:**
  - conversion per man-hour
  - cost of poor quality
  - absenteeism
  - attrition

## To Confirm with Client (Training & Performance)
Current assumption, shown as a note in the worker profile:
1. The OJT score is the starting point.
2. 1 hour of training per month, with topic, trainer and a score out of 10.
3. A supervisor assessment every 3 months:
   - Technical 15 + Safety 10 + Quality 15 = 40 marks
   - Level 1 ≤10, Level 2 11–20, Level 3 21–30, Level 4 31–40
- Questions:
  - Who reviews: the supervisor alone, or the department and HR jointly (the SOP says jointly)?
  - What is the actual mark split between Technical, Safety and Quality?
  - Is training 1 hour per month for every level, or only for Level 1?
  - Do the 9 skill-matrix skills each get their own rating?
  - What happens after a failed review: re-training within how many days?

## Goal
Improve productivity by putting trained, certified workers on the right lines, and make their skills easy to see.

## Sources
- `assets/data/` – SOP, Skill Matrix (ITR-FATP and MI sheets), Test Paper
- `Summary/clients/` – meeting notes (28 Oct, MES team)
