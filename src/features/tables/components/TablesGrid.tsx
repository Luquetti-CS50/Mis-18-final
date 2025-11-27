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
  onJoin: (tableId: string) => void;
}

export const TablesGrid: React.FC<Props> = ({ data, onJoin }) => {
  return (
    <div className="space-y-2">
      {data.map(({ table, occupants, isMyTable }) => (
        <TableCard
          key={table.id}
          table={table}
          occupants={occupants}
          isMyTable={isMyTable}
          onJoin={() => onJoin(table.id)}
        />
      ))}
    </div>
  );
};
