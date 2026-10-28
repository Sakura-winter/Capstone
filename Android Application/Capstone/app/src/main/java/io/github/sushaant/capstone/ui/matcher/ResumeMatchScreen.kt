package io.github.sushaant.capstone.ui.matcher

import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.lifecycle.viewmodel.compose.viewModel
import io.github.sushaant.capstone.viewmodel.ResumeMatchViewModel

/**
 * 📝 UI TEMPLATE: ResumeMatchScreen
 * --------------------------------------------------------------------------
 * Purpose: Upload resume (.pdf/.docx), paste Job Description, and run matching.
 *
 * Contract Alignment (From DEVELOPMENT_GUIDELINES.md):
 * - State Observables: ResumeMatchUiState (isLoading, jobDescriptionText, selectedFileName, matchResult, errorMessage)
 * - User Actions:
 *     - viewModel.onJobDescriptionChanged(newText)
 *     - viewModel.onFileSelected(fileName)
 *     - viewModel.runMatchAndBiasAudit(resumePart, jdPart)
 */
@Composable
fun ResumeMatchScreen(
    viewModel: ResumeMatchViewModel = viewModel(),
    onNavigateToAuditReport: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsState()

    // TODO: Bind UI fields to uiState and wire buttons to viewModel methods.
}