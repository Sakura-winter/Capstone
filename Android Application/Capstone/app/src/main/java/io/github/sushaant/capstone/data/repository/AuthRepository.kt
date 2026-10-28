package io.github.sushaant.capstone.data.repository

import io.github.sushaant.capstone.data.model.AuthResponse
import io.github.sushaant.capstone.data.model.LoginRequest
import io.github.sushaant.capstone.data.model.RegisterRequest
import io.github.sushaant.capstone.data.remote.ApiService
import io.github.sushaant.capstone.data.remote.RetrofitClient

class AuthRepository(
    private val apiService: ApiService = RetrofitClient.apiService
) {

    suspend fun loginUser(request: LoginRequest): Result<AuthResponse> {
        return try {
            val response = apiService.login(request)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Invalid email or password."))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun registerUser(request: RegisterRequest): Result<AuthResponse> {
        return try {
            val response = apiService.register(request)
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Registration failed. Email may already exist."))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}