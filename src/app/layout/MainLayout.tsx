// src/app/layout/MainLayout.tsx
import React from "react";
import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black text-white flex flex-col">
      <div className="flex-1 pb-20 px-4 pt-6 max-w-md mx-auto w-full">
        {children}
      </div>
      <Navbar />
    </div>
  );
};
