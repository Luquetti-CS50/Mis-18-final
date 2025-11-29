// src/features/home/components/ConfirmedGuestsCarousel.tsx
import React from "react";
import type { User } from "../../../types";

interface Props {
  users: User[];
}

export const ConfirmedGuestsCarousel: React.FC<Props> = ({ users }) => {
  if (users.length === 0) return null;

  // Duplicamos para loop suave
  const doubled = [...users, ...users];

  return (
    <div className="relative overflow-hidden h-12 mt-2 border-y border-white/10 flex items-center">
      {/* Fades laterales */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black to-transparent" />

      {/* Cinta infinita */}
      <div
        className="flex gap-3 whitespace-nowrap animate-carousel"
        style={{
          animationDuration: "20s", // velocidad B
          minWidth: "200%",         // evita huecos al final
        }}
      >
        {doubled.map((u, i) => (
          <div
            key={`${u.id}-${i}`}
            className="px-4 py-1.5 text-sm rounded-full bg-cyan-900/40 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.25)] text-white flex items-center"
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* Animación CSS */}
      <style>
        {`
        @keyframes carousel {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-carousel {
          animation: carousel linear infinite;
        }
      `}
      </style>
    </div>
  );
};
