import style from "./model.module.css"

import IconButton from "../button/icon-button";
import { Overlay } from "../utility-comps/overlay";

import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
    onClose: () => void;
    children?: React.ReactNode;
}

export default function Model({ onClose, children }: Props) {

    return (
        <Overlay onClick={onClose}>
            <div className={style.modelContainer}>
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