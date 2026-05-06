package com.jobboard.api.dto;

import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

// What the client sends when creating or updating a job
@Data
public class JobRequest {

    @NotBlank(message = "Job title is required")
    private String title;

    @NotBlank(message = "Job description is required")
    private String description;

    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String location;
    private JobType jobType;
    private ExperienceLevel experienceLevel;

    @NotNull(message = "Company ID is required")
    private Long companyId;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

    private Boolean isActive = true;
}
