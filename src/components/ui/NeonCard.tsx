// src/components/ui/NeonCard.tsx
import React from "react";

interface NeonCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-xl p-[1px] bg-gradient-to-br from-cyan-500/40 via-purple-500/30 to-cyan-400/40 hover:scale-[1.01] active:scale-95 transition-transform cursor-pointer ${className}`}
    >
      <div className="bg-[#050509] w-full rounded-xl p-4 relative z-10">
        {children}
      </div>
    </div>
  );
};
