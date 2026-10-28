package io.github.sushaant.capstone.data.remote

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit

object RetrofitClient {

    // PLACEHOLDER BASE URL
    // Use "http://10.0.2.2:8080/api/" for Android Emulator pointing to localhost
    // Change to "http://192.168.x.x:8080/api/" if testing on a physical device over Wi-Fi
    private const val BASE_URL = "http://10.0.2.2:8080/api/"

    // 1. Logging Interceptor: Prints requests and responses to Logcat for debugging
    private val loggingInterceptor = HttpLoggingInterceptor().apply {
        level = HttpLoggingInterceptor.Level.BODY
    }

    // 2. OkHttpClient with custom timeouts
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(loggingInterceptor)
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .writeTimeout(30, TimeUnit.SECONDS)
        .build()

    // 3. Lazy-initialized Retrofit Instance
    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    // 4. Exposed ApiService instance used by Repositories
    val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}