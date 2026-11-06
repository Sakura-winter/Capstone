package com.skillsync.repository;

import com.skillsync.model.BiasAuditReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BiasAuditReportRepository extends JpaRepository<BiasAuditReport, Long> {
    Optional<BiasAuditReport> findTopByJobIdOrderByAuditedAtDesc(Long jobId);
}

