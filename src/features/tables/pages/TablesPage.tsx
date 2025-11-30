// src/features/tables/pages/TablesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { User, Table } from "../../../types";
import { db } from "../../../lib/db";
import { PageTitle } from "../../../components/ui/PageTitle";

interface TablesPageProps {
  user: User;
}

export const TablesPage: React.FC<TablesPageProps> = ({ user }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde el db mock
  useEffect(() => {
    const u = db.getUsers();
    const t = db.getTables();
    setAllUsers(u);
    setTables(t);
    setLoading(false);
  }, []);

  // Refrescamos el usuario actual desde el DB (por si cambió algo)
  const currentUser = useMemo(() => {
    const fresh = allUsers.find((u) => u.id === user.id);
    return fresh ?? user;
  }, [allUsers, user]);

  // Helper para recargar solo la lista de usuarios tras una actualización
  const refreshUsers = () => {
    const u = db.getUsers();
    setAllUsers(u);
  };

  // Ocupación por mesa
  const guestsByTable = useMemo(() => {
    const map: Record<string, User[]> = {};
    tables.forEach((t) => {
      map[t.id] = [];
    });
    allUsers.forEach((u) => {
      if (u.tableId && map[u.tableId]) {
        map[u.tableId].push(u);
      }
    });
    return map;
  }, [allUsers, tables]);

  const handleMarkGoingWithoutTable = () => {
    // Si ya tiene mesa, este botón no debería aparecer, pero lo blindamos igual
    if (currentUser.tableId) return;

    db.updateUser(currentUser.id, {
      attendanceStatus: "going_no_table",
      tableId: null,
      seatAssignedByUserId: null,
    });
    refreshUsers();
  };

  const handleJoinTable = (table: Table) => {
    db.updateUser(currentUser.id, {
      tableId: table.id,
      attendanceStatus: "going_with_table",
      seatAssignedByUserId: currentUser.id,
    });
    refreshUsers();
  };

  const handleChangeTable = (table: Table) => {
    db.updateUser(currentUser.id, {
      tableId: table.id,
      attendanceStatus: "going_with_table",
      seatAssignedByUserId: currentUser.id,
    });
    refreshUsers();
  };

  const handleLeaveTable = () => {
    if (!currentUser.tableId) return;

    const confirmed = window.confirm(
      "No tener ninguna mesa hace que se entienda como que no vas a asistir.\n\n¿Estás segur@ de que querés abandonar tu mesa?"
    );

    if (!confirmed) {
      // Se arrepintió, no tocamos nada
      return;
    }

    db.updateUser(currentUser.id, {
      tableId: null,
      attendanceStatus: "pending",
      seatAssignedByUserId: null,
    });
    refreshUsers();
  };

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-300">
        Cargando mesas y lugares...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageTitle
        title="Mesas y lugares"
        subtitle="Elegí tu mesa para que podamos organizar mejor la fiesta."
      />

      {/* Estado actual del usuario */}
      <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-xs text-gray-200 space-y-2">
        <p>
          <span className="text-gray-400">Tu estado:</span>{" "}
          {currentUser.tableId ? (
            <span className="text-cyan-300 font-semibold">
              Tenés mesa asignada
            </span>
          ) : currentUser.attendanceStatus === "going_no_table" ? (
            <span className="text-amber-300 font-semibold">
              Vas a asistir, pero todavía no elegiste mesa
            </span>
          ) : (
            <span className="text-red-300 font-semibold">
              Todavía no estás confirmado como asistente
            </span>
          )}
        </p>

        {!currentUser.tableId &&
          currentUser.attendanceStatus !== "going_no_table" && (
            <button
              type="button"
              onClick={handleMarkGoingWithoutTable}
              className="mt-1 inline-flex items-center justify-center rounded-lg border border-cyan-400/60 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-semibold text-cyan-200 hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all"
            >
              Asisto, la mesa la elijo ese día
            </button>
          )}

        {currentUser.tableId && (
          <p className="text-[11px] text-gray-400">
            Si abandonás tu mesa, se va a interpretar como que no vas a
            asistir, a menos que después elijas otra mesa o uses el botón de{" "}
            <span className="text-cyan-300">
              “Asisto, la mesa la elijo ese día”.
            </span>
          </p>
        )}
      </div>

      {/* Grilla de mesas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tables.map((table) => {
          const guests = guestsByTable[table.id] || [];
          const capacity = (table as any).capacity ?? 0;
          const isMine = currentUser.tableId === table.id;
          const hasAnyTable = Boolean(currentUser.tableId);

          const isFull = capacity > 0 && guests.length >= capacity;

          let primaryLabel = "Unirme a esta mesa";
          let secondaryLabel: string | null = null;

          if (isMine) {
            primaryLabel = "Tu mesa";
            secondaryLabel = "Abandonar mesa";
          } else if (hasAnyTable) {
            primaryLabel = "Cambiarme a esta mesa";
            secondaryLabel = null;
          }

          return (
            <div
              key={table.id}
              className="rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-xs text-gray-100 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {table.name}
                  </p>
                  {capacity > 0 && (
                    <p className="text-[11px] text-gray-400">
                      {guests.length} / {capacity} lugares ocupados
                    </p>
                  )}
                </div>
              </div>

              {guests.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {guests.map((g) => (
                    <span
                      key={g.id}
                      className="px-2 py-[2px] rounded-full bg-white/5 border border-white/10 text-[10px]"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={isFull && !isMine}
                  onClick={() => {
                    if (isMine) return;
                    if (hasAnyTable) {
                      handleChangeTable(table);
                    } else {
                      handleJoinTable(table);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition ${
                    isMine
                      ? "border-emerald-400/70 text-emerald-200 bg-emerald-500/10 cursor-default"
                      : isFull
                      ? "border-gray-500 text-gray-500 cursor-not-allowed"
                      : "border-cyan-400/70 text-cyan-200 bg-cyan-500/10 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                  }`}
                >
                  {isFull && !isMine ? "Mesa completa" : primaryLabel}
                </button>

                {secondaryLabel && isMine && (
                  <button
                    type="button"
                    onClick={handleLeaveTable}
                    className="px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-red-400/70 text-red-200 bg-red-500/10 hover:bg-red-500/20 hover:shadow-[0_0_10px_rgba(248,113,113,0.5)] transition"
                  >
                    {secondaryLabel}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
