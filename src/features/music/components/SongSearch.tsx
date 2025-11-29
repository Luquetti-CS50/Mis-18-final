// src/features/music/components/SongSearch.tsx
import React, { useState } from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { PlayCircle, ExternalLink, AlertCircle } from "lucide-react";
import type { Song, User } from "../../../types";
import { db } from "../../../lib/db";

interface Props {
  user: User;
  mySongs: Song[];
  allSongs: Song[];
}

const normalizeKey = (title: string, artist: string) =>
  `${title}||${artist}`
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

export const SongSearch: React.FC<Props> = ({ user, mySongs, allSongs }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setWarning(null);
    try {
      const res = await db.searchSongs(query);
      setResults(res);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectSong = (song: Song) => {
    setWarning(null);
    const key = normalizeKey(song.title, song.artist);

    const myExisting = mySongs.find(
      (s) => normalizeKey(s.title, s.artist) === key
    );
    if (myExisting) {
      setWarning("Ya sugeriste esta canción.");
      return;
    }

    const otherExisting = allSongs.find(
      (s) =>
        normalizeKey(s.title, s.artist) === key &&
        s.suggestedByUserId !== user.id
    );
    if (otherExisting) {
      setWarning("Alguien ya sugirió esta canción.");
      return;
    }

    db.addSong({ ...song, suggestedByUserId: user.id });
    setQuery("");
    setResults([]);
  };

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Buscar canciones
      </h3>
      <p className="text-xs text-gray-400 mb-2">
        Buscá temas para la playlist. Más adelante esta sección se va a conectar
        con YouTube para traer nombre, artista, imagen y link automáticamente.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setWarning(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
          className="flex-1 bg-[#111] border border-[#333] rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
          placeholder="Ej: artista o nombre de la canción"
        />
        <NeonButton
          type="button"
          variant="primary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          <PlayCircle size={14} className="mr-1" />
          {isSearching ? "Buscando..." : "Buscar"}
        </NeonButton>
      </div>
      {warning && (
        <div className="mt-2 flex items-center text-[11px] text-amber-300">
          <AlertCircle size={12} className="mr-1" />
          {warning}
        </div>
      )}
      {results.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-400 mb-1">
            Resultados (mock de búsqueda, listo para conectar a YouTube):
          </p>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {results.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-3 border border-white/5 rounded-md px-2 py-1.5 bg-black/40"
              >
                {song.thumbnailUrl && (
                  <img
                    src={song.thumbnailUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <div className="text-xs font-semibold text-white">
                    {song.title}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {song.artist} ·{" "}
                    {song.platform === "youtube" ? "YouTube" : "Spotify"}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {song.platformUrl && (
                    <a
                      href={song.platformUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-cyan-300 hover:text-white flex items-center gap-1"
                    >
                      <ExternalLink size={12} />
                      Abrir
                    </a>
                  )}
                  <NeonButton
                    type="button"
                    variant="secondary"
                    className="text-[11px] px-2 py-1"
                    onClick={() => handleSelectSong(song)}
                  >
                    Sumar a la lista
                  </NeonButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </NeonCard>
  );
};
