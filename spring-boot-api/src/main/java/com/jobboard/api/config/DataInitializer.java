package com.jobboard.api.config;

import com.jobboard.api.entity.Brand;
import com.jobboard.api.entity.Category;
import com.jobboard.api.entity.Company;
import com.jobboard.api.entity.Job;
import com.jobboard.api.entity.Product;
import com.jobboard.api.enums.ExperienceLevel;
import com.jobboard.api.enums.JobType;
import com.jobboard.api.enums.ProductCategory;
import com.jobboard.api.repository.BrandRepository;
import com.jobboard.api.repository.CategoryRepository;
import com.jobboard.api.repository.CompanyRepository;
import com.jobboard.api.repository.JobRepository;
import com.jobboard.api.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final CategoryRepository categoryRepository;
    private final JobRepository jobRepository;
    private final BrandRepository brandRepository;
    private final ProductRepository productRepository;

    @Override
    public void run(String... args) {
        seedJobs();
        seedProducts();
    }

    private void seedJobs() {
        if (categoryRepository.count() > 0) {
            return;
        }

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

    private void seedProducts() {
        if (brandRepository.count() > 0) {
            return;
        }

        // ── Brands ────────────────────────────────────────────────────────────
        Brand caymus = brandRepository.save(Brand.builder()
            .name("Caymus Vineyards")
            .country("USA")
            .region("Napa Valley, CA")
            .build());

        Brand meiomi = brandRepository.save(Brand.builder()
            .name("Meiomi")
            .country("USA")
            .region("California")
            .build());

        Brand whiteHaven = brandRepository.save(Brand.builder()
            .name("White Haven")
            .country("New Zealand")
            .region("Marlborough")
            .build());

        Brand kendallJackson = brandRepository.save(Brand.builder()
            .name("Kendall-Jackson")
            .country("USA")
            .region("California")
            .build());

        Brand laCrema = brandRepository.save(Brand.builder()
            .name("La Crema")
            .country("USA")
            .region("Sonoma Coast, CA")
            .build());

        Brand sonomaCutrer = brandRepository.save(Brand.builder()
            .name("Sonoma-Cutrer")
            .country("USA")
            .region("Sonoma County, CA")
            .build());

        Brand saintMichel = brandRepository.save(Brand.builder()
            .name("Chateau Ste. Michelle")
            .country("USA")
            .region("Columbia Valley, WA")
            .build());

        Brand blueMoon = brandRepository.save(Brand.builder()
            .name("Blue Moon Brewing Co.")
            .country("USA")
            .region("Colorado")
            .build());

        Brand sierraNewada = brandRepository.save(Brand.builder()
            .name("Sierra Nevada")
            .country("USA")
            .region("Chico, CA")
            .build());

        Brand bulleit = brandRepository.save(Brand.builder()
            .name("Bulleit")
            .country("USA")
            .region("Kentucky")
            .build());

        Brand patron = brandRepository.save(Brand.builder()
            .name("Patron")
            .country("Mexico")
            .region("Jalisco")
            .build());

        Brand hendricks = brandRepository.save(Brand.builder()
            .name("Hendrick's")
            .country("Scotland")
            .region("Girvan")
            .build());

        // ── Wine Products ─────────────────────────────────────────────────────
        productRepository.save(Product.builder()
            .name("Caymus Cabernet Sauvignon")
            .description("Rich and full-bodied Napa Valley Cabernet with aromas of dark cherry, " +
                         "mocha, and vanilla. Soft tannins and a long, lush finish make this " +
                         "one of the most celebrated California Cabs year after year.")
            .price(new BigDecimal("89.99"))
            .size("750ml")
            .abv(14.8)
            .varietal("Cabernet Sauvignon")
            .region("Napa Valley")
            .category(ProductCategory.WINE)
            .brand(caymus)
            .inventory(48)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("Meiomi Pinot Noir")
            .description("Smooth, layered Pinot Noir with bright berry flavors, silky texture, " +
                         "and a hint of mocha. Sourced from cool coastal regions of California " +
                         "for elegance and approachability.")
            .price(new BigDecimal("19.99"))
            .size("750ml")
            .abv(13.5)
            .varietal("Pinot Noir")
            .region("California")
            .category(ProductCategory.WINE)
            .brand(meiomi)
            .inventory(120)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("White Haven Sauvignon Blanc")
            .description("Crisp and vibrant with classic Marlborough character — grapefruit, " +
                         "passionfruit, and fresh-cut grass. Clean and refreshing with a " +
                         "long, zesty finish.")
            .price(new BigDecimal("14.99"))
            .size("750ml")
            .abv(13.0)
            .varietal("Sauvignon Blanc")
            .region("Marlborough, New Zealand")
            .category(ProductCategory.WINE)
            .brand(whiteHaven)
            .inventory(200)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("Kendall-Jackson Vintner's Reserve Chardonnay")
            .description("America's best-selling Chardonnay. Tropical fruit flavors of pineapple " +
                         "and mango balanced with toasty vanilla oak. Rich texture with a clean finish.")
            .price(new BigDecimal("16.99"))
            .size("750ml")
            .abv(13.5)
            .varietal("Chardonnay")
            .region("California")
            .category(ProductCategory.WINE)
            .brand(kendallJackson)
            .inventory(180)
            .build());

        productRepository.save(Product.builder()
            .name("La Crema Sonoma Coast Pinot Noir")
            .description("Elegant Pinot Noir from the cool Sonoma Coast. Red berry and pomegranate " +
                         "aromas with a silky palate of dried cranberry and subtle earthy notes. " +
                         "Perfect with salmon or roasted duck.")
            .price(new BigDecimal("24.99"))
            .size("750ml")
            .abv(13.5)
            .varietal("Pinot Noir")
            .region("Sonoma Coast")
            .category(ProductCategory.WINE)
            .brand(laCrema)
            .inventory(96)
            .build());

        productRepository.save(Product.builder()
            .name("Sonoma-Cutrer Russian River Ranches Chardonnay")
            .description("Complex and food-friendly Chardonnay with creamy texture, apple, " +
                         "lemon curd, and toasted oak. Sourced from Sonoma's premier cool-climate vineyards.")
            .price(new BigDecimal("29.99"))
            .size("750ml")
            .abv(14.1)
            .varietal("Chardonnay")
            .region("Russian River Valley")
            .category(ProductCategory.WINE)
            .brand(sonomaCutrer)
            .inventory(72)
            .build());

        productRepository.save(Product.builder()
            .name("Chateau Ste. Michelle Riesling")
            .description("Washington's iconic Riesling. Bright and refreshing with peach, " +
                         "apricot, and floral aromas balanced by crisp acidity and a touch of sweetness.")
            .price(new BigDecimal("12.99"))
            .size("750ml")
            .abv(12.0)
            .varietal("Riesling")
            .region("Columbia Valley")
            .category(ProductCategory.WINE)
            .brand(saintMichel)
            .inventory(150)
            .build());

        // ── Beer Products ─────────────────────────────────────────────────────
        productRepository.save(Product.builder()
            .name("Blue Moon Belgian White")
            .description("A refreshing, medium-bodied unfiltered wheat ale spiced with fresh coriander " +
                         "and orange peel for a unique and complex taste. Best served with an orange slice.")
            .price(new BigDecimal("10.99"))
            .size("6-pack 12oz bottles")
            .abv(5.4)
            .varietal("Belgian Wheat Ale")
            .region("Colorado")
            .category(ProductCategory.BEER)
            .brand(blueMoon)
            .inventory(300)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("Sierra Nevada Pale Ale")
            .description("The beer that launched America's craft beer revolution. " +
                         "Big, bold hop flavor and aroma with a clean malt backbone. " +
                         "Cascade hops give it a distinctive floral, citrusy character.")
            .price(new BigDecimal("11.99"))
            .size("6-pack 12oz bottles")
            .abv(5.6)
            .varietal("American Pale Ale")
            .region("Chico, CA")
            .category(ProductCategory.BEER)
            .brand(sierraNewada)
            .inventory(250)
            .build());

        // ── Spirits Products ──────────────────────────────────────────────────
        productRepository.save(Product.builder()
            .name("Bulleit Bourbon")
            .description("High-rye bourbon whiskey with a bold, spicy character. " +
                         "Flavors of maple, oak, and vanilla with a clean, lingering finish. " +
                         "A frontier whiskey for those with adventurous spirit.")
            .price(new BigDecimal("34.99"))
            .size("750ml")
            .abv(45.0)
            .varietal("Bourbon Whiskey")
            .region("Kentucky")
            .category(ProductCategory.SPIRITS)
            .brand(bulleit)
            .inventory(80)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("Patron Silver Tequila")
            .description("Ultra-premium tequila crafted from the finest 100% Weber Blue Agave. " +
                         "Crystal clear with a smooth, sweet taste and a light pepper finish. " +
                         "Ideal for sipping or mixing in premium cocktails.")
            .price(new BigDecimal("49.99"))
            .size("750ml")
            .abv(40.0)
            .varietal("Blanco Tequila")
            .region("Jalisco, Mexico")
            .category(ProductCategory.SPIRITS)
            .brand(patron)
            .inventory(60)
            .isFeatured(true)
            .build());

        productRepository.save(Product.builder()
            .name("Hendrick's Gin")
            .description("An unusually crafted gin infused with rose petals and cucumber. " +
                         "A distinctly different gin with a delightfully peculiar taste. " +
                         "Best served in a balloon glass with cucumber slices and tonic.")
            .price(new BigDecimal("39.99"))
            .size("750ml")
            .abv(44.0)
            .varietal("London Dry Gin")
            .region("Girvan, Scotland")
            .category(ProductCategory.SPIRITS)
            .brand(hendricks)
            .inventory(55)
            .build());

        System.out.println("Seed data loaded: 12 brands, 13 products (7 wine, 2 beer, 4 spirits)");
    }
}
