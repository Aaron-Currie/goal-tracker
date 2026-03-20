import Link from "next/link";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faEllipsis, faMountain, faUser } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return (
        <footer className={styles.footer}>
          <Link href={`/goals/yearly/${currentYear}-0${currentMonth + 1}-01`}>
            <FontAwesomeIcon color='#2c60fc' size="2x" icon={faMountain} />
          </Link>
          <Link href={`/stats`}>
            <FontAwesomeIcon color='#1b2a89'size="2x" icon={faChartSimple} />
          </Link>
          <span style={{ width: "120px" }}></span>
          <Link href={`/goals/yearly/${currentYear}-0${currentMonth + 1}-01`}>
            <FontAwesomeIcon color='#1b2a89' size="2x" icon={faEllipsis} />
          </Link>
          <Link href={`/profile`}>
            <FontAwesomeIcon color='#1b2a89' size="2x" icon={faUser} />
          </Link>
        </footer>
    )
}