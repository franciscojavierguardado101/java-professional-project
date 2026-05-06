package com.jobboard.api.config;

import com.jobboard.api.entity.Category;
import com.jobboard.api.entity.Company;
import com.jobboard.api.entity.Job;
import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import com.jobboard.api.repository.CategoryRepository;
import com.jobboard.api.repository.CompanyRepository;
import com.jobboard.api.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

// CommandLineRunner runs this code once immediately after the app starts
// It seeds the database with realistic sample data for development and testing
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final JobRepository jobRepository;

    @Override
    public void run(String... args) {

        // ── Categories ────────────────────────────────────────────────────────
        Category softwareEng = categoryRepository.save(
            Category.builder().name("Software Engineering").slug("software-engineering").build());
        Category productMgmt = categoryRepository.save(
            Category.builder().name("Product Management").slug("product-management").build());
        Category dataScience = categoryRepository.save(
            Category.builder().name("Data Science").slug("data-science").build());
        Category devOps = categoryRepository.save(
            Category.builder().name("DevOps & Infrastructure").slug("devops-infrastructure").build());
        Category design = categoryRepository.save(
            Category.builder().name("Design").slug("design").build());

        // ── Companies ─────────────────────────────────────────────────────────
        Company google = companyRepository.save(Company.builder()
            .name("Google")
            .website("https://careers.google.com")
            .description("A global technology leader in search, cloud, and AI.")
            .logoUrl("https://logo.clearbit.com/google.com")
            .build());

        Company stripe = companyRepository.save(Company.builder()
            .name("Stripe")
            .website("https://stripe.com/jobs")
            .description("Financial infrastructure platform for the internet.")
            .logoUrl("https://logo.clearbit.com/stripe.com")
            .build());

        Company airbnb = companyRepository.save(Company.builder()
            .name("Airbnb")
            .website("https://careers.airbnb.com")
            .description("Building a world where anyone can belong anywhere.")
            .logoUrl("https://logo.clearbit.com/airbnb.com")
            .build());

        Company netflix = companyRepository.save(Company.builder()
            .name("Netflix")
            .website("https://jobs.netflix.com")
            .description("The world's leading streaming entertainment service.")
            .logoUrl("https://logo.clearbit.com/netflix.com")
            .build());

        Company startupCo = companyRepository.save(Company.builder()
            .name("StartupCo")
            .website("https://startupco.io")
            .description("Fast-moving startup building the future of work.")
            .build());

        // ── Jobs ──────────────────────────────────────────────────────────────
        jobRepository.save(Job.builder()
            .title("Senior Java Engineer")
            .description("Design and build high-scale REST APIs using Spring Boot and PostgreSQL. " +
                         "You will work on core platform services handling millions of daily requests. " +
                         "Strong knowledge of JPA, Hibernate, and microservices required.")
            .salaryMin(new BigDecimal("140000"))
            .salaryMax(new BigDecimal("185000"))
            .location("San Francisco, CA")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.SENIOR)
            .company(google)
            .category(softwareEng)
            .build());

        jobRepository.save(Job.builder()
            .title("Full Stack Developer")
            .description("Build and maintain customer-facing features using React, TypeScript, " +
                         "and a Spring Boot backend. Collaborate with product and design teams " +
                         "to ship high-quality features every sprint.")
            .salaryMin(new BigDecimal("110000"))
            .salaryMax(new BigDecimal("150000"))
            .location("Remote")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.MID)
            .company(stripe)
            .category(softwareEng)
            .build());

        jobRepository.save(Job.builder()
            .title("Backend Engineer — Payments Platform")
            .description("Own backend services powering Stripe's payment processing pipeline. " +
                         "Experience with distributed systems, Java or Go, and high-availability " +
                         "architecture required.")
            .salaryMin(new BigDecimal("150000"))
            .salaryMax(new BigDecimal("200000"))
            .location("New York, NY")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.SENIOR)
            .company(stripe)
            .category(softwareEng)
            .build());

        jobRepository.save(Job.builder()
            .title("Product Manager — Growth")
            .description("Lead product strategy for Airbnb's host growth initiatives. " +
                         "Work cross-functionally with engineering, design, and data teams " +
                         "to identify and ship features that drive host acquisition and retention.")
            .salaryMin(new BigDecimal("130000"))
            .salaryMax(new BigDecimal("170000"))
            .location("San Francisco, CA")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.SENIOR)
            .company(airbnb)
            .category(productMgmt)
            .build());

        jobRepository.save(Job.builder()
            .title("Data Scientist — Recommendations")
            .description("Build and improve Netflix's content recommendation algorithms. " +
                         "Deep experience with Python, machine learning, and A/B testing required. " +
                         "PhD or equivalent industry experience preferred.")
            .salaryMin(new BigDecimal("155000"))
            .salaryMax(new BigDecimal("210000"))
            .location("Los Gatos, CA")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.SENIOR)
            .company(netflix)
            .category(dataScience)
            .build());

        jobRepository.save(Job.builder()
            .title("DevOps Engineer")
            .description("Manage and scale cloud infrastructure on AWS. " +
                         "Build CI/CD pipelines, maintain Kubernetes clusters, " +
                         "and partner with engineering teams to improve deployment reliability.")
            .salaryMin(new BigDecimal("120000"))
            .salaryMax(new BigDecimal("160000"))
            .location("Remote")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.MID)
            .company(google)
            .category(devOps)
            .build());

        jobRepository.save(Job.builder()
            .title("Junior Java Developer")
            .description("Great entry-level opportunity to learn Spring Boot development " +
                         "in a supportive team environment. We mentor junior developers " +
                         "and provide a structured growth path.")
            .salaryMin(new BigDecimal("70000"))
            .salaryMax(new BigDecimal("95000"))
            .location("Austin, TX")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.ENTRY)
            .company(startupCo)
            .category(softwareEng)
            .build());

        jobRepository.save(Job.builder()
            .title("UI/UX Designer")
            .description("Design intuitive, beautiful interfaces for Airbnb's mobile and web products. " +
                         "Proficiency in Figma required. You will run user research sessions " +
                         "and prototype new features end to end.")
            .salaryMin(new BigDecimal("105000"))
            .salaryMax(new BigDecimal("140000"))
            .location("Seattle, WA")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.MID)
            .company(airbnb)
            .category(design)
            .build());

        jobRepository.save(Job.builder()
            .title("Contract Backend Developer")
            .description("6-month contract to help build a new microservices platform. " +
                         "Spring Boot, Docker, and PostgreSQL experience required. " +
                         "Potential to convert to full-time.")
            .salaryMin(new BigDecimal("90000"))
            .salaryMax(new BigDecimal("120000"))
            .location("Remote")
            .jobType(JobType.CONTRACT)
            .experienceLevel(ExperienceLevel.MID)
            .company(startupCo)
            .category(softwareEng)
            .build());

        jobRepository.save(Job.builder()
            .title("Engineering Manager — Streaming Infrastructure")
            .description("Lead a team of 8 engineers responsible for Netflix's global " +
                         "video delivery infrastructure. Strong technical background required " +
                         "alongside proven experience managing high-performing engineering teams.")
            .salaryMin(new BigDecimal("200000"))
            .salaryMax(new BigDecimal("280000"))
            .location("Los Gatos, CA")
            .jobType(JobType.FULL_TIME)
            .experienceLevel(ExperienceLevel.LEAD)
            .company(netflix)
            .category(softwareEng)
            .build());

        System.out.println("Seed data loaded: 5 companies, 5 categories, 10 jobs");
    }
}
