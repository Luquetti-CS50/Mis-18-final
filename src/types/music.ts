// src/types/music.ts
export interface MusicPreference {
  id: string;
  userId: string;
  genre: string;
}

export interface MusicGenreCount {
  name: string;
  value: number;
}
