// src/features/music/components/GenrePicker.tsx
import React, { useState } from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { Badge } from "../../../components/ui/Badge";
import type { MusicPreference, User } from "../../../types";
import { db, VALID_GENRES } from "../../../lib/db";

interface Props {
  user: User;
  preferences: MusicPreference[];
}

export const GenrePicker: React.FC<Props> = ({ user, preferences }) => {
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState("");

  const myPrefs = preferences.filter((p) => p.userId === user.id);

  const handleAddGenre = () => {
    setTagError("");
    const value = tagInput.trim().toLowerCase();
    if (!value) return;

    if (myPrefs.some((p) => p.genre === value)) {
      setTagError("Ese género ya lo agregaste.");
      return;
    }

    if (!VALID_GENRES.includes(value)) {
      setTagError(
        "No lo tengo en la lista. Probá con algo como 'cumbia', 'reggaeton', 'trap', 'rock'..."
      );
      return;
    }

    db.addPreference({
      id: Date.now().toString(),
      userId: user.id,
      genre: value,
    });
    setTagInput("");
  };

  const handleRemove = (id: string) => {
    db.removePreference(id);
  };

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Géneros que te gustan
      </h3>
      <p className="text-xs text-gray-400 mb-3">
        Sumá algunos géneros para tener una idea rápida del clima musical.
      </p>

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            setTagError("");
          }}
          className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-2 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
          placeholder="Ej: cumbia, rock, reggaeton..."
        />
        <NeonButton type="button" variant="secondary" onClick={handleAddGenre}>
          Agregar
        </NeonButton>
      </div>
      {tagError && (
        <p className="text-xs text-red-400 mb-2">{tagError}</p>
      )}

      <div className="mt-2 flex flex-wrap">
        {myPrefs.length === 0 && (
          <p className="text-xs text-gray-500">
            Todavía no agregaste ningún género.
          </p>
        )}
        {myPrefs.map((pref) => (
          <Badge key={pref.id} onRemove={() => handleRemove(pref.id)}>
            {pref.genre}
          </Badge>
        ))}
      </div>
    </NeonCard>
  );
};
