// These types mirror the Java DTOs from the Spring Boot API exactly

export type JobType = 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'FREELANCE' | 'INTERNSHIP';
export type ExperienceLevel = 'ENTRY' | 'MID' | 'SENIOR' | 'LEAD' | 'EXECUTIVE';

export interface Job {
  id: number;
  title: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  location: string | null;
  jobType: JobType | null;
  experienceLevel: ExperienceLevel | null;
  companyId: number;
  companyName: string;
  companyLogoUrl: string | null;
  categoryId: number;
  categoryName: string;
  categorySlug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  logoUrl: string | null;
  website: string | null;
  description: string | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface JobRequest {
  title: string;
  description: string;
  salaryMin?: number;
  salaryMax?: number;
  location?: string;
  jobType?: JobType;
  experienceLevel?: ExperienceLevel;
  companyId: number;
  categoryId: number;
  isActive?: boolean;
}

export interface ApiError {
  status: number;
  error: string;
  timestamp: string;
  fields?: Record<string, string>;
}
