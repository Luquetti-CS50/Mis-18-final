// src/features/music/pages/MusicPage.tsx
import React, { useState, useMemo } from "react";
import type { User, Song } from "../../../types";
import { PageTitle } from "../../../components/ui/PageTitle";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { MusicCommentCard } from "../components/MusicCommentCard";
import { GenrePicker } from "../components/GenrePicker";
import { SongSearch } from "../components/SongSearch";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  user: User;
}

export const MusicPage: React.FC<Props> = ({ user }) => {
  const [comment, setComment] = useState(user.musicComment ?? "");

  const preferences = useData(() => db.getPreferences(), "prefs");
  const songs = useData(() => db.getSongs(), "songs");

  const mySongs = useMemo(
    () => songs.filter((s: Song) => s.suggestedByUserId === user.id),
    [songs, user.id]
  );

  const handleSaveComment = () => {
    db.updateUser({ ...user, musicComment: comment.trim() || undefined });
  };

  const handleClearComment = () => {
    setComment("");
    db.updateUser({ ...user, musicComment: undefined });
  };

  const sortedPublicSongs = useMemo(
    () =>
      [...songs].sort((a, b) =>
        a.title.localeCompare(b.title, "es", { sensitivity: "base" })
      ),
    [songs]
  );

  return (
    <>
      <PageTitle
        title="DJ Zone 🎧"
        subtitle="Ayudanos a armar la playlist perfecta."
      />

      {/* Comentario general sobre la música (visible sólo para vos y en panel admin) */}
      <MusicCommentCard
        comment={comment}
        onChange={setComment}
        onSave={handleSaveComment}
        onClear={handleClearComment}
      />

      {/* Preferencias de géneros */}
      <GenrePicker user={user} preferences={preferences} />

      {/* Buscador + sugerencia de temas */}
      <SongSearch user={user} mySongs={mySongs} allSongs={songs} />

      {/* Lista pública de canciones sugeridas */}
      {sortedPublicSongs.length > 0 && (
        <NeonCard className="mt-4 cursor-default">
          <h3 className="text-sm font-semibold text-white mb-2">
            Canciones sugeridas por todos
          </h3>
          <p className="text-xs text-gray-400 mb-2">
            Esta lista es pública para todos los invitados.
          </p>
          <div className="max-h-56 overflow-y-auto pr-1 space-y-1 text-xs text-gray-200">
            {sortedPublicSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-2 border-b border-white/5 pb-1 last:border-b-0"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{song.title}</span>
                  <span className="text-[11px] text-gray-400">
                    {song.artist}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </NeonCard>
      )}
    </>
  );
};
