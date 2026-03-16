import { getGoalsForPeriodAndDate } from "@/lib/db-calls/goals/get-goals-for-period-date";
import GoalDisplay from "@/layouts/goalDisplay";
import AddGoalForm from "@/components/form/add-goal-form/add-goal-form";


export default async function AddGoalPage({searchParams}: { searchParams: { year: string, period: string } }) {
    const { period, year } = await searchParams;
  return (
    <AddGoalForm datesMeta={{ year, period }}/>
  );
}