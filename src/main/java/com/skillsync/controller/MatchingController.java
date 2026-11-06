package com.skillsync.controller;

import com.skillsync.dto.SkillSyncDTOs;
import com.skillsync.model.BiasAuditReport;
import com.skillsync.model.Candidate;
import com.skillsync.model.JobPosting;
import com.skillsync.model.MatchEvaluation;
import com.skillsync.repository.CandidateRepository;
import com.skillsync.repository.JobPostingRepository;
import com.skillsync.repository.MatchEvaluationRepository;
import com.skillsync.service.BiasAuditService;
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
@RequestMapping("/api/v1/matching")
@RequiredArgsConstructor
@Tag(name = "Matching & Algorithmic Bias Audit", description = "Contextual semantic matching, DIR scoring, and Equalized Odds boundary recalibration")
public class MatchingController {

    private final CandidateRepository candidateRepo;
    private final JobPostingRepository jobRepo;
    private final MatchEvaluationRepository matchEvaluationRepo;
    private final SemanticMatcherService matcherService;
    private final BiasAuditService biasAuditService;
    private final SkillGapService skillGapService;

    @PostMapping("/evaluate/{candidateId}/{jobId}")
    @Operation(summary = "Match a single candidate against a target job using multi-weighted formula")
    public ResponseEntity<SkillSyncDTOs.MatchEvaluationResponse> evaluateCandidate(
            @PathVariable Long candidateId,
            @PathVariable Long jobId
    ) {
        Candidate candidate = candidateRepo.findById(candidateId)
                .orElseThrow(() -> new RuntimeException("Candidate not found: " + candidateId));
        JobPosting job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found: " + jobId));

        double sim = matcherService.computeCosineSimilarity(candidate.getAnonymizedResumeText(), job.getDescription());
        double overlap = matcherService.computeSkillOverlap(candidate.getExtractedSkills(), job.getRequiredSkills());
        double recency = matcherService.computeRecencyScore(candidate.getTotalYearsExperience(), job.getRequiredExperienceYears());
        double composite = matcherService.computeCompositeMatch(sim, overlap, recency);
        double sgi = matcherService.computeSkillGapIndex(candidate.getExtractedSkills(), job.getRequiredSkills());

        boolean isShortlisted = composite >= 0.65; // Baseline threshold

        MatchEvaluation evaluation = MatchEvaluation.builder()
                .candidateId(candidateId)
                .jobId(jobId)
                .semanticSimilarity(Math.round(sim * 1000.0) / 1000.0)
                .skillOverlapScore(Math.round(overlap * 1000.0) / 1000.0)
                .recencyExperienceScore(Math.round(recency * 1000.0) / 1000.0)
                .compositeMatchScore(composite)
                .skillGapIndex(sgi)
                .isShortlisted(isShortlisted)
                .postAuditCalibrated(false)
                .build();

        MatchEvaluation saved = matchEvaluationRepo.save(evaluation);

        List<String> missing = skillGapService.findMissingSkills(candidate.getExtractedSkills(), job.getRequiredSkills());

        return ResponseEntity.ok(SkillSyncDTOs.MatchEvaluationResponse.builder()
                .evaluationId(saved.getId())
                .candidateId(candidateId)
                .candidateName(candidate.getFullName())
                .jobId(jobId)
                .jobTitle(job.getTitle())
                .semanticSimilarity(saved.getSemanticSimilarity())
                .skillOverlapScore(saved.getSkillOverlapScore())
                .recencyExperienceScore(saved.getRecencyExperienceScore())
                .compositeMatchScore(saved.getCompositeMatchScore())
                .skillGapIndex(saved.getSkillGapIndex())
                .isShortlisted(saved.getIsShortlisted())
                .postAuditCalibrated(saved.getPostAuditCalibrated())
                .missingSkills(missing)
                .build());
    }

    @PostMapping("/evaluate-all/{jobId}")
    @Operation(summary = "Batch evaluate all candidates against a job and trigger Sociotechnical Bias Audit")
    public ResponseEntity<Map<String, Object>> evaluateAllAndAudit(@PathVariable Long jobId) {
        JobPosting job = jobRepo.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found: " + jobId));

        List<Candidate> allCandidates = candidateRepo.findAll();
        List<MatchEvaluation> results = new ArrayList<>();

        for (Candidate cand : allCandidates) {
            double sim = matcherService.computeCosineSimilarity(cand.getAnonymizedResumeText(), job.getDescription());
            double overlap = matcherService.computeSkillOverlap(cand.getExtractedSkills(), job.getRequiredSkills());
            double recency = matcherService.computeRecencyScore(cand.getTotalYearsExperience(), job.getRequiredExperienceYears());
            double composite = matcherService.computeCompositeMatch(sim, overlap, recency);
            double sgi = matcherService.computeSkillGapIndex(cand.getExtractedSkills(), job.getRequiredSkills());

            boolean isShortlisted = composite >= 0.65;

            MatchEvaluation eval = MatchEvaluation.builder()
                    .candidateId(cand.getId())
                    .jobId(jobId)
                    .semanticSimilarity(Math.round(sim * 1000.0) / 1000.0)
                    .skillOverlapScore(Math.round(overlap * 1000.0) / 1000.0)
                    .recencyExperienceScore(Math.round(recency * 1000.0) / 1000.0)
                    .compositeMatchScore(composite)
                    .skillGapIndex(sgi)
                    .isShortlisted(isShortlisted)
                    .postAuditCalibrated(false)
                    .build();

            results.add(matchEvaluationRepo.save(eval));
        }

        // Trigger Bias Audit (calculates DIR and auto-recalibrates if DIR < 0.80)
        BiasAuditReport auditReport = biasAuditService.auditJobCandidateSelections(jobId);

        Map<String, Object> resp = new HashMap<>();
        resp.put("totalCandidatesProcessed", results.size());
        resp.put("jobId", jobId);
        resp.put("biasAuditReport", auditReport);
        resp.put("evaluations", matchEvaluationRepo.findByJobId(jobId));

        return ResponseEntity.ok(resp);
    }

    @GetMapping("/bias-audit/{jobId}")
    @Operation(summary = "Get the latest Algorithmic Bias Audit report for a job")
    public ResponseEntity<BiasAuditReport> getBiasAuditReport(@PathVariable Long jobId) {
        BiasAuditReport report = biasAuditService.auditJobCandidateSelections(jobId);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(report);
    }
}

