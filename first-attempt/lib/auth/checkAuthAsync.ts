// utils/authUtils.ts
import { SupabaseClient } from "@supabase/supabase-js";

export const checkAuthAsync = async (supabase: SupabaseClient) => {
  try {
    const { data: user } = await supabase.auth.getUser();
    return user?.user;
  } catch (error: unknown) {
    console.error("Error fetching user:", error);
    return null;
  }
};
