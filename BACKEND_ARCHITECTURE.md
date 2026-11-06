# 📖 SkillSync AI — Backend Architecture & Presentation Guide

> **Problem Statement**: SIH26134 (Smart India Hackathon 2026 — Government of Maharashtra)  
> **Topic**: AI-Driven Resume-Job Matcher with Algorithmic Bias Audit & Dynamic Curriculum Realignment  
> **Role / Scope**: Java Spring Boot Backend & Mobile API Gateway

---

## 📌 Executive Summary (What to Say in 30 Seconds)

"SkillSync AI solves the mismatch between institutional vocational training and dynamic market demands. Traditional ATS systems use biased keyword matching that penalizes candidates from non-traditional or rural backgrounds. Our backend implements a **three-stage algorithmic bias audit** (Pre-processing PII stripping, In-processing semantic debiasing, and Post-processing Disparate Impact Ratio calibration adhering to ISO/IEC 42001) while continuously feeding market skill deficits back into local ITI curricula and recommending upskilling courses via Mahaswayam and iGOT Karmayogi."

---

## 🏛️ System Architecture Overview

```text
                      [ Android Mobile App / Web Client ]
                                      │
                   HTTP REST APIs / JSON (over Wi-Fi IP)
                                      ▼
             ┌──────────────────────────────────────────────────┐
             │       Spring Boot Backend Layer (Port 8080)      │
             ├──────────────────────────────────────────────────┤
             │  • Web & CORS Gateway (Any origin / Android)    │
             │  • Swagger / OpenAPI UI Documentation            │
             └────────────────┬─────────────────┬───────────────┘
                              │                 │
       ┌──────────────────────┴────────┐       ┌┴──────────────────────────────┐
       │   Candidate & Resume Module   │       │   Job & Taxonomy Module       │
       ├───────────────────────────────┤       ├───────────────────────────────┤
       │ • Apache PDFBox / POI Extract │       │ • NSQF / ESCO Skill Mappings  │
       │ • Pre-Processing PII Scrubber │       │ • Regional Industrial Roles   │
       └──────────────┬────────────────┘       └──────────────┬────────────────┘
                      │                                       │
                      └───────────────────┬───────────────────┘
                                          ▼
                      ┌───────────────────────────────────────┐
                      │    Semantic Matching & Bias Engine    │
                      ├───────────────────────────────────────┤
                      │ • Sim(vc, vj) Cosine Context Match    │
                      │ • S_match Multi-Feature Formula       │
                      │ • Disparate Impact Ratio (DIR >= 0.8) │
                      │ • Equalized Odds Auto-Recalibration   │
                      └───────────────────┬───────────────────┘
                                          ▼
                      ┌───────────────────────────────────────┐
                      │    Curriculum & Institutional Loop    │
                      ├───────────────────────────────────────┤
                      │ • Skill Gap Index (SGI) Extraction    │
                      │ • Mahaswayam / iGOT Course Mapping    │
                      │ • ITI District Skill Deficit Reports  │
                      └───────────────────┬───────────────────┘
                                          ▼
                            [ In-Memory H2 / JPA Store ]
```

---

## 📐 Mathematical Formulations (From the SIH Paper)

When presenting to judges or faculty, explain the following 3 formulas:

### 1. Composite Match Score ($S_{\text{match}}$)

Rather than raw keyword matching:

$$S_{\text{match}} = \alpha \cdot \text{Sim}(v_c, v_j) + \beta \cdot \text{Overlap}(K_c, K_j) + \gamma \cdot \text{Recency}(E_c)$$

- $\alpha = 0.50$: Semantic alignment between anonymized resume and job description.
- $\beta = 0.35$: Skill taxonomy overlap ratio ($K_c \cap K_j$).
- $\gamma = 0.15$: Experience recency & candidate year-depth ratio.
- $\alpha + \beta + \gamma = 1.0$.

### 2. Algorithmic Bias Audit: Disparate Impact Ratio ($\text{DIR}$)

To guarantee non-discriminatory candidate selection (Four-Fifths Rule & ISO/IEC 42001):

