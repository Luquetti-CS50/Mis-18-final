// src/features/home/pages/HomePage.tsx
import React, { useMemo, useState } from "react";
import type { User } from "../../../types";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { PageTitle } from "../../../components/ui/PageTitle";
import { BirthdayCountdown } from "../components/BirthdayCountdown";
import { PendingTasks } from "../components/PendingTasks";
import { MusicSummaryChart } from "../components/MusicSummaryChart";
import { ConfirmedGuestsCarousel } from "../components/ConfirmedGuestsCarousel";
import { EventLocation } from "../components/EventLocation";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

interface Props {
  user: User;
}

export const HomePage: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const allUsers = useData(() => db.getUsers(), "users");
  const preferences = useData(() => db.getPreferences(), "prefs");
  const songs = useData(() => db.getSongs(), "songs");

  const myPrefs = useMemo(
    () => preferences.filter((p) => p.userId === user.id),
    [preferences, user.id]
  );

  const mySongs = useMemo(
    () => songs.filter((s) => s.suggestedByUserId === user.id),
    [songs, user.id]
  );

  // Confirmados = usuarios que YA TIENEN MESA
  const confirmedUsers = useMemo(
    () => allUsers.filter((u) => u.tableId),
    [allUsers]
  );

  const [showAllConfirmed, setShowAllConfirmed] = useState(false);

  const pendingTasks = useMemo(() => {
    const tasks: {
      type: "music" | "table";
      title: string;
      description: string;
      link: string;
    }[] = [];

    if (!user.musicComment && myPrefs.length === 0 && mySongs.length === 0) {
      tasks.push({
        type: "music",
        title: "Contanos qué música te gusta",
        description: "Así armamos la playlist con tus gustos.",
        link: "/music",
      });
    }

    if (!user.tableId) {
      tasks.push({
        type: "table",
        title: "Elegí tu mesa",
        description:
          "Ubicate con tu grupo para que no haya quilombo el mismo día.",
        link: "/tables",
      });
    }

    return tasks;
  }, [user.musicComment, user.tableId, myPrefs.length, mySongs.length]);

  const handleOpenAdmin = () => {
    navigate("/admin?token=secret123");
  };

  const showAdminShield = user.isAdmin === true;

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <PageTitle
          title={`Hola, ${user.name.split(" ")[0]} 👋`}
          subtitle="Te doy la bienvenida al panel de la fiesta."
        />

        {showAdminShield && (
          <button
            type="button"
            onClick={handleOpenAdmin}
            className="mt-1 inline-flex items-center justify-center p-2 rounded-full bg-white/5 border border-cyan-400/60 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all"
            title="Abrir panel de administración"
          >
            <Shield size={18} />
          </button>
        )}
      </div>

      <BirthdayCountdown />

      {/* Sección de invitados confirmados */}
      <div className="mt-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-300">
            Invitados confirmados (tienen mesa):{" "}
            <span className="text-cyan-300 font-semibold">
              {confirmedUsers.length}
            </span>
          </p>

          <button
            type="button"
            onClick={() => setShowAllConfirmed((v) => !v)}
            className="text-[11px] px-2 py-[3px] rounded-md border border-cyan-400/60 text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 transition"
          >
            {showAllConfirmed ? "Ocultar lista" : "Ver lista completa"}
          </button>
        </div>

        <ConfirmedGuestsCarousel users={confirmedUsers} />

        {showAllConfirmed && confirmedUsers.length > 0 && (
          <div className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-xs text-gray-100 space-y-1">
            {confirmedUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-2 border-b border-white/5 last:border-b-0 pb-1 last:pb-0"
              >
              <span>{u.name}</span>
                {u.tableId && (
                  <span className="text-[10px] text-cyan-300">
                    Mesa: {u.tableId}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-4">
        <PendingTasks tasks={pendingTasks} />
        <MusicSummaryChart preferences={preferences} />
        <EventLocation />
      </div>
    </>
  );
};
