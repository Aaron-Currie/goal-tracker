import styles from "./button.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type IconButtonProps = {
    button: {
        alt: string;
        style: string;
    };
    onClick: () => void;
    icon: any;
    cornerButton?: boolean;
    disabled?: boolean;
}

export default function IconButton({button, onClick, icon, cornerButton=true, disabled=false}: IconButtonProps) {
    return (
        <button type='button' onClick={onClick} className={`${styles.iconButton} ${styles[button.style]} ${cornerButton ? styles.cornerButton : ""}`} aria-label={button.alt} disabled={disabled}>
            <FontAwesomeIcon icon={icon} />
        </button>
    );
}