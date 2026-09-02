<div align="center">

# 💼 HARI NARAYANA — DIGITAL PORTFOLIO
### Modern, Responsive Developer Portfolio, Interactive Project Gallery & Certification Showcase

[![Live Portfolio](https://img.shields.io/badge/Live%20Portfolio-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://chic-axolotl-a63abd.netlify.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5 / CSS3](https://img.shields.io/badge/UI-Semantic%20HTML5%20%26%20CSS3-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Python Engine](https://img.shields.io/badge/Automation-Python%20SPA%20Generator-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  A sleek, high-performance personal developer portfolio engineered to showcase engineering projects, verified cloud certifications (including Google Kubernetes Engine), and technical milestones. Powered by automated Python static generation pipelines and lightweight client-side interactions.
</p>

[🌐 Visit Live Portfolio](https://chic-axolotl-a63abd.netlify.app) • [✨ Key Features](#-key-features) • [🏛️ Architecture](#-generation--rendering-architecture) • [🛠️ Tech Stack](#️-tech-stack) • [🚀 Local Setup](#-local-development) • [📁 Structure](#-project-structure)

</div>

---

## 🌟 Key Features

* **🎨 Interactive Project Gallery**: Highlights flagship engineering systems including *Project Sentinel*, *FFCS Timetable Architect*, *DeskLock*, and *CineKeep* with live tags and demo links.
* **🎖️ Verified Certifications & Badges**: Embedded showcases of industry credentials, including the official Google Kubernetes Skill Badge and cloud certifications.
* **⚡ Python Automated SPA Engine**: Custom Python generation scripts (`gen_spa.py`, `gen.py`) that automate HTML structuring and component synchronization.
* **📱 Ultra-Responsive Glassmorphic UI**: Fluid flexbox and CSS grid foundations guaranteeing pixel-perfect scaling across mobile phones, tablets, and ultrawide desktop monitors.
* **🚀 Blazing CDN Performance**: Zero heavy framework overhead — pure vanilla HTML/JS delivers sub-second initial contentful paint times via Netlify CDN.

---

## 🏛️ Generation & Rendering Architecture

```mermaid
flowchart TD
    subgraph ContentPipeline ["1. Static Generation Pipeline"]
        A[gen_spa.py / gen.py] --> B[Data Schemas: Projects & Badges]
        B --> C[Template Hydration & Clean Processing]
        C --> D[Generate Minified index.html & main.js]
    end

    subgraph ClientExecution ["2. Browser Runtime"]
        D --> E[index.html - DOM Mount]
        E --> F[main.js - Interactive Controller]
        F --> G[Project Filter Chips & Modal Dialogs]
        F --> H[Smooth Scroll & Navigation Event Bus]
        F --> I[Dynamic Theme & Contact Action Handlers]
    end
```

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Foundation** | HTML5, CSS3, Modern Vanilla JavaScript (ES6+) |
| **Site Generator / Tooling** | Python 3 (`gen_spa.py`, `gen.py`, `clean.py`) |
| **Icons & Media** | Lucide Icons, Custom SVG vectors |
| **Hosting & CI/CD** | Netlify Continuous Deployment |

---

## 🚀 Local Development

### Prerequisites
* Python 3.8+ (for running generation scripts or local preview server)
* Web browser

### 1. Clone the Repository
```bash
git clone https://github.com/harinarayana1457-cmyk/My_Portfolio.git
cd My_Portfolio
```

### 2. Regenerate SPA Layout (Optional)
If you modify source templates or project data:
```bash
python gen_spa.py
```

### 3. Preview Locally
Run a lightweight local HTTP server:
```bash
python -m http.server 8080
```
Open `http://localhost:8080` in your web browser.

---

## 📁 Project Structure

```text
My_Portfolio/
├── index.html                # Compiled responsive portfolio single-page application
├── main.js                   # Client-side filtering, interactive modals, and event listeners
├── gen_spa.py                # Automated Single Page Application HTML generator
├── gen.py                    # Static component layout builder
├── clean.py                  # Code cleanup and formatting utility
├── replace.py / replace2.py  # Automated string & template replacement utilities
├── package.json              # Optional npm tooling definitions
├── .gitignore                # Production ignore rules
└── README.md                 # Project documentation
```

---

## 🔗 Connect & Links

* **Live Portfolio**: [chic-axolotl-a63abd.netlify.app](https://chic-axolotl-a63abd.netlify.app)
* **Author**: [Hari Narayana (@harinarayana1457-cmyk)](https://github.com/harinarayana1457-cmyk)
* **LinkedIn**: [![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hari-narayana-035ba1389/)
