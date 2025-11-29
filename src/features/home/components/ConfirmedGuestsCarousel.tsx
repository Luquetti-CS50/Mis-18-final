// src/features/home/components/ConfirmedGuestsCarousel.tsx
import React from "react";
import type { User } from "../../../types";

interface Props {
  users: User[];
}

export const ConfirmedGuestsCarousel: React.FC<Props> = ({ users }) => {
  const [visibleUsers, setVisibleUsers] = React.useState<User[]>([]);
  const [fadeKey, setFadeKey] = React.useState(0);

  // función para elegir hasta 8 usuarios al azar
  const pickRandomUsers = React.useCallback(
    (source: User[]) => {
      if (!source || source.length === 0) {
        setVisibleUsers([]);
        return;
      }

      if (source.length <= 8) {
        setVisibleUsers(source);
        setFadeKey((k) => k + 1);
        return;
      }

      const copy = [...source];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      setVisibleUsers(copy.slice(0, 8));
      setFadeKey((k) => k + 1);
    },
    []
  );

  React.useEffect(() => {
    if (!users || users.length === 0) {
      setVisibleUsers([]);
      return;
    }

    // primera selección
    pickRandomUsers(users);

    // refresco cada 20 segundos
    const id = window.setInterval(() => {
      pickRandomUsers(users);
    }, 20000);

    return () => window.clearInterval(id);
  }, [users, pickRandomUsers]);

  if (visibleUsers.length === 0) return null;

  return (
    <>
      <div key={fadeKey} className="mt-3 animate-fade-users">
        <div className="flex flex-wrap gap-2">
          {visibleUsers.map((u) => (
            <div
              key={u.id}
              className="px-4 py-1.5 text-sm rounded-full bg-cyan-900/40 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.25)] text-white"
            >
              {u.name}
            </div>
          ))}
        </div>
        <p className="mt-1 text-[11px] text-gray-400">
          Mostrando hasta 8 invitados confirmados al azar. Tocá{" "}
          <span className="text-cyan-300 font-semibold">“Ver lista completa”</span> para ver
          todos.
        </p>
      </div>

      <style>
        {`
        @keyframes fadeUsers {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-users {
          animation: fadeUsers 0.5s ease-in-out;
        }
      `}
      </style>
    </>
  );
};
