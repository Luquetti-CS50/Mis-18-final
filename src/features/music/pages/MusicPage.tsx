// src/features/music/pages/MusicPage.tsx
import React, { useState, useMemo } from "react";
import type { User, Song } from "../../../types";
import { PageTitle } from "../../../components/ui/PageTitle";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";
import { MusicCommentCard } from "../components/MusicCommentCard";
import { GenrePicker } from "../components/GenrePicker";
import { SongSearch } from "../components/SongSearch";

interface Props {
  user: User;
}

export const MusicPage: React.FC<Props> = ({ user }) => {
  const [comment, setComment] = useState(user.musicComment ?? "");
  const preferences = useData(() => db.getPreferences(), "prefs");
  const songs = useData(() => db.getSongs(), "songs");

  const mySongs: Song[] = useMemo(
    () => songs.filter((s) => s.suggestedByUserId === user.id),
    [songs, user.id]
  );

  const handleSaveComment = () => {
    db.updateUser({ ...user, musicComment: comment });
    alert("¡Comentario guardado! 💾");
  };

  return (
    <>
      <PageTitle
        title="DJ Zone 🎧"
        subtitle="Ayudanos a armar la playlist perfecta."
      />
      <MusicCommentCard
        comment={comment}
        onChange={setComment}
        onSave={handleSaveComment}
      />
      <GenrePicker user={user} preferences={preferences} />
      <SongSearch user={user} mySongs={mySongs} />
    </>
  );
};
