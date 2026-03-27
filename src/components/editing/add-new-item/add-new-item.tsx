import Input from "@/components/form/input-components/input/input";
import styles from "../pill-editing/pill-editor.module.css";
import IconButton from "@/components/button/icon-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
    label: string;
    newItem: string;
    setNewItem: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: () => void;
    validation?: string;
}

export default function AddNewItem({ label, newItem, setNewItem, handleAdd, validation }: Props) {
    return (
        <div className={styles.row}><Input label={`Add ${label}`} value={newItem} setState={setNewItem} error={validation} /><IconButton icon={faPlus} button={{ alt: "Add", style: "blue" }} onClick={handleAdd} cornerButton={false} /></div>
    )
}