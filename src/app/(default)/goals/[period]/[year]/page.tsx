import { getAllGoalsForUser } from "@/lib/db-calls/get-all-goals-for-user";
import { getGoalsForPeriodAndDate } from "@/lib/db-calls/get-goals-for-period-date";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function HomePage({ params }: { params: Promise<{ period: string, year: string }> }) {
  const { period, year } = await params;

  const goals = await getGoalsForPeriodAndDate(period, year);

  return (
    <main>
      <GoalDisplay goals={goals ?? []}/>
    </main>
  );
}