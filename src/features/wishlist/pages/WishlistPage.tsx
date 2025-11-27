// src/features/wishlist/pages/WishlistPage.tsx
import React from "react";
import type { User, WishlistItem } from "../../../types";
import { PageTitle } from "../../../components/ui/PageTitle";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { WishlistGrid } from "../components/WishlistGrid";

interface Props {
  user: User;
}

export const WishlistPage: React.FC<Props> = ({ user }) => {
  const items = useData(() => db.getWishlist(), "wishlist");

  const handleToggle = (item: WishlistItem) => {
    // Regla: si está tomado por otro y no soy admin, no hago nada
    if (item.isTaken && item.takenByUserId && item.takenByUserId !== user.id && !user.isAdmin) {
      return;
    }
    db.toggleWishlistItem(item.id, user.id);
  };

  return (
    <>
      <PageTitle
        title="Lista de deseos 🎁"
        subtitle="Elegí qué te gustaría regalar (solo o con más gente)."
      />
      <p className="text-xs text-gray-400 mb-4">
        Podés tocar un ítem para marcarlo como tu regalo. Si cambiás de idea,
        tocás de nuevo y se libera. Si ya lo tomó otra persona, sólo un admin
        puede cambiarlo.
      </p>
      <WishlistGrid items={items} user={user} onToggle={handleToggle} />
    </>
  );
};
