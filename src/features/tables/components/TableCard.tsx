// src/features/tables/components/TableCard.tsx
import React from "react";
import type { Table, User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";

interface Props {
  table: Table;
  occupants: User[];
  isMyTable: boolean;
  onJoin: () => void;
}

export const TableCard: React.FC<Props> = ({
  table,
  occupants,
  isMyTable,
  onJoin,
}) => {
  const isFull = occupants.length >= table.capacity;
  const occupancyText = `${occupants.length}/${table.capacity}`;

  return (
    <NeonCard className="mb-3 cursor-default">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-white">
            {table.name}
          </h3>
          <p className="text-xs text-gray-400">
            Ocupación: {occupancyText}
          </p>
        </div>
        <NeonButton
          variant={isMyTable ? "success" : "secondary"}
          disabled={isFull && !isMyTable}
          onClick={onJoin}
        >
          {isMyTable
            ? "Tu mesa"
            : isFull
            ? "Llena"
            : "Unirme a esta mesa"}
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
