// src/lib/db/db.ts
import type {
  User,
  Table,
  Song,
  WishlistItem,
  MusicPreference,
  MusicComment,
} from "../../types";
import { normalizeName } from "./normalize";
import { SEED_USERS, SEED_TABLES, SEED_WISHLIST, MOCK_SONGS_DB } from "./seeds";
import { supabase } from "./supabaseClient";

class MockDB {
  private load<T>(key: string, seed: T): T {
    try {
      const raw = localStorage.getItem(`my18app_${key}`);
      if (!raw) {
        localStorage.setItem(`my18app_${key}`, JSON.stringify(seed));
        return seed;
      }
      return JSON.parse(raw) as T;
    } catch {
      localStorage.setItem(`my18app_${key}`, JSON.stringify(seed));
      return seed;
    }
  }

  private save(key: string, data: any) {
    localStorage.setItem(`my18app_${key}`, JSON.stringify(data));
    window.dispatchEvent(new Event(`db_update_${key}`));
  }

  // --- Supabase: sync inicial -> localStorage ---
  async syncFromSupabase() {
    try {
      // 1) USERS
      {
        const { data, error } = await supabase.from("users").select("*");
        if (!error && data) {
          const users: User[] = data.map((row: any) => ({
            id: row.id,
            name: row.name,
            normalizedName: row.normalized_name,
            nicknames: undefined,
            familyCode: (row as any).family_code ?? undefined,
            attendanceStatus: (row as any).attendance_status ?? "pending",
            tableId: row.table_id ?? null,
            seatAssignedByUserId:
              (row as any).seat_assigned_by_user_id ?? null,
            musicComment: row.music_comment ?? undefined,
            isAdmin: !!row.is_admin,
            hasLoggedIn: !!row.has_logged_in,
            isChild: !!row.is_child,
          }));
          this.save("users", users);
        } else if (error) {
          console.error("[Supabase][sync users] error", error);
        }
      }

      // 2) TABLES
      {
        const { data, error } = await supabase.from("tables").select("*");
        if (!error && data) {
          const tables: Table[] = data.map((row: any) => ({
            id: row.id,
            name: row.name,
            capacity: row.capacity,
          }));
          this.save("tables", tables);
        } else if (error) {
          console.error("[Supabase][sync tables] error", error);
        }
      }

      // 3) WISHLIST
      {
        const { data, error } = await supabase
          .from("wishlist_items")
          .select("*");
        if (!error && data) {
          const seedMap = new Map(
            SEED_WISHLIST.map((item) => [item.id, item]),
          );

          const itemsFromDb: WishlistItem[] = [];
          for (const row of data) {
            const base = seedMap.get(row.id);
            if (!base) {
              itemsFromDb.push({
                id: row.id,
                name: row.id,
                imageUrl: "",
                isTaken: !!row.is_taken,
                takenByUserId: row.taken_by_user_id ?? undefined,
              });
              continue;
            }
            itemsFromDb.push({
              id: base.id,
              name: base.name,
              imageUrl: base.imageUrl,
              linkUrl: base.linkUrl,
              isTaken: !!row.is_taken,
              takenByUserId: row.taken_by_user_id ?? undefined,
            });
          }

          // Agregamos los del seed que no existan en la DB
          for (const base of SEED_WISHLIST) {
            if (!itemsFromDb.some((i) => i.id === base.id)) {
              itemsFromDb.push({
                ...base,
                isTaken: false,
                takenByUserId: undefined,
              });
            }
          }

          this.save("wishlist", itemsFromDb);
        } else if (error) {
          console.error("[Supabase][sync wishlist] error", error);
        }
      }

      // 4) MUSIC PREFERENCES
      {
        const { data, error } = await supabase
          .from("music_preferences")
          .select("*");
        if (!error && data) {
          const prefs: MusicPreference[] = data.map((row: any) => ({
            id: row.id,
            userId: row.user_id,
            genre: row.genre,
          }));
          this.save("prefs", prefs);
        } else if (error) {
          console.error("[Supabase][sync prefs] error", error);
        }
      }

      // 5) SONGS
      {
        const { data, error } = await supabase.from("songs").select("*");
        if (!error && data) {
          const songs: Song[] = data.map((row: any) => ({
            id: row.id,
            title: row.title,
            artist: row.artist,
            platform: row.platform,
            thumbnailUrl: row.thumbnail_url,
            platformUrl: row.platform_url ?? undefined,
            suggestedByUserId: row.suggested_by_user_id,
          }));
          this.save("songs", songs);
        } else if (error) {
          console.error("[Supabase][sync songs] error", error);
        }
      }

      // 6) MUSIC COMMENTS
      {
        const { data, error } = await supabase
          .from("music_comments")
          .select("*");
        if (!error && data) {
          const comments: MusicComment[] = data.map((row: any) => ({
            id: row.id,
            userId: row.user_id,
            text: row.text,
            createdAt: row.created_at,
          }));
          this.save("musicComments", comments);
        } else if (error) {
          console.error("[Supabase][sync music_comments] error", error);
        }
      }
    } catch (err) {
      console.error("[Supabase][syncFromSupabase] error", err);
    }
  }

