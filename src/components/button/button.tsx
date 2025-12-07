import styles from "./button.module.css"

export default function button({button, onClick}: {button: {text: string, style: string}, onClick: () => void}) {
    return (
        <button 
            className={`${styles.button} ${styles[button.style]}`}
            onClick={onClick}
            >
            {button.text}
        </button>
    )
}