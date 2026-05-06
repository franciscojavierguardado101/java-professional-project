import { Job, Company, Category, JobRequest } from '@/types';

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
