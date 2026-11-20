package com.skillsync;

import com.skillsync.dto.CompanyDTOs;
import com.skillsync.model.EmployeePermission;
import com.skillsync.model.JobStatus;
import com.skillsync.model.WorkMode;
import com.skillsync.service.CompanyService;
import com.skillsync.service.JobPostService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CompanyAndPermissionIntegrationTests {

    @Autowired
    private CompanyService companyService;

    @Autowired
    private JobPostService jobPostService;

    @Test
    void testCompanyLifecycleAndPermissionGuards() {
        // 1. Flow A: Create Company -> creator gets full permissions as initial admin
        CompanyDTOs.CreateCompanyRequest compReq = CompanyDTOs.CreateCompanyRequest.builder()
                .name("Acme Robotics Technologies")
                .domainOrWebsite("acme-robotics.in")
                .industry("Robotics & Automation")
                .location("Pune")
                .creatorFullName("Vikram Sen")
                .creatorEmail("vikram@acme-robotics.in")
                .creatorRoleTitle("Chief Technology Officer")
                .build();

        CompanyDTOs.CompanyResponse company = companyService.createCompany(compReq);
        assertNotNull(company.getId());
        assertEquals("Acme Robotics Technologies", company.getName());
        assertNotNull(company.getInitialAdmin());
        UUID adminId = company.getInitialAdmin().getId();

        // Verify admin has all 5 permissions
        assertEquals(5, company.getInitialAdmin().getPermissions().size());
        assertTrue(company.getInitialAdmin().getPermissions().contains(EmployeePermission.COMPANY_MANAGE));
        assertTrue(company.getInitialAdmin().getPermissions().contains(EmployeePermission.EMPLOYEE_MANAGE));
        assertTrue(company.getInitialAdmin().getPermissions().contains(EmployeePermission.JOB_CREATE));

        // 2. Flow B: Add a recruiter employee who ONLY has JOB_VIEW permission
        Set<EmployeePermission> recruiterPerms = new HashSet<>(Collections.singletonList(EmployeePermission.JOB_VIEW));
        CompanyDTOs.AddEmployeeRequest empReq = CompanyDTOs.AddEmployeeRequest.builder()
                .fullName("Priya Sharma")
                .email("priya.sharma@acme-robotics.in")
                .roleOrTitle("Junior Recruiter")
                .permissions(recruiterPerms)
                .build();

        CompanyDTOs.EmployeeResponse recruiter = companyService.addEmployee(company.getId(), adminId, empReq);
        assertNotNull(recruiter.getId());
        assertEquals(1, recruiter.getPermissions().size());

        // 3. Flow C: Recruiter tries to create a job -> must FAIL (403 Forbidden because lacks JOB_CREATE)
        CompanyDTOs.CreateJobPostRequest jobReq = CompanyDTOs.CreateJobPostRequest.builder()
                .title("Embedded Systems Engineer")
                .description("Design firmware and real-time control algorithms using C++, RTOS, and CAN bus.")
                .requiredSkills(new HashSet<>(Arrays.asList("C++", "RTOS", "Linux", "Robotics")))
                .location("Pune")
                .workMode(WorkMode.HYBRID)
                .status(JobStatus.PUBLISHED)
                .requiredExperienceYears(2.0)
                .build();

        assertThrows(ResponseStatusException.class, () -> {
            jobPostService.createJobPost(company.getId(), recruiter.getId(), jobReq);
        }, "Recruiter without JOB_CREATE should be rejected with 403 Forbidden");

        // 4. Admin creates the job post -> must SUCCEED (Admin has JOB_CREATE)
        CompanyDTOs.JobPostResponse jobPost = jobPostService.createJobPost(company.getId(), adminId, jobReq);
        assertNotNull(jobPost.getId());
        assertEquals("Embedded Systems Engineer", jobPost.getTitle());
        assertEquals(JobStatus.PUBLISHED, jobPost.getStatus());

        // 5. Upgrade recruiter permissions to include JOB_CREATE and JOB_EDIT
        Set<EmployeePermission> upgradedPerms = new HashSet<>(Arrays.asList(
                EmployeePermission.JOB_VIEW, 
                EmployeePermission.JOB_CREATE, 
                EmployeePermission.JOB_EDIT
        ));
        companyService.updateEmployeePermissions(
                company.getId(), 
                recruiter.getId(), 
                adminId, 
                CompanyDTOs.UpdateEmployeePermissionsRequest.builder().permissions(upgradedPerms).build()
        );

        // 6. Recruiter tries again to create job -> must SUCCEED now
        CompanyDTOs.CreateJobPostRequest jobReq2 = CompanyDTOs.CreateJobPostRequest.builder()
                .title("Quality Assurance Automation Tester")
                .description("Automated test scripts and performance testing.")
                .requiredSkills(new HashSet<>(Arrays.asList("Java", "Selenium", "Docker")))
                .location("Pune")
                .workMode(WorkMode.ONSITE)
                .status(JobStatus.DRAFT)
                .requiredExperienceYears(1.0)
                .build();

        CompanyDTOs.JobPostResponse jobPost2 = jobPostService.createJobPost(company.getId(), recruiter.getId(), jobReq2);
        assertNotNull(jobPost2.getId());
        assertEquals("Quality Assurance Automation Tester", jobPost2.getTitle());
        assertEquals(JobStatus.DRAFT, jobPost2.getStatus());

        // 7. Verify Public Job Feed only includes PUBLISHED jobs, not DRAFT
        List<CompanyDTOs.JobPostResponse> publicFeed = jobPostService.getPublicPublishedJobs();
        assertTrue(publicFeed.stream().anyMatch(j -> j.getId().equals(jobPost.getId())), "Published job should appear in public feed");
        assertFalse(publicFeed.stream().anyMatch(j -> j.getId().equals(jobPost2.getId())), "Draft job should NOT appear in public feed");
    }
}
