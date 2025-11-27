// src/app/layout/Navbar.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home as HomeIcon, Music, Gift, Users } from "lucide-react";

const navItems = [
  { path: "/home", icon: HomeIcon, label: "Inicio" },
  { path: "/music", icon: Music, label: "Música" },
  { path: "/wishlist", icon: Gift, label: "Regalos" },
  { path: "/tables", icon: Users, label: "Mesas" },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur-md border-t border-gray-800 z-50 pb-2">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
                isActive
                  ? "text-cyan-400 scale-110"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <item.icon
                size={20}
                className={isActive ? "drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" : ""}
              />
              <span className="text-[10px] mt-1 font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
