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

    const name = String((body as any).name ?? "").trim();
    if (!name) {
        return new Response(JSON.stringify({ error: "Name is required" }), { status: 400 });
    }

    const { data, error } = await supabase
        .from("categories")
        .insert({ name, user_id: user.id })
        .select("*")
        .single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }

    return new Response(JSON.stringify({ category: data }), { status: 201 });
}