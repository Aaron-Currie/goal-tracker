import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type GoalPeriod = "yearly" | "quarterly" | "monthly";

function isGoalPeriod(value: unknown): value is GoalPeriod {
  return value === "yearly" || value === "quarterly" || value === "monthly";
}

function isISODate(value: unknown): value is string {
  // Minimal check: YYYY-MM-DD
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

/**
 * GET /api/goals
 * Returns all goals for the logged-in user (RLS enforces per-user access)
 */
export async function GET() {
  const supabase = await supabaseServer();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("goals")
    .select(
      `
        id,
        title,
        goal_period,
        period_start,
        category_id,
        activity_id,
        is_completed,
        completed_at,
        created_at,
        description
      `
    )
    .order("period_start", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ goals: data });
}

/**
 * POST /api/goals
 * Creates a goal for the logged-in user.
 * - user_id comes from auth (never trust client to send it)
 * - category_id/activity_id are optional (can be null)
 */
export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const user = userRes.user;

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = String((body as any).title ?? "").trim();
  const goal_period = (body as any).goal_period;
  const period_start = (body as any).period_start;

  // optional
  const category_id = (body as any).category_id ?? null;
  const activity_id = (body as any).activity_id ?? null;
  const description = String((body as any).description ?? "").trim();

  if (!title) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }
  if (!isGoalPeriod(goal_period)) {
    return NextResponse.json(
      { error: "goal_period must be: yearly | quarterly | monthly" },
      { status: 400 }
    );
  }
  if (!isISODate(period_start)) {
    return NextResponse.json(
      { error: "period_start must be YYYY-MM-DD" },
      { status: 400 }
    );
  }

  // Normalize optional fields to null if empty string
  const normalizedCategoryId =
    typeof category_id === "string" && category_id.trim() === "" ? null : category_id;

  const normalizedActivityId =
    typeof activity_id === "string" && activity_id.trim() === "" ? null : activity_id;

  const { data, error } = await supabase
    .from("goals")
    .insert({
      user_id: user.id,
      title,
      goal_period,
      period_start,
      category_id: normalizedCategoryId,
      activity_id: normalizedActivityId,
      description: description || null,
    })
    .select(
      `
        id,
        title,
        goal_period,
        period_start,
        category_id,
        activity_id,
        is_completed,
        completed_at,
        created_at,
        description
      `
    )
    .single();

  if (error) {
    // If RLS rejects category/activity ownership, it will show up here.
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ goal: data }, { status: 201 });
}