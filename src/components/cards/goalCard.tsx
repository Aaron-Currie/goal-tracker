import { useState } from "react";
import Button from "../button/button";
import styles from "./card.module.css";
import IconButton from "../button/icon-button";
import { faInfo, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons"

type Goal = {
  id: string;
  title: string;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category_id: string | null;
  activity_id: string | null;
  created_at: string;
};

interface GoalCardProps {
  goalData: Goal;
  expand: React.Dispatch<React.SetStateAction<Goal | null>>;
}

export default function GoalCard({ goalData, expand }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.is_completed);


    const handleComplete = () => {
        setCompleted(true);
    }

    const handleUndo = () => {
        setCompleted(false);
    }

    return (
        <div className={`${styles.card} ${completed ? styles.completed : ""}`} >
                <IconButton icon={faUpRightAndDownLeftFromCenter} button={{alt: 'Edit', style: 'default'}} onClick={() => expand(goalData)} />
                <h3>
                    {goalData.title}
                </h3>
                <div>
                {completed ? <div>Completed</div> : <Button button={{text: "Complete", style: "complete"}} onClick={handleComplete} />}
                </div>
        </div>
    )
}