// src/features/music/components/SongSearch.tsx
import React, { useState } from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { PlayCircle, ExternalLink } from "lucide-react";
import type { Song, User } from "../../../types";
import { db } from "../../../lib/db";

interface Props {
  user: User;
  mySongs: Song[];
}

export const SongSearch: React.FC<Props> = ({ user, mySongs }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const res = await db.searchSongs(query);
      setResults(res);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSong = (song: Song) => {
    db.addSong({ ...song, suggestedByUserId: user.id });
    setQuery("");
    setResults([]);
  };

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Buscar canciones
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        Buscá temas para sugerirlos. Es una búsqueda mockeada, pero respeta la
        idea de la app real.
      </p>

      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
          placeholder="Ej: Duki, Bad Bunny, Coldplay..."
        />
        <NeonButton
          type="button"
          variant="secondary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          <PlayCircle size={14} className="mr-1" />
          {isSearching ? "Buscando..." : "Buscar"}
        </NeonButton>
      </div>

      {results.length > 0 && (
        <div className="mb-4 space-y-2 max-h-48 overflow-auto">
          {results.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-black/40 border border-gray-800 hover:border-cyan-500/60 cursor-pointer"
              onClick={() => handleSelectSong(song)}
            >
              <img
                src={song.thumbnailUrl}
                alt={song.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold text-white">
                  {song.title}
                </p>
                <p className="text-[11px] text-gray-400">
                  {song.artist} • {song.platform.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-gray-800 pt-3 mt-3">
        <h4 className="text-xs font-semibold text-white mb-2">
          Tus canciones sugeridas
        </h4>
        {mySongs.length === 0 ? (
          <p className="text-xs text-gray-500">
            Todavía no agregaste canciones.
          </p>
        ) : (
          <div className="space-y-2 max-h-40 overflow-auto text-xs">
            {mySongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-2 py-1 border-b border-gray-800 last:border-b-0"
              >
                <span className="font-medium text-white">{song.title}</span>
                <span className="text-gray-400">– {song.artist}</span>
                {song.platformUrl && (
                  <a
                    href={song.platformUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-cyan-300 hover:text-white flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    Abrir
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </NeonCard>
  );
};
