import Button from "@/components/button/button";
import Model from "@/components/model/model";
import { Overlay } from "@/components/utility-comps/overlay";
import styles from "../notes-display/notes-display.module.css";
import { GoalNote } from "@/lib/types/goals";

type Props = {
    editNote: GoalNote;
    setEditNote: (note: GoalNote | null) => void;
    handleEditNote: (id: string, content: string) => void;
    handleDelete: (id: string) => void;
    validation: {[key: string]: string};
}

export default function NoteEditor({ editNote, setEditNote, handleEditNote, handleDelete, validation }: Props) {
    return (
        <Overlay onClick={() => setEditNote(null)}>
            <Model onClose={() => setEditNote(null)}>
                <div className={`${styles.editNoteContainer}`} onClick={(e) => e.stopPropagation()}>                       
                    <textarea className={`${styles.textarea} ${validation.editNote ? styles.error : ""}`} value={editNote.content} onChange={(e) => setEditNote({ ...editNote, content: e.target.value })} />
                        {validation.editNote && <p className={styles.error}>{validation.editNote}</p>}
                    <Button button={{ text: "Update", style: "edit" }} onClick={() => handleEditNote(editNote.id, editNote.content)} />
                    <Button button={{ text: "Delete Note", style: "delete" }} onClick={() => handleDelete(editNote.id)} />
                </div>
            </Model>
        </Overlay>
    )
}