export type Goal = {
  id: string;
  title: string;
  description?: string | null;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category_id: string | null;
  activity_id: string | null;
  created_at: string;
};

export type GoalFilters = {
  status: "all" | "completed" | "incomplete";
  categoryId: string | "all";
  activityId: string | "all";
  period: "all" | Goal["goal_period"];
  search: string;
  sort: "recent" | "title" | "period";
};