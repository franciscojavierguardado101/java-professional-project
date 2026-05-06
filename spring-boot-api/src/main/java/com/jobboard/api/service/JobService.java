package com.jobboard.api.service;

import com.jobboard.api.dto.JobRequest;
import com.jobboard.api.dto.JobResponse;
import com.jobboard.api.entity.Category;
import com.jobboard.api.entity.Company;
import com.jobboard.api.entity.Job;
import com.jobboard.api.exception.ResourceNotFoundException;
import com.jobboard.api.repository.CategoryRepository;
import com.jobboard.api.repository.CompanyRepository;
import com.jobboard.api.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;

    @Transactional(readOnly = true)
    public List<JobResponse> getAllJobs() {
        return jobRepository.findByIsActiveTrue()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public JobResponse getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", id));
        return toResponse(job);
    }

    @Transactional(readOnly = true)
    public List<JobResponse> searchJobs(String keyword) {
        return jobRepository.searchByKeyword(keyword)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getJobsByCompany(Long companyId) {
        return jobRepository.findByCompanyIdAndIsActiveTrue(companyId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<JobResponse> getJobsByCategory(Long categoryId) {
        return jobRepository.findByCategoryIdAndIsActiveTrue(categoryId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public JobResponse createJob(JobRequest request) {
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company", request.getCompanyId()));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        Job job = Job.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .location(request.getLocation())
                .jobType(request.getJobType())
                .experienceLevel(request.getExperienceLevel())
                .company(company)
                .category(category)
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();

        return toResponse(jobRepository.save(job));
    }

    @Transactional
    public JobResponse updateJob(Long id, JobRequest request) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", id));

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company", request.getCompanyId()));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setCompany(company);
        job.setCategory(category);
        if (request.getIsActive() != null) {
            job.setIsActive(request.getIsActive());
        }

        return toResponse(jobRepository.save(job));
    }

    @Transactional
    public void deleteJob(Long id) {
        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job", id);
        }
        jobRepository.deleteById(id);
    }

    // Converts a Job entity → JobResponse DTO (flattens company + category into the response)
    private JobResponse toResponse(Job job) {
        return JobResponse.builder()
                .id(job.getId())
                .title(job.getTitle())
                .description(job.getDescription())
                .salaryMin(job.getSalaryMin())
                .salaryMax(job.getSalaryMax())
                .location(job.getLocation())
                .jobType(job.getJobType())
                .experienceLevel(job.getExperienceLevel())
                .companyId(job.getCompany() != null ? job.getCompany().getId() : null)
                .companyName(job.getCompany() != null ? job.getCompany().getName() : null)
                .companyLogoUrl(job.getCompany() != null ? job.getCompany().getLogoUrl() : null)
                .categoryId(job.getCategory() != null ? job.getCategory().getId() : null)
                .categoryName(job.getCategory() != null ? job.getCategory().getName() : null)
                .categorySlug(job.getCategory() != null ? job.getCategory().getSlug() : null)
                .isActive(job.getIsActive())
                .createdAt(job.getCreatedAt())
                .updatedAt(job.getUpdatedAt())
                .build();
    }
}
