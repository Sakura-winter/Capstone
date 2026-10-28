package io.github.sushaant.capstone.ui.navigation

sealed class Screen(val route: String) {
    object Auth : Screen("auth")
    object Dashboard : Screen("dashboard")
    object ResumeMatch : Screen("resume_match")
    object BiasAudit : Screen("bias_audit")
}