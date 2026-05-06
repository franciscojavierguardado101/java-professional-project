package com.jobboard.api.dto;

import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

// Flat response shape — company and category details are inlined, no nested objects
@Data
@Builder
public class JobResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String location;
    private JobType jobType;
    private ExperienceLevel experienceLevel;

    // Company fields inlined
    private Long companyId;
    private String companyName;
    private String companyLogoUrl;

    // Category fields inlined
    private Long categoryId;
    private String categoryName;
    private String categorySlug;

    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
