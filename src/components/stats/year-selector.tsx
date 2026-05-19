import Link from "next/link";
import styles from "./stats.module.css";

type Props = {
  years: number[];
  currentYear: string;
  currentFilter: string;
};

export default function YearSelector({ years, currentYear, currentFilter }: Props) {
  const isAllTime = currentYear === "all";

  return (
    <div className={styles.yearSelectorRow}>
      <Link
        href={`/stats?year=all&filter=${currentFilter}`}
        className={`${styles.yearPill} ${isAllTime ? styles.yearPillActive : ""}`}
      >
        All Time
      </Link>
      {years.map((year) => (
        <Link
          key={year}
          href={`/stats?year=${year}&filter=${currentFilter}`}
          className={`${styles.yearPill} ${String(year) === currentYear ? styles.yearPillActive : ""}`}
        >
          {year}
        </Link>
      ))}
    </div>
  );
}
