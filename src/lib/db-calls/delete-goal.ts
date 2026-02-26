export async function deleteGoal(goalId: string) {
  const res = await fetch(`/api/goal/${goalId}/delete/`, { method: "DELETE" });
  if (!res.ok) throw new Error((await res.json()).error ?? "Failed to delete goal");
  return res.json();
}