import { useState } from "react";
import Button from "../button/button";
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
    const [clicked, setClicked] = useState<boolean>(false)
    const [completed, setCompleted] = useState<boolean>(goalData.completed);


    const handleComplete = () => {
        setCompleted(true);
    }

    const handleUndo = () => {
        setCompleted(false);
    }

    return (
        <button onClick={() => setClicked(!clicked)} className={`${styles.card} ${completed ? styles.completed : ""}`} >
                <h3>
                    {goalData.name}
                </h3>
                {clicked && <div>
                {completed ? <Button button={{text: "Undo", style: "undo"}} onClick={handleUndo} /> : <Button button={{text: "Complete", style: "complete"}} onClick={handleComplete} />}
                <Button button={{text:'Edit', style: 'edit'}}/>
                </div>}
        </button>
    )
}