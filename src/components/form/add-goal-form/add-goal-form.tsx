import { Activity, Category } from "@/lib/types/goals";
import style from "./add-goal-form.module.css"

import Button from "@/components/button/button";
import PillSelector from "../input-components/pill-selector/pill-selector";
import Input from "../input-components/input/input";
import ScrollSelector from "../scroll-selector/scroll-selector";
import { useState } from "react";


type Props = {
    onClose: () => void;
    categories: Category[];
    activities: Activity[];
}

export default function AddGoalForm({ categories, activities, onClose }: Props) {
    const [periodType, setPeriodType] = useState<"Yearly" | "Quarterly" | "Monthly">("Yearly");
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
        onClose();
    }

    return (
        <form className={style.form} onSubmit={handleSubmit}>
            <Input label="Title" setState={setTitle} value={title} />
            <ScrollSelector setTypeState={setPeriodType} typeValue={periodType} setDateState={setPeriodStart} />
            <PillSelector label="Category" group={categories} setState={setCategory}/>
            <PillSelector label="Activity" group={activities} setState={setActivity}/>
            {loading? <p>Loading...</p> : <Button onClick={()=>{}} button={{ text: 'Save', style: "edit" }} />}
        </form>
    )
}