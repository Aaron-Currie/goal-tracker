'use client'
import { useEffect, useMemo, useState } from "react";
import { GoalFilters, Goal, Category, Activity } from "@/lib/types/goals";
import styles from "./goalDisplay.module.css"

import GoalCard from "@/components/cards/goal-card"
import Filter from "@/components/filter/filter";
import filterGoals from "@/lib/filter/filter-goals";
import AddButton from "@/components/button/add-button/add-button";
import { useGoalsData } from "@/lib/contexts/goals-data-context";

const DEFAULT_FILTERS: GoalFilters = {
  status: "all",
  categoryId: "all",
  activityId: "all",
  sort: "recent",
  search: "",
};

type Goals = Goal[];

type Categories = Category[];

type Activities = Activity[];

interface CardDisplayProps {
  goals: Goals;
  date: { year: string, period: string };
}

export default function GoalDisplay({goals, date}: CardDisplayProps) {
    const { categories, activities } = useGoalsData();
    const [goalState, setGoalState] = useState<Goals>(goals);
    const [categoryState, setCategoryState] = useState<Categories>(categories);
    const [activityState, setActivityState] = useState<Activities>(activities);
    const [goalCounts, setGoalCounts] = useState({ total: goals.length, completed: goals.filter(g => g.is_completed).length });
    
    const [filters, setFilters] = useState<GoalFilters>(DEFAULT_FILTERS);

    const datesMeta = useMemo(() => {
        const capPeriod = date.period.charAt(0).toUpperCase() + date.period.slice(1);
        return { year: date.year, period: capPeriod };
    }, [date.year, date.period]);

    const visibleGoals = useMemo(() => filterGoals(goalState, filters), [goalState, filters]);

    useEffect(() => {
        setGoalCounts({ total: visibleGoals.length, completed: visibleGoals.filter(g => g.is_completed).length });
    }, [visibleGoals]);

    return (
        <section className={styles.container}>
            <p>Completed: {goalCounts.completed} / {goalCounts.total}</p>
            <Filter filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} categories={categoryState} activities={activityState} />
            <div className={styles.cardDisplay}>
                {visibleGoals.map((goal) => {
                    return <GoalCard key={goal.id} goalData={goal} setGoalState={setGoalState} />
                })}
                <AddButton query={`year=${datesMeta.year}&period=${datesMeta.period}`} />
            </div>
        </section>
    )
}