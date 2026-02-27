import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { title?: string; description?: string | null };

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  const body: Body = await req.json().catch(() => ({}));
  const title = typeof body.title === "string" ? body.title.trim() : undefined;
  const description =
    body.description === null ? null :
    typeof body.description === "string" ? body.description.trim() :
    undefined;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = { title };
  if (description !== undefined) updates.description = description;

  const { error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id, ...updates });
}