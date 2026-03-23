import Link from "next/link";
import style from "./period-selector.module.css";

export default function PeriodSelector({ period, date }: { period: string, date: string }) {
    const types = ["yearly", "quarterly", "monthly"];

    return (
            <div className={style.tabs}>
                {types.map((type) => (
                    <Link key={type} className={`${style.tabItem} ${type === period ? style.active : ""}`} href={`/goals/${type}/${date}`}>
                        <span>{type.toUpperCase()}</span>
                    </Link>
                ))}
            </div>
    )
}