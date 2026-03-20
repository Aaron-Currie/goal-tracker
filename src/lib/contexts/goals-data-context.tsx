"use client";

import { createContext, useContext, ReactNode } from "react";
import { Activity, Category } from "../types/goals";

type GoalsDataContextValue = {
  categories: Category[];
  activities: Activity[];
};

const GoalsDataContext = createContext<GoalsDataContextValue | undefined>(
  undefined
);

type GoalsDataProviderProps = {
  children: ReactNode;
  categories: Category[];
  activities: Activity[];
};

export function GoalsDataProvider({
  children,
  categories,
  activities,
}: GoalsDataProviderProps) {
  return (
    <GoalsDataContext.Provider value={{ categories, activities }}>
      {children}
    </GoalsDataContext.Provider>
  );
}

export function useGoalsData() {
  const context = useContext(GoalsDataContext);

  if (!context) {
    throw new Error("useGoalsData must be used within a GoalsDataProvider");
  }

  return context;
}