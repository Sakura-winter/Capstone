package com.skillsync.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "candidates")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Candidate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Contact/Identity details (Protected in matching via PII stripping)
    private String fullName;
    private String email;
    private String phone;
    private String district;
    private String gender; // Demographic marker for bias audit (privileged / unprivileged)
    private String institutionTier; // Tier-1, Tier-2, Tier-3

    private Double totalYearsExperience;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String rawResumeText;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String anonymizedResumeText;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "candidate_skills", joinColumns = @JoinColumn(name = "candidate_id"))
    @Column(name = "skill")
    @Builder.Default
    private Set<String> extractedSkills = new HashSet<>();

    private LocalDateTime createdAt;

    @PrePersist
    public void init() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}

