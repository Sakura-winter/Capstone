package com.skillsync.repository;

import com.skillsync.model.CurriculumRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CurriculumRecommendationRepository extends JpaRepository<CurriculumRecommendation, Long> {
    Optional<CurriculumRecommendation> findByTargetSkillIgnoreCase(String targetSkill);
    List<CurriculumRecommendation> findByDomainAreaIgnoreCase(String domainArea);
}

