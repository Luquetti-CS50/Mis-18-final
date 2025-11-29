// src/features/home/components/ConfirmedGuestsCarousel.tsx
import React from "react";
import type { User } from "../../../types";

interface Props {
  users: User[];
}

export const ConfirmedGuestsCarousel: React.FC<Props> = ({ users }) => {
  if (users.length === 0) return null;

  // Orden aleatorio SOLO para el carrusel (no afecta la lista completa)
  const shuffled = React.useMemo(() => {
    const copy = [...users];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [users]);

  const chips = shuffled.map((u) => (
    <div
      key={u.id}
      className="px-4 py-1.5 text-sm rounded-full bg-cyan-900/40 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.25)] text-white flex items-center"
    >
      {u.name}
    </div>
  ));

  return (
    <div className="relative overflow-hidden h-12 mt-2 border-y border-white/10 flex items-center pl-10">
      {/* Fades laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-transparent" />

      {/* Wrapper con dos tracks idénticos para loop continuo */}
      <div
        className="flex animate-carousel"
        style={{ animationDuration: "20s", width: "200%" }}
      >
        <div className="flex gap-3 w-1/2">{chips}</div>
        <div className="flex gap-3 w-1/2" aria-hidden="true">
          {chips}
        </div>
      </div>

      <style>
        {`
        @keyframes carousel {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-carousel {
          animation: carousel linear infinite;
        }
      `}
      </style>
    </div>
  );
};
