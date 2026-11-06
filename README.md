# SkillSync AI - Backend (SIH26134)
**Audited Resume-Job Matcher with Algorithmic Bias Audit and Dynamic Curriculum Realignment**

This is the enterprise Java Spring Boot backend designed for the Smart India Hackathon (SIH) Problem Statement SIH26134 (Government of Maharashtra).

---

## 🚀 Connecting Android / Mobile App Over Local IP

Your local LAN IP on Wi-Fi is:
```
172.21.230.204
```

### 1. Base URL for Android App
- **When testing on a Physical Android Device (connected to same Wi-Fi)**:
  ```
  http://172.21.230.204:8080/api/v1/
  ```
- **When testing on Android Studio Emulator (running on this PC)**:
  ```
  http://10.0.2.2:8080/api/v1/
  ```

### 2. Android App Permissions (`AndroidManifest.xml`)
Make sure your Android project includes the internet permission and allows HTTP traffic for local development:
```xml
<manifest ...>
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:usesCleartextTraffic="true"
        ... >
        ...
    </application>
</manifest>
```

### 3. Retrofit Configuration Example (Kotlin)
```kotlin
object RetrofitClient {
    private const val BASE_URL = "http://172.21.230.204:8080/api/v1/"

    val instance: SkillSyncApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(SkillSyncApiService::class.java)
    }
}
```

---

## 📖 Interactive Swagger / OpenAPI Documentation
Open in any browser (laptop or phone):
- **Local Browser**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **From Android Phone (via Wi-Fi)**: `http://172.21.230.204:8080/swagger-ui/index.html`

---

## 🛠️ Endpoints Overview

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Quick connectivity ping test for Android |
| `POST` | `/api/v1/candidates/upload-resume` | Upload resume (`.pdf` or text), strip PII, extract skills |
| `GET` | `/api/v1/candidates` | List candidates |
| `POST` | `/api/v1/jobs` | Post new enterprise job description |
| `GET` | `/api/v1/jobs` | Get active jobs (filter by `district`) |
| `POST` | `/api/v1/matching/evaluate/{candId}/{jobId}` | Match single candidate with formula weights |
| `POST` | `/api/v1/matching/evaluate-all/{jobId}` | Batch evaluate & trigger Sociotechnical Bias Audit |
| `GET` | `/api/v1/matching/bias-audit/{jobId}` | Get Disparate Impact Ratio (DIR) compliance report |
| `GET` | `/api/v1/curriculum/gap-analysis/{candId}/{jobId}` | Compute Skill Gap Index & fetch Mahaswayam / iGOT upskilling |
| `GET` | `/api/v1/curriculum/regional-deficits?district=Pune` | Aggregated market deficits for ITIs and vocational colleges |

