package io.github.sushaant.capstone.data.remote

import io.github.sushaant.capstone.data.model.AuthResponse
import io.github.sushaant.capstone.data.model.LoginRequest
import io.github.sushaant.capstone.data.model.ResumeMatchResponse
import okhttp3.MultipartBody
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ApiService {

    @POST("auth/login") // Just a placeholder, needs to be replaced with original URL
    suspend fun login(@Body request: LoginRequest): Response<AuthResponse>

    @Multipart
    @POST("resume/match-and-audit") // Just a placeholder, needs to be replaced with original URL
    suspend fun uploadAndMatchResume(
        @Part resumeFile: MultipartBody.Part,
        @Part jobDescription: MultipartBody.Part
    ): Response<ResumeMatchResponse>
}