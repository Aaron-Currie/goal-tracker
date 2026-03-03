import { getGoalsForPeriodAndDate } from "@/lib/db-calls/get-goals-for-period-date";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function GoalPage({ params }: { params: Promise<{ period: string, year: string }> }) {
  const { period, year } = await params;

  const goals = await getGoalsForPeriodAndDate(period, year);

  return (
    <main>
      <GoalDisplay goals={goals ?? []}/>
    </main>
  );
}