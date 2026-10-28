package io.github.sushaant.capstone.data.remote

import io.github.sushaant.capstone.data.model.*
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {

    @POST("auth/login") // Placeholder endpoint - ready for backend URL
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @POST("auth/register") // Placeholder endpoint - ready for backend URL
    suspend fun register(@Body request: RegisterRequest): Response<AuthResponse>

    @Multipart
    @POST("resume/match-and-audit") // Placeholder endpoint - ready for backend URL
    suspend fun uploadAndMatchResume(
        @Part resumeFile: MultipartBody.Part,
        @Part jobDescription: MultipartBody.Part
    ): Response<ResumeMatchResponse>
}