// src/features/auth/components/LoginForm.tsx
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import type { User } from "../../../types";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loginWithUser } = useAuth();
  const users = useData(() => db.getUsers(), "users");
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [showList, setShowList] = useState(false);

  // Filtro con highlight visual NEÓN
  const suggestions = useMemo(() => {
    if (!name) return [];
    return users
      .filter((u) => u.name.toLowerCase().includes(name.toLowerCase()))
      .slice(0, 6);
  }, [name, users]);

  // CLICK EN UN NOMBRE → se rellena y se cierra el dropdown
  const selectSuggestion = (u: User) => {
    setName(u.name);
    setShowList(false);
    inputRef.current?.blur();
  };

  const handleSubmit = () => {
    const user = users.find(
      (u) => u.name.toLowerCase() === name.toLowerCase().trim()
    );

    if (!user) return alert("No encontré ese nombre en la lista 😅");

    loginWithUser(user);
    navigate("/home");
  };

  // Cerrar lista si se hace click afuera
  useEffect(() => {
    const clickOut = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("#login-autocomplete"))
        setShowList(false);
    };
    window.addEventListener("click", clickOut);
    return () => window.removeEventListener("click", clickOut);
  }, []);

  return (
    <div id="login-autocomplete" className="relative">
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setShowList(true);
        }}
        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 transition"
        placeholder="Tu nombre..."
        autoComplete="name"          // ← evita autofill de tarjetas/contraseñas
        name="username"
      />

      {/* AUTOCOMPLETADO */}
      {showList && suggestions.length > 0 && (
        <div className="absolute left-0 top-full w-full mt-1 bg-black/80 border border-white/10 rounded-lg shadow-xl overflow-hidden animate-fadeIn z-20">
          {suggestions.map((u) => {
            const i = u.name.toLowerCase().indexOf(name.toLowerCase());
            const before = u.name.slice(0, i);
            const match = u.name.slice(i, i + name.length);
            const after = u.name.slice(i + name.length);

            return (
              <button
                key={u.id}
                onClick={() => selectSuggestion(u)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-cyan-500/10 transition flex"
              >
                <span className="text-gray-200">{before}</span>
                <span className="text-cyan-300 font-semibold">{match}</span>
                <span className="text-gray-200">{after}</span>
              </button>
            );
          })}
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="mt-3 w-full bg-cyan-500/20 hover:bg-cyan-400/30 border border-cyan-400/50 text-cyan-200 font-semibold rounded-lg py-2 transition"
      >
        Entrar a la fiesta 🎉
      </button>
    </div>
  );
};
