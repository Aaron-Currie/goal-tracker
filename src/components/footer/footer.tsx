import Link from "next/link";
import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <footer className={styles.footer}>
          <Link href="/goals/yearly/2026">
            <FontAwesomeIcon size="2x" icon={faBullseye} />
          </Link>
          <form action="/auth/signout" method="post">
            <button type="submit">Sign out</button>
          </form>
        </footer>
    )
}