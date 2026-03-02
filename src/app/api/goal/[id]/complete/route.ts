import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { action?: "complete" | "undo"; is_completed?: boolean };

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body: Body = await req.json().catch(() => ({} as Body));

  const isCompleted =
    typeof body.is_completed === "boolean"
      ? body.is_completed
      : body.action === "complete"
      ? true
      : body.action === "undo"
      ? false
      : undefined;

  if (isCompleted === undefined) {
    return NextResponse.json({ error: "Provide action: 'complete' | 'undo' or is_completed: boolean" }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = {
    is_completed: isCompleted,
    completed_at: isCompleted ? new Date().toISOString() : null,
  };

  const { error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id, is_completed: isCompleted });
}