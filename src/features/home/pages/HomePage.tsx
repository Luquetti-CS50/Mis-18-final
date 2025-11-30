// src/features/home/pages/HomePage.tsx
import React, { useMemo, useState } from "react";
import type { User, Table } from "../../../types";
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
  const tables = useData(() => db.getTables(), "tables");

  // Usuario fresco desde DB (por si cambió mesa/estado en otra vista)
  const currentUser = useMemo(() => {
    const fresh = allUsers.find((u) => u.id === user.id);
    return fresh ?? user;
  }, [allUsers, user]);

  const myPrefs = useMemo(
    () => preferences.filter((p) => p.userId === currentUser.id),
    [preferences, currentUser.id]
  );

  const mySongs = useMemo(
    () => songs.filter((s) => s.requestedByUserId === currentUser.id),
    [songs, currentUser.id]
  );

  const tableMap = useMemo(() => {
    const map: Record<string, Table> = {};
    tables.forEach((t) => {
      map[t.id] = t;
    });
    return map;
  }, [tables]);

  // Confirmados = usuarios que YA TIENEN MESA, ordenados alfabéticamente
  const confirmedUsers = useMemo(() => {
    return allUsers
      .filter((u) => u.tableId)
      .slice()
      .sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" })
      );
  }, [allUsers]);

  const [showAllConfirmed, setShowAllConfirmed] = useState(false);

  const pendingTasks = useMemo(() => {
    const tasks: {
      type: "music" | "table";
      title: string;
      description: string;
      link: string;
    }[] = [];

    if (!currentUser.musicComment && myPrefs.length === 0 && mySongs.length === 0) {
      tasks.push({
        type: "music",
        title: "Contanos qué música te gusta",
        description: "Así armamos la playlist con tus gustos.",
        link: "/music",
      });
    }

    if (!currentUser.tableId) {
      tasks.push({
        type: "table",
        title: "Elegí tu mesa",
        description: "Ayudanos a organizar las mesas para que todos estén cómodos.",
        link: "/tables",
      });
    }

    return tasks;
  }, [currentUser.musicComment, currentUser.tableId, myPrefs.length, mySongs.length]);

  const handleOpenAdmin = () => {
    navigate("/admin?token=secret123");
  };

  const showAdminShield = currentUser.isAdmin === true;

  // Apodo random por sesión (si no hay apodos, cae al primer nombre)
  const [sessionNickname] = useState(() => {
    const nicknames =
      currentUser.nicknames && currentUser.nicknames.length > 0
        ? currentUser.nicknames
        : [currentUser.name.split(" ")[0]];

    const idx = Math.floor(Math.random() * nicknames.length);
    return nicknames[idx];
  });

  // Info para la tarjeta “X te asignó una mesa”
  const seatAssignmentInfo = useMemo(() => {
    const u = currentUser;
    if (!u.tableId || !u.seatAssignedByUserId) return null;
    if (u.seatAssignedByUserId === u.id) return null;

    const assigner = allUsers.find((x) => x.id === u.seatAssignedByUserId);
    if (!assigner) return null;

    const table = tableMap[u.tableId];
    const mesaLabel =
      table?.name ?? `Mesa ${u.tableId.replace(/^t/i, "")}`;

    const assignerDisplay =
      assigner.nicknames && assigner.nicknames.length > 0
        ? assigner.nicknames[0]
        : assigner.name.split(" ")[0];

    return {
      assignerId: assigner.id,
      assignerName: assignerDisplay,
      mesaLabel,
    };
  }, [currentUser, allUsers, tableMap]);

  const handleGoToTablesFromAssignment = () => {
    // Ni bien toca el botón, tomamos como que es una decisión consciente:
    // marcamos que ahora ÉL es el "dueño" de esa mesa (a nivel asiento),
    // así la tarjeta desaparece al volver a Home.
    db.updateUser(currentUser.id, {
      seatAssignedByUserId: currentUser.id,
    });

    navigate("/tables");
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <PageTitle
          title={`Hola, ${sessionNickname} 👋`}
          subtitle="Te doy la bienvenida al panel de la fiesta."
        />

        {showAdminShield && (
          <button
            type="button"
            onClick={handleOpenAdmin}
            className="mt-1 inline-flex items-center justify-center rounded-full border border-cyan-400/60 bg-black/40 p-2 text-cyan-200 hover:bg-cyan-500/10 hover:border-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all"
            title="Abrir panel de administración"
          >
            <Shield size={18} />
          </button>
        )}
      </div>

      <BirthdayCountdown />

      {/* Tarjeta: alguien de tu familia te asignó una mesa */}
      {seatAssignmentInfo && (
        <div className="mt-3 rounded-xl border border-cyan-400/40 bg-black/50 px-4 py-3 text-xs text-cyan-100 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
          <p className="mb-2">
            <span className="font-semibold text-cyan-200">
              {seatAssignmentInfo.assignerName}
            </span>{" "}
            te asignó una mesa
            {seatAssignmentInfo.mesaLabel
              ? ` (${seatAssignmentInfo.mesaLabel})`
              : ""}, si querés la podés cambiar.
          </p>
          <button
            type="button"
            onClick={handleGoToTablesFromAssignment}
            className="inline-flex items-center justify-center rounded-lg border border-cyan-400/70 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-100 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)] transition"
          >
            Ver mesa asignada
          </button>
        </div>
      )}

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
            className="text-[11px] px-2 py-[3px] rounded-md border border-cyan-500/40 text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 transition"
          >
            {showAllConfirmed ? "Ocultar lista" : "Ver lista completa"}
          </button>
        </div>

        <ConfirmedGuestsCarousel users={confirmedUsers} />

        {showAllConfirmed && confirmedUsers.length > 0 && (
          <div className="mt-2 max-h-40 overflow-y-auto rounded-md border border-white/10 bg-black/40 px-3 py-2 text-xs text-gray-100 space-y-1">
            {confirmedUsers.map((u) => {
              const table = u.tableId ? tableMap[u.tableId] : undefined;
              const mesaLabel =
                table?.name ??
                (u.tableId ? `Mesa ${u.tableId.replace(/^t/i, "")}` : "–");

              return (
                <div
                  key={u.id}
                  className="flex items-center justify-between gap-2 border-b border-white/5 last:border-b-0 pb-1 last:pb-0"
                >
                  <span>{u.name}</span>
                  {u.tableId && (
                    <span className="text-[10px] text-cyan-300">
                      {mesaLabel}
                    </span>
                  )}
                </div>
              );
            })}
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
