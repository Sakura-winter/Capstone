# SkillSync AI - Backend (SIH26134)

**Audited Resume-Job Matcher with Algorithmic Bias Audit and Dynamic Curriculum Realignment**

This is the enterprise Java Spring Boot backend designed for the Smart India Hackathon (SIH) Problem Statement SIH26134 (Government of Maharashtra).

---

## 🚀 Connecting Android / Mobile App Over Local Network

### 1. Find Your Backend Host IP

On the backend host machine, check your local IPv4 address using `ipconfig` (Windows) or `ifconfig` / `ip a` (Linux/macOS):

```text
e.g. 192.168.x.x or 10.x.x.x (or your current LAN IP)
```

### 2. Base URL for Android App

- **When testing on a Physical Android Device (connected to same Wi-Fi)**:
  ```text
  http://<YOUR_LOCAL_IP>:8080/api/v1/
  ```
- **When testing on Android Studio Emulator (running on the same PC as backend)**:
  ```text
  http://10.0.2.2:8080/api/v1/
  ```

### 3. Android App Permissions (`AndroidManifest.xml`)

Make sure your Android project includes the internet permission and allows cleartext HTTP for local dev:

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

### 4. Retrofit Configuration Example (Kotlin)

```kotlin
object RetrofitClient {
    // Replace <YOUR_LOCAL_IP> with the host machine's Wi-Fi IPv4 address
    private const val BASE_URL = "http://<YOUR_LOCAL_IP>:8080/api/v1/"

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

Open in any browser:

- **Local Machine**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **From Mobile Device Browser (over same Wi-Fi)**: `http://<YOUR_LOCAL_IP>:8080/swagger-ui/index.html`

---

## 🛠️ Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/health` | Quick connectivity ping test for Android |
| `POST` | `/api/v1/auth/register` | User registration |
| `POST` | `/api/v1/auth/login` | User authentication & session token |
| `POST` | `/api/v1/candidates/upload-resume` | Upload resume (`.pdf`, `.docx`, or text), strip PII, extract skills |
| `GET` | `/api/v1/candidates` | List candidates |
| `POST` | `/api/v1/jobs` | Post new enterprise job description |
| `GET` | `/api/v1/jobs` | Get active jobs (filter by `district`) |
| `POST` | `/api/v1/matching/evaluate/{candId}/{jobId}` | Match single candidate with formula weights |
| `POST` | `/api/v1/matching/evaluate-all/{jobId}` | Batch evaluate & trigger Sociotechnical Bias Audit |
| `GET` | `/api/v1/matching/bias-audit/{jobId}` | Get Disparate Impact Ratio (DIR) compliance report |
| `GET` | `/api/v1/curriculum/gap-analysis/{candId}/{jobId}` | Compute Skill Gap Index & fetch Mahaswayam / iGOT upskilling |
| `GET` | `/api/v1/curriculum/regional-deficits?district=Pune` | Aggregated market deficits for ITIs and vocational colleges |
| `GET` | `/api/v1/analytics/overview` | Platform macro metrics and regional talent deficits |
