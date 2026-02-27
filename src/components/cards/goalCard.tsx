import { useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./card.module.css";
import IconButton from "../button/icon-button";
import { faInfo, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons"
import { completeGoal } from "@/lib/db-calls/complete-goal";

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

interface GoalCardProps {
    goalData: Goal;
    expand: React.Dispatch<React.SetStateAction<string | null>>;
    setGoalState: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export default function GoalCard({ goalData, expand, setGoalState }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.is_completed);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setCompleted(goalData.is_completed);
    }, [goalData.is_completed])

    const handleComplete = async () => {
            setLoading(true);
                try {
                    await completeGoal(goalData.id, goalData.is_completed ? "undo" : "complete");
                    setGoalState((prev) =>
                        prev.map((g) =>
                        g.id === goalData.id ? { ...g, is_completed: !g.is_completed } : g
                        )
                    );
                } finally {
                setLoading(false);
            }
    }

    const handleUndo = () => {
        setCompleted(false);
    }

    return (
        <div className={`${styles.card} ${completed ? styles.completed : ""}`} >
                <IconButton icon={faUpRightAndDownLeftFromCenter} button={{alt: 'Edit', style: 'default'}} onClick={() => expand(goalData.id)} />
                <h3>
                    {goalData.title}
                </h3>
                <div>
                {loading ? <div>Updating...</div> : null}
                {completed ? <div>Completed</div> : <Button button={{text: "Complete", style: "complete"}} onClick={handleComplete} />}
                </div>
        </div>
    )
}