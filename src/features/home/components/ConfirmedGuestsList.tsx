// src/features/home/components/ConfirmedGuestsList.tsx
import React, { useState } from "react";
import type { User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  users: User[];
}

export const ConfirmedGuestsList: React.FC<Props> = ({ users }) => {
  const [showAll, setShowAll] = useState(false);

  if (users.length === 0) return null;

  const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
  const display = showAll ? sorted : sorted.slice(0, 6);

  return (
    <NeonCard className="mb-6 cursor-default">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">
          Invitados que ya entraron
        </h3>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-[11px] text-cyan-300 hover:text-white"
        >
          {showAll ? "Ver menos" : "Ver todos"}
        </button>
      </div>
      <ul className="flex flex-wrap gap-2 text-xs text-gray-200">
        {display.map((u) => (
          <li
            key={u.id}
            className="px-2 py-1 rounded-full bg-white/5 border border-white/10"
          >
            {u.name}
          </li>
        ))}
      </ul>
    </NeonCard>
  );
};
