import { GoalNote } from "@/lib/types/goals";
import { useState } from "react";
import styles from "./notes-display.module.css";
import Input from "@/components/form/input-components/input/input";
import IconButton from "@/components/button/icon-button";
import { faPlus, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import NotesModal from "../notes-modal/notes-modal";

type Props = {
    notes: GoalNote[];
    goalId: string;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteDisplay({ notes, goalId, setNoteState }: Props) {

    const [newNote, setNewNote] = useState("");
    const [expanded, setExpanded] = useState(false);

    const handleAddNote = () => {
        if (newNote.trim() === "") return;
        
        fetch(`/api/goal/${goalId}/notes/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.note) {
                setNoteState((prev) => [data.note, ...prev]);
            }
        });
        setNewNote("");
    }

  return (
    <div className={styles.notesContainer}>
          <IconButton icon={faUpRightAndDownLeftFromCenter} button={{ alt: "Expand", style: "default" }} onClick={() => setExpanded(!expanded)} cornerButton={true} />
          <span className={styles.metaLabel}>Notes</span>
          <div className={styles.row}><Input label={`Add note`} value={newNote} setState={setNewNote} /><IconButton icon={faPlus} button={{ alt: "Add", style: "blueCircle" }} onClick={handleAddNote} cornerButton={false} /></div>
          {notes.map((note, index) => {
                return <div key={index} className={styles.note}><span>{note.content}</span></div>;
          })}
          {expanded && <NotesModal notes={notes} setNoteState={setNoteState} newNote={newNote} setNewNote={setNewNote} handleAddNote={handleAddNote} closeModal={() => setExpanded(false)} />}
    </div>
  );
}