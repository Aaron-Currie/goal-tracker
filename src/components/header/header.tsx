import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";
import ScrollableLinks from "./scrollable-selector/scrollable-selector";

export default function Header({ year, period }: { year: string, period: string }) {

    const yearNumber = year.split("-")[0];
    const date = year.split("-")[1];

    return (
        <header className={styles.header}>
            <div className={styles.dates}>
                <ScrollableLinks year={Number(yearNumber)} date={date} period={period as "yearly" | "quarterly" | "monthly"}/>
            </div>
            {/* <button className={styles.searchButton}>
                <FontAwesomeIcon size="2x" icon={faMagnifyingGlass} />
            </button> */}
        </header>
    );
}