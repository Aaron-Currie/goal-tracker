import styles from "./goal-details.module.css";
import Button from "../button/button";
import { Goal, GoalNote } from "@/lib/types/goals";
import Pill from "../pill/pill";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";
import NoteDisplay from "../notes/notes-display/notes-display";
import { useState } from "react";

type Props = {
  goalState: Goal;
  onComplete: () => void;
  onDelete: () => void;
  notes: GoalNote[];
  setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
};

export default function GoalDetails({ goalState, onComplete, onDelete, notes, setNoteState }: Props) {

  const date = translateDateToDisplay(goalState.goal_period, goalState.period_start);
  console.log("Rendering GoalDetails with notes:", notes);
  return (
      <div className={`${styles.panel} ${goalState.is_completed ? styles.completed : ""}`}>
        <div className={styles.content}>
        <div className={styles.metaRow}>
            <Pill item={goalState.is_completed ? {id: "completed", name:"Completed"} : {id: "incomplete", name:"Incomplete"}} colour={goalState.is_completed ? "green" : "default"}/>
            <Pill item={goalState.category} colour={goalState.is_completed ? "green" : "default"} />
            <Pill item={goalState.activity} colour={goalState.is_completed ? "green" : "default"} />
        </div>

        <div className={styles.metaGrid}>
            <div><span className={styles.metaLabel}>Period</span><span className={styles.metaValue}>{goalState.goal_period.toUpperCase()}</span></div>
            <div><span className={styles.metaLabel}>Date</span><span className={styles.metaValue}>{date}</span></div>
            {goalState.is_completed && <div><span className={styles.metaLabel}>Completed on</span><span className={styles.metaValue}>{new Date(goalState.completed_at!).toLocaleString()}</span></div>}
        </div>

        <div className={styles.metaGrid}>
          <span className={styles.metaLabel}>Description</span>
          <p>{goalState.description}</p>
        </div>
          <NoteDisplay notes={notes} setNoteState={setNoteState} goalId={goalState.id} />
        </div>

        <div className={styles.buttons}>
          <Button
            button={
              goalState.is_completed
                ? { text: "Undo Complete", style: "undo" }
                : { text: "Complete", style: "complete" }
            }
            onClick={onComplete}
          />
          <Button button={{ text: "Delete", style: "delete" }} onClick={onDelete} />
        </div>
      </div>
  );
}