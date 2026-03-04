export type Goal = {
  id: string;
  title: string;
  description?: string | null;
  is_completed: boolean;
  goal_period: "yearly" | "quarterly" | "monthly";
  period_start: string;
  category: Category[] | null;
  activity: Activity[] | null;
  created_at: string;
  completed_at: string | null;
};

export type GoalFilters = {
  status: "all" | "completed" | "incomplete";
  categoryId: string | "all";
  activityId: string | "all";
  sort: "recent" | "title" | "period";
};

export type Category = {
  id: string;
  name: string;
}

export type Activity = {
  id: string;
  name: string;
}