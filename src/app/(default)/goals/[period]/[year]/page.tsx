import { getGoalsForPeriodAndDate } from "@/lib/db-calls/goals/get-goals-for-period-date";
import GoalDisplay from "@/layouts/goalDisplay";
import { getAllCategoriesForUser } from "@/lib/db-calls/categories/get-all-categories-for-user";
import { getAllActivitiesForUser } from "@/lib/db-calls/activities/get-all-activities-for-user";


export default async function GoalPage({ params }: { params: Promise<{ period: "yearly" | "quarterly" | "monthly", year: string, date: string }> }) {
  const { period, year } = await params;

  const goals = await getGoalsForPeriodAndDate(period, year );
  const categories = await getAllCategoriesForUser();
  const activities = await getAllActivitiesForUser();

  return (
    <main>
      <GoalDisplay date={{ year, period }} categories={categories} activities={activities} goals={goals ?? []}/>
    </main>
  );
}