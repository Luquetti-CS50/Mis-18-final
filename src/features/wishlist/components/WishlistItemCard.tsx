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
  const isMine = item.takenByUserId === user.id;
  const isTakenByOther = item.isTaken && !isMine;

  return (
    <NeonCard
      className={`cursor-pointer ${
        isTakenByOther ? "opacity-60 grayscale" : ""
      }`}
      onClick={onToggle}
    >
      <div className="flex gap-3">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">
            {item.name}
          </h3>
          {item.linkUrl && (
            <a
              href={item.linkUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-cyan-300 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              Ver detalle
            </a>
          )}
          <p className="text-xs mt-2">
            {item.isTaken ? (
              isMine ? (
                <span className="text-emerald-300">
                  Lo marcaste como tu regalo 💚 (tocá de nuevo para liberar)
                </span>
              ) : (
                <span className="text-gray-400">
                  Ya lo está regalando otra persona.
                </span>
              )
            ) : (
              <span className="text-cyan-200">
                Tocar para comprometerte con este regalo.
              </span>
            )}
          </p>
        </div>
      </div>
    </NeonCard>
  );
};
