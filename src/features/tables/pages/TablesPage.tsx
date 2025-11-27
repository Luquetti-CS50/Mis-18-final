// src/features/tables/pages/TablesPage.tsx
import React, { useMemo } from "react";
import type { User } from "../../../types";
import { PageTitle } from "../../../components/ui/PageTitle";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { TablesGrid } from "../components/TablesGrid";

interface Props {
  user: User;
}

export const TablesPage: React.FC<Props> = ({ user }) => {
  const tables = useData(() => db.getTables(), "tables");
  const users = useData(() => db.getUsers(), "users");

  const tableData = useMemo(
    () =>
      tables.map((table) => {
        const occupants = users.filter((u) => u.tableId === table.id);
        const isMyTable = user.tableId === table.id;
        return { table, occupants, isMyTable };
      }),
    [tables, users, user.tableId]
  );

  const handleJoin = (tableId: string) => {
    db.updateUser({ ...user, tableId });
  };

  return (
    <>
      <PageTitle
        title="Mesas 🍽️"
        subtitle="Elegí dónde te querés sentar."
      />
      <p className="text-xs text-gray-400 mb-4">
        La idea es que cada mesa tenga unas 10 personas. Podés cambiar de
        mesa si te equivocaste.
      </p>
      <TablesGrid data={tableData} onJoin={handleJoin} />
    </>
  );
};
