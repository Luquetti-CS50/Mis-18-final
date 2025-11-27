// src/app/providers/AppProviders.tsx
import React from "react";
import { AuthProvider } from "../hooks/useAuth";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <AuthProvider>{children}</AuthProvider>;
};
