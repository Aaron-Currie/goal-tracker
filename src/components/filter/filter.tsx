import { Goal, GoalFilters } from "@/lib/types/goals";
import Button from "../button/button";
import styles from "./filter.module.css";

type Props = {
  goals: Goal[];
  filters: GoalFilters;
  onChange: (next: GoalFilters) => void;
  onReset: () => void;
};

export default function Filter({goals, filters, onChange, onReset}: Props) {
        return (
            <div className={styles.filterBar}>
                <div className={styles.filterItem}>
                    <label htmlFor="status">Status:</label>
                    <select 
                        name="status"
                        id="status"
                        className={styles.select}
                        value={filters.status}
                        onChange={(e) => onChange({...filters, status: e.target.value as GoalFilters["status"]})}
                    >
                        <option value="all">All</option>
                        <option value="incomplete">Incomplete</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <Button button={{text: "Reset", style: "edit"}} onClick={onReset}/>
            </div>
        )
}