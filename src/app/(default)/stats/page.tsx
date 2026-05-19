import {
  getAvailableYears,
  getAllStats,
} from "@/lib/utils/stats/compute-stats";
import YearSelector from "@/components/stats/year-selector";
import PeriodFilter from "@/components/stats/period-filter";
import SummaryCards from "@/components/stats/summary-cards";
import GoalEventsChart from "@/components/stats/goal-events-chart";
import TopCards from "@/components/stats/top-cards";
import CategoryBreakdownChart from "@/components/stats/category-breakdown-chart";
import ActivityBreakdownChart from "@/components/stats/activity-breakdown-chart";
import PeriodBreakdown from "@/components/stats/period-breakdown";
import styles from "@/components/stats/stats.module.css";

type SearchParams = Promise<{ year?: string; filter?: string }>;

export default async function StatsPage({ searchParams }: { searchParams: SearchParams }) {
  const { year: yearParam, filter: filterParam } = await searchParams;

  const currentYear = new Date().getFullYear().toString();
  const year = yearParam ?? currentYear;
  const filter = filterParam ?? "all";

  const availableYears = await getAvailableYears();
  const stats = await getAllStats(year, filter);

  // For yearly/all filters build a per-year breakdown from parallel calls
  let yearlyPeriodBreakdown: import("@/lib/utils/stats/compute-stats").PeriodBreakdownItem[] = [];
  if (filter === "yearly" || filter === "all") {
    const yearsToFetch = year === "all" ? availableYears : [Number(year)];
    const perYearStats = await Promise.all(
      yearsToFetch.map((y) => getAllStats(String(y), "yearly"))
    );
    yearlyPeriodBreakdown = yearsToFetch.map((y, i) => ({
      label: String(y),
      completed: perYearStats[i].summary?.completed ?? 0,
      active: perYearStats[i].summary?.active ?? 0,
      failed: perYearStats[i].summary?.failed ?? 0,
    }));
  }

  const emptySummary = { completed: 0, active: 0, failed: 0, byPeriod: { yearly: { completed: 0, active: 0, failed: 0 }, quarterly: { completed: 0, active: 0, failed: 0 }, monthly: { completed: 0, active: 0, failed: 0 } } };
  const summaryStats = stats.summary ?? emptySummary;
  const monthlyEvents = stats.monthly_events ?? [];
  const topCategory = stats.top_category ?? null;
  const topActivity = stats.top_activity ?? null;
  const categoryBreakdown = stats.category_breakdown ?? [];
  const activityBreakdown = stats.activity_breakdown ?? [];

  const showPeriodBreakdown = filter === "yearly" || filter === "quarterly" || filter === "monthly";
  const periodBreakdown =
    filter === "yearly"
      ? yearlyPeriodBreakdown
      : stats.period_breakdown ?? [];

  return (
    <div className={styles.page}>
      <div className={styles.controlsHeader}>
        <PeriodFilter currentFilter={filter} currentYear={year} />
        <YearSelector years={availableYears} currentYear={year} currentFilter={filter} />
      </div>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>Goals Overview</p>
        <SummaryCards stats={summaryStats} showBreakdown={filter === "all"} />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>Monthly Activity</p>
        <div className={styles.chartCard}>
          <GoalEventsChart data={monthlyEvents} />
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>Top Performers</p>
        <TopCards topCategory={topCategory} topActivity={topActivity} />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>By Category</p>
        <div className={styles.chartCard}>
          <CategoryBreakdownChart data={categoryBreakdown} />
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>By Activity</p>
        <div className={styles.chartCard}>
          <ActivityBreakdownChart data={activityBreakdown} />
        </div>
      </section>

      {showPeriodBreakdown && (
        <section className={styles.section}>
          <p className={styles.sectionTitle}>
            {filter === "quarterly" ? "By Quarter" : filter === "monthly" ? "By Month" : "By Year"}
          </p>
          <PeriodBreakdown
            data={periodBreakdown}
            filter={filter as "monthly" | "quarterly" | "yearly" | "all"}
          />
        </section>
      )}
    </div>
  );
}