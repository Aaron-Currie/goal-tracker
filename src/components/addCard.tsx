import { useState } from "react";

export default function addCard({ setGoals }: { setGoals: React.Dispatch<React.SetStateAction<{id: number, name: string}[]>> }) {
    const [input, setInput] = useState<string>("");

    const handleAddGoal = () => {
        if (input.trim() === "") return;
        setGoals(prevGoals => [...prevGoals, { id: prevGoals.length + 1, name: input }]);
        setInput("");
    }

    return (
        <div 
            className="w-[250px] h-[250px] flex flex-col gap-4 items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
            >
            <input 
                type="text" 
                aria-label="Input new goal name"
                className="border p-2"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button 
                className="text-2xl text-gray-500 border rounded-full w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors" 
                onClick={handleAddGoal}
            >
                +
            </button>
        </div>
    )
}