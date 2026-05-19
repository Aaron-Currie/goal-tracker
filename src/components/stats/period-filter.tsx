import Link from "next/link";
import styles from "./stats.module.css";

type Props = {
  currentFilter: string;
  currentYear: string;
};

const FILTERS = [
  { label: "ALL", value: "all" },
  { label: "YEARLY", value: "yearly" },
  { label: "QUARTERLY", value: "quarterly" },
  { label: "MONTHLY", value: "monthly" },
];

export default function PeriodFilter({ currentFilter, currentYear }: Props) {
  return (
    <div className={styles.filterTabs}>
      {FILTERS.map((f) => (
        <Link
          key={f.value}
          href={`/stats?year=${currentYear}&filter=${f.value}`}
          className={`${styles.filterTab} ${currentFilter === f.value ? styles.filterTabActive : ""}`}
        >
          {f.label}
        </Link>
      ))}
    </div>
  );
}
