# CV Content Fill — Design Spec

> **Status:** approved
> **Source CV:** `Arnur_Jumabekov_Resume-1.pdf`
> **Date:** 2026-07-31

## Goal

Replace every placeholder in the portfolio with real data from Arnur Jumabekov's CV, keeping the current template sections and matching entry counts to the CV.

## Approach

**Direct inline fill** — write CV data straight into the markup, matching the incumbent pattern (everything today is hardcoded literal markup; no data objects, no loops). Where there are repeated entries (publications, projects, awards, research experience), write them out as literal `<li>` items to match the existing style. YAGNI: no new abstractions for static content.

Rejected alternatives: frontmatter data objects (adds indirection, nothing in codebase does this); content collection for projects/publications (overkill; blog already uses collections).

## Files to modify

- `src/layouts/Layout.astro` — sidebar identity + social links
- `src/pages/index.astro` — all main-page + CV-section content

## Content mapping

### Sidebar (`Layout.astro`)

| Placeholder | Value |
|---|---|
| Name | Arnur Jumabekov |
| Tagline | Aspiring researcher — computer vision & robotics |
| Location | Almaty, Kazakhstan |
| Bio | Crafted from CV: top-grade STEM student (A\* A-levels, SAT 1550, IELTS 8.0) and published researcher across computer vision and robotics. |
| LinkedIn | `https://linkedin.com/in/arnur-jumabekov` |
| GitHub | `https://github.com/turbokazax` |
| Blog | `#` (fill later) |
| ORCID | `#` (fill later) |
| Copyright | © 2026 Arnur Jumabekov |

### Main page — About (`index.astro`)

Ledes rewritten to reflect actual profile: high-performing STEM student and published researcher in computer vision / robotics.

### Main page — Education (1 entry)

- **Haileybury Almaty** — High School Diploma (A-Levels), Aug 2023 – Jun 2025
  - A-Levels: Computer Science (A\*), Maths (A\*), Further Maths (A\*), Physics (A)
  - IELTS 8.0 / SAT 1550 (750 EBRW, 800 Math) / AP Calculus BC 5, AP CS A 5

### Main page — Activities

**Left empty** (no CV match after certifications moved to CV section). Placeholder entry retained for user to define later.

### Main page — Publications (1 entry, matches CV)

- **WeCAViT: A Weighted CNN model for Pneumonia Detection in Chest X-rays**
  - Arnur Jumabekov, Maryam Yashtini
  - 13th IEEE International Conference on Control and Information Processing (ICICIP 2025), March 2025
  - DOI: `https://ieeexplore.ieee.org/document/10898141`

### Main page — Projects (2 entries, matches CV)

- **WeCAViT** | Python, PyTorch, Pandas, Scikit-Learn, Google Colab, Huggingface Transformers — Jun 2024 – Present
  - Hybrid CNN-CBAM-ViT model for pneumonia detection; ~4-5% accuracy & F1 increase over SOTA CNNs/ViTs/hybrids
  - >17 ablation experiments, >8 SOTA comparisons; authored research paper
- **QuantaSoil** | Python, Pandas, Scikit-Learn, Google Colab, OpenAI API — Sep 2023 – Nov 2023
  - ML classifiers to predict optimal crop/fertilizer from soil data; >95% accuracy
  - Custom GPT-4 text prompts via OpenAI API; integrated in React web app

### CV section — Research Experience (3 entries, matches CV)

- **Smart Pipe Inspection Robot — Research Assistant**, ARMS Lab, Nazarbayev University, Astana — Aug 2025 – Present
  - Developing Python API to control Dynamixel DC motors; custom path-following algorithms
- **Tensegrity Robot Project — Intern, Lead Programmer**, ISSAI, Nazarbayev University, Astana — May 2024 – Jun 2024
  - C++ control firmware for Arduino; modular OOP architecture; PID control for linear actuators, <5% position error
  - Python pipelines for real-time position extraction via Serial Port for OptiTrack feedback
- **Pioneer Research Institute — Student Researcher**, supervised by Dr. Maryam Yashtini (Georgetown), Remote — Jun 2024 – Jan 2025
  - Literature review on CV in Healthcare; proposed and experimented on WeCAViT architecture

### CV section — Certifications (new subsection, 2 entries)

- **Samsung Innovation Campus** — Android Development Track (Java, Google Firebase SDK), 2020–2021
- **Microsoft AI Challenge** — Machine Learning Track (Python, PyTorch, scikit-learn, pandas, NumPy, matplotlib), 2023

### CV section — Honors & Awards (3 entries, matches CV)

- **ISEF Special Award** (2025) — Regeneron & "Mawhiba" Foundation
- **Kazakhstan Republican Science Projects Fair (KazSEF) — Gold Medal** (2025) — Top 0.7%, "Informatics"
- **British Physics Olympiad — Silver Medal** (2024) — Top ~10% worldwide

### CV section — Teaching

**Left as placeholder** (no CV match; user fills later).

## Out of scope

- No new template sections beyond the Certifications subsection (which slots into the existing CV section).
- No changes to design system, layout, or styling.
- No new dependencies.
