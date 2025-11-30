// src/features/music/pages/MusicPage.tsx
import React, { useState, useMemo } from "react";
import type { User, Song, MusicComment } from "../../../types";
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
  const [commentText, setCommentText] = useState("");

  const preferences = useData(() => db.getPreferences(), "prefs");
  const songs = useData(() => db.getSongs(), "songs");
  const allComments = useData(
    () => db.getMusicComments(),
    "musicComments"
  );
  const users = useData(() => db.getUsers(), "users");

  const mySongs = useMemo(
    () => songs.filter((s: Song) => s.suggestedByUserId === user.id),
    [songs, user.id]
  );

  const myComments = useMemo(
    () =>
      allComments
        .filter((c: MusicComment) => c.userId === user.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [allComments, user.id]
  );

  const isAdmin = user.isAdmin === true;

  const [showAdminComments, setShowAdminComments] = useState(false);

  const sortedPublicSongs = useMemo(
    () =>
      [...songs].sort((a, b) =>
        a.title.localeCompare(b.title, "es", { sensitivity: "base" })
      ),
    [songs]
  );

  const handleSaveComment = () => {
    const text = commentText.trim();
    if (!text) return;

    db.addMusicComment(user.id, text);
    setCommentText("");
  };

  const handleClearComment = () => {
    setCommentText("");
  };

  const handleDeleteComment = (id: string) => {
    db.deleteMusicComment(id);
  };

  const commentsForAdmin = useMemo(() => {
    if (!isAdmin) return [];
    return [...allComments].sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
  }, [allComments, isAdmin]);

  const getUserDisplayName = (userId: string): string => {
    const u = users.find((x) => x.id === userId);
    if (!u) return "Invitado desconocido";
    const nick =
      u.nicknames && u.nicknames.length > 0
        ? u.nicknames[0]
        : u.name.split(" ")[0];
    return nick;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <PageTitle
        title="DJ Zone 🎧"
        subtitle="Ayudanos a armar la playlist perfecta."
      />

      {/* Comentario general sobre la música (creación de nuevos comentarios) */}
      <MusicCommentCard
        comment={commentText}
        onChange={setCommentText}
        onSave={handleSaveComment}
        onClear={handleClearComment}
      />

      {/* Si es admin, botón para ver todos los comentarios */}
      {isAdmin && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowAdminComments(true)}
            className="text-[11px] px-3 py-[6px] rounded-lg border border-cyan-400/70 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(34,211,238,0.6)] transition"
          >
            Ver comentarios de todos
          </button>
        </div>
      )}

      {/* Tus comentarios personales */}
      <NeonCard className="mt-4 cursor-default">
        <h3 className="text-sm font-semibold text-white mb-1">
          Tus comentarios
        </h3>
        {myComments.length === 0 ? (
          <p className="text-xs text-gray-400">
            Todavía no dejaste ningún comentario. Escribí uno arriba y
            guardalo para que lo vea el DJ. 🎶
          </p>
        ) : (
          <div className="mt-1 max-h-40 overflow-y-auto space-y-1 text-xs text-gray-100 pr-1">
            {myComments.map((c) => (
              <div
                key={c.id}
                className="flex items-start justify-between gap-2 border-b border-white/5 pb-1 last:border-b-0"
              >
                <div>
                  <p className="text-[11px] text-gray-400">
                    {formatDate(c.createdAt)}
                  </p>
                  <p>{c.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteComment(c.id)}
                  className="text-[11px] text-red-300 hover:text-red-200 hover:underline"
                >
                  Borrar
                </button>
              </div>
            ))}
          </div>
        )}
      </NeonCard>

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
            Esta lista es pública para que todos vean qué se pidió hasta
            ahora.
          </p>
          <div className="max-h-56 overflow-y-auto pr-1 space-y-1 text-xs text-gray-200">
            {sortedPublicSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center gap-2 border-b border-white/5 pb-1 last:border-b-0"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400/80" />
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

      {/* Modal admin: ver comentarios de todos los usuarios */}
      {isAdmin && showAdminComments && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md mx-4">
            <NeonCard className="relative max-h-[70vh] overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-white">
                  Comentarios de todos
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAdminComments(false)}
                  className="text-xs text-gray-300 hover:text-white"
                >
                  Cerrar
                </button>
              </div>
              {commentsForAdmin.length === 0 ? (
                <p className="text-xs text-gray-400">
                  Todavía nadie dejó comentarios.
                </p>
              ) : (
                <div className="max-h-[55vh] overflow-y-auto pr-1 space-y-2 text-xs text-gray-100">
                  {commentsForAdmin.map((c) => (
                    <div
                      key={c.id}
                      className="border-b border-white/10 pb-1 last:border-b-0"
                    >
                      <p className="text-[11px] text-gray-400">
                        <span className="font-semibold text-cyan-200">
                          {getUserDisplayName(c.userId)}
                        </span>{" "}
                        · {formatDate(c.createdAt)}
                      </p>
                      <p>{c.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </NeonCard>
          </div>
        </div>
      )}
    </>
  );
};
