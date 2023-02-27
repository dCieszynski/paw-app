import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ptsiwtpctamyuwnfigwp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0c2l3dHBjdGFteXV3bmZpZ3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY1NjM2ODksImV4cCI6MTk5MjEzOTY4OX0.IA1bUXHCFJiZtuYkCc-W_ge8ZWuhohesfwILB-qrtMg"
);

export default supabase;
