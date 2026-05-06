# Java Professional Project — Claude Code Instructions

## Who I Am
I am a Senior Full Stack Developer with 10+ years of experience in
Next.js, React, TypeScript, Tailwind CSS, and headless CMS architecture.
I am learning Spring Boot (Java) and building this project specifically
to enter the Java full stack job market ($98K-$167K range).

## Primary Goal
Build a portfolio project that demonstrates the exact stack employers
want: Spring Boot REST API + React/Next.js + PostgreSQL.
Contentful CMS is a bonus layer on top — not the focus.

## Tech Stack — DO NOT deviate from this
- Backend:    Spring Boot (Java) — REST API
- Database:   PostgreSQL
- Frontend:   Next.js + TypeScript + Tailwind CSS + shadcn/ui
- CMS:        Contentful (free developer tier — bonus layer)
- Hosting:    Railway (Spring Boot + PostgreSQL)
- Hosting:    Vercel (Next.js frontend)
- Version Control: GitHub

## Project Structure — Follow This Exactly
java-professional-project/
├── spring-boot-api/     (Spring Boot Java backend — REST API)
├── nextjs-frontend/     (Next.js frontend — what users see)
├── CLAUDE.md            (this file)
└── README.md            (project documentation)

## My Background
- Expert in Next.js, React, TypeScript, Tailwind CSS
- Expert in headless CMS architecture (Drupal + Next.js)
- NEW to Java and Spring Boot — explain ALL Java code clearly
- I understand REST APIs, JSON, CI/CD, and cloud deployment
- I know PostgreSQL concepts from working with databases before

## Rules — NEVER break these
1.  NEVER mix Java code into the Next.js folder
2.  NEVER mix Next.js code into the Spring Boot folder
3.  ALWAYS keep folders clean and separated
4.  ALWAYS use TypeScript in Next.js — never plain JavaScript
5.  ALWAYS use Tailwind CSS — never plain CSS files
6.  ALWAYS use shadcn/ui for UI components
7.  ALWAYS use PostgreSQL — never H2 or SQLite in production
8.  ALWAYS explain Java/Spring Boot code in simple terms
9.  NEVER change the tech stack without asking me first
10. NEVER install unnecessary dependencies
11. ALWAYS tell me what you are about to do BEFORE doing it
12. ALWAYS ask me to confirm before creating or deleting files
13. ALWAYS write clean, readable, well-commented Java code
14. ALWAYS follow REST API best practices

## How Data Flows
PostgreSQL (database)
     ↑ stored/retrieved by
Spring Boot (Java REST API — business logic)
     ↓ sends JSON via REST API
Next.js (frontend — displays to user)
     + Contentful (CMS — bonus content layer)

## What I Want To Build
A Job Board platform that demonstrates:
- Spring Boot REST API with full CRUD operations
- PostgreSQL database with real relationships
- Next.js frontend consuming the Spring Boot API
- Contentful for static/marketing content (hero, about page)
- Deployed: Railway (backend) + Vercel (frontend)
- ONE public URL: yourproject.vercel.app

## Spring Boot API Endpoints To Build
GET    /api/jobs          - list all jobs (with filters)
GET    /api/jobs/{id}     - single job detail
POST   /api/jobs          - create a job (admin)
PUT    /api/jobs/{id}     - update a job (admin)
DELETE /api/jobs/{id}     - delete a job (admin)
GET    /api/jobs/search   - search jobs by keyword
GET    /api/categories    - list job categories
GET    /api/companies     - list companies

## Database Schema To Build
jobs table:
  - id, title, description, salary_min, salary_max
  - location, job_type, experience_level
  - company_id, category_id
  - created_at, updated_at, is_active

companies table:
  - id, name, logo_url, website, description

categories table:
  - id, name, slug

## Next.js Pages To Build
/              - Homepage (hero from Contentful + featured jobs)
/jobs          - All jobs listing with search + filters
/jobs/[id]     - Single job detail page
/companies     - Companies listing
/companies/[id]- Single company page
/about         - About page (content from Contentful)

## Contentful Content Types (bonus layer)
- Hero Banner (title, subtitle, cta_text, cta_link, image)
- About Page (title, body, team_members)

## Build Order — Follow This Sequence
Phase 1: Spring Boot project setup + PostgreSQL connection
Phase 2: Database schema + entities + repositories
Phase 3: REST API controllers + service layer
Phase 4: Test all API endpoints work correctly
Phase 5: Next.js project setup
Phase 6: Connect Next.js to Spring Boot API
Phase 7: Build all pages and components
Phase 8: Add Contentful for hero + about content
Phase 9: Deploy Spring Boot + PostgreSQL to Railway
Phase 10: Deploy Next.js to Vercel
Phase 11: Connect everything + test live URLs

## When Starting Any Task
1. Tell me what you are about to do BEFORE doing it
2. Explain any Java/Spring Boot code you write
3. Keep components small and reusable
4. Always show me the file path of what you are creating
5. If something could break, warn me first
