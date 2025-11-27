// src/features/auth/components/LoginForm.tsx
import React, { useState, useMemo, ChangeEvent, FormEvent } from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { normalizeName } from "../../../lib/db/normalize";
import type { User } from "../../../types";

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const users = useData(() => db.getUsers(), "users");

  const suggestions = useMemo(() => {
    if (!name.trim()) return [];
    const norm = normalizeName(name);
    return users
      .filter((u) => normalizeName(u.name).includes(norm))
      .map((u) => u.name)
      .slice(0, 5);
  }, [name, users]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const user = db.login(name);
    if (!user) {
      setError("Ups, no te encuentro en la lista de invitados 🧐");
      return;
    }
    onLoginSuccess(user);
  };

  const handleSuggestionClick = (value: string) => {
    setName(value);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-cyan-500 opacity-10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-500 opacity-10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-2">
            MIS 18
          </h1>
          <div className="h-1 w-24 bg-cyan-400 mx-auto rounded-full shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
        </div>

        <NeonCard className="p-6 cursor-default">
          <h2 className="text-xl font-semibold text-white mb-1">
            ¡Bienvenid@!
          </h2>
          <p className="text-sm text-cyan-100/80 mb-6">
            Escribí tu nombre para entrar a la fiesta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={handleChange}
                placeholder="Tu nombre completo..."
                className="w-full bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
              />
              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-black border border-gray-700 rounded-lg shadow-lg text-sm max-h-40 overflow-auto z-20">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleSuggestionClick(s)}
                      className="w-full text-left px-3 py-2 hover:bg-cyan-500/10 text-gray-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/40 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <NeonButton type="submit" fullWidth>
              Entrar a la fiesta 🎉
            </NeonButton>
          </form>
        </NeonCard>
      </div>
    </div>
  );
};
