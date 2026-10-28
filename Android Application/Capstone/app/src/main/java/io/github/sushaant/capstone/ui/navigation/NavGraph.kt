package io.github.sushaant.capstone.ui.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import io.github.sushaant.capstone.ui.auth.AuthContainerScreen
import io.github.sushaant.capstone.ui.biasaudit.BiasAuditScreen
import io.github.sushaant.capstone.ui.dashboard.DashboardScreen
import io.github.sushaant.capstone.ui.matcher.ResumeMatchScreen
import io.github.sushaant.capstone.viewmodel.AuthViewModel

@Composable
fun SetupNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Auth.route
    ) {
        composable(Screen.Auth.route) {
            val authViewModel: AuthViewModel = viewModel()

            AuthContainerScreen(
                onLoginClicked = { email, pass ->
                    authViewModel.login(email, pass) {
                        navController.navigate(Screen.Dashboard.route) {
                            popUpTo(Screen.Auth.route) { inclusive = true }
                        }
                    }
                },
                onRegisterClicked = { name, email, pass ->
                    authViewModel.register(name, email, pass) {
                        navController.navigate(Screen.Dashboard.route) {
                            popUpTo(Screen.Auth.route) { inclusive = true }
                        }
                    }
                },
                onToggleAuthMode = {
                    authViewModel.onToggleAuthMode()
                }
            )
        }

        composable(Screen.Dashboard.route) {
            DashboardScreen(
                onNavigateToMatcher = { navController.navigate(Screen.ResumeMatch.route) },
                onNavigateToAudit = { navController.navigate(Screen.BiasAudit.route) }
            )
        }

        composable(Screen.ResumeMatch.route) {
            ResumeMatchScreen(
                onNavigateToAuditReport = { navController.navigate(Screen.BiasAudit.route) }
            )
        }

        composable(Screen.BiasAudit.route) {
            BiasAuditScreen(
                onBackClick = { navController.popBackStack() }
            )
        }
    }
}