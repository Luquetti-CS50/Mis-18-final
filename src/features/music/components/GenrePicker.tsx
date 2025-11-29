// src/features/music/components/GenrePicker.tsx
import React, { useState, useMemo } from "react";
import { NeonCard } from "../../../components/ui/NeonCard";
import { NeonButton } from "../../../components/ui/NeonButton";
import { Badge } from "../../../components/ui/Badge";
import type { MusicPreference, User } from "../../../types";
import { db, VALID_GENRES } from "../../../lib/db";

interface Props {
  user: User;
  preferences: MusicPreference[];
}

// Extra géneros para hacer la lista bastante más larga
const EXTRA_GENRES = [
  "salsa",
  "bachata",
  "merengue",
  "tango",
  "flamenco",
  "bolero",
  "ranchera",
  "banda",
  "mariachi",
  "samba",
  "bossa nova",
  "reggae",
  "blues",
  "folk",
  "country",
  "r&b",
];

const ALL_GENRES: string[] = Array.from(
  new Set([...VALID_GENRES, ...EXTRA_GENRES])
).sort();

// Normalización básica: minúsculas, sin tildes, espacios comprimidos
const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");

const GENRE_SYNONYMS: Record<string, string> = {
  // Español / inglés / variantes que mapean a lo mismo
  rock: "rock",
  "rock en espanol": "rock",
  "rock en español": "rock",
  pop: "pop",
  "latin pop": "pop",
  "pop latino": "pop",
  reggaeton: "reggaeton",
  regueton: "reggaeton",
  "reggaeton latino": "reggaeton",
  trap: "trap",
  "trap latino": "trap",
  "hip hop": "hip hop",
  "hip-hop": "hip hop",
  hiphop: "hip hop",
  electronica: "electronica",
  electronic: "electronica",
  "electronic music": "electronica",
  edm: "electronica",
  dance: "electronica",
  house: "house",
  techno: "techno",
  cumbia: "cumbia",
  cuarteto: "cuarteto",
  salsa: "salsa",
  bachata: "bachata",
  merengue: "merengue",
  folklore: "folk",
  folk: "folk",
  country: "country",
  jazz: "jazz",
  blues: "blues",
  metal: "metal",
  "heavy metal": "metal",
  clasica: "clasica",
  classical: "clasica",
  disco: "disco",
  funk: "funk",
  reggae: "reggae",
};

// Distancia de edición simple para sugerir géneros cercanos
const levenshtein = (a: string, b: string): number => {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
};

export const GenrePicker: React.FC<Props> = ({ user, preferences }) => {
  const [tagInput, setTagInput] = useState("");
  const [tagError, setTagError] = useState<string | null>(null);
  const [suggested, setSuggested] = useState<string | null>(null);

  const myPrefs = useMemo(
    () => preferences.filter((p) => p.userId === user.id),
    [preferences, user.id]
  );

  const handleAdd = () => {
    const raw = tagInput.trim();
    if (!raw) return;

    const norm = normalize(raw);

    // Reset mensajes
    setTagError(null);
    setSuggested(null);

    // Chequeo si ya existe para este usuario
    const existing = myPrefs.find(
      (p) => normalize(p.genre) === norm || normalize(p.genre) === GENRE_SYNONYMS[norm]
    );
    if (existing) {
      setTagError("Ya agregaste este género.");
      return;
    }

    // Coincidencia exacta en la lista ampliada
    if (ALL_GENRES.map(normalize).includes(norm)) {
      const canonical =
        GENRE_SYNONYMS[norm] ??
        ALL_GENRES.find((g) => normalize(g) === norm) ??
        raw;

      db.addPreference({
        id: Date.now().toString(),
        userId: user.id,
        genre: canonical,
      });
      setTagInput("");
      return;
    }

    // Intentar mapear por sinónimo directo
    const alias = GENRE_SYNONYMS[norm];
    if (alias) {
      db.addPreference({
        id: Date.now().toString(),
        userId: user.id,
        genre: alias,
      });
      setTagInput("");
      return;
    }

    // Buscar el género más cercano para "¿Quisiste poner X?"
    let best: { genre: string; distance: number } | null = null;
    const candidates = [
      ...ALL_GENRES,
      ...Object.keys(GENRE_SYNONYMS),
    ].map((g) => normalize(g));

    for (const cand of candidates) {
      const d = levenshtein(norm, cand);
      if (!best || d < best.distance) {
        best = { genre: cand, distance: d };
      }
    }

    if (best && best.distance <= 2) {
      // Buscar la etiqueta "bonita" original
      const canonical =
        GENRE_SYNONYMS[best.genre] ??
        ALL_GENRES.find((g) => normalize(g) === best!.genre) ??
        best.genre;
      setSuggested(canonical);
      setTagError(
        `No encontré "${raw}". ¿Quisiste poner "${canonical}"?`
      );
    } else {
      setTagError(
        "No lo tengo en la lista. Probá con un género más estándar (cumbia, reggaeton, rock, pop, etc.)."
      );
    }
  };

  const handleAcceptSuggestion = () => {
    if (!suggested) return;
    db.addPreference({
      id: Date.now().toString(),
      userId: user.id,
      genre: suggested,
    });
    setTagInput("");
    setSuggested(null);
    setTagError(null);
  };

  const handleRemove = (id: string) => {
    db.removePreference(id);
  };

  const sortedMyPrefs = useMemo(
    () =>
      [...myPrefs].sort((a, b) =>
        a.genre.localeCompare(b.genre, "es", { sensitivity: "base" })
      ),
    [myPrefs]
  );

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Géneros que te gustan
      </h3>
      <p className="text-xs text-gray-400 mb-2">
        Escribí algunos géneros que te gusten. Vamos a usarlos para equilibrar
        la playlist (cena, baile, rock, etc.). Sólo se cuentan géneros válidos,
        así que si escribís algo raro te voy a sugerir el más cercano.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            setTagError(null);
            setSuggested(null);
          }}
          className="flex-1 bg-[#111] border border-[#333] rounded-md px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-400"
          placeholder="Ej: cumbia, reggaeton, rock, salsa..."
        />
        <NeonButton type="button" variant="primary" onClick={handleAdd}>
          Agregar género
        </NeonButton>
      </div>
      {tagError && (
        <div className="mt-1 text-[11px] text-red-400">
          {tagError}{" "}
          {suggested && (
            <button
              type="button"
              onClick={handleAcceptSuggestion}
              className="underline text-cyan-300 ml-1"
            >
              Usar "{suggested}"
            </button>
          )}
        </div>
      )}
      {!tagError && (
        <p className="mt-1 text-[11px] text-gray-500">
          Algunos ejemplos: {ALL_GENRES.slice(0, 8).join(", ")}...
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {sortedMyPrefs.length === 0 && (
          <p className="text-xs text-gray-500">
            Todavía no agregaste ningún género.
          </p>
        )}
        {sortedMyPrefs.map((pref) => (
          <Badge key={pref.id} onRemove={() => handleRemove(pref.id)}>
            {pref.genre}
          </Badge>
        ))}
      </div>
    </NeonCard>
  );
};
