import { useEffect, useState } from "react";
import Button from "../button/button";
import styles from "./card.module.css";
import { completeGoal } from "@/lib/db-calls/goals/complete-goal";
import { Goal } from "@/lib/types/goals";
import Pill from "../pill/pill";

interface GoalCardProps {
    goalData: Goal;
    expand: React.Dispatch<React.SetStateAction<string | null>>;
    setGoalState: React.Dispatch<React.SetStateAction<Goal[]>>;
}

export default function GoalCard({ goalData, expand, setGoalState }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.is_completed);

    useEffect(() => {
        setCompleted(goalData.is_completed);
    }, [goalData.is_completed])

    const handleComplete = async () => {
                try {
                    await completeGoal(goalData.id, "complete");
                    setGoalState((prev) =>
                        prev.map((g) =>
                        g.id === goalData.id ? { ...g, is_completed: !g.is_completed } : g
                        )
                    );
                } finally {
            }
    }

    return (
        <div className={`${styles.card}`} >
                <button onClick={() => expand(goalData.id)} className={`${styles.content} ${completed ? styles.green : ""}`}>
                    <div className={styles.pills}>
                        <Pill item={goalData.category} />
                        <Pill item={goalData.activity} />
                    </div>

                    <h3 className={styles.title}>
                        {goalData.title}
                    </h3>
                </button>

                {!completed && <div className={styles.complete}>
                    <Button button={{text: "Complete", style: "complete"}} onClick={handleComplete} />
                </div>}
        </div>
    )
}