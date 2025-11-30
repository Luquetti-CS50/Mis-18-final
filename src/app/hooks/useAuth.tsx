// src/app/hooks/useAuth.ts
import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../../types";
import { db } from "../../lib/db";

interface AuthContextValue {
  currentUser: User | null;
  loginWithUser: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_KEY = "my18app_session";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  });

  // 🔹 Ahora el login actualiza también hasLoggedIn en la “DB”
  const loginWithUser = (user: User) => {
    // Marcamos hasLoggedIn en DB (si ya era true, no pasa nada)
    const updated = db.updateUser(user.id, { hasLoggedIn: true });

    const finalUser: User =
      updated ?? {
        ...user,
        hasLoggedIn: true,
      };

    setCurrentUser(finalUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(finalUser));
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  // Mantener currentUser en sync cuando cambian los usuarios en DB
  useEffect(() => {
    const handler = () => {
      if (!currentUser) return;
      const users = db.getUsers();
      const updated = users.find((u) => u.id === currentUser.id);
      if (updated) {
        setCurrentUser(updated);
        localStorage.setItem(SESSION_KEY, JSON.stringify(updated));
      }
    };
    window.addEventListener("db_update_users", handler);
    return () => window.removeEventListener("db_update_users", handler);
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, loginWithUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
