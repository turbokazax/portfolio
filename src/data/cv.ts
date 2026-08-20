/*
  Single source of truth for CV facts rendered on the site.
  Synced against public/arnur-jumabekov-cv.pdf (Aug 2026 revision).
  Change a fact here, not in the page markup.
*/

export const publication = {
  title:
    "WeCAViT: A Weighted CNN Model for Pneumonia Detection in Chest X-rays",
  authors: "Arnur Jumabekov, Maryam Yashtini",
  venue: "13th IEEE ICICIP, March 2025",
  url: "https://ieeexplore.ieee.org/document/10898141",
  desc: "Hybrid CNN–CBAM–ViT architecture for pneumonia detection in chest X-rays. First author. Cited in IEEE ISCS 2025 and IEEE ICPEGE 2026.",
  bibtex: `@inproceedings{jumabekov2025wecavit,
  author    = {Jumabekov, Arnur and Yashtini, Maryam},
  title     = {{WeCAViT}: A Weighted {CNN} Model for Pneumonia Detection in
               Chest X-rays},
  booktitle = {2025 13th IEEE International Conference on Intelligent Control
               and Information Processing (ICICIP)},
  address   = {Muscat, Oman},
  year      = {2025},
  url       = {https://ieeexplore.ieee.org/document/10898141}
}`,
};

export const education = [
  {
    title: "BSc Mathematics & Information Engineering",
    org: "The Chinese University of Hong Kong",
    dates: "Aug 2026 – Jul 2030 (expected)",
    desc: "Dual-faculty program spanning pure mathematics, signal systems, and software engineering; 10–15 admits per year. CUHK Admission and Engineering Faculty Scholarships. Morningside College.",
    scoreGroups: [],
  },
  {
    title: "High School Diploma (International A-Levels)",
    org: "Haileybury Almaty",
    dates: "Aug 2023 – Jun 2025",
    desc: "100% merit scholarship (≈$80k). A-Levels: Further Mathematics (A*), Mathematics (A*), Computer Science (A*), Physics (A), including probability and statistics coursework.",
    scoreGroups: [
      { label: "Standardized Tests", scores: ["SAT: 1550 (Math 800)", "IELTS: 8.0"] },
      { label: "AP Exams", scores: ["Calc BC: 5", "CS A: 5"] },
    ],
  },
];

export const experience = [
  {
    title: "Smart Pipe Inspection Robot — Research Assistant",
    org: "ARMS Lab, Nazarbayev University, Astana",
    dates: "Aug 2025 – May 2026",
    desc: "Built the Python motor-control API and calculus-based path-following algorithms for the robot's manipulator arm. Developed a YOLOv8 model for in-pipe defect detection (welds, porosity, corrosion) for future field deployment.",
  },
  {
    title: "Robot Programmer — FTC #24784 “Nyx Pardus” & #21063 “Initium Robotics”",
    org: "FIRST Tech Challenge",
    dates: "Aug 2023 – Jun 2025",
    desc: "Wrote modular Java robot-control code with OpenCV object detection; led team game strategy and mentored junior programmers. Think Award (engineering portfolio) at the FTC Cyprus Championship; qualified for the Central Asia FIRST Championship twice.",
  },
  {
    title: "Pioneer Academics — Student Researcher",
    org: "Supervised by Prof. Maryam Yashtini (Georgetown), Remote",
    dates: "May 2024 – Oct 2024",
    desc: "Formulated a hypothesis, synthesized the computer-vision literature, designed and ran model-comparison experiments in PyTorch, and wrote a 20-page research draft. Rated top 5% relative to all undergraduates the supervisor has ever mentored.",
  },
  {
    title: "Tensegrity Robot — Intern, Lead Programmer",
    org: "ISSAI, Nazarbayev University, Astana",
    dates: "May 2024 – Jul 2024",
    desc: "Cut actuator position error to under 5% on the Tensegrity Robot, an assistive platform for early cerebral-palsy intervention in children, by writing OOP C++ Arduino firmware and tuning closed-loop PID control. Built a real-time Python pipeline that cross-checked onboard sensor readings against OptiTrack motion capture of the robot's moving top platform.",
  },
];

