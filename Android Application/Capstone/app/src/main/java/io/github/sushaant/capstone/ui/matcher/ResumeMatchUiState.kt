package io.github.sushaant.capstone.ui.matcher

import io.github.sushaant.capstone.data.model.ResumeMatchResponse

data class ResumeMatchUiState(
    val isLoading: Boolean = false,
    val jobDescriptionText: String = "",
    val selectedFileName: String? = null,
    val matchResult: ResumeMatchResponse? = null,
    val errorMessage: String? = null
)