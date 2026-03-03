import { supabaseServer } from "../supabase/server";

export const getGoalsForPeriodAndDate = async (period: string, year: string) => {
      const supabase = await supabaseServer();
      const periodStart = `${year}-01-01`
      const { data, error } = await supabase
        .from("goals")
        .select("id,title,description,is_completed,goal_period,period_start,category_id,activity_id,created_at,completed_at")
        .eq("goal_period", period)
        .eq("period_start", periodStart)
        .order("period_start", { ascending: true });
    
      if (error) throw new Error(error.message);
      return data ?? [];
}