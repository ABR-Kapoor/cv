// InsForge.dev API client
// Uses PostgREST-compatible REST API (similar to Supabase)
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_INSFORGE_URL as string;
const ANON_KEY = import.meta.env.VITE_INSFORGE_ANON_KEY as string;

export const insforgeClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    apikey: ANON_KEY,
    Authorization: `Bearer ${ANON_KEY}`,
    'Content-Type': 'application/json',
  },
});
