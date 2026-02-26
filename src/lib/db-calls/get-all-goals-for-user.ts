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

export async function getAllGoalsForUser(userId: string): Promise<Goal[]> {
  console.log("Fetching goals for user ID:", userId);
  const supabase = await supabaseServer();

  // Optional safety check: ensure the session user matches the requested userId
  const { data: auth, error: authErr } = await supabase.auth.getUser();
  if (authErr || !auth.user) return [];
  if (auth.user.id !== userId) return []; // prevents accidental cross-user fetch

  const { data, error } = await supabase
    .from("goals")
    .select("id,title,is_completed,goal_period,period_start,category_id,activity_id,created_at")
    .order("period_start", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}