// src/features/home/components/ConfirmedGuestsCarousel.tsx
import React from "react";
import type { User } from "../../../types";

interface Props {
  users: User[];
}

export const ConfirmedGuestsCarousel: React.FC<Props> = ({ users }) => {
  const doubled = [...users, ...users]; // loop continuo

  return (
    <div className="relative overflow-hidden h-10 mt-3 border-y border-white/10">
      {/* Fade laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-14 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-14 bg-gradient-to-l from-black to-transparent" />

      {/* Carrusel infinito */}
      <div
        className="flex gap-3 whitespace-nowrap animate-carousel"
        style={{ animationDuration: "20s" }}  // VELOCIDAD B
      >
        {doubled.map((u, i) => (
          <div
            key={i}
            className="px-3 py-1 text-sm rounded-full bg-cyan-900/40 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.25)] text-white"
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Animación */}
      <style>
        {`
        @keyframes carousel {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-carousel { animation: carousel linear infinite; }
      `}
      </style>
    </div>
  );
};
