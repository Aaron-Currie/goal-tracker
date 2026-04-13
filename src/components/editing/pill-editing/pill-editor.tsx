import styles from "./pill-editor.module.css"
import Model from "@/components/model/model"
import { Overlay } from "@/components/utility-comps/overlay"
import { Activity, Category } from "@/lib/types/goals"
import { useEffect, useState } from "react"
import ItemEditor from "../item-editor/item-editor"
import AddNewItem from "../add-new-item/add-new-item"
import { addItem } from "@/lib/db-calls/item/add-item"
import ErrorModal from "@/components/error/error-modal/error-modal"

type PillEditingProps = {
    group: Category[] | Activity[],
    label: string,
    setEditing: React.Dispatch<React.SetStateAction<boolean>>
    setGroupState: React.Dispatch<React.SetStateAction<Category[] | Activity[]>>
}

export default function PillEditor({ group, label, setEditing, setGroupState }: PillEditingProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [validation, setValidation] = useState<{[key: string]: string}>({});

    const [newItem, setNewItem] = useState<string>("");
    
    const handleAdd = async () => {
        if(!newItem) {
            setValidation({ ...validation, newItem: "This field is required" });
            return;
        }
        setLoading(true);
        let item: Category | Activity;
        try {
            item = await addItem({ label, newItem });

        } catch (error: any) {
            setError(error.message);
            setLoading(false);
            return;
        }
        setNewItem("");
        setGroupState((prev) => [...prev, item]);
        setLoading(false);
    }

    useEffect(() => {
        if(newItem) {
            setValidation({ ...validation, newItem: "" });
        }
    }, [newItem])

    return (
        <Overlay onClick={() => setEditing(false)}>
            <Model onClose={() => setEditing(false)}>
                <div className={styles.container}>
                    {loading ? <p>Loading...</p> : <AddNewItem validation={validation.newItem} label={label} newItem={newItem} setNewItem={setNewItem} handleAdd={handleAdd} />}
                    {group.map((item) => {
                        return (
                            <ItemEditor key={item.id} item={item} label={label} setGroupState={setGroupState} />
                        )
                    })}
                </div>
                {error && <ErrorModal error={error} closeModal={() => setError(null)} />}
            </Model>
        </Overlay>
    )
}