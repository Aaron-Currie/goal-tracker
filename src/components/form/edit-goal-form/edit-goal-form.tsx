'use client'
import { Activity, Category, Goal } from "@/lib/types/goals";
import style from "./edit-goal-form.module.css";

import Button from "@/components/button/button";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../scroll-selector/scroll-selector";
import { useState } from "react";
import { useGoalsData } from "@/lib/contexts/goals-data-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import IconButton from "@/components/button/icon-button";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

type Props = {
    goal: Goal;
    cancel: () => void;
}

export default function EditGoalForm({goal, cancel} : Props) {
    const router = useRouter();
    const { categories, activities } = useGoalsData();

    const [categoryState, setCategoryState] = useState<Category[]>(categories);
    const [activityState, setActivityState] = useState<Activity[]>(activities);

    const [periodType, setPeriodType] = useState<"Yearly" | "Quarterly" | "Monthly">(goal.goal_period as "Yearly" | "Quarterly" | "Monthly");
    const [title, setTitle] = useState<string>(goal.title);
    const [periodStart, setPeriodStart] = useState<string>(goal.period_start);
    const [category, setCategory] = useState<string | null>(goal.category?.id ?? null);
    const [activity, setActivity] = useState<string | null>(goal.activity?.id ?? null);
    const [description, setDescription] = useState<string>(goal.description ?? "");
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
            description,
            }),
        });

        const body = await res.json().catch(() => ({}));

        if (!res.ok) {
            setLoading(false);
            setError(body?.error ?? "Failed to save");
            return;
        }

        setLoading(false);
        router.push(`/goals/${goal.goal_period.toLowerCase()}/${goal.period_start}`);
    }
    console.log(goal)

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <IconButton onClick={() => cancel()} icon={faBackward} button={{ alt: 'back', style: 'black' }} cornerButton={false} />
            <Input label="Title" setState={setTitle} value={title} />
            <ScrollSelector datesMeta={{ year: goal.period_start, period: goal.goal_period }} setTypeState={setPeriodType} typeValue={periodType} setDateState={setPeriodStart} />
            <PillSelector label="Category" group={categoryState} setGroupState={setCategoryState} setState={setCategory}/>
            <PillSelector label="Activity" group={activityState} setGroupState={setActivityState} setState={setActivity}/>
            <textarea
                id="goal-desc"
                className={style.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What does success look like?"
                rows={4}
            />
            {loading? <p>Loading...</p> : <Button onClick={()=>{}} button={{ text: 'Save', style: "edit" }} />}
        </form>
    )
}