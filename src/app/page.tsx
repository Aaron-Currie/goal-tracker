import GoalDisplay from "@/layouts/goalDisplay";

const mockGoals = [
  { id: 1, name: "Complete CV", completed: false },
  { id: 2, name: "Dust House", completed: false },
  { id: 3, name: "Complete Duo 3.21", completed: true },
  { id: 4, name: "Go see Mum", completed: true },
  { id: 5, name: "Ride 30k", completed: false },
  { id: 6, name: "Hover House", completed: true },
  { id: 7, name: "Rewrite Gym Routines", completed: true },
  { id: 8, name: "Hike a Peak", completed: true },
  { id: 9, name: "Gym 20 times", completed: false },
  { id: 10, name: "Bench 85kg x 3", completed: false },
  { id: 11, name: "Complete 15days of Yoga", completed: false },
];

export default function HomePage() {

  return (
    <main>
      <GoalDisplay goals={mockGoals}/>
    </main>
  );
}