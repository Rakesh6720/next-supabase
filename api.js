// import supabase client from supabase module
import { createClient } from "@supabase/supabase-js";
// export supabase instance so can be used in other parts of application
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
