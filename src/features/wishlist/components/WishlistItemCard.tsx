// src/features/wishlist/components/WishlistItemCard.tsx
import React from "react";
import type { WishlistItem, User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  item: WishlistItem;
  user: User;
  onToggle: () => void;
}

export const WishlistItemCard: React.FC<Props> = ({
  item,
  user,
  onToggle,
}) => {
  const isTaken = item.isTaken;
  const isMine = isTaken && item.takenByUserId === user.id;

  const helperText = (() => {
    if (isMine) {
      return "Reservaste este regalo (tocá de nuevo para liberar).";
    }
    if (isTaken) {
      return "Ya lo reservó otra persona.";
    }
    return "Tocar para reservar este regalo.";
  })();

  return (
    <NeonCard
      onClick={onToggle}
      className="cursor-pointer hover:scale-[1.01] transition-transform"
    >
      <div className="flex gap-3 items-center">
        {/* Imagen del producto (lista para usar cuando agreguemos imágenes reales) */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 via-cyan-900/40 to-black flex items-center justify-center text-xs text-cyan-200/70">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>Imagen</span>
          )}
        </div>

        {/* Info principal */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-sm font-semibold text-cyan-100 truncate">
              {item.name}
            </p>

            {/* Estado visual */}
            {isMine ? (
              <span className="text-[11px] px-2 py-[2px] rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/40">
                Tu reserva
              </span>
            ) : isTaken ? (
              <span className="text-[11px] px-2 py-[2px] rounded-full bg-red-500/10 text-red-300 border border-red-500/40">
                Reservado
              </span>
            ) : (
              <span className="text-[11px] px-2 py-[2px] rounded-full bg-cyan-500/10 text-cyan-200 border border-cyan-500/40">
                Disponible
              </span>
            )}
          </div>

          {/* Link a MercadoLibre (preparado para futuro) */}
          {item.linkUrl && (
            <p className="text-[11px] text-cyan-300 mb-1 truncate">
              <a
                href={item.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="underline decoration-dotted underline-offset-2 hover:text-cyan-100"
              >
                Ver en MercadoLibre
              </a>
            </p>
          )}

          {/* Texto de ayuda */}
          <p className="text-[11px] text-gray-300">{helperText}</p>
        </div>
      </div>
    </NeonCard>
  );
};
