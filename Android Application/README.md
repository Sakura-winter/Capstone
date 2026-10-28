# Resume-Job Matcher + Bias Audit (Android Client)

A modern Android capstone project built with **Jetpack Compose**, following **MVVM architecture**, the **Repository Pattern**, and **Unidirectional Data Flow (UDF)** principles. 

---

## 📂 Project Structure & Folder Responsibilities

```text
io.github.sushaant.capstone/
│
├── data/
│   ├── model/          # DTOs & Data classes (LoginRequest, ResumeMatchResponse, etc.)
│   ├── remote/         # Retrofit API interface (ApiService) & network client setup
│   └── repository/     # Single source of truth handling network calls and error wrapping
│
├── ui/
│   ├── auth/           # Authentication screen (Login & Register toggle)
│   ├── dashboard/      # Post-login main menu & quick actions hub
│   ├── matcher/        # Resume upload & Job Description input screen
│   ├── biasaudit/      # Audit report showing flagged terms and mitigation suggestions
│   ├── navigation/     # NavGraph and sealed route definitions
│   └── theme/          # Material 3 Color, Shape, and Typography definitions
│
├── viewmodel/
│   ├── AuthViewModel.kt        # Manages login/register state and logic
│   └── ResumeMatchViewModel.kt # Manages file upload, JD text state, and matching results
│
└── MainActivity.kt             # Single activity host setting up NavHost