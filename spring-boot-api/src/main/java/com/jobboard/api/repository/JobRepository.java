package com.jobboard.api.repository;

import com.jobboard.api.entity.Job;
import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    // Find all active jobs — used for the main job listing page
    List<Job> findByIsActiveTrue();

    // Find active jobs by company
    List<Job> findByCompanyIdAndIsActiveTrue(Long companyId);

    // Find active jobs by category
    List<Job> findByCategoryIdAndIsActiveTrue(Long categoryId);

    // Find active jobs by type (FULL_TIME, CONTRACT, etc.)
    List<Job> findByJobTypeAndIsActiveTrue(JobType jobType);

    // Find active jobs by experience level
    List<Job> findByExperienceLevelAndIsActiveTrue(ExperienceLevel experienceLevel);

    // Full-text keyword search across title and description
    // @Query lets us write JPQL (Java query language — like SQL but uses class names, not table names)
    @Query("SELECT j FROM Job j WHERE j.isActive = true AND " +
           "(LOWER(j.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(j.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Job> searchByKeyword(@Param("keyword") String keyword);
}
