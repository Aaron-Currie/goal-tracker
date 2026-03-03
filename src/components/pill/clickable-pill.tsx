import { useState } from "react";
import styles from "./pill.module.css";
import { Category, Activity } from "@/lib/types/goals";

export default function ClickablePill({item}: {item: Category | Activity | null}) {
    if(!item) return null;
    const [selected, setSelected] = useState(false);
    return (
        <button className={`${styles.pill} ${selected? styles.selected : ""}`} onClick={() => setSelected(!selected)}>
            {item.name}
        </button>
    )
}