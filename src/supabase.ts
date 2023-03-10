import { createClient } from "@supabase/supabase-js";

function getSupabaseKey(): string {
  return import.meta.env.VITE_SUPABASE_KEY.length === 0 || import.meta.env.VITE_SUPABASE_KEY === undefined
    ? process.env.VITE_SUPABASE_KEY
    : import.meta.env.VITE_SUPABASE_KEY;
}

const supabaseKey = getSupabaseKey();

const supabase = createClient("https://ptsiwtpctamyuwnfigwp.supabase.co", supabaseKey);

export default supabase;
