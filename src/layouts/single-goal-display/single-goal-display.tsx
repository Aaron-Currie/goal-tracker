'use client';
import { Goal } from "@/lib/types/goals";
import styles from "./single-goal-display.module.css";
import { useEffect, useMemo, useState } from "react";
import { deleteGoal } from "@/lib/db-calls/goals/delete-goal";
import { completeGoal } from "@/lib/db-calls/goals/complete-goal";
import { editGoal } from "@/lib/db-calls/goals/edit-goal";
import Button from "@/components/button/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Pill from "@/components/pill/pill";
import IconButton from "@/components/button/icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Input from "@/components/form/input-components/input/input";
import AddGoalForm from "@/components/form/add-goal-form/add-goal-form";
import GoalDetails from "@/components/panel/goal-details";
import EditGoalForm from "@/components/form/edit-goal-form/edit-goal-form";

export default function SingleGoalDisplay({goal}: {goal: Goal}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [goalState, setGoalState] = useState<Goal>(goal);
  const [noteState, setNoteState] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState<string>(goal.title);
  const [description, setDescription] = useState<string>(goal.description ?? "");

  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description ?? "");
  }, [goal.id, goal.title, goal.description]);

  useEffect(() => {
    setNoteState(['mock note 1', 'mock note 2']);
  }, [])

  const hasUnsavedChanges = useMemo(() => {
    const t = title.trim();
    const d = description.trim();
    const gt = (goal.title ?? "").trim();
    const gd = (goal.description ?? "").trim();
    return t !== gt || d !== gd;
  }, [title, description, goal.title, goal.description]);

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

  async function onEdit() {
    const nextTitle = title.trim();
    const nextDescription = description.trim();

    if (!nextTitle) {
      alert("Title is required.");
      return;
    }
    if (!hasUnsavedChanges) {
      return;
    }

    setLoading(true);
    try {
      await editGoal(goal.id, { title: nextTitle, description: nextDescription });
    } finally {
      setLoading(false);
    }
  }

  const handleAddNote = () => {
    setNoteState((prev) => [...prev, `New note ${prev.length + 1}`]);
  }
  if(editing) return <EditGoalForm goal={goal} cancel={() => setEditing(false)} />;
  
  return <GoalDetails goalState={goalState} onComplete={onComplete} onDelete={onDelete} startEdit={() => setEditing(true)} noteState={noteState} handleAddNote={handleAddNote} />
}