package io.github.sushaant.capstone.data.model

data class LoginRequest(val email: String, val pass: String)
data class AuthResponse(val token: String, val message: String)

data class ResumeMatchRequest(
    val resumeText: String,
    val jobDescription: String
)

data class ResumeMatchResponse(
    val matchScore: Int,
    val semanticOverlap: List<String>,
    val missingSkills: List<String>,
    val biasAudit: BiasAuditDto
)

data class BiasAuditDto(
    val flaggedTermsCount: Int,
    val flaggedItems: List<FlaggedItemDto>
)

data class FlaggedItemDto(
    val term: String,
    val category: String,
    val suggestion: String
)