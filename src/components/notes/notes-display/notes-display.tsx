import { GoalNote } from "@/lib/types/goals";
import { useEffect, useState } from "react";
import styles from "./notes-display.module.css";
import Input from "@/components/form/input-components/input/input";
import IconButton from "@/components/button/icon-button";
import { faPenToSquare, faPlus, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import NotesModal from "../notes-modal/notes-modal";
import NoteEditor from "../notes-editor/note-editor";

type Props = {
    notes: GoalNote[];
    goalId: string;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteDisplay({ notes, goalId, setNoteState }: Props) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validation, setValidation] = useState<{[key: string]: string}>({});

    const [newNote, setNewNote] = useState("");
    const [expanded, setExpanded] = useState(false);

    const [editNote, setEditNote] = useState<GoalNote | null>(null);

    const handleAddNote = async () => {
        if (newNote.trim() === "") {
            setValidation({ ...validation, newNote: "This field is required" });
            return;
        }
        setLoading(true)
        await fetch(`/api/goal/${goalId}/notes/add`, {
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
        setLoading(false);
    }

    const handleEditNote = (id: string, content: string) => {
        if(content.trim() === "") {
            setValidation({ ...validation, editNote: "This field is required" });
            return;
        }
        fetch(`/api/note/${id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                setNoteState((prev) => prev.map((note) => note.id === id ? { ...note, content } : note));
                setEditNote(null);
            }
        });
    }

    const handleDelete = (id: string) => {
        fetch(`/api/note/${id}/delete`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.success) {
                setNoteState((prevNotes: GoalNote[]) => prevNotes.filter((note: GoalNote) => note.id !== id));
                setEditNote(null);
            }
        });
    }

    const expandModal = () => {
        setExpanded(prev => !prev);
        setValidation({ ...validation, newNote: "" })
    }

    useEffect(() => {
        if(newNote) {
            setValidation({ ...validation, newNote: "" });
        }
        if(editNote?.content) {
            setValidation({ ...validation, editNote: "" });
        }
    }, [newNote, editNote?.content])

    return (
        <div className={styles.notesContainer}>
            {/* <IconButton icon={faUpRightAndDownLeftFromCenter} button={{ alt: "Expand", style: "default" }} onClick={expandModal} cornerButton={true} /> */}
            <span className={styles.metaLabel}>Notes</span>
            <div className={styles.row}>
                <Input label={`Add note`} value={newNote} setState={setNewNote} error={validation.newNote} />
                <IconButton icon={faPlus} button={{ alt: "Add", style: "blueCircle" }} onClick={handleAddNote} cornerButton={false} />
            </div>
            {loading && <div className={styles.row} ><p>Loading...</p></div>}
            {notes.map((note, index) => {
                return (
                    <div key={index} className={styles.noteContent}>
                        <span className={styles.metaLabel}>{new Date(note.created_at).toLocaleString()}</span>
                        <div className={styles.noteRow}>
                            <p>{note.content}</p>
                        </div>
                        <IconButton icon={faPenToSquare} button={{ alt: "Expand", style: "default" }} onClick={() => setEditNote(note)} cornerButton={true} />
                    </div>
                )
            })}
            {editNote && <NoteEditor editNote={editNote} setEditNote={setEditNote} handleEditNote={handleEditNote} handleDelete={handleDelete} validation={validation} />}
            {expanded && <NotesModal validation={validation} notes={notes} newNote={newNote} handleDelete={handleDelete} setNewNote={setNewNote} handleAddNote={handleAddNote} closeModal={expandModal} />}
        </div>
    );
}