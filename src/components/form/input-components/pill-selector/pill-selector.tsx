import { Activity, Category } from "@/lib/types/goals";
import style from "./pill-selector.module.css";
import ClickablePill from "@/components/pill/clickable-pill";
import IconButton from "@/components/button/icon-button";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PillEditor from "@/components/editing/pill-editing/pill-editor";

export default function PillSelector({ group, label, setGroupState, selected, setState }: { group: Category[] | Activity[], label: string, setGroupState: React.Dispatch<React.SetStateAction<Category[] | Activity[]>>, selected: string | null, setState: React.Dispatch<React.SetStateAction<string | null>> }) {

    const onSelect = (item: Category | Activity) => {
        setState((prev) => prev === item.id ? null : item.id);
    }


    const [editing, setEditing] = useState(false);

    if(editing) {
        return <PillEditor group={group} label={label} setGroupState={setGroupState} setEditing={setEditing} />
    }
    return (
        <fieldset className={`${style.pillSelector} ${editing ? style.editing : ""}`}>
            <div>
                <span>{label}</span>
                <IconButton icon={faEllipsis} button={{ alt: "Help", style: "default" }} onClick={() => setEditing(true)} />
            </div>
            <div className={style.pillGroup}>
                {group.map((item) => { 
                    return (
                        <ClickablePill key={item.id} item={item} selected={selected === item.id} onSelect={onSelect} />
                    )
                })}
            </div>
        </fieldset>
    );
}