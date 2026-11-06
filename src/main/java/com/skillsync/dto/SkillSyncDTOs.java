package com.skillsync.dto;

import lombok.*;
import java.util.List;
import java.util.Set;

public class SkillSyncDTOs {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CandidateResponse {
        private Long id;
        private String fullName;
        private String email;
        private String district;
        private String gender;
        private String institutionTier;
        private Double totalYearsExperience;
        private Set<String> extractedSkills;
        private String anonymizedResumeSnippet;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MatchEvaluationResponse {
        private Long evaluationId;
        private Long candidateId;
        private String candidateName;
        private Long jobId;
        private String jobTitle;
        private Double semanticSimilarity;
        private Double skillOverlapScore;
        private Double recencyExperienceScore;
        private Double compositeMatchScore;
        private Double skillGapIndex;
        private Boolean isShortlisted;
        private Boolean postAuditCalibrated;
        private List<String> missingSkills;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SkillGapAnalysisResponse {
        private Long candidateId;
        private Long jobId;
        private Double skillGapIndex;
        private List<String> missingSkills;
        private List<UpskillingModule> recommendedCourses;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpskillingModule {
        private String skill;
        private String moduleTitle;
        private String portal;
        private String url;
        private Integer hours;
    }
}

