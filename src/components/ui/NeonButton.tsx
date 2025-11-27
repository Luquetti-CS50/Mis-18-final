// src/components/ui/NeonButton.tsx
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "success";

interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cyan-500 text-black hover:bg-cyan-400 border border-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.6)]",
  secondary:
    "bg-transparent text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/10",
  danger:
    "bg-red-500 text-white hover:bg-red-400 border border-red-400 shadow-[0_0_16px_rgba(248,113,113,0.6)]",
  success:
    "bg-emerald-500 text-black hover:bg-emerald-400 border border-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.6)]",
};

export const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  fullWidth,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};
