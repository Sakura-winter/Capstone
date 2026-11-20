package com.skillsync.service;

import com.skillsync.dto.CompanyDTOs;
import com.skillsync.model.*;
import com.skillsync.repository.CompanyEmployeeRepository;
import com.skillsync.repository.CompanyRepository;
import com.skillsync.repository.JobPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobPostService {

    private final JobPostRepository jobPostRepository;
    private final CompanyRepository companyRepository;
    private final CompanyEmployeeRepository employeeRepository;
    private final CompanyPermissionGuard permissionGuard;

    /**
     * Flow C: Job Posting Creation
     * Guarded by JOB_CREATE permission.
     */
    @Transactional
    public CompanyDTOs.JobPostResponse createJobPost(UUID companyId, UUID actorEmployeeId, CompanyDTOs.CreateJobPostRequest req) {
        // Enforce JOB_CREATE permission
        CompanyEmployee creator = permissionGuard.verifyPermission(companyId, actorEmployeeId, EmployeePermission.JOB_CREATE);

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found: " + companyId));

        if (req.getTitle() == null || req.getTitle().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Job title is required.");
        }
        if (req.getDescription() == null || req.getDescription().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Job description is required.");
        }

        JobPost jobPost = JobPost.builder()
                .companyId(companyId)
                .createdByEmployeeId(creator.getId())
                .title(req.getTitle())
                .description(req.getDescription())
                .requiredSkills(req.getRequiredSkills() != null ? req.getRequiredSkills() : new HashSet<>())
                .location(req.getLocation() != null ? req.getLocation() : company.getLocation())
                .workMode(req.getWorkMode() != null ? req.getWorkMode() : WorkMode.ONSITE)
                .status(req.getStatus() != null ? req.getStatus() : JobStatus.DRAFT)
                .requiredExperienceYears(req.getRequiredExperienceYears() != null ? req.getRequiredExperienceYears() : 0.0)
                .build();

        JobPost saved = jobPostRepository.save(jobPost);
        return mapToJobPostResponse(saved, company.getName(), creator.getFullName());
    }

    /**
     * List internal jobs for a company (drafts + published + closed)
     * Guarded by JOB_VIEW permission.
     */
    public List<CompanyDTOs.JobPostResponse> getCompanyJobs(UUID companyId, UUID actorEmployeeId, JobStatus statusFilter) {
        permissionGuard.verifyPermission(companyId, actorEmployeeId, EmployeePermission.JOB_VIEW);

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found: " + companyId));

        List<JobPost> posts = (statusFilter != null)
                ? jobPostRepository.findByCompanyIdAndStatus(companyId, statusFilter)
                : jobPostRepository.findByCompanyId(companyId);

        return posts.stream()
                .map(jp -> {
                    String empName = employeeRepository.findById(jp.getCreatedByEmployeeId())
                            .map(CompanyEmployee::getFullName)
                            .orElse("Unknown Employee");
                    return mapToJobPostResponse(jp, company.getName(), empName);
                })
                .collect(Collectors.toList());
    }

    /**
     * Flow C: Edit / Publish / Close Job Post
     * Guarded by JOB_EDIT permission.
     */
    @Transactional
    public CompanyDTOs.JobPostResponse updateJobPost(UUID companyId, UUID jobId, UUID actorEmployeeId, CompanyDTOs.UpdateJobPostRequest req) {
        permissionGuard.verifyPermission(companyId, actorEmployeeId, EmployeePermission.JOB_EDIT);

        JobPost post = jobPostRepository.findByIdAndCompanyId(jobId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job post not found for company: " + jobId));

        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found: " + companyId));

        if (req.getTitle() != null && !req.getTitle().isBlank()) post.setTitle(req.getTitle());
        if (req.getDescription() != null && !req.getDescription().isBlank()) post.setDescription(req.getDescription());
        if (req.getRequiredSkills() != null) post.setRequiredSkills(req.getRequiredSkills());
        if (req.getLocation() != null) post.setLocation(req.getLocation());
        if (req.getWorkMode() != null) post.setWorkMode(req.getWorkMode());
        if (req.getStatus() != null) post.setStatus(req.getStatus());
        if (req.getRequiredExperienceYears() != null) post.setRequiredExperienceYears(req.getRequiredExperienceYears());

        JobPost updated = jobPostRepository.save(post);

        String empName = employeeRepository.findById(updated.getCreatedByEmployeeId())
                .map(CompanyEmployee::getFullName)
                .orElse("Unknown Employee");

        return mapToJobPostResponse(updated, company.getName(), empName);
    }

    /**
     * Public feed of PUBLISHED jobs for students, job seekers, and mobile apps.
     */
    public List<CompanyDTOs.JobPostResponse> getPublicPublishedJobs() {
        return jobPostRepository.findByStatus(JobStatus.PUBLISHED).stream()
                .map(jp -> {
                    String compName = companyRepository.findById(jp.getCompanyId())
                            .map(Company::getName)
                            .orElse("Partner Company");
                    return mapToJobPostResponse(jp, compName, null);
                })
                .collect(Collectors.toList());
    }

    public CompanyDTOs.JobPostResponse getJobPostById(UUID jobId) {
        JobPost jp = jobPostRepository.findById(jobId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job post not found: " + jobId));
        String compName = companyRepository.findById(jp.getCompanyId())
                .map(Company::getName)
                .orElse("Partner Company");
        String empName = employeeRepository.findById(jp.getCreatedByEmployeeId())
                .map(CompanyEmployee::getFullName)
                .orElse("Unknown");
        return mapToJobPostResponse(jp, compName, empName);
    }

    private CompanyDTOs.JobPostResponse mapToJobPostResponse(JobPost jp, String companyName, String employeeName) {
        return CompanyDTOs.JobPostResponse.builder()
                .id(jp.getId())
                .companyId(jp.getCompanyId())
                .companyName(companyName)
                .createdByEmployeeId(jp.getCreatedByEmployeeId())
                .createdByEmployeeName(employeeName)
                .title(jp.getTitle())
                .description(jp.getDescription())
                .requiredSkills(jp.getRequiredSkills())
                .location(jp.getLocation())
                .workMode(jp.getWorkMode())
                .status(jp.getStatus())
                .requiredExperienceYears(jp.getRequiredExperienceYears())
                .createdAt(jp.getCreatedAt())
                .updatedAt(jp.getUpdatedAt())
                .build();
    }
}
