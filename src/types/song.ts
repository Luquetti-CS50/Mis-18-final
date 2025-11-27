// src/types/song.ts
export type SongPlatform = "spotify" | "youtube";

export interface Song {
  id: string;
  title: string;
  artist: string;
  platform: SongPlatform;
  thumbnailUrl: string;
  platformUrl?: string;
  suggestedByUserId: string;
}
