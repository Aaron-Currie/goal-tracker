'use client'
import GoalCard from "@/components/cards/goal-card"
import styles from "./goalDisplay.module.css"
import { useMemo, useState } from "react";
import DetailsPanel from "@/components/panel/panel";
import AddCard from "@/components/button/add-button/add-button";
import { GoalFilters, Goal } from "@/lib/types/goals";
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";

const DEFAULT_FILTERS: GoalFilters = {
  status: "all",
  categoryId: "all",
  activityId: "all",
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
    
    const visibleGoals = useMemo(() => filterGoals(goalState, filters), [goalState, filters]);
    return (
        <section className={styles.container}>
            <Filter goals={goalState} filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
            <div className={styles.cardDisplay}>
                
                {visibleGoals.map((goal) => {
                    return <GoalCard expand={setSelectedCard} key={goal.id} goalData={goal} setGoalState={setGoalState} />
                })}
                <AddCard setGoals={setGoalState} />
                {selectedCard && <DetailsPanel goal={goalState.find((g) => g.id === selectedCard)!} setGoalState={setGoalState} unselect={setSelectedCard} />}
            </div>
        </section>
    )
}