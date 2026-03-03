"use client";

import { useState } from "react";
import styles from "./add-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

export default function AddCard({
  setGoals,
}: {
  setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
}) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAddGoal() {
    if (!input.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input,
          goal_period: "yearly",
          period_start: "2026-01-01",
          category_id: null,
          activity_id: null,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Failed to create goal");
      }

      // Add the goal returned from server
      setGoals((prev) => [json.goal, ...prev]);

      setInput("");
    } catch (err: any) {
      setError(err.message ?? "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
      <button className={styles.add} onClick={handleAddGoal} disabled={loading}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
  );
}