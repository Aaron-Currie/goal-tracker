'use client'
import { useMemo, useState } from "react";
import { GoalFilters, Goal, Category, Activity } from "@/lib/types/goals";
import styles from "./goalDisplay.module.css"

import GoalCard from "@/components/cards/goal-card"
import DetailsPanel from "@/components/panel/panel";
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";
import AddButton from "@/components/button/add-button/add-button";
import Model from "@/components/model/model";
import AddGoalForm from "@/components/form/add-goal-form/add-goal-form";

const DEFAULT_FILTERS: GoalFilters = {
  status: "all",
  categoryId: "all",
  activityId: "all",
  sort: "recent",
};

type Goals = Goal[];

type Categories = Category[];

type Activities = Activity[];

interface CardDisplayProps {
  goals: Goals;
  categories: Categories;
  activities: Activities;
}

export default function GoalDisplay({goals, categories, activities}: CardDisplayProps) {
    const [goalState, setGoalState] = useState<Goals>(goals);
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const [filters, setFilters] = useState<GoalFilters>(DEFAULT_FILTERS);
    const [addModelOpen, setAddModelOpen] = useState(false);

    const visibleGoals = useMemo(() => filterGoals(goalState, filters), [goalState, filters]);
    return (
        <section className={styles.container}>
            <Filter filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} categories={categories} activities={activities} />
            <div className={styles.cardDisplay}>
                {visibleGoals.map((goal) => {
                    return <GoalCard expand={setSelectedCard} key={goal.id} goalData={goal} setGoalState={setGoalState} />
                })}
                {addModelOpen && (
                    <Model onClose={() => setAddModelOpen(false)}>
                        <AddGoalForm categories={categories} activities={activities} onClose={() => setAddModelOpen(false)} />
                    </Model>)}
                <AddButton onClick={() => setAddModelOpen(true)} />
                {selectedCard && <DetailsPanel goal={goalState.find((g) => g.id === selectedCard)!} setGoalState={setGoalState} unselect={setSelectedCard} />}
            </div>
        </section>
    )
}