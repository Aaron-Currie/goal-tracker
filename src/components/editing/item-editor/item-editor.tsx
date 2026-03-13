import { useEffect, useState } from 'react';
import styles from '../pill-editing/pill-editor.module.css'
import IconButton from "@/components/button/icon-button";
import Input from "@/components/form/input-components/input/input";
import { faFloppyDisk, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function ItemEditor({item, label, setGroupState}: {item: {id: string, name: string}, label: string, setGroupState: React.Dispatch<React.SetStateAction<any[]>>}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [edited, setEdited] = useState(false);
    const [itemState, setItemState] = useState<string>(item.name);

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/${label.toLowerCase()}/${id}/delete`, {
            method: "DELETE",
        });
        const body = await res.json().catch(() => ({}));
        console.log(body);
        if (!res.ok) {
            setLoading(false);
            setError(body?.error ?? "Failed to delete");
            return;
        }
        setGroupState((prev) => prev.filter((item) => item.id !== id));
    }

    const handleEdit = async (id: string) => {
        if (!edited) return;
        setLoading(true);
        const res = await fetch(`/api/${label.toLowerCase()}/${id}/edit`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: itemState,
            }),
        });
        const body = await res.json().catch(() => ({}));
        console.log(body);
        if (!res.ok) {
            setLoading(false);
            setError(body?.error ?? "Failed to edit");
            return;
        }
        setGroupState((prev) => prev.map((i) => i.id === id ? { ...i, name: body.name } : i));
        setEdited(false);
        setLoading(false);
    }

    useEffect(() => {
        setEdited(itemState !== item.name);
    }, [itemState])

    return (
        <div className={styles.row} key={item.id}>
            <Input value={itemState} label={item.name} setState={setItemState} />
            <IconButton icon={faFloppyDisk} disabled={!edited} button={{ alt: "Edit", style: "blue" }} onClick={() => handleEdit(item.id)} cornerButton={false} />
            <IconButton icon={faTrashCan} button={{ alt: "Edit", style: "red" }} onClick={() => handleDelete(item.id)} cornerButton={false} />
        </div>
    );
}