import { PeriodBreakdownItem } from "@/lib/utils/stats/compute-stats";
import styles from "./stats.module.css";

type Props = {
  data: PeriodBreakdownItem[];
  filter: "monthly" | "quarterly" | "yearly" | "all";
};

export default function PeriodBreakdown({ data }: Props) {
  return (
    <div className={styles.periodBreakdownContainer}>
      <div className={styles.periodLegend}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.periodBlockCompleted}`} />
          Completed
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.periodBlockActive}`} />
          Active
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.periodBlockFailed}`} />
          Failed
        </span>
      </div>

      <div className={styles.periodBreakdownList}>
        {data.map((item) => (
          <div key={item.label} className={styles.periodRow}>
            <span className={styles.periodLabel}>{item.label}</span>
            <div className={styles.periodBlocks}>
              {Array.from({ length: item.completed }).map((_, i) => (
                <span
                  key={`c-${i}`}
                  className={`${styles.periodBlock} ${styles.periodBlockCompleted}`}
                  title="Completed"
                />
              ))}
              {Array.from({ length: item.active }).map((_, i) => (
                <span
                  key={`a-${i}`}
                  className={`${styles.periodBlock} ${styles.periodBlockActive}`}
                  title="Active"
                />
              ))}
              {Array.from({ length: item.failed }).map((_, i) => (
                <span
                  key={`f-${i}`}
                  className={`${styles.periodBlock} ${styles.periodBlockFailed}`}
                  title="Failed"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
