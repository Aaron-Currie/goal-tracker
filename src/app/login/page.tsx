"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = supabaseBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function signUp() {
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);

    // If email confirmation is OFF, you're signed in immediately.
    // If it's ON, user must confirm via email first.
    router.push("/");
  }

  async function signIn() {
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/");
  }
    return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", maxWidth: 400, margin: "auto" }}>
      <h1>Login</h1>
      <label>Email</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%" }}
      />

      <label style={{ display: "block", marginTop: 12 }}>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%" }}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button onClick={signUp}>Sign up</button>
        <button onClick={signIn}>Sign in</button>
      </div>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}