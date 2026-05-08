// Type-safe API functions for InsForge tables
import { insforgeClient } from './insforge';

export interface Project {
  id: string;
  title: string;
  details: string;
  location?: string;
  platform?: string;
  date?: string;
  tech_stack: string[];
  github_link?: string;
  demo_link?: string;
  image_url?: string;
  category?: string;
  highlights?: string[];
  display_order?: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_urls: string[];
  feedbacks: string[];
  features: string[];
  is_available?: boolean;
  display_order?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  year?: string;
  organization?: string;
  raw_text?: string;
  display_order?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer?: string;
  year?: string;
  credential_url?: string;
  display_order?: number;
}

export interface Membership {
  id: string;
  role: string;
  organization: string;
  duration?: string;
  display_order?: number;
}

export const fetchProjects = (): Promise<Project[]> =>
  insforgeClient
    .get<Project[] | { data?: Project[] }>('/projects?order=display_order.asc')
    .then((r) => (Array.isArray(r.data) ? r.data : r.data?.data ?? []));

export const fetchServices = (): Promise<Service[]> =>
  insforgeClient
    .get<Service[]>('/services?order=display_order.asc')
    .then((r) => r.data);

export const fetchAchievements = (): Promise<Achievement[]> =>
  insforgeClient
    .get<Achievement[] | { data?: Achievement[] }>('/achievements?order=display_order.asc')
    .then((r) => (Array.isArray(r.data) ? r.data : r.data?.data ?? []));

export const fetchCertifications = (): Promise<Certification[]> =>
  insforgeClient
    .get<Certification[]>('/certifications?order=display_order.asc')
    .then((r) => r.data);

export const fetchMemberships = (): Promise<Membership[]> =>
  insforgeClient
    .get<Membership[]>('/memberships?order=display_order.asc')
    .then((r) => r.data);
