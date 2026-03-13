import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://sb_publishable_iwPRlNJC_LLNVOxmxOCPSg_pCsjVnbp.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ou Anon Key ausentes no arquivo .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
