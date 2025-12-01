// src/app/providers/AppProviders.tsx
import React, { useEffect, useState } from "react";
import { AuthProvider } from "../hooks/useAuth";
import { db } from "../../lib/db";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // 🔹 1) Sync inicial APENAS entra la app
    (async () => {
      try {
        await db.syncFromSupabase?.();
      } catch (err) {
        console.error("[AppProviders] Error en sync inicial", err);
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    })();

    // 🔹 2) Polling cada 10s para mantener todo actualizado
    const interval = setInterval(() => {
      db.syncFromSupabase?.();
    }, 10000); // 10 s

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (!isReady) {
    // 👉 Mientras hace la primera sync, podés mostrar un loader básico
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          color: "#fff",
          background: "radial-gradient(circle at top, #1f2937 0, #020617 60%)",
        }}
      >
        Cargando datos...
      </div>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
};
