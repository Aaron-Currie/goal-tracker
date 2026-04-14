import styles from "./goal-details.module.css";
import { Goal, GoalNote } from "@/lib/types/goals";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";
import NoteDisplay from "../notes/notes-display/notes-display";
import CompleteButton from "../button/complete-button/complete-button";

type Props = {
  goalState: Goal;
  onComplete: () => void;
  notes: GoalNote[];
  setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
};

export default function GoalDetails({ goalState, onComplete, notes, setNoteState }: Props) {
  const date = translateDateToDisplay(goalState.goal_period, goalState.period_start);
  
  return (
      <div className={`${styles.panel}`}>
        <div className={styles.content}>
        <div className={styles.metaGrid}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Period:</span>
              <span className={styles.metaValue}>{goalState.goal_period.toUpperCase()}</span>
            </div>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>Date:</span>
              <span className={styles.metaValue}>{date}</span>
            </div>
        </div>
        {goalState.description && (
          <div className={styles.metaGrid}>
            <p>{goalState.description}</p>
          </div>
        )}
          <NoteDisplay notes={notes} setNoteState={setNoteState} goalId={goalState.id} />
          <CompleteButton completed={goalState.is_completed} onComplete={onComplete} />
        </div>
      </div>
  );
}