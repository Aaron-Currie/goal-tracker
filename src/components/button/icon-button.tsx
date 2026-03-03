import styles from "./button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function IconButton({button, onClick, icon}: {button: {alt: string, style: string}, onClick: () => void, icon: any}) {
    return (
        <button onClick={onClick} className={`${styles.iconButton} ${styles[button.style]}`}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}