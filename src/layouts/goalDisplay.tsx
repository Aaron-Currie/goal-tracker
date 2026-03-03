'use client'
import GoalCard from "@/components/cards/goal-card"
import styles from "./goalDisplay.module.css"
import { useMemo, useState } from "react";
import DetailsPanel from "@/components/panel/panel";
import AddCard from "@/components/button/add-button/add-button";
import { GoalFilters } from "@/lib/types/goals";


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

const DEFAULT_FILTERS: GoalFilters = {
  status: "all",
  categoryId: "all",
  activityId: "all",
  period: "all",
  search: "",
  sort: "recent",
};

type Goals = Goal[];

interface CardDisplayProps {
  goals: Goals;
}

export default function GoalDisplay({goals}: CardDisplayProps) {
    const [goalState, setGoalState] = useState<Goals>(goals);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [filters, setFilters] = useState<GoalFilters>(DEFAULT_FILTERS);
    
    const visibleGoals = []

    return (
        <div className={styles.cardDisplay}>
            
            {goalState.map((goal) => {
                return <GoalCard expand={setSelectedCard} key={goal.id} goalData={goal} setGoalState={setGoalState} />
            })}
            <AddCard setGoals={setGoalState} />
            {selectedCard && <DetailsPanel goal={goalState.find((g) => g.id === selectedCard)!} setGoalState={setGoalState} unselect={setSelectedCard} />}
        </div>
    )
}