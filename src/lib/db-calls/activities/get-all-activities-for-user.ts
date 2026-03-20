import { supabaseServer } from "@/lib/supabase/server";
import { cache } from "react";

export const getAllActivitiesForUser = cache(async () => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("activities")
    .select("id,name")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
});