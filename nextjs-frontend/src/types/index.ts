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

// ── Wine Store Types ──────────────────────────────────────────────────────────

export type ProductCategory = 'WINE' | 'BEER' | 'SPIRITS' | 'SAKE' | 'CIDER' | 'NON_ALCOHOLIC';

export interface Brand {
  id: number;
  name: string;
  country: string | null;
  region: string | null;
  logoUrl: string | null;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  size: string | null;
  abv: number | null;
  varietal: string | null;
  region: string | null;
  category: ProductCategory;
  brandId: number | null;
  brandName: string | null;
  brandCountry: string | null;
  inventory: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  size?: string;
  abv?: number;
  varietal?: string;
  region?: string;
  category: ProductCategory;
  brandId?: number;
  inventory?: number;
  isActive?: boolean;
  isFeatured?: boolean;
}
