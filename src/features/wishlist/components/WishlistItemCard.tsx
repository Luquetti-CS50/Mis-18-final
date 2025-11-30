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
  const isTakenByCurrent = item.isTaken && item.takenByUserId === user.id;
  const isTakenByOther =
    item.isTaken &&
    item.takenByUserId !== undefined &&
    item.takenByUserId !== user.id;

  let statusLabel = "";
  let helperText = "";
  let statusClass =
    "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium";

  if (isTakenByCurrent) {
    statusLabel = "Reservaste este regalo";
    helperText = "(tocá de nuevo para liberar)";
    statusClass += " bg-emerald-500/10 text-emerald-300 border border-emerald-500/40";
  } else if (isTakenByOther) {
    statusLabel = "Ya lo reservó otra persona";
    helperText = "Probá elegir otro regalo de la lista ✨";
    statusClass += " bg-zinc-800 text-zinc-300 border border-zinc-600/60";
  } else {
    statusLabel = "Tocar para reservar este regalo";
    statusClass += " bg-cyan-500/10 text-cyan-300 border border-cyan-500/40";
  }

  const handleOpenLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // que no dispare la reserva
    if (item.linkUrl) {
      window.open(item.linkUrl, "_blank", "noopener,noreferrer");
    }
  };

  const initials =
    item.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word[0]?.toUpperCase())
      .join("") || "?";

  return (
    <NeonCard
      onClick={!isTakenByOther ? onToggle : undefined}
      className={isTakenByOther ? "opacity-60 cursor-not-allowed" : ""}
    >
      <div className="flex gap-3 items-center">
        {/* Imagen del producto o placeholder con iniciales */}
        <div className="flex-shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover border border-cyan-500/40"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-transparent flex items-center justify-center text-xs font-semibold text-cyan-100">
              {initials}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                {item.name}
              </h3>
            </div>

            {statusLabel && <span className={statusClass}>{statusLabel}</span>}
          </div>

          {item.linkUrl && (
            <div className="mt-2">
              <button
                type="button"
                onClick={handleOpenLink}
                className="text-[11px] px-2 py-1 rounded-full border border-cyan-500/60 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 transition-colors"
              >
                Ver producto
              </button>
            </div>
          )}

          <p className="mt-1 text-[11px] text-gray-300">{helperText}</p>
        </div>
      </div>
    </NeonCard>
  );
};
