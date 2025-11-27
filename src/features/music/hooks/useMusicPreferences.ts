// src/features/music/hooks/useMusicPreferences.ts
import { useMemo } from "react";
import type { MusicPreference, User } from "../../../types";
import { useData } from "../../../lib/hooks/useData";
import { db } from "../../../lib/db";

export function useMusicPreferences(user: User) {
  const prefs = useData(() => db.getPreferences(), "prefs");

  const myPrefs = useMemo(
    () => prefs.filter((p) => p.userId === user.id),
    [prefs, user.id]
  );

  return { allPreferences: prefs, myPrefs };
}
