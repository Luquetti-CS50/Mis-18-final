// src/features/wishlist/components/TransferAliasCard.tsx
import React from "react";
import { NeonCard } from "../../../components/ui/NeonCard";

export const TransferAliasCard: React.FC = () => {
  return (
    <NeonCard>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-white">
          Transferencia 💸
        </h3>
        <p className="text-xs text-gray-300">
          Acá está mi alias para ahorrarte el tener que pedirlo.
        </p>

        <div className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 border border-cyan-500/40">
          <span className="text-[11px] uppercase tracking-wide text-gray-400">
            Alias:
          </span>
          <span className="text-sm font-semibold text-cyan-300">
            luca.veron.nx
          </span>
        </div>
      </div>
    </NeonCard>
  );
};
