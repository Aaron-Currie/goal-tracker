import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

type Body = { name: string };

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const body: Body = await req.json().catch(() => ({}));
    const name = typeof body.name === "string" ? body.name.trim() : undefined;

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const updates: Record<string, any> = { name };

  const { error } = await supabase
    .from("activities")
    .update(updates)
    .eq("id", id)
    .eq("user_id", auth.user.id)
    .limit(1);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, id, ...updates });
}