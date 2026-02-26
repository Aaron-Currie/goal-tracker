import styles from "./panel.module.css";
import Button from "../button/button";
import IconButton from "../button/icon-button";
import { faX} from "@fortawesome/free-solid-svg-icons"
import { Overlay } from "../utility-comps/overlay";
import { useState } from "react";
import { deleteGoal } from "@/lib/db-calls/delete-goal";
import { completeGoal } from "@/lib/db-calls/complete-goal";

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

export default function DetailsPanel({ goal, unselect, setGoalState }: { goal: Goal, unselect: React.Dispatch<React.SetStateAction<string | null>>, setGoalState: React.Dispatch<React.SetStateAction<Goal[]>> }) {
    const [loading, setLoading] = useState(false);
    
    async function onDelete() {
        if (!confirm("Delete this goal?")) return;
        setLoading(true);
        try {
        await deleteGoal(goal.id);
        setGoalState((prev) => prev.filter((g) => g.id !== goal.id));
        } finally {
        unselect(null);  
        setLoading(false);
        }
    }

    async function onComplete() {
    setLoading(true);
        try {
        await completeGoal(goal.id, goal.is_completed ? "undo" : "complete");
        setGoalState((prev) =>
            prev.map((g) =>
            g.id === goal.id ? { ...g, is_completed: !g.is_completed } : g
            )
        );
        } finally {
        setLoading(false);
    }
  }
    
    return (
        <Overlay onClick={() => unselect(null)}>
            <div className={`${styles.panel} ${goal.is_completed && styles.completed}`}>
                <IconButton icon={faX} button={{alt: 'Close', style: 'default'}} onClick={() => unselect(null)} />
                <div className={styles.content}>
                    <h2>{goal.title}</h2>
                    <p>{goal.is_completed ? "COMPLETED" : "INCOMPLETE"}</p>
                    <p>Period: {goal.goal_period}</p>
                    <p>Category: {goal.category_id ? goal.category_id : "None"}</p>
                    <p>Activity: {goal.activity_id ? goal.activity_id : "None"}</p>
                    <p>I want to climb the highest mountain that I can find, so I aim to do this.</p>
                </div>
                {loading ? <div>Loading...</div> : null}
                <div className={styles.buttons}>
                    <Button button={goal.is_completed ? {text: "Undo Complete", style: "undo"} : {text: "Complete", style: "complete"}} onClick={onComplete} />
                    <Button button={{text: "Delete", style: "delete"}} onClick={onDelete} />
                    <Button onClick={() => {}} button={{text:'Edit', style: 'edit'}}/>
                </div>
            </div>
        </Overlay>
    )
}