import { ReactNode } from "react";
import { getAllCategoriesForUser } from "@/lib/db-calls/categories/get-all-categories-for-user";
import { getAllActivitiesForUser } from "@/lib/db-calls/activities/get-all-activities-for-user";
import { GoalsDataProvider } from "@/lib/contexts/goals-data-context";

type Props = {
  children: ReactNode;
};

export default async function GoalsLayout({ children }: Props) {
  const [categories, activities] = await Promise.all([
    getAllCategoriesForUser(),
    getAllActivitiesForUser(),
  ]);
  
  return (
    <GoalsDataProvider
      categories={categories ?? []}
      activities={activities ?? []}
    >
      {children}
    </GoalsDataProvider>
  );
}