import { Goal, GoalFilters } from "../types/goals";

export default function filterGoals(goals: Goal[], filters: GoalFilters) {
    const filteredGaols = goals.filter((goal) => {
        if (filters.status === "completed" && !goal.is_completed) return false;
        if (filters.status === "incomplete" && goal.is_completed) return false;
        return true;
    })
    return filteredGaols;
}