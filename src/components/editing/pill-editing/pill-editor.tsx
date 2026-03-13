import styles from "./pill-editor.module.css"
import IconButton from "@/components/button/icon-button"
import Input from "@/components/form/input-components/input/input"
import Model from "@/components/model/model"
import { Overlay } from "@/components/utility-comps/overlay"
import { Activity, Category } from "@/lib/types/goals"
import { faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

type PillEditingProps = {
    group: Category[] | Activity[],
    label: string,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PillEditor({ group, label, setEditing }: PillEditingProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [newItem, setNewItem] = useState<string>("");
    
    const handleAdd = async () => {
        if (newItem) {
            const res = await fetch(`/api/${label.toLowerCase()}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newItem,
                }),
            });
            const body = await res.json().catch(() => ({}));
            console.log(body);
            if (!res.ok) {
                setLoading(false);
                setError(body?.error ?? "Failed to save");
                return;
            }
            setNewItem("");
            setLoading(false);
        }
    }

    useEffect(() => {
        
    }, [group])

    return (
        <Overlay onClick={() => setEditing(false)}>
            <Model onClose={() => setEditing(false)}>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <div className={styles.row}><Input label={`Add ${label}`} value={newItem} setState={setNewItem} /><IconButton icon={faPlus} button={{ alt: "Add", style: "blue" }} onClick={handleAdd} cornerButton={false} /></div>
                    {group.map((item) => {
                        return (
                            <div className={styles.row} key={item.id}><Input value={item.name} label={item.name} setState={() => {}} /><IconButton icon={faTrashCan} button={{ alt: "Edit", style: "red" }} onClick={() => {}} cornerButton={false} /></div>
                        )
                    })}
                </div>
            </Model>
        </Overlay>
    )
}