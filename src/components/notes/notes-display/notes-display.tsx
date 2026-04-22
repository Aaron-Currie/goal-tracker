import { GoalNote } from "@/lib/types/goals";
import { useState } from "react";
import styles from "../notes.module.css";
import NoteEditor from "../note-editor/note-editor";
import AddNewNote from "../add-new-note/add-new-note";
import ErrorModal from "@/components/error/error-modal/error-modal";
import Note from "../note/note";

type Props = {
    notes: GoalNote[];
    goalId: string;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteDisplay({ notes, goalId, setNoteState }: Props) { 
    const [error, setError] = useState<string | null>(null);
    const [editNote, setEditNote] = useState<GoalNote | null>(null);
    const [viewAll, setViewAll] = useState<boolean>(false);

    return (
        <div className={styles.notesContainer}>
            <span className={styles.metaLabel}>Notes</span>
            <AddNewNote goalId={goalId} setNoteState={setNoteState} setError={setError} />
            {notes.slice(0, viewAll ? notes.length : 2).map((note, index) => {
                return <Note key={index} note={note} setEditNote={setEditNote} />
            })}
            {notes.length > 2 && <button onClick={() => setViewAll(!viewAll)} className={styles.noNotes}>{viewAll ? 'View less notes' : 'View all notes'} {'>'}</button>}
            {editNote && <NoteEditor editingNote={editNote} setEditNote={setEditNote} setError={setError} setNoteState={setNoteState} />}
            {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
        </div>
    );
}