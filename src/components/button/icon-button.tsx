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
    size?: "xs" | "sm" | "lg" | "2x" | "3x" | "4x" | "5x";
}

export default function IconButton({size, button, onClick, icon, cornerButton=true, disabled=false}: IconButtonProps) {
    return (
        <button type='button' onClick={onClick} className={`${styles.iconButton} ${styles[button.style]} ${cornerButton ? styles.cornerButton : ""}`} aria-label={button.alt} disabled={disabled}>
            <FontAwesomeIcon size={size} icon={icon} />
        </button>
    );
}