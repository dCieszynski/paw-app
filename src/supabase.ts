import { createClient } from "@supabase/supabase-js";

const supabase = createClient("https://ptsiwtpctamyuwnfigwp.supabase.co", import.meta.env.VITE_SUPABASE_KEY || "test");

export default supabase;
