import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function HomePage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/login");
  return (
    <main>
      <GoalDisplay goals={[]}/>
      <form action="/auth/signout" method="post">
        <button type="submit">Sign out</button>
      </form>
    </main>
  );
}