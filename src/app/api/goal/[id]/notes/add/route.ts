import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
    const supabase = await supabaseServer();

    const { data: userRes, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userRes.user) {
        return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }
    const user = userRes.user;

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const goalId = req.url.split("/").slice(-3)[0];
    if (!goalId) {
        return new Response(JSON.stringify({ error: "Goal ID is required in URL" }), { status: 400 });
    }

    const content = String((body as any).content ?? "").trim();
    if (!content) {
        return new Response(JSON.stringify({ error: "Content is required" }), { status: 400 });
    }
    console.log("Adding note for goal with content:", content);
    console.log("User ID:", user.id);
    const { data, error } = await supabase
        .from("goal_notes")
        .insert({ content, user_id: user.id, goal_id: goalId })
        .select("*")
        .single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ note: data }), { status: 201 });
}