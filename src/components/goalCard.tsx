import { useState } from "react";
import Button from "./button";

type Goal = {
  id: number;
  name: string;
  completed: boolean;
};

interface GoalCardProps {
  goalData: Goal;
}

export default function GoalCard({ goalData }: GoalCardProps) {
    const [completed, setCompleted] = useState<boolean>(goalData.completed);

    const handleComplete = () => {
        setCompleted(true);
    }

    const handleUndo = () => {
        setCompleted(false);
    }

    return (
        <div className={`w-[250px] h-[250px] flex flex-col items-center justify-center p-4 text-center border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors  shadow-sm ${completed ? "bg-green-600 text-white" : "bg-white text-gray-800"}`}>
                <h3 className="text-lg font-semibold mb-2">
                    {goalData.name}
                </h3>
                {completed ? <Button button={{text: "Undo"}} onClick={handleUndo} /> : <Button button={{text: "Complete"}} onClick={handleComplete} />}
        </div>
    )
}