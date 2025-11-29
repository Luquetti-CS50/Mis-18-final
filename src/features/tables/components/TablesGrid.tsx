// src/features/tables/components/TablesGrid.tsx
import React from "react";
import type { Table, User } from "../../../types";
import { TableCard } from "./TableCard";

interface TableData {
  table: Table;
  occupants: User[];
  isMyTable: boolean;
}

interface Props {
  data: TableData[];
  hasChosenTable: boolean;
  onJoin: (tableId: string) => void;
}

export const TablesGrid: React.FC<Props> = ({
  data,
  hasChosenTable,
  onJoin,
}) => {
  return (
    <div className="space-y-2">
      {data.map(({ table, occupants, isMyTable }) => (
        <TableCard
          key={table.id}
          table={table}
          occupants={occupants}
          isMyTable={isMyTable}
          hasChosenTable={hasChosenTable}
          onJoin={() => onJoin(table.id)}
        />
      ))}
    </div>
  );
};
