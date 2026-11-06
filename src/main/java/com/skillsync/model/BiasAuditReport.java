package com.skillsync.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bias_audit_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BiasAuditReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long jobId;

    // Disparate Impact Ratio metrics (DIR = P(Y=1 | unprivileged) / P(Y=1 | privileged))
    private Double genderDisparateImpactRatio;
    private Boolean genderCompliant; // Threshold >= 0.80

    private Double instituteTierDisparateImpactRatio;
    private Boolean instituteTierCompliant; // Threshold >= 0.80

    private Integer totalCandidatesAudited;
    private Integer privilegedSelected;
    private Integer privilegedTotal;
    private Integer unprivilegedSelected;
    private Integer unprivilegedTotal;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String auditSummary;

    private LocalDateTime auditedAt;

    @PrePersist
    public void init() {
        if (this.auditedAt == null) {
            this.auditedAt = LocalDateTime.now();
        }
    }
}

