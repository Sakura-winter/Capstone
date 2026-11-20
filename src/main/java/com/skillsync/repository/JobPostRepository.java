package com.skillsync.repository;

import com.skillsync.model.JobPost;
import com.skillsync.model.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, UUID> {
    List<JobPost> findByCompanyId(UUID companyId);
    List<JobPost> findByCompanyIdAndStatus(UUID companyId, JobStatus status);
    List<JobPost> findByStatus(JobStatus status);
    Optional<JobPost> findByIdAndCompanyId(UUID id, UUID companyId);
}
