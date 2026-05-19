import { TopItem } from "@/lib/utils/stats/compute-stats";
import styles from "./stats.module.css";

type Props = {
  topCategory: TopItem | null;
  topActivity: TopItem | null;
};

export default function TopCards({ topCategory, topActivity }: Props) {
  return (
    <div className={styles.topCards}>
      <div className={styles.topCard}>
        <span className={styles.topCardLabel}>Top Category</span>
        {topCategory ? (
          <>
            <span className={styles.topCardName}>{topCategory.name}</span>
            <span className={styles.topCardCount}>{topCategory.count} goals completed</span>
          </>
        ) : (
          <span className={styles.topCardEmpty}>No data yet</span>
        )}
      </div>
      <div className={styles.topCard}>
        <span className={styles.topCardLabel}>Top Activity</span>
        {topActivity ? (
          <>
            <span className={styles.topCardName}>{topActivity.name}</span>
            <span className={styles.topCardCount}>{topActivity.count} goals completed</span>
          </>
        ) : (
          <span className={styles.topCardEmpty}>No data yet</span>
        )}
      </div>
    </div>
  );
}
