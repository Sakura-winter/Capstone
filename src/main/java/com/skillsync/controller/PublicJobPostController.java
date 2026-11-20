package com.skillsync.controller;

import com.skillsync.dto.CompanyDTOs;
import com.skillsync.service.JobPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/jobs")
@RequiredArgsConstructor
@Tag(name = "Public Job Discovery", description = "Public feeds of published company jobs for candidates, students, and mobile apps")
public class PublicJobPostController {

    private final JobPostService jobPostService;

    @GetMapping("/feed")
    @Operation(summary = "Public job feed of all PUBLISHED company job openings")
    public ResponseEntity<List<CompanyDTOs.JobPostResponse>> getPublicJobFeed() {
        return ResponseEntity.ok(jobPostService.getPublicPublishedJobs());
    }

    @GetMapping("/feed/{jobId}")
    @Operation(summary = "Get single published job post details")
    public ResponseEntity<CompanyDTOs.JobPostResponse> getPublicJobDetails(@PathVariable UUID jobId) {
        return ResponseEntity.ok(jobPostService.getJobPostById(jobId));
    }
}
