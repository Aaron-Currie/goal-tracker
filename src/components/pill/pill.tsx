import styles from "./pill.module.css";
import { Category, Activity } from "@/lib/types/goals";

export default function Pill({item}: {item: Category | Activity | null}) {
    if(!item) return null;
    return (
        <div className={styles.pill}>
            <p>{item?.name}</p>
        </div>
    )
}