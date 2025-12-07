import { useState } from "react";
import styles from "./card.module.css";


export default function addCard({ setGoals }: { setGoals: React.Dispatch<React.SetStateAction<{id: number, name: string}[]>> }) {
    const [input, setInput] = useState<string>("");

    const handleAddGoal = () => {
        if (input.trim() === "") return;
        setGoals(prevGoals => [...prevGoals, { id: prevGoals.length + 1, name: input }]);
        setInput("");
    }

    return (
        <div className={styles.card} >
            <input 
                type="text" 
                aria-label="Input new goal name"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <button 
                onClick={handleAddGoal}
            >
                +
            </button>
        </div>
    )
}