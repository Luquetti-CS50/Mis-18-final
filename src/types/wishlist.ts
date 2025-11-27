// src/types/wishlist.ts
export interface WishlistItem {
  id: string;
  name: string;
  imageUrl: string;
  linkUrl?: string;
  isTaken: boolean;
  takenByUserId?: string;
}
