// src/app/providers/AppProviders.tsx
import React, { useEffect } from "react";
import { AuthProvider } from "../hooks/useAuth";
import { db } from "../../lib/db";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Disparamos el sync inicial desde Supabase -> MockDB/localStorage
    // No esperamos nada porque la UI arranca con seeds/local y se actualiza cuando llegue.
    db.syncFromSupabase?.();
  }, []);

  return <AuthProvider>{children}</AuthProvider>;
};
