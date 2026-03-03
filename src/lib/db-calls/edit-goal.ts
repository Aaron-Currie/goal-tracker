export async function editGoal(goalId: string, updates: { title: string; description: string }) {
  const res = await fetch(`/api/goal/${goalId}/edit`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error ?? "Failed to edit goal");
  }

  return res.json();
}