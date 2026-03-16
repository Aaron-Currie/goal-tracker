import { getGoalsForPeriodAndDate } from "@/lib/db-calls/goals/get-goals-for-period-date";
import GoalDisplay from "@/layouts/goalDisplay";

export default async function GoalPage({ params }: { params: Promise<{ period: "yearly" | "quarterly" | "monthly", year: string, date: string }> }) {
  const { period, year } = await params;

  const goals = await getGoalsForPeriodAndDate(period, year );

  return (
      <GoalDisplay date={{ year, period }} goals={goals ?? []}/>
  );
}