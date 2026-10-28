# 📘 Comprehensive Development Guidelines & Architecture Manual
**Project:** Resume-Job Matcher + Bias Audit (Android Client)  
**Architecture:** MVVM + Repository Pattern + Unidirectional Data Flow (UDF)

---

## 1. Architectural Overview & Layer Responsibilities

To keep our codebase scalable, modular, and free of merge conflicts, we strictly separate concerns into the following packages under `io.github.sushaant.capstone`:

* **`data/model/` (DTOs & Data Classes):** Contains plain Kotlin data classes that model our requests and responses for authentication, resume matching, and bias audits (e.g., `LoginRequest`, `ResumeMatchResponse`, `BiasAuditDto`).
* **`data/remote/` (Network Layer):** Contains Retrofit interface definitions (`ApiService.kt`) and client configurations. It handles HTTP communication with our Spring Boot backend.
* **`data/repository/` (Repository Pattern):** The single source of truth. It abstracts data fetching from the ViewModels and wraps network responses into Kotlin `Result` objects for safe error handling.
* **`viewmodel/` (State & Logic Layer):** Holds UI states as reactive `StateFlow` streams. ViewModels survive configuration changes, process user events, and invoke repository functions. They contain zero Android UI context.
* **`ui/` (Presentation Layer):** Contains Jetpack Compose screens. **The UI is completely "dumb"**—it contains zero business logic, only rendering what it receives from the ViewModel and firing user actions back up.
* **`MainActivity.kt`:** The single-activity host that initializes the window and hosts our navigation graph (`NavHost`).

---

## 2. Naming Conventions & Code Guidelines

To ensure team-wide consistency and prevent naming collisions, everyone must follow these strict rules:

1. **Classes, Interfaces, & Files:** Use **PascalCase** (e.g., `ResumeMatchScreen.kt`, `AuthViewModel.kt`, `ResumeMatchResponse`).
2. **Variables, Properties, & Functions:** Use **camelCase** (e.g., `jobDescriptionText`, `selectedFileName`, `runMatchAndAudit`).
3. **UI State Classes:** Must be named after their corresponding screen with a `UiState` suffix (e.g., `ResumeMatchUiState`).
4. **UI-to-ViewModel Event Lambdas:** Always prefix action callbacks with **`on`** (e.g., `onJobDescriptionChanged`, `onFileSelected`, `onLoginClicked`).
5. **DTO Suffixes:** Request models must end with `Request`, and response models must end with `Response` or `Dto`.

---

## 3. Unidirectional Data Flow (UDF) Guide for UI Development

Our app strictly adheres to UDF principles. Here is how UI components interact with ViewModels:

* **Reading State:**
  UI screens observe immutable state flows emitted by the ViewModel. Never mutate state directly inside a composable.
  ```kotlin
  val uiState by viewModel.uiState.collectAsState()

---

## 4. Complete Screen Contracts & Data Flow Reference

| Screen Name | File Path | Primary Purpose & UI Behavior | State Variables & Observables (UiState) | User Actions & ViewModel Triggers |
| :--- | :--- | :--- | :--- | :--- |
| **Auth Screen** | `ui/auth/AuthContainerScreen.kt` | Handles user sign-in and registration inside a single screen using an animated toggle (`AnimatedContent` / `AnimatedVisibility`). | `email`, `password`, `fullName`, `isRegistering` (Boolean) | `onLoginClicked()`, `onRegisterClicked()`, `onToggleAuthMode()` |
| **Dashboard** | `ui/dashboard/DashboardScreen.kt` | Post-login landing hub displaying quick navigation cards to the resume matcher and audit reports. | User session token / active username | `onNavigateToMatcher()`, `onNavigateToAudit()` |
| **Resume Matcher** | `ui/matcher/ResumeMatchScreen.kt` | Core feature screen. Allows uploading `.pdf` or `.docx` resumes, pasting Job Descriptions, and running the match analysis. | **ResumeMatchUiState**:<br>- `isLoading` (Boolean)<br>- `jobDescriptionText` (String)<br>- `selectedFileName` (String?)<br>- `matchResult` (ResumeMatchResponse?)<br>- `errorMessage` (String?) | - `viewModel.onJobDescriptionChanged(...)`<br>- `viewModel.onFileSelected(...)`<br>- `viewModel.runMatchAndBiasAudit(...)` |
| **Bias Audit Report** | `ui/biasaudit/BiasAuditScreen.kt` | Displays the breakdown of the bias audit returned by the backend, highlighting flagged demographic/gendered terms and suggestions. | `BiasAuditDto` (accessed via shared state or navigation arguments) | `onBackClick()` |

---

## 5. Endpoints & Integration Notes (Backend Handover)
When the backend and ML model endpoints are finalized, update the base URL and endpoint paths in your network layer:

* **Base URL Location:** data/remote/RetrofitClient.kt

* **API Endpoints Location:** data/remote/ApiService.kt

* Currently, placeholder annotations (@POST("auth/login") and @Multipart @POST("resume/match-and-audit")) are in place so the frontend structure compiles and runs independently.