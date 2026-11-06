package com.skillsync.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "job_postings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPosting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String department;
    private String organization;
    private String district; // Target industrial region e.g. Pune, Nagpur, Aurangabad, Mumbai

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    private Double requiredExperienceYears;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    @Builder.Default
    private Set<String> requiredSkills = new HashSet<>();

    private LocalDateTime createdAt;

    @PrePersist
    public void init() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}

