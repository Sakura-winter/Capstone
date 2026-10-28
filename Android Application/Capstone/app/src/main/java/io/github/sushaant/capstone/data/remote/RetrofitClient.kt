package io.github.sushaant.capstone.data.remote

import io.github.sushaant.capstone.constants.ApiConstants
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {

    // 1. Logging Interceptor: Prints requests and responses to Logcat for debugging
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    // 2. OkHttpClient with custom timeouts
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(ApiConstants.TIMEOUT_SECONDS, TimeUnit.SECONDS)
        .readTimeout(ApiConstants.TIMEOUT_SECONDS, TimeUnit.SECONDS)
        .writeTimeout(ApiConstants.TIMEOUT_SECONDS, TimeUnit.SECONDS)
        .build()

    // 3. Lazy-initialized Retrofit Instance
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(ApiConstants.BASE_URL) // Pulls from the central constants file
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    // 4. Exposed ApiService instance used by Repositories
    val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}