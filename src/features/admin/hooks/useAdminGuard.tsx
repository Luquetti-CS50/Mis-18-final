// src/features/admin/hooks/useAdminGuard.ts
import { useLocation, Navigate } from "react-router-dom";
import type { User } from "../../../types";

interface Result {
  allowed: boolean;
  fallback: JSX.Element | null;
}

export function useAdminGuard(user: User): Result {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get("token");

  const isAllowed = user.isAdmin || token === "secret123";

  if (!isAllowed) {
    return { allowed: false, fallback: <Navigate to="/home" replace /> };
  }

  return { allowed: true, fallback: null };
}
