// src/features/tables/components/TableCard.tsx
import React from "react";
import type { Table, User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";

interface Props {
  table: Table;
  occupants: User[];
  isMyTable: boolean;
  hasChosenTable: boolean;
  onJoin: () => void;
}

export const TableCard: React.FC<Props> = ({
  table,
  occupants,
  isMyTable,
  hasChosenTable,
  onJoin,
}) => {
  const isFull = occupants.length >= table.capacity;

  const buttonLabel = (() => {
    if (isMyTable) return "Tu mesa";
    if (isFull) return "Llena";
    if (hasChosenTable) return "Cambiarme a esta mesa";
    return "Unirme a esta mesa";
  })();

  const buttonVariant: React.ComponentProps<typeof NeonButton>["variant"] =
    isMyTable ? "success" : isFull ? "secondary" : "primary";

  return (
    <NeonCard className="cursor-default">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-cyan-100">
            {table.name}
          </p>
          <p className="text-xs text-gray-400">
            Capacidad: {occupants.length}/{table.capacity}
            {isMyTable && <span className="ml-1 text-emerald-300">· Tu mesa</span>}
          </p>
        </div>
        <NeonButton
          type="button"
          variant={buttonVariant}
          disabled={isFull && !isMyTable}
          onClick={onJoin}
          className="text-xs px-3 py-1"
        >
          {buttonLabel}
        </NeonButton>
      </div>

      {occupants.length > 0 && (
        <div className="mt-2 text-xs text-gray-300">
          <span className="font-medium">Personas:</span>{" "}
          {occupants.map((u) => u.name).join(", ")}
        </div>
      )}
    </NeonCard>
  );
};
