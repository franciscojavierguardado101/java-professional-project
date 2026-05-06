import { Job, Company, Category, JobRequest, Product, Brand, ProductCategory, ProductRequest } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw error;
  }
  // 204 No Content (DELETE) has no body
  if (res.status === 204) return undefined as T;
  return res.json();
}

// ── Jobs ──────────────────────────────────────────────────────────────────────

export const getJobs = (): Promise<Job[]> =>
  fetchApi('/api/jobs');

export const getJob = (id: number): Promise<Job> =>
  fetchApi(`/api/jobs/${id}`);

export const searchJobs = (keyword: string): Promise<Job[]> =>
  fetchApi(`/api/jobs/search?keyword=${encodeURIComponent(keyword)}`);

export const createJob = (data: JobRequest): Promise<Job> =>
  fetchApi('/api/jobs', { method: 'POST', body: JSON.stringify(data) });

export const updateJob = (id: number, data: JobRequest): Promise<Job> =>
  fetchApi(`/api/jobs/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteJob = (id: number): Promise<void> =>
  fetchApi(`/api/jobs/${id}`, { method: 'DELETE' });

// ── Companies ─────────────────────────────────────────────────────────────────

export const getCompanies = (): Promise<Company[]> =>
  fetchApi('/api/companies');

export const getCompany = (id: number): Promise<Company> =>
  fetchApi(`/api/companies/${id}`);

// ── Categories ────────────────────────────────────────────────────────────────

export const getCategories = (): Promise<Category[]> =>
  fetchApi('/api/categories');

export const getCategory = (id: number): Promise<Category> =>
  fetchApi(`/api/categories/${id}`);

// ── Products ──────────────────────────────────────────────────────────────────

export const getProducts = (): Promise<Product[]> =>
  fetchApi('/api/products');

export const getProduct = (id: number): Promise<Product> =>
  fetchApi(`/api/products/${id}`);

export const getFeaturedProducts = (): Promise<Product[]> =>
  fetchApi('/api/products/featured');

export const getProductsByCategory = (category: ProductCategory): Promise<Product[]> =>
  fetchApi(`/api/products/category/${category}`);

export const getProductsByBrand = (brandId: number): Promise<Product[]> =>
  fetchApi(`/api/products/brand/${brandId}`);

export const searchProducts = (keyword: string): Promise<Product[]> =>
  fetchApi(`/api/products/search?keyword=${encodeURIComponent(keyword)}`);

export const createProduct = (data: ProductRequest): Promise<Product> =>
  fetchApi('/api/products', { method: 'POST', body: JSON.stringify(data) });

export const updateProduct = (id: number, data: ProductRequest): Promise<Product> =>
  fetchApi(`/api/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteProduct = (id: number): Promise<void> =>
  fetchApi(`/api/products/${id}`, { method: 'DELETE' });

// ── Brands ────────────────────────────────────────────────────────────────────

export const getBrands = (): Promise<Brand[]> =>
  fetchApi('/api/brands');

export const getBrand = (id: number): Promise<Brand> =>
  fetchApi(`/api/brands/${id}`);
