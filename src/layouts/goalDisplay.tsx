'use client'
import AddCard from "@/components/addCard"
import GoalCard from "@/components/goalCard"
import { useState } from "react";

type Goal = {
  id: number;
  name: string;
  completed: boolean;
};

type Goals = Goal[];

interface CardDisplayProps {
  goals: Goals;
}

export default function GoalDisplay({goals}: CardDisplayProps) {
    const [goalState, setGoalState] = useState<Goals>(goals);

    return (
        <div className="flex flex-wrap w-full gap-4 justify-center p-4">
            {goalState.map((goal) => {
                return <GoalCard key={goal.id} goalData={goal} />
            })}
            <AddCard setGoals={setGoalState} />
        </div>
    )
}