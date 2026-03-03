import { getAllGoalsForUser } from "@/lib/db-calls/get-all-goals-for-user";

export default async function HomePage() {
  const goals = await getAllGoalsForUser();
  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
}