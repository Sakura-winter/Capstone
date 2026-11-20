package com.skillsync.repository;

import com.skillsync.model.CompanyEmployee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CompanyEmployeeRepository extends JpaRepository<CompanyEmployee, UUID> {
    List<CompanyEmployee> findByCompanyId(UUID companyId);
    Optional<CompanyEmployee> findByCompanyIdAndEmail(UUID companyId, String email);
    Optional<CompanyEmployee> findByIdAndCompanyId(UUID id, UUID companyId);
}
