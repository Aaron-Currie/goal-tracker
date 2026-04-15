"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

export type GoalsDisplayMode = "grid" | "list";

type GoalsViewContextValue = {
  displayMode: GoalsDisplayMode;
  setDisplayMode: React.Dispatch<React.SetStateAction<GoalsDisplayMode>>;
  toggleDisplayMode: () => void;
};

const GoalsViewContext = createContext<GoalsViewContextValue | undefined>(
  undefined
);

type GoalsViewProviderProps = {
  children: ReactNode;
  initialDisplayMode?: GoalsDisplayMode;
};

export function GoalsViewProvider({
  children,
  initialDisplayMode = "list",
}: GoalsViewProviderProps) {
  const [displayMode, setDisplayMode] =
    useState<GoalsDisplayMode>(initialDisplayMode);

  const value = useMemo<GoalsViewContextValue>(
    () => ({
      displayMode,
      setDisplayMode,
      toggleDisplayMode: () => {
        setDisplayMode((prev) => (prev === "grid" ? "list" : "grid"));
      },
    }),
    [displayMode]
  );

  return (
    <GoalsViewContext.Provider value={value}>
      {children}
    </GoalsViewContext.Provider>
  );
}

export function useGoalsView() {
  const context = useContext(GoalsViewContext);

  if (!context) {
    throw new Error("useGoalsView must be used within a GoalsViewProvider");
  }

  return context;
}