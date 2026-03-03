"use client";

import { useState } from "react";
import styles from "./add-button.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Goal } from "@/lib/types/goals";

export default function AddButton({ onClick }: { onClick: () => void }) {

  return (
      <button className={styles.add} onClick={onClick}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
  );
}