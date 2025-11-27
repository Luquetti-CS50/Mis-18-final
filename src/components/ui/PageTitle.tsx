// src/components/ui/PageTitle.tsx
import React from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-cyan-200/80">{subtitle}</p>
      )}
    </div>
  );
};
