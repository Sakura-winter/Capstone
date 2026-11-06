package com.skillsync.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "match_evaluations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MatchEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long candidateId;
    private Long jobId;

    private Double semanticSimilarity; // Sim(vc, vj)
    private Double skillOverlapScore;    // Overlap(Kc, Kj)
    private Double recencyExperienceScore; // Recency(Ec)
    private Double compositeMatchScore;  // Smatch = a*Sim + b*Overlap + g*Recency

    private Double skillGapIndex;       // SGI

    private Boolean isShortlisted;      // Threshold cut-off outcome
    private Boolean postAuditCalibrated;

    private LocalDateTime evaluatedAt;

    @PrePersist
    public void init() {
        if (this.evaluatedAt == null) {
            this.evaluatedAt = LocalDateTime.now();
        }
    }
}

