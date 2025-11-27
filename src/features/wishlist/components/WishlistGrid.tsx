// src/features/wishlist/components/WishlistGrid.tsx
import React from "react";
import type { WishlistItem, User } from "../../../types";
import { WishlistItemCard } from "./WishlistItemCard";

interface Props {
  items: WishlistItem[];
  user: User;
  onToggle: (item: WishlistItem) => void;
}

export const WishlistGrid: React.FC<Props> = ({
  items,
  user,
  onToggle,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {items.map((item) => (
        <WishlistItemCard
          key={item.id}
          item={item}
          user={user}
          onToggle={() => onToggle(item)}
        />
      ))}
    </div>
  );
};
