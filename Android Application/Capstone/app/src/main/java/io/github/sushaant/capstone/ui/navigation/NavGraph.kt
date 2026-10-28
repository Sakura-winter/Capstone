package io.github.sushaant.capstone.ui.navigation

import androidx.compose.runtime.Composable
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
        // 1. Auth Screen
        composable(Screen.Auth.route) {
            AuthContainerScreen(
                onAuthSuccess = {
                    navController.navigate(Screen.Dashboard.route) {
                        popUpTo(Screen.Auth.route) { inclusive = true } // Clear auth from backstack
                    }
                }
            )
        }

        // 2. Dashboard Screen
        composable(Screen.Dashboard.route) {
            DashboardScreen(
                onNavigateToMatcher = { navController.navigate(Screen.ResumeMatch.route) },
                onNavigateToAudit = { navController.navigate(Screen.BiasAudit.route) }
            )
        }

        // 3. Resume Matcher Screen
        composable(Screen.ResumeMatch.route) {
            ResumeMatchScreen(
                onNavigateToAuditReport = { navController.navigate(Screen.BiasAudit.route) }
            )
        }

        // 4. Bias Audit Screen
        composable(Screen.BiasAudit.route) {
            BiasAuditScreen(
                onBackClick = { navController.popBackStack() }
            )
        }
    }
}