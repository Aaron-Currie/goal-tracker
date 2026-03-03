import styles from "./panel.module.css";
import Button from "../button/button";
import IconButton from "../button/icon-button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Overlay } from "../utility-comps/overlay";
import { useEffect, useMemo, useState } from "react";
import { deleteGoal } from "@/lib/db-calls/delete-goal";
import { completeGoal } from "@/lib/db-calls/complete-goal";
import { editGoal } from "@/lib/db-calls/edit-goal";

type Goal = {
  id: string;
  title: string;
  description?: string | null;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category_id: string | null;
  activity_id: string | null;
  created_at: string;
  completed_at: string | null;
};

type Props = {
  goal: Goal;
  unselect: React.Dispatch<React.SetStateAction<string | null>>;
  setGoalState: React.Dispatch<React.SetStateAction<Goal[]>>;
};

export default function DetailsPanel({ goal, unselect, setGoalState }: Props) {
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description ?? "");

  console.log(goal, 'goal in panel');

  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description ?? "");
  }, [goal.id, goal.title, goal.description]);

  const hasUnsavedChanges = useMemo(() => {
    const t = title.trim();
    const d = description.trim();
    const gt = (goal.title ?? "").trim();
    const gd = (goal.description ?? "").trim();
    return t !== gt || d !== gd;
  }, [title, description, goal.title, goal.description]);

  function tryClose() {
    if (hasUnsavedChanges) {
      const ok = confirm("You have unsaved changes. Exit without saving?");
      if (!ok) return;
    }
    unselect(null);
  }

  async function onDelete() {
    if (!confirm("Delete this goal?")) return;
    setLoading(true);
    try {
      await deleteGoal(goal.id);
      setGoalState((prev) => prev.filter((g) => g.id !== goal.id));
      unselect(null);
    } finally {
      setLoading(false);
    }
  }

  async function onComplete() {
    setLoading(true);
    try {
      await completeGoal(goal.id, goal.is_completed ? "undo" : "complete");
      setGoalState((prev) =>
        prev.map((g) =>
          g.id === goal.id ? { ...g, is_completed: !g.is_completed, completed_at: !g.is_completed ? new Date().toISOString() : null } : g
        )
      );
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
      setGoalState((prev) =>
        prev.map((g) =>
          g.id === goal.id
            ? { ...g, title: nextTitle, description: nextDescription }
            : g
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Overlay onClick={tryClose}>
      <div
        className={`${styles.panel} ${goal.is_completed ? styles.completed : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          icon={faX}
          button={{ alt: "Close", style: "default" }}
          onClick={tryClose}
        />

        <div className={styles.content}>
        <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-title">Title</label>
            <input
            id="goal-title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Goal title"
            />
        </div>

        <div className={styles.metaRow}>
            <span className={`${styles.statusChip} ${goal.is_completed ? styles.done : styles.todo}`}>
            {goal.is_completed ? "Completed" : "Incomplete"}
            </span>
        </div>

        <div className={styles.metaGrid}>
            <div><span className={styles.metaLabel}>Period</span><span className={styles.metaValue}>{goal.goal_period}</span></div>
            <div><span className={styles.metaLabel}>Category</span><span className={styles.metaValue}>{goal.category_id ?? "None"}</span></div>
            <div><span className={styles.metaLabel}>Activity</span><span className={styles.metaValue}>{goal.activity_id ?? "None"}</span></div>
            {goal.is_completed && <div><span className={styles.metaLabel}>Completed on</span><span className={styles.metaValue}>{new Date(goal.completed_at!).toLocaleString()}</span></div>}
        </div>

        <div className={styles.field}>
            <label className={styles.label} htmlFor="goal-desc">Description</label>
            <textarea
            id="goal-desc"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does success look like?"
            rows={5}
            />
        </div>
        {hasUnsavedChanges && <div className={styles.unsaved}>Edited</div>    }
        </div>

        {loading ? <div>Loading...</div> : null}

        <div className={styles.buttons}>
          <Button
            button={
              goal.is_completed
                ? { text: "Undo Complete", style: "undo" }
                : { text: "Complete", style: "complete" }
            }
            onClick={onComplete}
          />
          <Button button={{ text: "Delete", style: "delete" }} onClick={onDelete} />
          <Button
            onClick={onEdit}
            button={{ text: "Save", style: "edit" }}
          />
        </div>
      </div>
    </Overlay>
  );
}