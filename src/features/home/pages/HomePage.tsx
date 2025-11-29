// src/features/home/pages/HomePage.tsx
import React, { useMemo } from "react";
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

interface Props { user: User; }

export const HomePage: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const allUsers = useData(() => db.getUsers(), "users");
  const preferences = useData(() => db.getPreferences(), "prefs");
  const songs = useData(() => db.getSongs(), "songs");

  const myPrefs = useMemo(() => preferences.filter(p => p.userId === user.id), [preferences]);
  const mySongs = useMemo(() => songs.filter(s => s.suggestedByUserId === user.id), [songs]);

  const confirmedUsers = useMemo(() => allUsers.filter(u => u.hasLoggedIn), [allUsers]);

  const pendingTasks = useMemo(() => {
    const arr = [];
    if (!user.tableId) arr.push({ title:"Elegí tu mesa", link:"/tables" });
    if (!user.musicComment && !myPrefs.length && !mySongs.length)
      arr.push({ title:"Contanos qué música te gusta", link:"/music" });
    return arr;
  }, [user, myPrefs.length, mySongs.length]);

  return (
    <>
      <div className="flex justify-between items-start">
        <PageTitle title={`Hola, ${user.name.split(" ")[0]} 👋`} subtitle="Bienvenido al panel." />
        {user.isAdmin && (
          <button onClick={() => navigate("/admin?token=secret123")}
            className="p-2 rounded-full bg-white/5 border border-cyan-300 text-cyan-200 hover:scale-105 transition">
            <Shield size={18}/>
          </button>
        )}
      </div>

      <BirthdayCountdown />
      <ConfirmedGuestsCarousel users={confirmedUsers} />
      <div className="space-y-4 mt-4">
        <PendingTasks tasks={pendingTasks} />
        <MusicSummaryChart preferences={preferences} />
        <EventLocation />
      </div>
    </>
  );
};