export const mentoring = [
  {
    title: "Haileybury Math Olympiad Club — Senior Mentor",
    org: "Haileybury Almaty",
    dates: "Sep 2024 – Mar 2025",
    desc: "Coached 5 students in Euclidean geometry and number theory in weekly 90-minute sessions; 3 of the 5 won regional Euler Olympiad awards.",
  },
  {
    title: "FTC #23551 “Ultron”, Morocco — Robotics Mentor",
    org: "Remote",
    dates: "Feb 2024 – Jun 2024",
    desc: "Mentored the team in Java robot programming. The team won the Think Award (1st, engineering portfolio) and the Inspire Award (2nd, FIRST's top honour) at Morocco Nationals.",
  },
  {
    title: "Android Development Course — Founder, Course Lead",
    org: "American Space, Almaty",
    dates: "Aug 2022 – Nov 2022",
    desc: "Founded an Android development course: wrote the curriculum, recruited and led 3 mentors, and taught 15+ students to 100% completion and 6+ Google-Play-ready group projects.",
  },
];

export const projects = [
  {
    title: "The Retention Architect",
    stack: "Python, CatBoost, Optuna, SHAP, scikit-learn, pandas",
    dates: "Apr 2026",
    desc: "Three-class churn prediction from 14 days of user behavior, built for the Higgsfield AI track at HackNU 2026: top 15 of 60 teams. Engineered 217 features across 90,000 users, tuned CatBoost with 50-trial Optuna, and validated out-of-time on a 7,000-user blind set. Translated SHAP attributions into five business reason buckets.",
  },
  {
    title: "WeCAViT",
    stack: "Python, PyTorch, HuggingFace Transformers, scikit-learn",
    dates: "Jun 2024 – May 2025",
    desc: "Weighted ensemble of CNNs (VGG-16, ResNet-50, MobileNetV3) with CBAM attention and a Vision Transformer: 93.59% accuracy and 95.02 F1 on chest X-ray pneumonia detection (PneumoniaMNIST, 5,856 images). Outperformed ten SOTA baselines by ≈4–5% in accuracy and F1 across 17 ablation experiments. Fine-tuned for COVID-19 and general lung-opacity detection with 5-fold cross-validation and Student's t-test verification.",
  },
  {
    title: "QuantaSoil",
    stack: "Python, scikit-learn, OpenAI API, React",
    dates: "Sep 2023 – Nov 2023",
    desc: "Crop-recommendation classifier (Random Forest, 99.32% accuracy against SVM, logistic regression, and k-NN on a 2,200-row Kaggle set), with GPT-4 turning predictions into readable advice, shipped as a React web app. 1st of ≈40 teams at the “AI × Climate Change” hackathon; selected into the ABC Incubator × NURIS startup program.",
  },
];

export const certifications = [
  {
    title: "Samsung Innovation Campus — Android Development Track",
    meta: "Java, Google Firebase SDK · 2020–2021",
  },
  {
    title: "Microsoft AI Challenge — Machine Learning Track",
    meta: "Python, PyTorch, scikit-learn, pandas, NumPy, Matplotlib · 2023",
  },
];

export const honors = [
  {
    title: "Regeneron ISEF 2025 — Special Award",
    meta: "Regeneron & “Mawhiba” Foundation · 2025",
    desc: "Finalist, 1 of 3 students representing Kazakhstan. Special Award carrying a full KFUPM scholarship.",
  },
  {
    title: "Republican Science Projects Fair (KazSEF) — Gold Medal",
    meta: "Kazakhstan · 2025",
    desc: "Top 1 of 433 national finalists (joint 1st: three projects tied at 100/100), from ≈4,000 entrants; absolute 1st in the Informatics section.",
  },
  {
    title: "Mathematics Olympiads",
    meta: "Kazakhstan & international · 2022–2024",
    desc: "Asian Pacific Mathematics Olympiad: top 54 of 2,000+ in Kazakhstan (2023), competed 2022. Bronze, Republican Mathematical Olympiad (2022): top 20 of 7,000+ nationally. Silver, Iranian Geometry Olympiad (2024): top 3% nationally. Silver, Sharygin Geometry Olympiad (2022): top 4% nationally. International Zhautykov Olympiad qualifier (2022–2024).",
  },
  {
    title: "Physics & Machine Learning Olympiads",
    meta: "2024",
    desc: "Silver, British Physics Olympiad Round 1. Bronze, Fizmat AI Olympiad, a national machine-learning and competitive-programming olympiad: top 13% of 299.",
  },
];
