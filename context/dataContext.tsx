"use client";

import { createContext, useContext, useEffect } from "react";

export const DataContext = createContext(null);

export function useData() {
  return useContext(DataContext);
}
