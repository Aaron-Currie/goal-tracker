import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function HomePage() {
  const supabase = await supabaseServer();

  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  const { data: goals, error } = await supabase
    .from("goals")
    .select(
      "id,title,is_completed,goal_period,period_start,category_id,activity_id,created_at"
    )
    .order("period_start", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching goals:", error);
    return <div>Error loading goals</div>;
  }
  return (
    <main>
      <GoalDisplay goals={goals ?? []}/>
    </main>
  );
}