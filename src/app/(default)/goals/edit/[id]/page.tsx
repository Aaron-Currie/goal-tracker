import SingleGoalDisplay from "@/layouts/single-goal-display/single-goal-display";
import { getGoalForId } from "@/lib/db-calls/goals/get-goal-for-id";

export default async function GoalPage({params}: { params: { id: string } }) {
    const { id } = await params;
    const goal = await getGoalForId(id);

    console.log("GOAL FOR ID", goal)

  return (
    <SingleGoalDisplay goal={goal} />
  );
}