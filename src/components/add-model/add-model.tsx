import { Activity, Category } from "@/lib/types/goals";
import Button from "../button/button";
import { Overlay } from "../utility-comps/overlay";
import style from "./add-model.module.css"
import ClickablePill from "../pill/clickable-pill";

type Props = {
    onClose: () => void;
    categories: Category[];
    activities: Activity[];
}

export default function AddModel({ onClose, categories, activities }: Props) {

    const periodFor = (type: "Yearly" | "Quarterly" | "Monthly") => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 1–12

    switch (type) {
        case "Yearly":
        return `${year}`;

        case "Monthly":
        return `${year}-${String(month).padStart(2, "0")}`;

        case "Quarterly":
        const quarter = Math.ceil(month / 3);
        return `${year}-Q${quarter}`;

        default:
        throw new Error("Invalid period type");
    }
    };

    return (
        <Overlay onClick={onClose}>
            <div className={style.modelContainer}>
                <div className={style.form}>
                    <div className={style.formRow}>
                        <label htmlFor="goalName">Goal Name</label>
                        <input id="goalName" type="text" placeholder="My Goal" />
                    </div>
                    <div className={style.formRow}>
                        <label htmlFor="type">Type:</label>
                        <select 
                            name="type"
                            id="type"
                        >
                            <option value="Yearly">Yearly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div>
                    <div className={style.formRow}>
                        <label htmlFor="period">Period:</label>
                        <select 
                            name="period"
                            id="period"
                        >
                            <option value={periodFor("Yearly")}>{periodFor("Yearly")}</option>
                        </select>
                    </div>
                    <div className={style.formRow}>
                        <label htmlFor="category">Category:</label>
                        {categories.map((c) => <ClickablePill  item={c} />)}
                    </div>
                    <div className={style.formRow}>
                        <label htmlFor="activity">Activity:</label>
                            {activities.map((a) => <ClickablePill item={a} />)}
                    </div>
                </div>
                <Button onClick={() => {}} button={{ text: 'Save', style: "edit" }} />
            </div>
        </Overlay>
    )
}