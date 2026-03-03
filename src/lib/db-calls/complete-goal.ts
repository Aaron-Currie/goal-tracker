export async function completeGoal(goalId: string, action: "complete" | "undo") {
  const res = await fetch(`/api/goal/${goalId}/complete/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action }),
  });
  if (!res.ok) throw new Error((await res.json()).error || "Complete failed");
  return res.json();
}
