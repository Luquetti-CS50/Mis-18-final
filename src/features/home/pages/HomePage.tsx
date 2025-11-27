// src/features/home/pages/HomePage.tsx
import React, { useMemo } from "react";
import type { User } from "../../../types";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { PageTitle } from "../../../components/ui/PageTitle";
import { NeonCard } from "../../../components/ui/NeonCard";
import { BirthdayCountdown } from "../components/BirthdayCountdown";
import { PendingTasks } from "../components/PendingTasks";
import { ConfirmedGuestsList } from "../components/ConfirmedGuestsList";
import { MusicSummaryChart } from "../components/MusicSummaryChart";
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
  const confirmedUsers = useMemo(
    () => allUsers.filter((u) => u.hasLoggedIn),
    [allUsers]
  );

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
    // mismo concepto que antes: admin con token
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

      <div className="mt-6 space-y-4">
        <NeonCard className="cursor-default">
          <p className="text-sm text-gray-200 mb-2">
            Invitados confirmados:
          </p>
          <p className="text-3xl font-bold text-cyan-400">
            {confirmedUsers.length}
            <span className="text-sm text-gray-400 ml-2">
              / {allUsers.length}
            </span>
          </p>
        </NeonCard>

        <PendingTasks tasks={pendingTasks} />
        <MusicSummaryChart preferences={preferences} />
        <ConfirmedGuestsList users={confirmedUsers} />
      </div>
    </>
  );
};
