package com.skillsync.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "curriculum_recommendations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurriculumRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String targetSkill;
    private String recommendedPortal; // e.g., iGOT Karmayogi, Mahaswayam, Swayam, NPTEL
    private String moduleTitle;
    private String moduleUrl;
    private String domainArea;
    private Integer estimatedHours;
}

