# Worker Management System – Context Summary

No code yet. The project folder contains only reference documents in `assets/data/`, from **IL JIN Electronics India Pvt. Ltd.** (Amber Group).

## 1. Skill Matrix SOP ILJIN.docx
SOP for blue-collar skill matrix implementation.
- **Scope:** Production, AI/SMT, Critical Stage (CTP/CTQ) Quality, Maintenance and related departments.
- **Responsibility:** HR coordinates the skill matrix. Department heads identify training needs (TNI). Follows a PDCA cycle.
- **Skill categories:** Technical (machine operation, process), Safety (PPE, emergency response), Quality (SOP adherence, defects, checks).
- **Skill levels (marks out of 40):**
  | Level | Meaning | Marks |
  |---|---|---|
  | 1 | Beginner / Unskilled – works under supervision | ≤10 |
  | 2 | Learner / Semi-skilled – works independently with some help | 11–20 |
  | 3 | Advanced / Skilled | 21–30 |
  | 4 | Mentor / Multi-skilled – can train others | 31–40 |
- **Process:**
  - Department in-charge maintains a department-wise matrix and sends it to HR.
  - The matrix is updated after assessments, training, new-joiner evaluations and re-assessments.
  - An **operator license** is issued after each update.
  - Assessments happen **every 3 months**, run jointly by the department and HR. New joiners are assessed after 3 months.
  - **On failure:** re-training, then re-assessment. A pass updates the level; a second fail keeps the current level until the next cycle.

## 2. Skill matrix-ITR.xlsx (Doc 01-HRD40-F-04)
- **Sheets:** `ITR-FATP`, `MI`, one per line or area, about 20 operators each.
- **Columns:** S.No, Emp Code, Name, Designation, Area/Dept, followed by a 1–4 rating for each of these skills:
  - 5S & 3R
  - WI Awareness & SSI
  - OJT
  - Work Safety
  - ESD Awareness
  - CTP/CTQ
  - MES Awareness
  - Defect Awareness
  - Improvement Ideas
- **Employee code formats vary:** `94889`, `PE1272`, `GRC0567`.

## 3. 01-HRD40-F-36 Test Paper - Rev01.xlsx
- **Sheets:**
  - `Revision History`: DRN/DCN document control log.
  - `Test Paper-Common`: common multiple-choice test.
  - `Test Paper-OJT`: OJT test.
- **Header fields:** Name, Department, ID No, Date.
- **Questions:** multiple choice (Q-n, options A–D), each with a marks value (e.g. 5).
- The score maps to a skill level using the SOP marks bands above.

## Implied system requirements
- **Employee master:** code, name, designation, department/line.
- **Skill matrix:** department-wise, rated 1–4 per skill, with history.
- **Test papers:** question bank (common + OJT), scoring, then level mapping.
- **Quarterly assessment scheduling:** includes new-joiner assessment at 3 months.
- **Failure handling:** re-training and re-assessment workflow.
- **TNI:** report of training needs, based on low scores.
- **Operator licenses:** issuance.
- **Document control:** doc number, issue and revision tracking on forms.