$$\text{DIR} = \frac{P(\hat{Y} = 1 \mid D = \text{unprivileged})}{P(\hat{Y} = 1 \mid D = \text{privileged})} \ge 0.80$$

- **Privileged vs. Unprivileged Groups Evaluated**:
  - Gender: Male vs. Female / Other
  - Institutional Tier: Tier-1 (IIT/NIT) vs. Tier-3 / Rural ITI & Polytechnic
- **Post-Processing Recalibration**: If $\text{DIR} < 0.80$, the engine dynamically adjusts the decision threshold for candidates within an acceptable boundary to restore demographic parity without compromising qualification standards.

### 3. Skill Gap Index ($SGI$)

When a candidate does not meet the full job profile:

$$SGI_i = 1 - \frac{\sum_{k \in S_{\text{required}}} w_k \cdot \mu(k, S_{\text{candidate}})}{\sum_{k \in S_{\text{required}}} w_k}$$

- Quantifies exact deficit and maps missing competencies to state learning modules (Mahaswayam / iGOT).

---

## 📂 Project Structure & Code Mapping

| Package / File | Purpose |
| :--- | :--- |
| `com.skillsync.controller.HealthController` | Connectivity test for mobile clients (`/api/v1/health`) |
| `com.skillsync.controller.AuthController` | User registration & authentication (`/api/v1/auth/register`, `/login`) |
| `com.skillsync.controller.CandidateController` | Handles resume file uploads (`.pdf`, `.docx`, text), PII stripping, and profiles |
| `com.skillsync.controller.JobPostingController` | Manages industrial job postings across Maharashtra districts |
| `com.skillsync.controller.MatchingController` | Computes match scores and executes batch bias audits |
| `com.skillsync.controller.CurriculumController` | Generates candidate upskilling roadmaps and regional ITI deficit analytics |
| `com.skillsync.controller.AnalyticsController` | Macro-level platform overview across jobs, candidates, and compliance |
| `com.skillsync.service.ResumeParserService` | Layout text extraction (PDFBox/POI) and PII regex scrubbing |
| `com.skillsync.service.SemanticMatcherService` | Vector cosine similarity and formula scoring |
| `com.skillsync.service.BiasAuditService` | Computes DIR and performs Equalized Odds boundary recalibration |
| `com.skillsync.service.SkillGapService` | Maps missing skills to Mahaswayam/iGOT portals |
| `com.skillsync.config.WebAndSwaggerConfig` | Configures global CORS and OpenAPI / Swagger 3 UI |
| `com.skillsync.config.DataInitializer` | Seeds initial jobs, candidates, and certified courses on startup |

---

## 📱 Mobile Integration (How to Explain the Android Connection)

1. **Local Network Binding**: The Spring Boot app listens on `0.0.0.0:8080`, allowing external devices on the same local network to connect.
2. **IP Access**:
   - Machine IP: Check local IPv4 address using `ipconfig` (e.g. `192.168.x.x` or your dynamic LAN IP).
   - Android Base URL: `http://<BACKEND_HOST_IP>:8080/api/v1/`
   - Android Emulator Base URL: `http://10.0.2.2:8080/api/v1/`
3. **Live Interactive Swagger UI**:
   - `http://localhost:8080/swagger-ui/index.html` (Local)
   - `http://<BACKEND_HOST_IP>:8080/swagger-ui/index.html` (Mobile browser over same Wi-Fi)
   - Anyone on the same network can open this link in their browser to view and test every API request with sample payloads.

---

## 🔮 Future Roadmap / Next Additions

- [ ] **Transformer Embeddings Sidecar**: Connect a local lightweight Python FastAPI microservice (running `all-MiniLM-L6-v2` or BGE) for dense 384-dimensional vector embeddings.
- [ ] **Spring Security & JWT**: Add token-based login for candidates, employers, and government admin officers.
- [ ] **Persistent PostgreSQL**: Switch from H2 in-memory to PostgreSQL for production persistence.
- [ ] **OCR for Regional Languages**: Multi-lingual OCR for Marathi/Hindi printed resumes using Tesseract.
