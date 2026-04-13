import styles from "./button.module.css"

type Props = {
    button: {
        text: string;
        style: "default" | "black" | "red" | "blue" | "white" | "blueCircle" | "blackCircle" | "redCircle" | "complete" | "edit" | "delete" | "undo";
    }
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({disabled = false, button, onClick}: Props) {
    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${styles[button.style]}`}
            onClick={onClick}
            >
            {button.text}
        </button>
    )
}