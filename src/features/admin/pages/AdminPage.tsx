// src/features/admin/pages/AdminPage.tsx
import React from "react";
import type { User } from "../../../types";
import { PageTitle } from "../../../components/ui/PageTitle";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { useAdminGuard } from "../hooks/useAdminGuard";
import { AdminStatsCards } from "../components/AdminStatsCards";
import { AdminUserList } from "../components/AdminUserList";

interface Props {
  user: User;
}

export const AdminPage: React.FC<Props> = ({ user }) => {
  const guard = useAdminGuard(user);
  const users = useData(() => db.getUsers(), "users");
  const tables = useData(() => db.getTables(), "tables");

  if (!guard.allowed) {
    return guard.fallback;
  }

  return (
    <>
      <PageTitle
        title="Admin Panel 🛠️"
        subtitle="Visión general de invitados, mesas y música."
      />
      <AdminStatsCards users={users} />
      <AdminUserList users={users} tables={tables} />
    </>
  );
};
