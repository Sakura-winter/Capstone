package com.skillsync.controller;

import com.skillsync.model.JobPosting;
import com.skillsync.repository.JobPostingRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Job Postings", description = "Target industrial job descriptions and required skill taxonomies")
public class JobPostingController {

    private final JobPostingRepository jobPostingRepository;

    @PostMapping
    @Operation(summary = "Create a new Job Posting with required skill taxonomy")
    public ResponseEntity<JobPosting> createJob(@RequestBody JobPosting jobPosting) {
        JobPosting saved = jobPostingRepository.save(jobPosting);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    @Operation(summary = "List all active Job Postings")
    public ResponseEntity<List<JobPosting>> getAllJobs(@RequestParam(required = false) String district) {
        if (district != null && !district.isBlank()) {
            return ResponseEntity.ok(jobPostingRepository.findByDistrictIgnoreCase(district));
        }
        return ResponseEntity.ok(jobPostingRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get Job Posting details by ID")
    public ResponseEntity<JobPosting> getJobById(@PathVariable Long id) {
        return jobPostingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

