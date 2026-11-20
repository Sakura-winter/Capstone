package com.skillsync.controller;

import com.skillsync.dto.CompanyDTOs;
import com.skillsync.model.JobStatus;
import com.skillsync.service.CompanyService;
import com.skillsync.service.JobPostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/companies")
@RequiredArgsConstructor
@Tag(name = "Company & Employee Management", description = "Company onboarding, team member permission administration, and guarded job postings")
public class CompanyController {

    private final CompanyService companyService;
    private final JobPostService jobPostService;

    // === Company Endpoints ===

    @PostMapping
    @Operation(summary = "Flow A: Add Company (provisions company and initial Super Admin employee)")
    public ResponseEntity<CompanyDTOs.CompanyResponse> createCompany(@RequestBody CompanyDTOs.CreateCompanyRequest req) {
        return ResponseEntity.ok(companyService.createCompany(req));
    }

    @GetMapping
    @Operation(summary = "List all registered companies")
    public ResponseEntity<List<CompanyDTOs.CompanyResponse>> getAllCompanies() {
        return ResponseEntity.ok(companyService.getAllCompanies());
    }

    @GetMapping("/{companyId}")
    @Operation(summary = "Get company details by ID")
    public ResponseEntity<CompanyDTOs.CompanyResponse> getCompanyById(@PathVariable UUID companyId) {
        return ResponseEntity.ok(companyService.getCompanyById(companyId));
    }

    // === Employee & Permission Endpoints ===

    @PostMapping("/{companyId}/employees")
    @Operation(summary = "Flow B: Add employee with granular permissions (Guarded by EMPLOYEE_MANAGE)")
    public ResponseEntity<CompanyDTOs.EmployeeResponse> addEmployee(
            @PathVariable UUID companyId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId,
            @RequestBody CompanyDTOs.AddEmployeeRequest req
    ) {
        return ResponseEntity.ok(companyService.addEmployee(companyId, actorEmployeeId, req));
    }

    @GetMapping("/{companyId}/employees")
    @Operation(summary = "List all employees & their permissions for a company")
    public ResponseEntity<List<CompanyDTOs.EmployeeResponse>> getCompanyEmployees(
            @PathVariable UUID companyId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId
    ) {
        return ResponseEntity.ok(companyService.getCompanyEmployees(companyId, actorEmployeeId));
    }

    @PatchMapping("/{companyId}/employees/{employeeId}")
    @Operation(summary = "Flow B: Update employee name, role, permissions or status (Guarded by EMPLOYEE_MANAGE)")
    public ResponseEntity<CompanyDTOs.EmployeeResponse> updateEmployeePermissions(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId,
            @RequestBody CompanyDTOs.UpdateEmployeePermissionsRequest req
    ) {
        return ResponseEntity.ok(companyService.updateEmployeePermissions(companyId, employeeId, actorEmployeeId, req));
    }

    @GetMapping("/{companyId}/employees/{employeeId}")
    @Operation(summary = "Get employee details & effective permissions")
    public ResponseEntity<CompanyDTOs.EmployeeResponse> getEmployeeById(
            @PathVariable UUID companyId,
            @PathVariable UUID employeeId
    ) {
        return ResponseEntity.ok(companyService.getEmployeeById(companyId, employeeId));
    }

    // === Guarded Job Posting Endpoints ===

    @PostMapping("/{companyId}/jobs")
    @Operation(summary = "Flow C: Create a job post (Draft or Published) (Guarded by JOB_CREATE)")
    public ResponseEntity<CompanyDTOs.JobPostResponse> createJobPost(
            @PathVariable UUID companyId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId,
            @RequestBody CompanyDTOs.CreateJobPostRequest req
    ) {
        return ResponseEntity.ok(jobPostService.createJobPost(companyId, actorEmployeeId, req));
    }

    @GetMapping("/{companyId}/jobs")
    @Operation(summary = "List internal company job posts (Guarded by JOB_VIEW)")
    public ResponseEntity<List<CompanyDTOs.JobPostResponse>> getCompanyJobs(
            @PathVariable UUID companyId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId,
            @RequestParam(required = false) JobStatus status
    ) {
        return ResponseEntity.ok(jobPostService.getCompanyJobs(companyId, actorEmployeeId, status));
    }

    @PatchMapping("/{companyId}/jobs/{jobId}")
    @Operation(summary = "Flow C: Update job details or change status (Draft, Published, Closed) (Guarded by JOB_EDIT)")
    public ResponseEntity<CompanyDTOs.JobPostResponse> updateJobPost(
            @PathVariable UUID companyId,
            @PathVariable UUID jobId,
            @Parameter(description = "Actor Employee ID performing this request", required = true)
            @RequestHeader("X-Actor-Employee-Id") UUID actorEmployeeId,
            @RequestBody CompanyDTOs.UpdateJobPostRequest req
    ) {
        return ResponseEntity.ok(jobPostService.updateJobPost(companyId, jobId, actorEmployeeId, req));
    }
}
