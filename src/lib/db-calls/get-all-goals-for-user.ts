import { unstable_cache } from "next/cache";
import { supabaseServer } from "@/lib/supabase/server";

type Goal = {
  id: string;
  title: string;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category_id: string | null;
  activity_id: string | null;
  created_at: string;
};

export const getAllGoalsForUser = (userId: string) => unstable_cache(
  async (): Promise<Goal[]> => {
    console.log("🔥 DB HIT for user:", userId);
    const supabase = supabaseServer();

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return [];

    const { data, error } = await supabase
      .from("goals")
      .select(
        "id,title,is_completed,goal_period,period_start,category_id,activity_id,created_at"
      )
      .order("period_start", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  },
  ["goals", userId],
  { tags: [`goals:${userId}`], revalidate: 3600 }
);