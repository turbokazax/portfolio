# CV Content Fill Implementation Plan

> **Spec:** `docs/superpowers/specs/2026-07-31-cv-content-fill-design.md` (approved)
> **Approach:** Direct inline fill — write CV data straight into markup, matching the incumbent hardcoded-literal pattern. No data objects, no loops for repeated entries. YAGNI.

**Goal:** Replace every placeholder in the portfolio with real data from Arnur Jumabekov's CV.

**Files:**
- `src/layouts/Layout.astro` — sidebar identity + social links
- `src/pages/index.astro` — all main-page + CV-section content

---

## Task 1: Sidebar identity + social links

**File:** `src/layouts/Layout.astro:62-89`

Replace:
- `Your Name` → `Arnur Jumabekov` (appears in `h1.sidebar-name` and copyright)
- Tagline → `Aspiring researcher — computer vision &amp; robotics`
- Location → `Almaty, Kazakhstan`
- Bio → `Crafted from CV: top-grade STEM student (A* A-levels, SAT 1550, IELTS 8.0) and published researcher across computer vision and robotics.`
- Social `href="#"` values: LinkedIn → `https://linkedin.com/in/arnur-jumabekov`, GitHub → `https://github.com/turbokazax`. Blog and ORCID stay `#`.
- Copyright → `© 2026 Arnur Jumabekov`

## Task 2: About + Education + Activities

**File:** `src/pages/index.astro:10-77`

- Layout `title` → `Arnur Jumabekov — Researcher`; `description` kept similar but real.
- About lede/paragraph → reflect high-performing STEM student + published researcher in CV/robotics.
- Education → single entry: **Haileybury Almaty — High School Diploma (A-Levels), Aug 2023 – Jun 2025**. A-Levels: CS (A*), Maths (A*), Further Maths (A*), Physics (A). IELTS 8.0 / SAT 1550 (750 EBRW, 800 Math) / AP Calc BC 5, AP CS A 5.
- Activities → keep ONE placeholder entry (spec says leave empty for user to define; retain a single placeholder `<li>` for structure).

## Task 3: Publications + Projects

**File:** `src/pages/index.astro:80-167`

Publications → single entry:
- **WeCAViT: A Weighted CNN model for Pneumonia Detection in Chest X-rays**
  - Authors: Arnur Jumabekov, Maryam Yashtini
  - Venue: 13th IEEE International Conference on Control and Information Processing (ICICIP 2025), March 2025
  - Link chip: DOI `https://ieeexplore.ieee.org/document/10898141` (label "DOI")

Projects → two entries:
- **WeCAViT** | Python, PyTorch, Pandas, Scikit-Learn, Google Colab, Huggingface Transformers — Jun 2024 – Present
  - Hybrid CNN-CBAM-ViT model for pneumonia detection; ~4-5% accuracy & F1 increase over SOTA CNNs/ViTs/hybrids
  - >17 ablation experiments, >8 SOTA comparisons; authored research paper
- **QuantaSoil** | Python, Pandas, Scikit-Learn, Google Colab, OpenAI API — Sep 2023 – Nov 2023
  - ML classifiers to predict optimal crop/fertilizer from soil data; >95% accuracy
  - Custom GPT-4 text prompts via OpenAI API; integrated in React web app

## Task 4: CV section — Research, Certifications, Awards, Teaching

**File:** `src/pages/index.astro:170-234`

Research Experience → 3 entries:
- **Smart Pipe Inspection Robot — Research Assistant**, ARMS Lab, Nazarbayev University, Astana — Aug 2025 → Present
  - Developing Python API to control Dynamixel DC motors; custom path-following algorithms
- **Tensegrity Robot Project — Intern, Lead Programmer**, ISSAI, Nazarbayev University, Astana — May 2024 → Jun 2024
  - C++ control firmware for Arduino; modular OOP architecture; PID control for linear actuators, <5% position error
  - Python pipelines for real-time position extraction via Serial Port for OptiTrack feedback
- **Pioneer Research Institute — Student Researcher**, supervised by Dr. Maryam Yashtini (Georgetown), Remote — Jun 2024 → Jan 2025
  - Literature review on CV in Healthcare; proposed and experimented on WeCAViT architecture

Add **Certifications** subsection (new `<h2>` after research, before Teaching) → 2 entries:
- **Samsung Innovation Campus** — Android Development Track (Java, Google Firebase SDK), 2020–2021
- **Microsoft AI Challenge** — Machine Learning Track (Python, PyTorch, scikit-learn, pandas, NumPy, matplotlib), 2023

Awards → 3 entries:
- **ISEF Special Award** (2025) — Regeneron & "Mawhiba" Foundation
- **Kazakhstan Republican Science Projects Fair (KazSEF) — Gold Medal** (2025) — Top 0.7%, "Informatics"
- **British Physics Olympiad — Silver Medal** (2024) — Top ~10% worldwide

Teaching → keep single placeholder entry (spec says user fills later).

## Task 5: Build + verify

Run: `npx astro build 2>&1 | tail -5`
Expected: build Complete, no errors.

Commit:
```bash
git add src/layouts/Layout.astro src/pages/index.astro
git commit -m "feat: fill portfolio placeholders with CV content"
```
