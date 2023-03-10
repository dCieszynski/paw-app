import { createClient } from "@supabase/supabase-js";

function getSupabaseKey() {
  return import.meta.env.VITE_SUPABASE_KEY ?? process.env.REACT_APP_SUPABASE_KEY;
}

const supabase = createClient("https://ptsiwtpctamyuwnfigwp.supabase.co", getSupabaseKey());

export default supabase;
