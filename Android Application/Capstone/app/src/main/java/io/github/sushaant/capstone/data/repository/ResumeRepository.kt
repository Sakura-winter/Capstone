package io.github.sushaant.capstone.data.repository

import io.github.sushaant.capstone.data.model.ResumeMatchResponse
import io.github.sushaant.capstone.data.remote.ApiService
import okhttp3.MultipartBody

class ResumeRepository(private val apiService: ApiService) {

    suspend fun matchResume(
        resumeFile: MultipartBody.Part,
        jobDescPart: MultipartBody.Part
    ): Result<ResumeMatchResponse> {
        return try {
            val response = apiService.uploadAndMatchResume(resumeFile, jobDescPart)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to analyze resume. Server error."))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}