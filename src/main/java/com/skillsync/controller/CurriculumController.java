package com.skillsync.controller;

import com.skillsync.dto.SkillSyncDTOs;
import com.skillsync.model.Candidate;
import com.skillsync.model.CurriculumRecommendation;
import com.skillsync.model.JobPosting;
import com.skillsync.repository.CandidateRepository;
import com.skillsync.repository.CurriculumRecommendationRepository;
import com.skillsync.repository.JobPostingRepository;
import com.skillsync.service.SemanticMatcherService;
import com.skillsync.service.SkillGapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/curriculum")
@RequiredArgsConstructor
@Tag(name = "Curriculum & Skill Gap Realignment", description = "Candidate upskilling paths and institutional training institute (ITI) feed-forward loop")
public class CurriculumController {

    private final CandidateRepository candidateRepo;
    private final JobPostingRepository jobRepo;
    private final SkillGapService skillGapService;
    private final SemanticMatcherService semanticMatcherService;
    private final CurriculumRecommendationRepository curriculumRepo;

    @GetMapping("/gap-analysis/{candidateId}/{jobId}")
    @Operation(summary = "Calculate Skill Gap Index (SGI) and suggest upskilling courses for a candidate")
    public ResponseEntity<SkillSyncDTOs.SkillGapAnalysisResponse> getCandidateSkillGap(
            @PathVariable Long candidateId,
            @PathVariable Long jobId
    ) {
        Candidate candidate = candidateRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found: " + candidateId));
        JobPosting job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found: " + jobId));

        double sgi = semanticMatcherService.computeSkillGapIndex(candidate.getExtractedSkills(), job.getRequiredSkills());
        List<String> missing = skillGapService.findMissingSkills(candidate.getExtractedSkills(), job.getRequiredSkills());
        List<CurriculumRecommendation> recommendations = skillGapService.getUpskillingRoadmap(missing);

        List<SkillSyncDTOs.UpskillingModule> modules = recommendations.stream()
                .map(r -> SkillSyncDTOs.UpskillingModule.builder()
                        .skill(r.getTargetSkill())
                        .moduleTitle(r.getModuleTitle())
                        .portal(r.getRecommendedPortal())
                        .url(r.getModuleUrl())
                        .hours(r.getEstimatedHours())
                        .build())
                .collect(Collectors.toList());

        return ResponseEntity.ok(SkillSyncDTOs.SkillGapAnalysisResponse.builder()
                .candidateId(candidateId)
                .jobId(jobId)
                .skillGapIndex(sgi)
                .missingSkills(missing)
                .recommendedCourses(modules)
                .build());
    }

    @GetMapping("/regional-deficits")
    @Operation(summary = "Institutional feed-forward: Aggregates missing market skills across industrial districts")
    public ResponseEntity<Map<String, Object>> getRegionalSkillDeficits(@RequestParam(defaultValue = "Pune") String district) {
        List<JobPosting> districtJobs = jobRepo.findByDistrictIgnoreCase(district);
        Map<String, Integer> skillDemand = new HashMap<>();

        for (JobPosting job : districtJobs) {
            for (String skill : job.getRequiredSkills()) {
                skillDemand.put(skill, skillDemand.getOrDefault(skill, 0) + 1);
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("district", district);
        response.put("totalActiveEnterpriseOpenings", districtJobs.size());
        response.put("highDemandDeficitSkills", skillDemand);
        response.put("policyFeedForwardAction", "Recommended module additions for District Vocational & ITI centers in " + district);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/modules")
    @Operation(summary = "Register new learning module (Mahaswayam / iGOT / NPTEL)")
    public ResponseEntity<CurriculumRecommendation> addModule(@RequestBody CurriculumRecommendation recommendation) {
        return ResponseEntity.ok(curriculumRepo.save(recommendation));
    }
}

