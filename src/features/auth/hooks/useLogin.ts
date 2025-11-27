// src/features/auth/hooks/useLogin.ts
import { useCallback, useState } from "react";
import type { User } from "../../../types";
import { db } from "../../../lib/db";

export function useLogin() {
  const [error, setError] = useState<string | null>(null);

  const loginByName = useCallback((name: string): User | null => {
    setError(null);
    const user = db.login(name);
    if (!user) {
      setError("Usuario no encontrado");
      return null;
    }
    return user;
  }, []);

  return { loginByName, error, setError };
}
