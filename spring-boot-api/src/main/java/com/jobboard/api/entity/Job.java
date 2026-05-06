package com.jobboard.api.entity;

import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String title;

    @NotBlank
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    // BigDecimal is the correct Java type for money — never use float/double for currency
    @Column(name = "salary_min", precision = 10, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 10, scale = 2)
    private BigDecimal salaryMax;

    private String location;

    // @Enumerated stores the enum as a string in the DB ("FULL_TIME") instead of an integer
    @Enumerated(EnumType.STRING)
    @Column(name = "job_type")
    private JobType jobType;

    @Enumerated(EnumType.STRING)
    @Column(name = "experience_level")
    private ExperienceLevel experienceLevel;

    // @ManyToOne = many jobs can belong to one company (foreign key relationship)
    // @JoinColumn = the actual FK column name in the jobs table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true; // new jobs are active by default

    @CreationTimestamp // automatically set when the row is first inserted
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp // automatically updated every time the row changes
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
