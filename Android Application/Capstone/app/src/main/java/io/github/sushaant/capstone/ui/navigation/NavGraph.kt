package io.github.sushaant.capstone.ui.navigation

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import io.github.sushaant.capstone.ui.auth.AuthContainerScreen
import io.github.sushaant.capstone.ui.biasaudit.BiasAuditScreen
import io.github.sushaant.capstone.ui.dashboard.DashboardScreen
import io.github.sushaant.capstone.ui.matcher.ResumeMatchScreen

@Composable
fun SetupNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        startDestination = Screen.Auth.route
    ) {
        composable(Screen.Auth.route) {
            var isRegistering by remember { mutableStateOf(false) }

            AuthContainerScreen(
                onLoginClicked = { email, pass ->
                    // TODO: Call AuthViewModel.login(email, pass) and navigate on success
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Auth.route) { inclusive = true }
                    }
                },
                onRegisterClicked = { name, email, pass ->
                    // TODO: Call AuthViewModel.register(name, email, pass) and navigate on success
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Auth.route) { inclusive = true }
                    }
                },
                onToggleAuthMode = {
                    isRegistering = !isRegistering
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