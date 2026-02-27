import { supabaseServer } from "@/lib/supabase/server";
import { cache } from "react";

export const getAllGoalsForUser = cache(async () => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("goals")
    .select("id,title,description,is_completed,goal_period,period_start,category_id,activity_id,created_at,completed_at")
    .order("period_start", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
});