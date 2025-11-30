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

export interface MusicComment {
  id: string;
  userId: string;
  text: string;
  createdAt: string; // ISO string
}
