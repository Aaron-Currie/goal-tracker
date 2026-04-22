'use client';
import { Goal, GoalNote } from "@/lib/types/goals";
import { useState } from "react";
import { changeGoalStatus } from "@/lib/db-calls/goals/change-status";
import GoalDetails from "@/components/goal-details/goal-details";
import EditGoalForm from "@/components/form/edit-goal-form/edit-goal-form";
import PageHeader from "@/components/page-header/page-header";
import CompleteAnimation from "@/components/animation/complete-animation/complete";
import ErrorModal from "@/components/error/error-modal/error-modal";
import { Overlay } from "@/components/utility-comps/overlay";
import LoadingSpinner from "@/components/loading/loading-spinner";

export default function SingleGoalDisplay({goal, notes}: {goal: Goal, notes: GoalNote[]}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [goalState, setGoalState] = useState<Goal>(goal);
  const [editing, setEditing] = useState(false);
  const [noteState, setNoteState] = useState<GoalNote[]>(notes);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);


  async function onComplete({action}: {action: "complete" | "active" | "fail"}) {
    setLoading(true);
    setError(null);
    let update
    try {
      update = await changeGoalStatus(goal.id, action);
    } catch (error:any) {
      setLoading(false);
      setError(error.message);
      return;
    }
    if(action === "complete") {
      setShowAnimation(true);
    }
    const newStatus = update.goal[0].status;
    const completed_at = update.goal[0].completed_at;
    const failed_at = update.goal[0].failed_at;
    console.log(newStatus, completed_at, failed_at);
    setGoalState((prev) => ({ ...prev, status: newStatus, completed_at, failed_at }));
    setLoading(false);
  }
  
  return (
    <>
      <PageHeader editing={editing} goalState={goalState} title={goalState.title} returnUrl={`/goals/${goalState.goal_period}/${goalState.period_start}`} setEditing={setEditing} />
      {editing ? 
        <EditGoalForm goal={goalState} setGoal={setGoalState} cancel={() => setEditing(false)}/> 
        : 
        <GoalDetails notes={noteState} setNoteState={setNoteState} goalState={goalState} onComplete={onComplete}/>}
      {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
      {showAnimation && <CompleteAnimation goal={goalState} onClose={() => setShowAnimation(false)} />}
      {loading && <Overlay><LoadingSpinner /></Overlay>}
    </>
  );
}