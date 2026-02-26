import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getAllGoalsForUser } from "@/lib/db-calls/get-all-goals-for-user";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function HomePage() {
  const supabase = await supabaseServer();

  const { data } = await supabase.auth.getUser();
  const userId = data.user.id;

  if (!data.user) redirect("/login");
  const goals = await getAllGoalsForUser(userId)();
  return (
    <main>
      <GoalDisplay goals={goals ?? []}/>
    </main>
  );
}