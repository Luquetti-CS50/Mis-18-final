// src/features/auth/pages/LoginPage.tsx
import React from "react";
import { LoginForm } from "../components/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-slate-950 to-black px-5">
      <div className="w-full max-w-sm p-6 rounded-xl bg-black/30 border border-white/10 shadow-lg shadow-cyan-500/10">
        <h1 className="text-center text-2xl font-bold text-cyan-300 mb-2">
          🎉 Bienvenido/a 🎉
        </h1>
        <p className="text-center text-xs text-gray-400 mb-4">
          Ingresá tu nombre para entrar a la fiesta.
        </p>

        <LoginForm />
      </div>
    </div>
  );
};
