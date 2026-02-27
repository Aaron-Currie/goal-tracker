import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getAllGoalsForUser } from "@/lib/db-calls/get-all-goals-for-user";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function HomePage() {
  const goals = await getAllGoalsForUser();
  return (
    <main>
      <GoalDisplay goals={goals ?? []}/>
    </main>
  );
}