'use client'
import GoalCard from "@/components/cards/goal-card"
import styles from "./goalDisplay.module.css"
import { useMemo, useState } from "react";
import DetailsPanel from "@/components/panel/panel";
import { GoalFilters, Goal, Category, Activity } from "@/lib/types/goals";
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";
import AddButton from "@/components/button/add-button/add-button";
import AddModel from "@/components/add-model/add-model";

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
                {addModelOpen && <AddModel onClose={() => setAddModelOpen(false)} categories={categories} activities={activities} />}
                <AddButton onClick={() => setAddModelOpen(true)} />
                {selectedCard && <DetailsPanel goal={goalState.find((g) => g.id === selectedCard)!} setGoalState={setGoalState} unselect={setSelectedCard} />}
            </div>
        </section>
    )
}