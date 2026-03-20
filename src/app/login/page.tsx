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
        <button onClick={signIn}>Sign in</button>
      </div>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
      <br />
      <p>Don't have an account? <a href="/signup">Sign up</a></p>
    </main>
  );
}