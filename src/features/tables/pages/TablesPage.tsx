// src/features/tables/pages/TablesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { User, Table } from "../../../types";
import { db } from "../../../lib/db";
import { PageTitle } from "../../../components/ui/PageTitle";
import { getFamilyGroupByUserId } from "../../../lib/db/families";
import { supabase } from "../../../lib/db/supabaseClient";

interface TablesPageProps {
  user: User;
}

export const TablesPage: React.FC<TablesPageProps> = ({ user }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [loading, setLoading] = useState(true);

  // Estado para el modal de familia
  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [selectedTableForFamily, setSelectedTableForFamily] =
    useState<Table | null>(null);
  const [familySelection, setFamilySelection] = useState<
    Record<string, boolean>
  >({});

  // Cargar datos desde DB
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

  const familyGroup = useMemo(
    () => getFamilyGroupByUserId(currentUser.id),
    [currentUser.id],
  );

  const refreshUsers = () => {
    const u = db.getUsers();
    setAllUsers(u);
  };

  // 🔹 Helper: aplicar cambio de mesa en DB + Supabase
  const persistTableChange = async (
    userId: string,
    tableId: string | null,
    attendanceStatus: string,
    seatAssignedByUserId: string | null,
  ) => {
    // 1) Actualizamos cache local / lógica interna
    db.updateUser(userId, {
      tableId,
      attendanceStatus: attendanceStatus as any,
      seatAssignedByUserId: seatAssignedByUserId ?? undefined,
    });

    // 2) Reflejamos en Supabase de forma explícita
    try {
      const payload: any = {
        table_id: tableId,
        attendance_status: attendanceStatus,
        seat_assigned_by_user_id: seatAssignedByUserId,
      };

      await supabase.from("users").update(payload).eq("id", userId);
    } catch (err) {
      console.error("[TablesPage] Error actualizando mesa en Supabase", err);
    }

    // 3) Refrescamos la vista con lo que tenga el cache
    refreshUsers();
  };

  const handleMarkGoingWithoutTable = async () => {
    if (currentUser.tableId) return;

    await persistTableChange(
      currentUser.id,
      null,
      "going_no_table",
      null,
    );
  };

  const handleJoinTable = async (table: Table) => {
    await persistTableChange(
      currentUser.id,
      table.id,
      "going_with_table",
      currentUser.id,
    );
  };

  const handleChangeTable = async (table: Table) => {
    await persistTableChange(
      currentUser.id,
      table.id,
      "going_with_table",
      currentUser.id,
    );
  };

  const handleLeaveTable = async () => {
    if (!currentUser.tableId) return;

    const confirmed = window.confirm(
      "No tener ninguna mesa hace que se entienda como que no vas a asistir.\n\n¿Estás segur@ de que querés abandonar tu mesa?",
    );

    if (!confirmed) {
      return;
    }

    await persistTableChange(currentUser.id, null, "pending", null);
  };

  // Abrir modal de familia para una mesa
  const openFamilyModalForTable = (table: Table) => {
    if (!familyGroup) {
      if (currentUser.tableId) {
        void handleChangeTable(table);
      } else {
        void handleJoinTable(table);
      }
      return;
    }

    const { members, children } = familyGroup;
    const allFamilyUsers = [...members, ...children];

    const initialSelection: Record<string, boolean> = {};
    allFamilyUsers.forEach((u) => {
      initialSelection[u.id] = u.id === currentUser.id;
    });

    setFamilySelection(initialSelection);
    setSelectedTableForFamily(table);
    setShowFamilyModal(true);
  };

  const handleToggleFamilySelection = (id: string) => {
    setFamilySelection((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleConfirmFamilyAssignment = async () => {
    if (!selectedTableForFamily || !familyGroup) {
      setShowFamilyModal(false);
      return;
    }

    const { members, children } = familyGroup;
    const allFamilyUsers = [...members, ...children];

    const selectedIds = allFamilyUsers
      .map((u) => u.id)
      .filter((id) => familySelection[id]);

    if (selectedIds.length === 0) {
      setShowFamilyModal(false);
      return;
    }

    // Asignamos mesa a todos los seleccionados
    for (const id of selectedIds) {
      await persistTableChange(
        id,
        selectedTableForFamily.id,
        "going_with_table",
        currentUser.id,
      );
    }

    setShowFamilyModal(false);
    setSelectedTableForFamily(null);
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

  if (loading) {
    return (
      <div className="p-4 text-sm text-gray-300">
        Cargando mesas y lugares...
      </div>
    );
  }

  return (
    <>
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

            const handlePrimaryClick = () => {
              if (isMine) return;

              if (familyGroup) {
                openFamilyModalForTable(table);
                return;
              }

              if (hasAnyTable) {
                void handleChangeTable(table);
              } else {
                void handleJoinTable(table);
              }
            };

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
                    onClick={handlePrimaryClick}
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

      {/* MODAL FAMILIA */}
      {showFamilyModal && familyGroup && selectedTableForFamily && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-2xl border border-cyan-400/40 bg-black/90 px-4 py-4 text-xs text-gray-100 shadow-[0_0_24px_rgba(34,211,238,0.4)]">
            <h2 className="text-sm font-semibold text-cyan-200 mb-1">
              Familia
            </h2>
            <p className="text-[11px] text-gray-300 mb-3">
              Podés elegir el lugar de los integrantes de tu grupo familiar,
              ¿quién se sienta acá?
            </p>

            <p className="text-[11px] text-cyan-300 mb-2">
              Mesa seleccionada:{" "}
              <span className="font-semibold">
                {selectedTableForFamily.name}
              </span>
            </p>

            <div className="max-h-40 overflow-y-auto rounded-md border border-white/10 bg-black/60 mb-3">
              {(() => {
                const { members, children } = familyGroup;
                const allFamilyUsers = [...members, ...children];

                return allFamilyUsers.map((u) => {
                  const isMe = u.id === currentUser.id;
                  const displayName = isMe
                    ? "Yo"
                    : u.nicknames && u.nicknames.length > 0
                    ? u.nicknames[0]
                    : u.name;

                  return (
                    <label
                      key={u.id}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-white/5 last:border-b-0 text-[11px]"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={Boolean(familySelection[u.id])}
                          onChange={() => handleToggleFamilySelection(u.id)}
                          className="h-3 w-3 rounded border-gray-500 bg-black text-cyan-400 focus:ring-0"
                        />
                        <span className="text-gray-100">{displayName}</span>
                        {u.isChild && (
                          <span className="text-[10px] text-gray-400">
                            (menor)
                          </span>
                        )}
                      </div>
                    </label>
                  );
                });
              })()}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowFamilyModal(false);
                  setSelectedTableForFamily(null);
                }}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-[11px] text-gray-200 hover:bg-white/5 transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmFamilyAssignment}
                className="px-3 py-1.5 rounded-lg border border-cyan-400/70 text-[11px] font-semibold text-cyan-100 bg-cyan-500/10 hover:bg-cyan-500/20 hover:shadow-[0_0_12px_rgba(34,211,238,0.6)] transition"
              >
                Asignar mesa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
