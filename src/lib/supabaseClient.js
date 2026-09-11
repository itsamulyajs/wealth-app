import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from Vite environment variables or localStorage
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const localUrl = localStorage.getItem('arthsaathi_supabase_url');
  const localKey = localStorage.getItem('arthsaathi_supabase_key');

  const supabaseUrl = envUrl || localUrl || '';
  const supabaseAnonKey = envKey || localKey || '';

  return { supabaseUrl, supabaseAnonKey };
};

export const saveSupabaseConfig = (url, key) => {
  if (url && key) {
    localStorage.setItem('arthsaathi_supabase_url', url.trim());
    localStorage.setItem('arthsaathi_supabase_key', key.trim());
  } else {
    localStorage.removeItem('arthsaathi_supabase_url');
    localStorage.removeItem('arthsaathi_supabase_key');
  }
};

const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

export const isSupabaseConfigured = () => {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();
  return Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://'));
};

// Create Supabase Client instance (or mock-safe client if not configured yet)
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
