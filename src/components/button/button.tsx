import styles from "./button.module.css"

export default function Button({disabled = false, button, onClick}: {disabled?: boolean, button: {text: string, style: string}, onClick: () => void}) {
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