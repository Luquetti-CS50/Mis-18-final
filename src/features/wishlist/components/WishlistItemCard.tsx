// src/features/wishlist/components/WishlistItemCard.tsx
import React from "react";
import type { WishlistItem, User } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  item: WishlistItem;
  user: User;
  onToggle: () => void;
}

export const WishlistItemCard: React.FC<Props> = ({ item, user, onToggle }) => {
  const isTakenByCurrent = item.isTaken && item.takenByUserId === user.id;
  const isTakenByOther =
    item.isTaken &&
    item.takenByUserId !== undefined &&
    item.takenByUserId !== user.id;

  let statusLabel = "";
  let statusClass =
    "flex-1 text-center px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition";

  if (isTakenByCurrent) {
    statusLabel = "Reservaste este regalo";
    statusClass += " bg-emerald-500/10 text-emerald-300 border border-emerald-500/40";
  } else if (isTakenByOther) {
    statusLabel = "Ya lo reservó otra persona";
    statusClass += " bg-zinc-800 text-zinc-300 border border-zinc-600/60";
  } else {
    statusLabel = "Tocar para reservar";
    statusClass += " bg-cyan-500/10 text-cyan-300 border border-cyan-500/40";
  }

  const handleOpenLink = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (item.linkUrl) window.open(item.linkUrl, "_blank", "noopener,noreferrer");
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
      <div className="flex items-center gap-4">
        
        {/* Mini-imagen o iniciales */}
        <div className="flex-shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-16 h-16 rounded-lg object-cover border border-cyan-500/40"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 via-fuchsia-500/10 to-transparent flex items-center justify-center text-sm text-cyan-100 font-bold">
              {initials}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 gap-2">
          <h3 className="text-sm font-semibold text-white leading-tight">{item.name}</h3>

          {/* 🔥 Ambos botones al mismo nivel */}
          <div className="flex gap-2 w-full items-center">

            <button
              type="button"
              onClick={handleOpenLink}
              className="flex-1 text-center px-3 py-1 rounded-full text-[11px] font-medium border border-cyan-500/60 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20"
            >
              Ver producto
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!isTakenByOther) onToggle();
              }}
              className={`${statusClass} hover:opacity-90`}
            >
              {statusLabel}
            </button>

          </div>
        </div>
      </div>
    </NeonCard>
  );
};
