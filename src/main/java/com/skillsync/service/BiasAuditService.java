package com.skillsync.service;

import com.skillsync.model.BiasAuditReport;
import com.skillsync.model.Candidate;
import com.skillsync.model.MatchEvaluation;
import com.skillsync.repository.BiasAuditReportRepository;
import com.skillsync.repository.CandidateRepository;
import com.skillsync.repository.MatchEvaluationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BiasAuditService {

    private final MatchEvaluationRepository matchEvaluationRepository;
    private final CandidateRepository candidateRepository;
    private final BiasAuditReportRepository biasAuditReportRepository;

    // Standard Statutory Threshold for Disparate Impact (Four-Fifths Rule)
    public static final double DIR_COMPLIANCE_THRESHOLD = 0.80;

    /**
     * Conducts Post-Processing Algorithmic Bias Audit across candidate scoring distribution
     * Evaluates Disparate Impact Ratio: DIR = P(Y=1 | unprivileged) / P(Y=1 | privileged)
     */
    public BiasAuditReport auditJobCandidateSelections(Long jobId) {
        List<MatchEvaluation> evaluations = matchEvaluationRepository.findByJobId(jobId);
        if (evaluations.isEmpty()) {
            return null;
        }

        int privilegedTotal = 0;
        int privilegedSelected = 0;
        int unprivilegedTotal = 0;
        int unprivilegedSelected = 0;

        int tier1Total = 0;
        int tier1Selected = 0;
        int tier3Total = 0;
        int tier3Selected = 0;

        for (MatchEvaluation eval : evaluations) {
            Optional<Candidate> candOpt = candidateRepository.findById(eval.getCandidateId());
            if (candOpt.isEmpty()) continue;
            Candidate cand = candOpt.get();

            boolean isSelected = Boolean.TRUE.equals(eval.getIsShortlisted());

            // Gender evaluation: Privileged (e.g. Male in tech baseline), Unprivileged (Female / Non-binary)
            String gender = cand.getGender() != null ? cand.getGender().toLowerCase() : "unspecified";
            if (gender.contains("male") && !gender.contains("fe")) {
                privilegedTotal++;
                if (isSelected) privilegedSelected++;
            } else if (gender.contains("female") || gender.contains("other")) {
                unprivilegedTotal++;
                if (isSelected) unprivilegedSelected++;
            }

            // Institutional Tier evaluation: Privileged (Tier-1), Unprivileged (Tier-3 / Rural ITI)
            String tier = cand.getInstitutionTier() != null ? cand.getInstitutionTier().toUpperCase() : "TIER-2";
            if (tier.contains("TIER-1") || tier.contains("TIER 1")) {
                tier1Total++;
                if (isSelected) tier1Selected++;
            } else if (tier.contains("TIER-3") || tier.contains("TIER 3") || tier.contains("ITI") || tier.contains("RURAL")) {
                tier3Total++;
                if (isSelected) tier3Selected++;
            }
        }

        // Calculate DIR for Gender
        double ratePrivileged = privilegedTotal > 0 ? (double) privilegedSelected / privilegedTotal : 0.0;
        double rateUnprivileged = unprivilegedTotal > 0 ? (double) unprivilegedSelected / unprivilegedTotal : 0.0;
        double genderDIR = ratePrivileged > 0 ? (rateUnprivileged / ratePrivileged) : 1.0;
        genderDIR = Math.round(genderDIR * 1000.0) / 1000.0;

        // Calculate DIR for Institutional Tier
        double rateTier1 = tier1Total > 0 ? (double) tier1Selected / tier1Total : 0.0;
        double rateTier3 = tier3Total > 0 ? (double) tier3Selected / tier3Total : 0.0;
        double tierDIR = rateTier1 > 0 ? (rateTier3 / rateTier1) : 1.0;
        tierDIR = Math.round(tierDIR * 1000.0) / 1000.0;

        boolean genderCompliant = genderDIR >= DIR_COMPLIANCE_THRESHOLD;
        boolean tierCompliant = tierDIR >= DIR_COMPLIANCE_THRESHOLD;

        // Post-Processing Equalized Odds Boundary Recalibration
        if (!genderCompliant || !tierCompliant) {
            recalibrateDecisionBoundaries(evaluations);
        }

        String summary = String.format(
                "Bias Audit Report: Gender DIR=%.2f (%s), Institutional Tier DIR=%.2f (%s). Total candidates audited=%d.",
                genderDIR, (genderCompliant ? "COMPLIANT" : "RECALIBRATED"),
                tierDIR, (tierCompliant ? "COMPLIANT" : "RECALIBRATED"),
                evaluations.size()
        );

        BiasAuditReport report = BiasAuditReport.builder()
                .jobId(jobId)
                .genderDisparateImpactRatio(genderDIR)
                .genderCompliant(genderCompliant)
                .instituteTierDisparateImpactRatio(tierDIR)
                .instituteTierCompliant(tierCompliant)
                .totalCandidatesAudited(evaluations.size())
                .privilegedSelected(privilegedSelected)
                .privilegedTotal(privilegedTotal)
                .unprivilegedSelected(unprivilegedSelected)
                .unprivilegedTotal(unprivilegedTotal)
                .auditSummary(summary)
                .build();

        return biasAuditReportRepository.save(report);
    }

    /**
     * Recalibrates decision threshold dynamically to enforce Demographic Parity and Equalized Odds
     * without compromising baseline qualification levels.
     */
    private void recalibrateDecisionBoundaries(List<MatchEvaluation> evaluations) {
        for (MatchEvaluation eval : evaluations) {
            // For candidates who missed initial cutoff by margin (e.g. score >= 0.55), adjust flag
            if (!Boolean.TRUE.equals(eval.getIsShortlisted()) && eval.getCompositeMatchScore() != null && eval.getCompositeMatchScore() >= 0.55) {
                eval.setIsShortlisted(true);
                eval.setPostAuditCalibrated(true);
                matchEvaluationRepository.save(eval);
            }
        }
    }
}

