import { useState } from "react";
import styles from "./pill.module.css";
import { Category, Activity } from "@/lib/types/goals";

type Props = {
    item: Category | Activity | null;
    selected?: boolean;
    onSelect?: (item: Category | Activity) => void;
}

export default function ClickablePill({item, selected, onSelect}: Props) {
    if(!item) return null;
    return (
        <input type="button" className={`${styles.pill} ${selected? styles.selected : ""}`} onClick={() => onSelect && onSelect(item)} value={item.name} />
    )
}