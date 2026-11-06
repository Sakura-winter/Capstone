package com.skillsync.dto;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

public class AdminAnalyticsDTOs {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PlatformOverviewResponse {
        private Long totalCandidates;
        private Long totalJobPostings;
        private Long totalEvaluationsConducted;
        private Long totalShortlisted;
        private Double overallAverageMatchScore;
        private Double systemWideDIR;
        private Boolean biasComplianceStatus;
        private List<DistrictDeficitSummary> regionalBreakdown;
        private LocalDateTime generatedAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DistrictDeficitSummary {
        private String district;
        private Integer activeJobOpenings;
        private List<String> topInDemandSkills;
        private Integer candidateTalentPool;
    }
}
