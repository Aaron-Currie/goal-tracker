import styles from "./button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function IconButton({button, onClick, icon, cornerButton=true}: {button: {alt: string, style: string}, onClick: () => void, icon: any, cornerButton?: boolean}) {
    return (
        <button type='button' onClick={onClick} className={`${styles.iconButton} ${styles[button.style]} ${cornerButton ? styles.cornerButton : ""}`} aria-label={button.alt}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}