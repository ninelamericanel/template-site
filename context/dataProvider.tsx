"use client";
import { useEffect } from "react";
import { DataContext } from "./dataContext";

export function DataProvider({ children, value }) {
  useEffect(() => {
    console.log("CLIENT: DataProvider mounted", value);
  }, [value]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
