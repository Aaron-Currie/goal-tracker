import styles from "./model.module.css"

import IconButton from "../button/icon-button";
import { Overlay } from "../utility-comps/overlay";

import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onClose: () => void;
    children?: React.ReactNode;
    style?: string
}

export default function Model({ onClose, children, style }: Props) {

    return (
        <Overlay onClick={onClose}>
            <div className={`${styles.modelContainer} ${styles[style || "default"]}`}>
                <IconButton
                    icon={faX}
                    button={{ alt: "Close", style: "default" }}
                    onClick={onClose}
                />
                {children}
            </div>
        </Overlay>
    )
}