// src/features/auth/pages/LoginPage.tsx
import React from "react";
import { useAuth } from "../../../app/hooks/useAuth";
import { LoginForm } from "../components/LoginForm";
import type { User } from "../../../types";

export const LoginPage: React.FC = () => {
  const { loginWithUser } = useAuth();

  const handleLoginSuccess = (user: User) => {
    loginWithUser(user);
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};
