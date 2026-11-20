package com.skillsync.dto;

import com.skillsync.model.EmployeePermission;
import com.skillsync.model.EmployeeStatus;
import com.skillsync.model.JobStatus;
import com.skillsync.model.WorkMode;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

public class CompanyDTOs {

    // === Company DTOs ===
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateCompanyRequest {
        private String name;
        private String domainOrWebsite;
        private String industry;
        private String location;

        // Details for the initial admin employee creator
        private String creatorFullName;
        private String creatorEmail;
        private String creatorRoleTitle;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CompanyResponse {
        private UUID id;
        private String name;
        private String domainOrWebsite;
        private String industry;
        private String location;
        private LocalDateTime createdAt;
        private EmployeeResponse initialAdmin;
    }

    // === Employee DTOs ===
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AddEmployeeRequest {
        private String fullName;
        private String email;
        private String roleOrTitle;
        private Set<EmployeePermission> permissions;
        private EmployeeStatus status;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateEmployeePermissionsRequest {
        private String fullName;
        private String roleOrTitle;
        private Set<EmployeePermission> permissions;
        private EmployeeStatus status;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class EmployeeResponse {
        private UUID id;
        private UUID companyId;
        private String fullName;
        private String email;
        private String roleOrTitle;
        private Set<EmployeePermission> permissions;
        private EmployeeStatus status;
        private LocalDateTime createdAt;
    }

    // === Job Post DTOs ===
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateJobPostRequest {
        private String title;
        private String description;
        private Set<String> requiredSkills;
        private String location;
        private WorkMode workMode;
        private JobStatus status; // DRAFT or PUBLISHED
        private Double requiredExperienceYears;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateJobPostRequest {
        private String title;
        private String description;
        private Set<String> requiredSkills;
        private String location;
        private WorkMode workMode;
        private JobStatus status; // DRAFT, PUBLISHED, or CLOSED
        private Double requiredExperienceYears;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JobPostResponse {
        private UUID id;
        private UUID companyId;
        private String companyName;
        private UUID createdByEmployeeId;
        private String createdByEmployeeName;
        private String title;
        private String description;
        private Set<String> requiredSkills;
        private String location;
        private WorkMode workMode;
        private JobStatus status;
        private Double requiredExperienceYears;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
