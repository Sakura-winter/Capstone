package com.skillsync.service;

import com.skillsync.model.CompanyEmployee;
import com.skillsync.model.EmployeePermission;
import com.skillsync.model.EmployeeStatus;
import com.skillsync.repository.CompanyEmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Component
@RequiredArgsConstructor
public class CompanyPermissionGuard {

    private final CompanyEmployeeRepository employeeRepository;

    /**
     * Verifies that the actor employee belongs to the company and holds the necessary permission flag.
     * Throws 403 Forbidden or 404 Not Found if validation fails.
     */
    public CompanyEmployee verifyPermission(UUID companyId, UUID actorEmployeeId, EmployeePermission requiredPermission) {
        if (actorEmployeeId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Header 'X-Actor-Employee-Id' is required for this operation.");
        }

        CompanyEmployee employee = employeeRepository.findByIdAndCompanyId(actorEmployeeId, companyId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN, 
                        "Actor employee " + actorEmployeeId + " does not belong to company " + companyId));

        if (employee.getStatus() != EmployeeStatus.ACTIVE) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, 
                    "Employee account is " + employee.getStatus() + ". Only ACTIVE employees can perform actions.");
        }

        if (requiredPermission != null && (employee.getPermissions() == null || !employee.getPermissions().contains(requiredPermission))) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, 
                    "Employee '" + employee.getFullName() + "' lacks required permission: " + requiredPermission);
        }

        return employee;
    }
}
