package com.skillsync.service;

import com.skillsync.model.CurriculumRecommendation;
import com.skillsync.repository.CurriculumRecommendationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SkillGapService {

    private final CurriculumRecommendationRepository curriculumRepo;

    public List<String> findMissingSkills(Set<String> candidateSkills, Set<String> requiredSkills) {
        List<String> missing = new ArrayList<>();
        if (requiredSkills == null) return missing;

        for (String req : requiredSkills) {
            boolean hasSkill = candidateSkills != null && candidateSkills.stream()
                    .anyMatch(cs -> cs.equalsIgnoreCase(req));
            if (!hasSkill) {
                missing.add(req);
            }
        }
        return missing;
    }

    public List<CurriculumRecommendation> getUpskillingRoadmap(List<String> missingSkills) {
        List<CurriculumRecommendation> roadmap = new ArrayList<>();
        for (String skill : missingSkills) {
            Optional<CurriculumRecommendation> rec = curriculumRepo.findByTargetSkillIgnoreCase(skill);
            if (rec.isPresent()) {
                roadmap.add(rec.get());
            } else {
                // Fallback default recommendation pointing to Mahaswayam / iGOT
                roadmap.add(CurriculumRecommendation.builder()
                        .targetSkill(skill)
                        .moduleTitle("Certified Industry Skill Pathway: " + skill)
                        .recommendedPortal("Mahaswayam / iGOT Karmayogi")
                        .moduleUrl("https://mahaswayam.gov.in/courses?q=" + skill.toLowerCase())
                        .domainArea("Technical Vocational Certification")
                        .estimatedHours(20)
                        .build());
            }
        }
        return roadmap;
    }
}

