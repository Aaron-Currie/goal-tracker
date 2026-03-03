import { useState } from "react";
import Button from "./button";
import styles from "./card.module.css";

type Goal = {
  id: number;
  name: string;
  completed: boolean;
};

interface GoalCardProps {
  goalData: Goal;
}

export default function GoalCard({ goalData }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.completed);

    const handleComplete = () => {
        setCompleted(true);
    }

    const handleUndo = () => {
        setCompleted(false);
    }

    return (
        <div className={styles.card} >
                <h3>
                    {goalData.name}
                </h3>
                {completed ? <Button button={{text: "Undo"}} onClick={handleUndo} /> : <Button button={{text: "Complete"}} onClick={handleComplete} />}
        </div>
    )
}