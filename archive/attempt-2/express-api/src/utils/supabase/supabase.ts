import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.SUPABASE_CONNECTION_URL || "",
  process.env.SUPABASE_PUBLIC_KEY || ""
);

export default supabase;
