import { createClient } from "@supabase/supabase-js";
import { env } from "~/env";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

// TODO: Add ability to go between QA / Prod Database
export const db = supabase;
