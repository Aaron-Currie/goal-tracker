import { supabaseServer } from "@/lib/supabase/server";
import { cache } from "react";

export const getNoteForGoal = cache(async (goalId: string) => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("goal_notes")
    .select("id,content,created_at")
    .eq("goal_id", goalId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
});