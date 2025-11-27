// src/components/ui/Badge.tsx
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  onRemove?: () => void;
}

export const Badge: React.FC<BadgeProps> = ({ children, onRemove }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-xs text-cyan-200 mr-2 mb-2">
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-2 text-cyan-300 hover:text-white focus:outline-none"
        >
          ×
        </button>
      )}
    </span>
  );
};
