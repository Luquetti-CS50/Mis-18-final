// src/features/admin/components/AdminUserList.tsx
import React from "react";
import type { User, Table } from "../../../types";

interface Props {
  users: User[];
  tables: Table[];
}

export const AdminUserList: React.FC<Props> = ({ users, tables }) => {
  const tableById = new Map(tables.map((t) => [t.id, t]));

  return (
    <div className="mt-4 text-xs">
      <h3 className="text-white mb-2 font-semibold">
        Listado de invitados
      </h3>
      <div className="bg-[#050509] rounded border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-black/60 text-gray-400 border-b border-gray-800">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2">Mesa</th>
              <th className="p-2">Coment.</th>
              <th className="p-2">Entró</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {users.map((u) => {
              const table = u.tableId ? tableById.get(u.tableId) : null;
              return (
                <tr
                  key={u.id}
                  className={u.hasLoggedIn ? "text-white" : "text-gray-500"}
                >
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{table ? table.name : "-"}</td>
                  <td className="p-2">
                    {u.musicComment ? "🎵" : ""}
                  </td>
                  <td className="p-2">
                    {u.hasLoggedIn ? "✅" : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
