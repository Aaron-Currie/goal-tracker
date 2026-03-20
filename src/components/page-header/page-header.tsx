import { faCircleArrowLeft, faCircleXmark, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import stlyes from "./page-header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import IconButton from "../button/icon-button";

type Props = {
    title: string;
    returnUrl: string;
    editing: boolean;
    setEditing?: (editing: boolean) => void;
}

export default function PageHeader({ title, returnUrl, editing, setEditing }: Props) {
    return (
        <div className={stlyes.header}>
            {editing? <span className={stlyes.spacer}></span> : <Link href={returnUrl}><FontAwesomeIcon size='2x' icon={faCircleArrowLeft} /></Link>}
            <h1 className={stlyes.title}>{title}</h1>
            {setEditing ? <IconButton size={'2x'} icon={editing? faCircleXmark : faPenToSquare} button={{ alt: "Edit", style: "default" }} onClick={() => setEditing(!editing)} cornerButton={false} /> : <span className={stlyes.spacer}></span>}
        </div>
    )
}