"use client";

import styles from "./complete-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft} from "@fortawesome/free-solid-svg-icons";

export default function CompleteButton({ onComplete, completed }: { onComplete: () => void; completed: boolean }) {

  return (
      <button className={styles.add} onClick={onComplete}>
        <FontAwesomeIcon size={'2x'} icon={completed ? faRotateLeft : faCheck} />
      </button>
  );
}