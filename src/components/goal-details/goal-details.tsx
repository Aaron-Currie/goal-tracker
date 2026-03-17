import styles from "./goal-details.module.css";
import Button from "../button/button";
import IconButton from "../button/icon-button";
import { Goal } from "@/lib/types/goals";
import Link from "next/link";
import Pill from "../pill/pill";
import { faCircleArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import Input from "../form/input-components/input/input";
import translateDateToDisplay from "@/lib/utils/date-translator/date-translator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  goalState: Goal;
  onComplete: () => void;
  onDelete: () => void;
  startEdit: () => void;
};

export default function GoalDetails({ goalState, onComplete, onDelete, startEdit }: Props) {

  const date = translateDateToDisplay(goalState.goal_period, goalState.period_start);
  const [noteState, setNoteState] = useState<string[]>([]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    setNoteState((prev) => [...prev, `${newNote}`]);
  }

  return (
      <div className={`${styles.panel} ${goalState.is_completed ? styles.completed : ""}`}>
        <Link href={`/goals/${goalState.goal_period.toLowerCase()}/${goalState.period_start}`}><FontAwesomeIcon size='2x' icon={faCircleArrowLeft} /></Link>
        <div className={styles.content}>
        <div>
            <h3>{goalState.title}</h3>
        </div>

        <div className={styles.metaRow}>
            <Pill item={goalState.is_completed ? {id: "completed", name:"Completed"} : {id: "incomplete", name:"Incomplete"}} colour={goalState.is_completed ? "green" : "default"}/>
            <Pill item={goalState.category} />
            <Pill item={goalState.activity} />
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
        <div className={styles.metaGrid}>
          <span className={styles.metaLabel}>Notes</span>
          <div className={styles.row}><Input label={`Add note`} value={newNote} setState={setNewNote} /><IconButton icon={faPlus} button={{ alt: "Add", style: "blue" }} onClick={handleAddNote} cornerButton={false} /></div>
          {noteState.map((note, index) => {
            return <div key={index} className={styles.note}><span>{note}</span></div>;
          })}
        </div>
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
          <Button
            onClick={startEdit}
            button={{ text: "Edit", style: "edit" }}
          />
        </div>
      </div>
  );
}