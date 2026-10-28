package io.github.sushaant.capstone.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.sushaant.capstone.data.model.LoginRequest
import io.github.sushaant.capstone.data.model.RegisterRequest
import io.github.sushaant.capstone.data.repository.AuthRepository
import io.github.sushaant.capstone.ui.auth.AuthUiState
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class AuthViewModel(
    private val authRepository: AuthRepository = AuthRepository()
) : ViewModel() {

    private val _uiState = MutableStateFlow(AuthUiState())
    val uiState: StateFlow<AuthUiState> = _uiState.asStateFlow()

    fun onToggleAuthMode() {
        _uiState.update { it.copy(isRegistering = !it.isRegistering, errorMessage = null) }
    }

    fun login(email: String, pass: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            val result = authRepository.loginUser(LoginRequest(email, pass))

            result.onSuccess {
                _uiState.update { state -> state.copy(isLoading = false) }
                onSuccess()
            }.onFailure { exception ->
                _uiState.update { state ->
                    state.copy(isLoading = false, errorMessage = exception.localizedMessage ?: "Login failed")
                }
            }
        }
    }

    fun register(fullName: String, email: String, pass: String, onSuccess: () -> Unit) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }
            val result = authRepository.registerUser(RegisterRequest(fullName, email, pass))

            result.onSuccess {
                _uiState.update { state -> state.copy(isLoading = false) }
                onSuccess()
            }.onFailure { exception ->
                _uiState.update { state ->
                    state.copy(isLoading = false, errorMessage = exception.localizedMessage ?: "Registration failed")
                }
            }
        }
    }
}