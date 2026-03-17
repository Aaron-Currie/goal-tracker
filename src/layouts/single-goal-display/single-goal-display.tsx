'use client';
import { Goal } from "@/lib/types/goals";
import { useEffect, useMemo, useState } from "react";
import { deleteGoal } from "@/lib/db-calls/goals/delete-goal";
import { completeGoal } from "@/lib/db-calls/goals/complete-goal";
import { editGoal } from "@/lib/db-calls/goals/edit-goal";
import { useRouter } from "next/navigation";
import GoalDetails from "@/components/goal-details/goal-details";
import EditGoalForm from "@/components/form/edit-goal-form/edit-goal-form";

export default function SingleGoalDisplay({goal}: {goal: Goal}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [goalState, setGoalState] = useState<Goal>(goal);
  const [editing, setEditing] = useState(false);

  async function onDelete() {
    if (!confirm("Delete this goal?")) return;
    setLoading(true);
    try {
      await deleteGoal(goal.id);
    } finally {
      setLoading(false);
      router.push(`/goals/${goal.goal_period}/${goal.period_start}`);
    }
  }

  async function onComplete() {
    setLoading(true);
    try {
      await completeGoal(goal.id, goal.is_completed ? "undo" : "complete");
      setGoalState((prev) => ({ ...prev, is_completed: !prev.is_completed }));
    } finally {
      setLoading(false);
    }
  }

  if(editing) return <EditGoalForm goal={goalState} setGoal={setGoalState} cancel={() => setEditing(false)} />;
  
  return <GoalDetails goalState={goalState} onComplete={onComplete} onDelete={onDelete} startEdit={() => setEditing(true)} />
}