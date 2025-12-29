import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://muxkzstmuxmoinbbzvyn.supabase.co";
const supabaseAnonKey = "sb_publishable_-MoEus1WdXNl-uIVxRh1UQ_5F_YA6CE";
const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "implicit"
      // Use implicit flow - simpler for OAuth
    }
  }
);

export { supabase as s };
