import styles from "./goal-details.module.css";
import { Goal, GoalNote } from "@/lib/types/goals";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";
import NoteDisplay from "../notes/notes-display/notes-display";
import CompleteButton from "../button/complete-button/complete-button";
import Button from "../button/button";
import { useState } from "react";
import Model from "../model/model";

type Props = {
  goalState: Goal;
  onComplete: ({action}: {action: "complete" | "active" | "fail"}) => void;
  notes: GoalNote[];
  setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
  openModel: boolean;
  setOpenModel: (openModel: boolean) => void;
  setEditing: (editing: boolean) => void;
};

export default function GoalDetails({ goalState, onComplete, notes, setNoteState, openModel, setOpenModel, setEditing }: Props) {
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
          {openModel &&
            <Model onClose={() => setOpenModel(false)} style="default" overlayClose={true}>
              <div className={styles.optionsContainer}>
                <Button button={{ text: 'Edit Goal', style: "edit" }} onClick={() => {setOpenModel(false); setEditing(true);}} />
                {goalState.status !== "active" && <Button button={{ text: `Undo ${goalState.status === "completed" ? "Complete" : "Fail"}`, style: goalState.status === "completed" ? "undoComplete" : "undoFail" }} onClick={() => {onComplete({ action: "active" }); setOpenModel(false);}} />}
                {goalState.status === "active" && <Button button={{ text: 'Mark as failed', style: "fail" }} onClick={() => {onComplete({ action: "fail" }); setOpenModel(false);}} />}
                {goalState.status === "active" && <Button button={{ text: 'Mark as completed', style: "complete" }} onClick={() => {onComplete({ action: "complete" }); setOpenModel(false);}} />}
              </div>
            </Model>
          }
          <CompleteButton active={goalState.status !== "active"} onComplete={onComplete} />
        </div>
      </div>
  );
}