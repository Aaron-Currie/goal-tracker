export async function completeGoal(goalId: string, action: "complete" | "undo") {
  try {
    const res = await fetch(`/api/goal/${goalId}/complete/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("Error response from server:", res.status, body);
      throw new Error("Failed to complete goal. Please try again.");
    } else {
      return body;
    }
  } catch (error:any) {
    console.error(error);
    throw new Error("An error occurred while completing the goal. Please try again.");
  }
}
