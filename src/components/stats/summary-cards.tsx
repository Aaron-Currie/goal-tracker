import { SummaryStats } from "@/lib/utils/stats/compute-stats";
import styles from "./stats.module.css";

type Props = {
  stats: SummaryStats;
  showBreakdown: boolean;
};

export default function SummaryCards({ stats, showBreakdown }: Props) {
  return (
    <div className={styles.summaryCards}>
      <div className={`${styles.summaryCard} ${styles.summaryCardGreen}`}>
        <span className={styles.summaryCount}>{stats.completed}</span>
        <span className={styles.summaryLabel}>Completed</span>
        {showBreakdown && (
          <div className={styles.summaryBreakdown}>
            <div className={styles.breakdownRow}>
              <span>Yearly</span>
              <span>{stats.byPeriod.yearly.completed}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Quarterly</span>
              <span>{stats.byPeriod.quarterly.completed}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Monthly</span>
              <span>{stats.byPeriod.monthly.completed}</span>
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.summaryCard} ${styles.summaryCardBlue}`}>
        <span className={styles.summaryCount}>{stats.active}</span>
        <span className={styles.summaryLabel}>Active</span>
        {showBreakdown && (
          <div className={styles.summaryBreakdown}>
            <div className={styles.breakdownRow}>
              <span>Yearly</span>
              <span>{stats.byPeriod.yearly.active}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Quarterly</span>
              <span>{stats.byPeriod.quarterly.active}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Monthly</span>
              <span>{stats.byPeriod.monthly.active}</span>
            </div>
          </div>
        )}
      </div>

      <div className={`${styles.summaryCard} ${styles.summaryCardRed}`}>
        <span className={styles.summaryCount}>{stats.failed}</span>
        <span className={styles.summaryLabel}>Failed</span>
        {showBreakdown && (
          <div className={styles.summaryBreakdown}>
            <div className={styles.breakdownRow}>
              <span>Yearly</span>
              <span>{stats.byPeriod.yearly.failed}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Quarterly</span>
              <span>{stats.byPeriod.quarterly.failed}</span>
            </div>
            <div className={styles.breakdownRow}>
              <span>Monthly</span>
              <span>{stats.byPeriod.monthly.failed}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
