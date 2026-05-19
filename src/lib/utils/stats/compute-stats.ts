import { supabaseServer } from "@/lib/supabase/server";

export type SummaryStats = {
  completed: number;
  active: number;
  failed: number;
  byPeriod: {
    yearly: { completed: number; active: number; failed: number };
    quarterly: { completed: number; active: number; failed: number };
    monthly: { completed: number; active: number; failed: number };
  };
};

export type MonthlyEvent = { month: string; completed: number; failed: number };
export type TopItem = { name: string; count: number };
export type BreakdownItem = { name: string; completed: number; active: number; failed: number };
export type PeriodBreakdownItem = { label: string; completed: number; active: number; failed: number };

// ── Real RPC callers ────────────────────────────────────────────

type StatsRpcResult = {
  summary: SummaryStats | null;
  monthly_events: MonthlyEvent[] | null;
  top_category: TopItem | null;
  top_activity: TopItem | null;
  category_breakdown: BreakdownItem[] | null;
  activity_breakdown: BreakdownItem[] | null;
  period_breakdown: PeriodBreakdownItem[] | null;
};

export async function getAvailableYears(): Promise<number[]> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("get_available_years");
  if (error) throw new Error(error.message);
  return (data as number[]) ?? [];
}

export async function getAllStats(year: string, filter: string): Promise<StatsRpcResult> {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.rpc("get_stats", {
    year_filter: year,
    period_filter: filter,
  });
  if (error) throw new Error(error.message);
  return data as StatsRpcResult;
}
