// src/features/music/components/MySongsList.tsx
import React from "react";
import type { Song } from "../../../types";

interface Props {
  songs: Song[];
}

export const MySongsList: React.FC<Props> = ({ songs }) => {
  if (songs.length === 0) return null;
  return (
    <div className="space-y-2 text-xs text-gray-200">
      {songs.map((song) => (
        <div key={song.id}>
          <strong>{song.title}</strong> – {song.artist}
        </div>
      ))}
    </div>
  );
};
