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

  // --- Users ---
  getUsers(): User[] {
    return this.load<User[]>("users", SEED_USERS);
  }

  /**
   * Versión original de login (ya casi no la usamos directamente),
   * la dejamos por compatibilidad.
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
        u.id === updatedUser.id ? updatedUser : u
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
          s.artist?.toLowerCase().includes(q)
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
          s.suggestedByUserId === song.suggestedByUserId
      )
    ) {
      songs.push(song);
      this.save("songs", songs);
    }
  }

  // --- Music Preferences ---
  getPreferences(): MusicPreference[] {
    return this.load<MusicPreference[]>("prefs", []);
  }

  addPreference(pref: MusicPreference) {
    const prefs = this.getPreferences();
    prefs.push(pref);
    this.save("prefs", prefs);
  }

  removePreference(id: string) {
    const prefs = this.getPreferences().filter((p) => p.id !== id);
    this.save("prefs", prefs);
  }

  // --- Music Comments (nuevo modelo) ---
  getMusicComments(): MusicComment[] {
    return this.load<MusicComment[]>("musicComments", []);
  }

  /**
   * Agrega un nuevo comentario musical para un usuario.
   * También mantiene user.musicComment con el último comentario,
   * para que Home siga sabiendo si ya comentó algo.
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

    comments.push(newComment);
    this.save("musicComments", comments);

    // Actualizamos el user.musicComment con el último comentario
    const users = this.getUsers();
    const existing = users.find((u) => u.id === userId);
    if (existing) {
      const updatedUser: User = {
        ...existing,
        musicComment: trimmed,
      };
      const nextUsers = users.map((u) =>
        u.id === userId ? updatedUser : u
      );
      this.save("users", nextUsers);
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
      u.id === userId ? updatedUser : u
    );
    this.save("users", nextUsers);
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
  }
}

export const db = new MockDB();
