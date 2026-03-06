import { Activity, Category } from "@/lib/types/goals";
import style from "./pill-selector.module.css";
import ClickablePill from "@/components/pill/clickable-pill";
import IconButton from "@/components/button/icon-button";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function PillSelector({ group, label, setState }: { group: Category[] | Activity[], label: string, setState: React.Dispatch<React.SetStateAction<string | null>> }) {
    const [selected, setSelected] = useState<string | null>(null);

    const onSelect = (item: Category | Activity) => {
        setSelected((prev) => prev === item.id ? null : item.id);
        setState((prev) => prev === item.id ? null : item.id);
    }

    return (
        <fieldset className={style.pillSelector}>
            <div>
                <span>{label}</span>
                <IconButton icon={faEllipsis} button={{ alt: "Help", style: "default" }} onClick={() => {}} />
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