package com.skillsync.controller;

import com.skillsync.dto.SkillSyncDTOs;
import com.skillsync.model.Candidate;
import com.skillsync.repository.CandidateRepository;
import com.skillsync.service.ResumeParserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/candidates")
@RequiredArgsConstructor
@Tag(name = "Candidates & Resumes", description = "Resume ingestion, layout parsing, and demographic anonymization")
public class CandidateController {

    private final CandidateRepository candidateRepository;
    private final ResumeParserService resumeParserService;

    @PostMapping(value = "/upload-resume", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload candidate resume (PDF or Text), extract skills, and scrub PII")
    public ResponseEntity<SkillSyncDTOs.CandidateResponse> uploadResume(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "fullName", required = false, defaultValue = "Anonymous Candidate") String fullName,
            @RequestParam(value = "email", required = false, defaultValue = "") String email,
            @RequestParam(value = "district", required = false, defaultValue = "Pune") String district,
            @RequestParam(value = "gender", required = false, defaultValue = "Unspecified") String gender,
            @RequestParam(value = "institutionTier", required = false, defaultValue = "Tier-3") String institutionTier
    ) {
        String rawText = resumeParserService.extractText(file);
        String anonymized = resumeParserService.anonymizePII(rawText);
        Set<String> skills = resumeParserService.extractSkills(rawText);
        Double expYears = resumeParserService.estimateExperienceYears(rawText);

        Candidate candidate = Candidate.builder()
                .fullName(fullName)
                .email(email)
                .district(district)
                .gender(gender)
                .institutionTier(institutionTier)
                .totalYearsExperience(expYears)
                .rawResumeText(rawText)
                .anonymizedResumeText(anonymized)
                .extractedSkills(skills)
                .build();

        Candidate saved = candidateRepository.save(candidate);

        return ResponseEntity.ok(mapToDto(saved));
    }

    @PostMapping("/manual")
    @Operation(summary = "Register candidate with profile and skills manually")
    public ResponseEntity<SkillSyncDTOs.CandidateResponse> createManual(@RequestBody Candidate candidate) {
        if (candidate.getAnonymizedResumeText() == null && candidate.getRawResumeText() != null) {
            candidate.setAnonymizedResumeText(resumeParserService.anonymizePII(candidate.getRawResumeText()));
        }
        if (candidate.getExtractedSkills() == null || candidate.getExtractedSkills().isEmpty()) {
            candidate.setExtractedSkills(resumeParserService.extractSkills(candidate.getRawResumeText()));
        }
        Candidate saved = candidateRepository.save(candidate);
        return ResponseEntity.ok(mapToDto(saved));
    }

    @GetMapping
    @Operation(summary = "List all registered candidates")
    public ResponseEntity<List<SkillSyncDTOs.CandidateResponse>> getAllCandidates() {
        List<SkillSyncDTOs.CandidateResponse> list = candidateRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get candidate by ID")
    public ResponseEntity<SkillSyncDTOs.CandidateResponse> getCandidateById(@PathVariable Long id) {
        return candidateRepository.findById(id)
                .map(cand -> ResponseEntity.ok(mapToDto(cand)))
                .orElse(ResponseEntity.notFound().build());
    }

    private SkillSyncDTOs.CandidateResponse mapToDto(Candidate c) {
        String snippet = c.getAnonymizedResumeText() != null && c.getAnonymizedResumeText().length() > 200
                ? c.getAnonymizedResumeText().substring(0, 200) + "..."
                : c.getAnonymizedResumeText();

        return SkillSyncDTOs.CandidateResponse.builder()
                .id(c.getId())
                .fullName(c.getFullName())
                .email(c.getEmail())
                .district(c.getDistrict())
                .gender(c.getGender())
                .institutionTier(c.getInstitutionTier())
                .totalYearsExperience(c.getTotalYearsExperience())
                .extractedSkills(c.getExtractedSkills())
                .anonymizedResumeSnippet(snippet)
                .build();
    }
}