  // --- Users ---
  getUsers(): User[] {
    return this.load<User[]>("users", SEED_USERS);
  }

  /**
   * Versión original de login (compatibilidad).
   */
  login(name: string): User | null {
    const users = this.getUsers();
    const normalized = normalizeName(name);
    const user = users.find((u) => u.normalizedName === normalized);

    // Si no existe o es un child, no permite login
    if (!user || user.isChild) return null;

    if (!user.hasLoggedIn) {
      const updatedUser: User = { ...user, hasLoggedIn: true };
      const updatedUsers = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u,
      );
      this.save("users", updatedUsers);
      return updatedUser;
    }

    return user;
  }

  /**
   * Actualiza parcialmente un usuario.
   */
  updateUser(userId: string, patch: Partial<User>): User | null {
    const users = this.getUsers();
    const existing = users.find((u) => u.id === userId);
    if (!existing) return null;

    const updated: User = { ...existing, ...patch };
    const next = users.map((u) => (u.id === userId ? updated : u));
    this.save("users", next);

    // Espejo en Supabase (no bloqueamos la UI si falla)
    try {
      const payload: any = {
        name: updated.name,
        normalized_name: updated.normalizedName,
        table_id: (updated as any).tableId ?? null,
        music_comment: updated.musicComment ?? null,
        is_admin: !!updated.isAdmin,
        has_logged_in: !!updated.hasLoggedIn,
        is_child: !!updated.isChild,
      };

      if ((updated as any).attendanceStatus !== undefined) {
        payload.attendance_status = (updated as any).attendanceStatus ?? null;
      }
      if ((updated as any).seatAssignedByUserId !== undefined) {
        payload.seat_assigned_by_user_id =
          (updated as any).seatAssignedByUserId ?? null;
      }

      void supabase.from("users").update(payload).eq("id", updated.id);
    } catch (err) {
      console.error("[Supabase][updateUser] error", err);
    }

    return updated;
  }

  // --- Tables ---
  getTables(): Table[] {
    return this.load<Table[]>("tables", SEED_TABLES);
  }

  // --- Songs ---
  getSongs(): Song[] {
    return this.load<Song[]>("songs", []);
  }

  async searchSongs(query: string): Promise<Song[]> {
    if (!query.trim()) return [];

    return new Promise((resolve) => {
      const q = query.toLowerCase();
      const results = MOCK_SONGS_DB.filter(
        (s) =>
          s.title?.toLowerCase().includes(q) ||
          s.artist?.toLowerCase().includes(q),
      );

      const songs: Song[] = results.map((r, i) => ({
        id: `search_${Date.now()}_${i}`,
        title: r.title ?? "Canción sin título",
        artist: r.artist ?? "Artista desconocido",
        platform: r.platform ?? "spotify",
        thumbnailUrl: r.thumbnailUrl ?? "https://via.placeholder.com/100",
        platformUrl: r.platformUrl,
        suggestedByUserId: "",
      }));

      setTimeout(() => resolve(songs), 400);
    });
  }

  addSong(song: Song) {
    const songs = this.getSongs();
    // Evitar duplicados exactos (mismo título+artista+user)
    if (
      !songs.some(
        (s) =>
          s.title.toLowerCase() === song.title.toLowerCase() &&
          s.artist.toLowerCase() === song.artist.toLowerCase() &&
          s.suggestedByUserId === song.suggestedByUserId,
      )
    ) {
      const next = [...songs, song];
      this.save("songs", next);

      // Espejo en Supabase
      try {
        void supabase.from("songs").insert({
          id: song.id,
          title: song.title,
          artist: song.artist,
          platform: song.platform,
          thumbnail_url: song.thumbnailUrl,
          platform_url: song.platformUrl ?? null,
          suggested_by_user_id: song.suggestedByUserId,
        });
      } catch (err) {
        console.error("[Supabase][addSong] error", err);
      }
    }
  }

  // --- Music Preferences ---
  getPreferences(): MusicPreference[] {
    return this.load<MusicPreference[]>("prefs", []);
  }

  addPreference(pref: MusicPreference) {
    const prefs = this.getPreferences();
    const next = [...prefs, pref];
    this.save("prefs", next);

    // Espejo en Supabase
    try {
      void supabase.from("music_preferences").insert({
        id: pref.id,
        user_id: pref.userId,
        genre: pref.genre,
      });
    } catch (err) {
      console.error("[Supabase][addPreference] error", err);
    }
  }

  removePreference(id: string) {
    const prefs = this.getPreferences().filter((p) => p.id !== id);
    this.save("prefs", prefs);

    // Espejo en Supabase
    try {
      void supabase.from("music_preferences").delete().eq("id", id);
    } catch (err) {
      console.error("[Supabase][removePreference] error", err);
    }
  }

  // --- Music Comments (nuevo modelo) ---
  getMusicComments(): MusicComment[] {
    return this.load<MusicComment[]>("musicComments", []);
  }

  /**
   * Agrega un nuevo comentario musical para un usuario.
   * También mantiene user.musicComment con el último comentario.
   */
  addMusicComment(userId: string, text: string): MusicComment {
    const trimmed = text.trim();
    if (!trimmed) {
      throw new Error("Comentario vacío");
    }

    const comments = this.getMusicComments();

    const newComment: MusicComment = {
      id: `mc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId,
      text: trimmed,
      createdAt: new Date().toISOString(),
    };

    const nextComments = [...comments, newComment];
    this.save("musicComments", nextComments);

    // Actualizamos el user.musicComment con el último comentario
    const users = this.getUsers();
    const existing = users.find((u) => u.id === userId);
    if (existing) {
      const updatedUser: User = {
        ...existing,
        musicComment: trimmed,
      };
      const nextUsers = users.map((u) =>
        u.id === userId ? updatedUser : u,
      );
      this.save("users", nextUsers);

      // Espejo en Supabase
      try {
        void supabase.from("music_comments").insert({
          id: newComment.id,
          user_id: userId,
          text: newComment.text,
          created_at: newComment.createdAt,
        });

        void supabase
          .from("users")
          .update({ music_comment: trimmed })
          .eq("id", userId);
      } catch (err) {
        console.error("[Supabase][addMusicComment] error", err);
      }
    }

    return newComment;
  }

  /**
   * Elimina un comentario. Recalcula user.musicComment para ese usuario:
   * - Si no quedan comentarios → undefined
   * - Si quedan → el texto del último comentario por fecha.
   */
  deleteMusicComment(commentId: string) {
    const comments = this.getMusicComments();
    const target = comments.find((c) => c.id === commentId);
    if (!target) return;

    const remaining = comments.filter((c) => c.id !== commentId);
    this.save("musicComments", remaining);

    const userId = target.userId;

    // Recalcular user.musicComment para ese usuario
    const users = this.getUsers();
    const existing = users.find((u) => u.id === userId);
    if (!existing) return;

    const userComments = remaining
      .filter((c) => c.userId === userId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

    const lastText = userComments.length
      ? userComments[userComments.length - 1].text
      : undefined;

    const updatedUser: User = {
      ...existing,
      musicComment: lastText,
    };

    const nextUsers = users.map((u) =>
      u.id === userId ? updatedUser : u,
    );
    this.save("users", nextUsers);

    // Espejo en Supabase
    try {
      void supabase.from("music_comments").delete().eq("id", commentId);

      void supabase
        .from("users")
        .update({ music_comment: lastText ?? null })
        .eq("id", userId);
    } catch (err) {
      console.error("[Supabase][deleteMusicComment] error", err);
    }
  }

  // --- Wishlist ---
  getWishlist(): WishlistItem[] {
    return this.load<WishlistItem[]>("wishlist", SEED_WISHLIST);
  }

  toggleWishlistItem(itemId: string, userId: string) {
    const items = this.getWishlist();
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    if (item.isTaken && item.takenByUserId === userId) {
      item.isTaken = false;
      item.takenByUserId = undefined;
    } else if (!item.isTaken) {
      item.isTaken = true;
      item.takenByUserId = userId;
    }
    this.save("wishlist", items);

    // Espejo en Supabase
    try {
      void supabase
        .from("wishlist_items")
        .update({
          is_taken: item.isTaken,
          taken_by_user_id: item.isTaken ? userId : null,
        })
        .eq("id", item.id);
    } catch (err) {
      console.error("[Supabase][toggleWishlistItem] error", err);
    }
  }
}

export const db = new MockDB();
