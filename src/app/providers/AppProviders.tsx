// src/app/providers/AppProviders.tsx
import React, { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import { db } from "../../lib/db";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Sync inicial
    db.syncFromSupabase?.();

    // 🔁 Refresco cada 15 segundos
    const interval = setInterval(() => {
      db.syncFromSupabase?.();
    }, 10000); // 15000 ms = 15s

    return () => clearInterval(interval);
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
};
