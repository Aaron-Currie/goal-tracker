import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import ScrollableLinks from "./scrollable-selector/scrollable-selector";

export default function Header({ year, period, date }: { year: string, period: string, date: string }) {
    return (
        <header className={styles.header}>
            <div className={styles.dates}>
                <ScrollableLinks year={Number(year)} period={period as "yearly" | "quarterly" | "monthly"} date={date} />
            </div>
            <button className={styles.searchButton}>
                <FontAwesomeIcon size="2x" icon={faMagnifyingGlass} />
            </button>
        </header>
    );
}