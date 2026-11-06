package com.skillsync.repository;

import com.skillsync.model.MatchEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchEvaluationRepository extends JpaRepository<MatchEvaluation, Long> {
    List<MatchEvaluation> findByJobId(Long jobId);
    List<MatchEvaluation> findByCandidateId(Long candidateId);
}

