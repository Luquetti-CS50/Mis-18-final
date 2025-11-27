// src/app/layout/MainLayout.tsx
import React from "react";
import { Navbar } from "./Navbar";
import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white flex flex-col">
      <div className="flex-1 pb-20 px-4 pt-6 max-w-md mx-auto w-full">
        {/* Barra superior con botón de logout temporal */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-white/5 border border-white/10 text-gray-300 hover:bg-red-500/10 hover:border-red-500/60 hover:text-red-300 transition-all"
          >
            <LogOut size={12} />
            Cerrar sesión
          </button>
        </div>

        {children}
      </div>
      <Navbar />
    </div>
  );
};
