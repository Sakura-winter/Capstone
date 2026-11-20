# 🎨 SkillSync AI — Frontend Web Application
> **SIH26134: AI-Driven Resume-Job Matcher with Algorithmic Bias Audit**  
> **Government of Maharashtra • Smart Automation Theme**

A high-performance, cyber-glassmorphic React web application engineered to interface with the SkillSync AI Spring Boot Backend (`http://localhost:8080/api/v1`).

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18+ or v20+ recommended (`node -v`)
- **Package Manager**: npm (`npm -v`)

### 2. Installation & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🏛️ Architecture & Component Hierarchy

```
frontend/
├── index.html                   # HTML entry point with sleek viewport
├── package.json                 # Dependencies & scripts
├── vite.config.js               # Vite bundler configuration
├── src/
│   ├── main.jsx                 # React root render
│   ├── App.jsx                  # Main ecosystem view orchestrator
│   ├── index.css                # Glassmorphism, glows & modern gradients
│   ├── api/
│   │   └── client.js            # Axios client bound to Spring Boot backend
│   ├── context/
│   │   └── AppContext.jsx       # State for active company, actor ID & live health
│   └── components/
│       ├── Navbar.jsx           # Glass header with live backend status & actor switcher
│       ├── CompanyConsole.jsx   # Company onboarding, permissions, and job posts
│       ├── CandidatePortal.jsx  # Resume scanner, PII anonymizer, and matching
│       └── BiasAuditView.jsx    # Four-Fifths DIR compliance gauge & ITI feed-forward
```

---

## 🌟 Interactive Features

### 🏢 1. Company Hub (Employer / Recruiter Console)
- **Company Onboarding (Flow A)**: Provisions enterprise companies and automatically promotes the creator to **Super Admin** with full rights.
- **Team & Permission Matrix (Flow B)**: Granular toggle switches for all 5 security permissions:
  - `COMPANY_MANAGE`: Profile metadata and general company administration.
  - `EMPLOYEE_MANAGE`: Adding team members and modifying authorization levels.
  - `JOB_CREATE`: Drafting and publishing new job openings.
  - `JOB_EDIT`: Modifying job descriptions and closing listings.
  - `JOB_VIEW`: Viewing internal candidate pipelines and draft jobs.
- **Job Posts Console (Flow C)**: Create, review, and toggle job listings between `DRAFT` and `PUBLISHED` status.

### 📄 2. Candidate & Resume Scanner Portal
- **Layout-Aware Ingestion**: Supports `.pdf`, `.docx`, and `.txt` resumes.
- **Pre-Processing PII Anonymization**: Real-time side-by-side view showing redacted demographic markers and identifiers compliant with **ISO/IEC 42001**.
- **Contextual Semantic Matching**: Computes multi-factor match score ($S_{\text{match}}$):
  $$S_{\text{match}} = 0.50 \cdot \text{Sim}(v_c, v_j) + 0.35 \cdot \text{Overlap}(K_c, K_j) + 0.15 \cdot \text{Recency}(E_c)$$

### ⚖️ 3. Sociotechnical Algorithmic Bias Audit
- **Statutory Four-Fifths Rule Gauge**:
  $$\text{DIR} = \frac{P(\hat{Y}=1 \mid \text{unprivileged})}{P(\hat{Y}=1 \mid \text{privileged})} \ge 0.80$$
- Visualizes Gender and Institutional Tier (Tier-1 vs Tier-3/Rural ITI) compliance with active **Equalized Odds** boundary recalibration.
- **Institutional Feed-Forward**: Analyzes regional industrial deficits across Maharashtra districts (Pune, Nagpur, Aurangabad) and surfaces certified upskilling roadmaps on **Mahaswayam** & **iGOT Karmayogi**.
