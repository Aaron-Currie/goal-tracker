import Button from "@/components/button/button";
import Model from "@/components/model/model";
import { Overlay } from "@/components/utility-comps/overlay";
import styles from "../notes.module.css";
import { GoalNote } from "@/lib/types/goals";
import { useEffect, useState } from "react";
import { editNote } from "@/lib/db-calls/notes/edit-note";

type Props = {
    editingNote: GoalNote;
    setEditNote: (note: GoalNote | null) => void;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setNoteState: React.Dispatch<React.SetStateAction<GoalNote[]>>;
}

export default function NoteEditor({ editingNote, setEditNote, setError, setNoteState }: Props) {
    const [validation, setValidation] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);

    const handleEditNote = async (id: string, content: string) => {
        if(content.trim() === "") {
            setValidation({ ...validation, editingNote: "This field is required" });
            return;
        }
        setLoading(true);
        setError(null);
        let updatedNote: GoalNote;
        try {
            updatedNote = await editNote({ id, content });
        } catch (error:any) {
            setLoading(false);
            setError(error.message);
            return;
        }
        setNoteState((prev) => prev.map((note) => note.id === id ? updatedNote : note));
        setEditNote(null);
        setLoading(false);
    }

    const handleDelete = async (id: string) => {
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

    useEffect(() => {
        if(editingNote?.content) {
            setValidation({ ...validation, editingNote: "" });
        }
    }, [editingNote?.content])

    return (
        <Overlay onClick={() => setEditNote(null)}>
            <Model onClose={() => setEditNote(null)}>
                <div className={`${styles.editNoteContainer}`} onClick={(e) => e.stopPropagation()}>                       
                    <textarea className={`${styles.textarea} ${validation.editNote ? styles.error : ""}`} value={editingNote.content} onChange={(e) => setEditNote({ ...editingNote, content: e.target.value })} />
                        {validation.editNote && <p className={styles.error}>{validation.editNote}</p>}
                    <Button button={{ text: "Update", style: "edit" }} onClick={() => handleEditNote(editingNote.id, editingNote.content)} />
                    <Button button={{ text: "Delete Note", style: "delete" }} onClick={() => handleDelete(editingNote.id)} />
                </div>
            </Model>
        </Overlay>
    )
}