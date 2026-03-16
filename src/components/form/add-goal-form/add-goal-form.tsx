'use client'
import { Activity, Category } from "@/lib/types/goals";
import style from "./add-goal-form.module.css"

import Button from "@/components/button/button";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../scroll-selector/scroll-selector";
import { useState } from "react";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
    datesMeta: { year: string, period: string },
}

export default function AddGoalForm({datesMeta} : Props) {
    const router = useRouter();
    const { categories, activities } = useGoalsData();

    const [categoryState, setCategoryState] = useState<Category[]>(categories);
    const [activityState, setActivityState] = useState<Activity[]>(activities);

    const [periodType, setPeriodType] = useState<"Yearly" | "Quarterly" | "Monthly">(datesMeta.period as "Yearly" | "Quarterly" | "Monthly");
    const [title, setTitle] = useState<string>("");
    const [periodStart, setPeriodStart] = useState<string>("");
    const [category, setCategory] = useState<string | null>(null);
    const [activity, setActivity] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await fetch("/api/goals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            title,
            goal_period: periodType.toLowerCase(),
            period_start: periodStart,
            category_id: category,
            activity_id: activity,
            }),
        });

        const body = await res.json().catch(() => ({}));

        if (!res.ok) {
            setLoading(false);
            setError(body?.error ?? "Failed to save");
            return;
        }

        setLoading(false);
        router.push(`/goals/${datesMeta.period.toLowerCase()}/${datesMeta.year}`);
        // Need to figure out how to only update if we're on the same period, otherwise we could be adding a goal to a different period's list
        // const categoryData = categories.find(c => c.id === body.goal.category_id) ?? null;
        // const activityData = activities.find(a => a.id === body.goal.activity_id) ?? null;
        // const newGoal = { id: body.goal.id, completed_at: body.goal.completed_at, category: categoryData, activity: activityData, created_at: body.goal.created_at, is_completed: body.goal.is_completed, period_start: body.goal.period_start, title: body.goal.title, goal_period: body.goal.goal_period };

        // setGoalState((prev) => [...prev, newGoal]);
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Input label="Title" setState={setTitle} value={title} />
            <ScrollSelector datesMeta={datesMeta} setTypeState={setPeriodType} typeValue={periodType} setDateState={setPeriodStart} />
            <PillSelector label="Category" group={categoryState} setGroupState={setCategoryState} setState={setCategory}/>
            <PillSelector label="Activity" group={activityState} setGroupState={setActivityState} setState={setActivity}/>
            {loading? <p>Loading...</p> : <Button onClick={()=>{}} button={{ text: 'Save', style: "edit" }} />}
            <Link href={`/goals/${datesMeta.period.toLowerCase()}/${datesMeta.year}`} className={style.cancel}>Cancel</Link>
        </form>
    )
}