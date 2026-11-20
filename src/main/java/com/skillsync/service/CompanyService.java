package com.skillsync.service;

import com.skillsync.dto.CompanyDTOs;
import com.skillsync.model.*;
import com.skillsync.repository.CompanyEmployeeRepository;
import com.skillsync.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final CompanyEmployeeRepository employeeRepository;
    private final CompanyPermissionGuard permissionGuard;

    /**
     * Flow A: Company Add
     * Provisions the company and creates the initial creator employee as a Super Admin with all permissions.
     */
    @Transactional
    public CompanyDTOs.CompanyResponse createCompany(CompanyDTOs.CreateCompanyRequest req) {
        if (req.getName() == null || req.getName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Company name is required.");
        }

        Company company = Company.builder()
                .name(req.getName())
                .domainOrWebsite(req.getDomainOrWebsite())
                .industry(req.getIndustry())
                .location(req.getLocation())
                .build();
        Company savedCompany = companyRepository.save(company);

        // Creator employee details
        String creatorName = (req.getCreatorFullName() != null && !req.getCreatorFullName().isBlank()) 
                ? req.getCreatorFullName() : "Company Admin";
        String creatorEmail = (req.getCreatorEmail() != null && !req.getCreatorEmail().isBlank()) 
                ? req.getCreatorEmail() : "admin@" + (req.getDomainOrWebsite() != null ? req.getDomainOrWebsite().replace("https://", "").replace("http://", "") : "company.local");
        String creatorRole = (req.getCreatorRoleTitle() != null && !req.getCreatorRoleTitle().isBlank()) 
                ? req.getCreatorRoleTitle() : "Founder / Admin";

        // Assign full permissions set to the initial admin to prevent lockout
        Set<EmployeePermission> fullPermissions = new HashSet<>(Arrays.asList(EmployeePermission.values()));

        CompanyEmployee initialAdmin = CompanyEmployee.builder()
                .companyId(savedCompany.getId())
                .fullName(creatorName)
                .email(creatorEmail)
                .roleOrTitle(creatorRole)
                .permissions(fullPermissions)
                .status(EmployeeStatus.ACTIVE)
                .build();

        CompanyEmployee savedAdmin = employeeRepository.save(initialAdmin);

        return mapToCompanyResponse(savedCompany, savedAdmin);
    }

    public List<CompanyDTOs.CompanyResponse> getAllCompanies() {
        return companyRepository.findAll().stream()
                .map(c -> mapToCompanyResponse(c, null))
                .collect(Collectors.toList());
    }

    public CompanyDTOs.CompanyResponse getCompanyById(UUID companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Company not found: " + companyId));
        return mapToCompanyResponse(company, null);
    }

    // === Employee & Permission Operations ===

    /**
     * Flow B: Add Employee
     * Guarded by EMPLOYEE_MANAGE permission.
     */
    @Transactional
    public CompanyDTOs.EmployeeResponse addEmployee(UUID companyId, UUID actorEmployeeId, CompanyDTOs.AddEmployeeRequest req) {
        // Verify actor holds EMPLOYEE_MANAGE
        permissionGuard.verifyPermission(companyId, actorEmployeeId, EmployeePermission.EMPLOYEE_MANAGE);

        if (req.getFullName() == null || req.getFullName().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee full name is required.");
        }
        if (req.getEmail() == null || req.getEmail().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Employee email is required.");
        }

        // Check if employee with same email already exists in company
        if (employeeRepository.findByCompanyIdAndEmail(companyId, req.getEmail()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Employee with email " + req.getEmail() + " already exists in this company.");
        }

        Set<EmployeePermission> perms = req.getPermissions() != null ? req.getPermissions() : new HashSet<>();
        // Default permission if none selected: JOB_VIEW
        if (perms.isEmpty()) {
            perms.add(EmployeePermission.JOB_VIEW);
        }

        CompanyEmployee newEmp = CompanyEmployee.builder()
                .companyId(companyId)
                .fullName(req.getFullName())
                .email(req.getEmail())
                .roleOrTitle(req.getRoleOrTitle() != null ? req.getRoleOrTitle() : "Member")
                .permissions(perms)
                .status(req.getStatus() != null ? req.getStatus() : EmployeeStatus.ACTIVE)
                .build();

        CompanyEmployee saved = employeeRepository.save(newEmp);
        return mapToEmployeeResponse(saved);
    }

    public List<CompanyDTOs.EmployeeResponse> getCompanyEmployees(UUID companyId, UUID actorEmployeeId) {
        // Guarded by EMPLOYEE_MANAGE or COMPANY_MANAGE or JOB_VIEW
        CompanyEmployee actor = employeeRepository.findByIdAndCompanyId(actorEmployeeId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to view company employees"));

        return employeeRepository.findByCompanyId(companyId).stream()
                .map(this::mapToEmployeeResponse)
                .collect(Collectors.toList());
    }

    /**
     * Flow B: Update Employee Permissions & Role
     * Guarded by EMPLOYEE_MANAGE permission.
     */
    @Transactional
    public CompanyDTOs.EmployeeResponse updateEmployeePermissions(
            UUID companyId, 
            UUID employeeId, 
            UUID actorEmployeeId, 
            CompanyDTOs.UpdateEmployeePermissionsRequest req) {

        permissionGuard.verifyPermission(companyId, actorEmployeeId, EmployeePermission.EMPLOYEE_MANAGE);

        CompanyEmployee emp = employeeRepository.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found in company: " + employeeId));

        if (req.getFullName() != null && !req.getFullName().isBlank()) {
            emp.setFullName(req.getFullName());
        }
        if (req.getRoleOrTitle() != null) {
            emp.setRoleOrTitle(req.getRoleOrTitle());
        }
        if (req.getPermissions() != null) {
            emp.setPermissions(req.getPermissions());
        }
        if (req.getStatus() != null) {
            emp.setStatus(req.getStatus());
        }

        CompanyEmployee updated = employeeRepository.save(emp);
        return mapToEmployeeResponse(updated);
    }

    public CompanyDTOs.EmployeeResponse getEmployeeById(UUID companyId, UUID employeeId) {
        CompanyEmployee emp = employeeRepository.findByIdAndCompanyId(employeeId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employee not found: " + employeeId));
        return mapToEmployeeResponse(emp);
    }

    public CompanyDTOs.CompanyResponse mapToCompanyResponse(Company c, CompanyEmployee initialAdmin) {
        return CompanyDTOs.CompanyResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .domainOrWebsite(c.getDomainOrWebsite())
                .industry(c.getIndustry())
                .location(c.getLocation())
                .createdAt(c.getCreatedAt())
                .initialAdmin(initialAdmin != null ? mapToEmployeeResponse(initialAdmin) : null)
                .build();
    }

    public CompanyDTOs.EmployeeResponse mapToEmployeeResponse(CompanyEmployee e) {
        return CompanyDTOs.EmployeeResponse.builder()
                .id(e.getId())
                .companyId(e.getCompanyId())
                .fullName(e.getFullName())
                .email(e.getEmail())
                .roleOrTitle(e.getRoleOrTitle())
                .permissions(e.getPermissions())
                .status(e.getStatus())
                .createdAt(e.getCreatedAt())
                .build();
    }
}
