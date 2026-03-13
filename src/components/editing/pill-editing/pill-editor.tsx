import styles from "./pill-editor.module.css"
import IconButton from "@/components/button/icon-button"
import Input from "@/components/form/input-components/input/input"
import Model from "@/components/model/model"
import { Overlay } from "@/components/utility-comps/overlay"
import { Activity, Category } from "@/lib/types/goals"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import ItemEditor from "../item-editor/item-editor"

type PillEditingProps = {
    group: Category[] | Activity[],
    label: string,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    setGroupState: React.Dispatch<React.SetStateAction<Category[] | Activity[]>>
}

export default function PillEditor({ group, label, setEditing, setGroupState }: PillEditingProps) {
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
            const item = body.activity ?? body.category ?? body;
            console.log(body, 'body');
            setGroupState((prev) => [...prev, item]);
            setNewItem("");
            setLoading(false);
        }
    }

    return (
        <Overlay onClick={() => setEditing(false)}>
            <Model onClose={() => setEditing(false)}>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <div className={styles.row}><Input label={`Add ${label}`} value={newItem} setState={setNewItem} /><IconButton icon={faPlus} button={{ alt: "Add", style: "blue" }} onClick={handleAdd} cornerButton={false} /></div>
                    {group.map((item) => {
                        return (
                            <ItemEditor key={item.id} item={item} label={label} setGroupState={setGroupState} />
                        )
                    })}
                </div>
            </Model>
        </Overlay>
    )
}