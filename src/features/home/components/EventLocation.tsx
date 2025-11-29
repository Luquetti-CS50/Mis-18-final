// src/features/home/components/EventLocation.tsx
import React from "react";
import { NeonCard } from "../../../components/ui/NeonCard";

export const EventLocation: React.FC = () => (
  <NeonCard className="mt-5">
    <p className="text-sm font-semibold text-cyan-300 mb-1">📍 Ubicación del salón</p>
    <p className="text-xs text-gray-300 mb-3">
      En la próxima actualización vas a ver el mapa real para llegar sin perderte.
    </p>

    {/* FUTURO: Google Maps iframe/API va acá */}
    <div className="w-full h-52 rounded-lg border border-cyan-500/30 bg-black/40" />
  </NeonCard>
);
