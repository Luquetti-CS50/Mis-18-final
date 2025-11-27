// src/features/admin/components/AdminStatsCards.tsx
import React from "react";
import type { User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  users: User[];
}

export const AdminStatsCards: React.FC<Props> = ({ users }) => {
  const confirmed = users.filter((u) => u.hasLoggedIn).length;
  const music = users.filter((u) => u.musicComment).length;
  const tables = users.filter((u) => u.tableId).length;
  const total = users.length;

  const stats = [
    { label: "Confirmados", value: confirmed, detail: `${confirmed}/${total}` },
    { label: "Con comentario musical", value: music },
    { label: "Con mesa elegida", value: tables },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 mb-4">
      {stats.map((s) => (
        <NeonCard key={s.label} className="cursor-default">
          <p className="text-xs text-gray-400 mb-1">{s.label}</p>
          <p className="text-2xl font-bold text-cyan-400">
            {s.value}
            {s.detail && (
              <span className="text-xs text-gray-400 ml-2">
                ({s.detail})
              </span>
            )}
          </p>
        </NeonCard>
      ))}
    </div>
  );
};
