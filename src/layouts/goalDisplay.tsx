'use client'
import AddCard from "@/components/cards/addCard"
import GoalCard from "@/components/cards/goalCard"
import styles from "./goalDisplay.module.css"
import { useState } from "react";

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

type Goals = Goal[];

interface CardDisplayProps {
  goals: Goals;
}

export default function GoalDisplay({goals}: CardDisplayProps) {
    const [goalState, setGoalState] = useState<Goals>(goals);

    return (
        <div className={styles.cardDisplay}>
            {goalState.map((goal) => {
                return <GoalCard key={goal.id} goalData={goal} />
            })}
            <AddCard setGoals={setGoalState} />
        </div>
    )
}