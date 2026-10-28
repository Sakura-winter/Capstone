package io.github.sushaant.capstone.ui.auth

data class AuthUiState(
    val isLoading: Boolean = false,
    val isRegistering: Boolean = false,
    val email: String = "",
    val password: String = "",
    val fullName: String = "",
    val errorMessage: String? = null
)