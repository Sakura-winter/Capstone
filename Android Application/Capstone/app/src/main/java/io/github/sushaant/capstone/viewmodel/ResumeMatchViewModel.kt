package io.github.sushaant.capstone.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import io.github.sushaant.capstone.data.repository.ResumeRepository
import io.github.sushaant.capstone.ui.matcher.ResumeMatchUiState
import io.github.sushaant.capstone.data.remote.RetrofitClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import okhttp3.MultipartBody

class ResumeMatchViewModel(
    private val repository: ResumeRepository = ResumeRepository(
        RetrofitClient.apiService
    )
) : ViewModel() {

    private val _uiState = MutableStateFlow(ResumeMatchUiState())
    val uiState: StateFlow<ResumeMatchUiState> = _uiState.asStateFlow()

    fun onJobDescriptionChanged(newText: String) {
        _uiState.update { it.copy(jobDescriptionText = newText) }
    }

    fun onFileSelected(fileName: String) {
        _uiState.update { it.copy(selectedFileName = fileName) }
    }

    fun runMatchAndBiasAudit(resumePart: MultipartBody.Part, jdPart: MultipartBody.Part) {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true, errorMessage = null) }

            val result = repository.matchResume(resumePart, jdPart)

            result.onSuccess { response ->
                _uiState.update { it.copy(isLoading = false, matchResult = response) }
            }.onFailure { error ->
                _uiState.update { it.copy(isLoading = false, errorMessage = error.localizedMessage ?: "Unknown error") }
            }
        }
    }
}