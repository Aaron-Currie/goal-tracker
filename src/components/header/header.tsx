import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./header.module.css";

export default function Header({ year, period }: { year: string, period: string }) {
    return (
        <header className={styles.header}>
            <div className={styles.dates}>
                <div>
                    <h1>{period}</h1>
                </div>
                <div>
                    <h2>{year}</h2>
                </div>
            </div>
            <button className={styles.searchButton}>
                <FontAwesomeIcon size="2x" icon={faMagnifyingGlass} />
            </button>
        </header>
    );
}