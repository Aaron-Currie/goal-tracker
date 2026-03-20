import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { 
  title?: string; 
  description?: string | null;
  category_id?: string;
  activity_id?: string;
  goal_period?: string;
  period_start?: string;
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const body: Body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  const description =
    body.description === null ? null :
    typeof body.description === "string" ? body.description.trim() :
    undefined;
  const category_id = typeof body.category_id === "string" ? body.category_id : undefined;
  const activity_id = typeof body.activity_id === "string" ? body.activity_id : undefined;
  const goal_period = typeof body.goal_period === "string" ? body.goal_period : undefined;
  const period_start = typeof body.period_start === "string" ? body.period_start : undefined;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = { title };
  if (description !== undefined) updates.description = description;
  if (category_id !== undefined) updates.category_id = category_id;
  if (activity_id !== undefined) updates.activity_id = activity_id;
  if (goal_period !== undefined) updates.goal_period = goal_period;
  if (period_start !== undefined) updates.period_start = period_start;

  const { error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id, ...updates });
}