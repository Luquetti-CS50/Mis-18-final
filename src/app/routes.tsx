// src/app/routes.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { MainLayout } from "./layout/MainLayout";

import { LoginPage } from "../features/auth/pages/LoginPage";
import { HomePage } from "../features/home/pages/HomePage";
import { MusicPage } from "../features/music/pages/MusicPage";
import { TablesPage } from "../features/tables/pages/TablesPage";
import { WishlistPage } from "../features/wishlist/pages/WishlistPage";
import { AdminPage } from "../features/admin/pages/AdminPage";

export const AppRoutes: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <MainLayout>
      <Routes>
        <Route path="/home" element={<HomePage user={currentUser} />} />
        <Route path="/music" element={<MusicPage user={currentUser} />} />
        <Route path="/tables" element={<TablesPage user={currentUser} />} />
        <Route path="/wishlist" element={<WishlistPage user={currentUser} />} />
        <Route path="/admin" element={<AdminPage user={currentUser} />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </MainLayout>
  );
};
