// src/lib/db/seeds.ts
import type { User } from "../../types/user";
import type { Table } from "../../types/table";
import type { WishlistItem } from "../../types/wishlist";
import type { Song } from "../../types/song";

export const SEED_USERS: User[] = [
  // Admin principal
  {
    id: "u1",
    name: "Luca Verón",
    normalizedName: "luca veron",
    isAdmin: true,
  },
  { id: "u2", name: "María Gómez", normalizedName: "maria gomez" },
  { id: "u3", name: "Carlos López", normalizedName: "carlos lopez" },
  { id: "u4", name: "Ana Torres", normalizedName: "ana torres" },
  { id: "u5", name: "Pedro Ruiz", normalizedName: "pedro ruiz" },
  { id: "u6", name: "Sofía Diaz", normalizedName: "sofia diaz" },
  { id: "u7", name: "Lucas M", normalizedName: "lucas m" },
  { id: "u8", name: "Valentina R", normalizedName: "valentina r" },
  {
    id: "u9",
    name: "Admin User",
    normalizedName: "admin",
    isAdmin: true,
  },
];

export const SEED_TABLES: Table[] = Array.from({ length: 10 }).map(
  (_, i) => ({
    id: `t${i + 1}`,
    name: `Mesa ${i + 1}`,
    capacity: 10,
  })
);

export const SEED_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    name: "Auriculares Sony",
    imageUrl: "https://picsum.photos/200/200?random=1",
    isTaken: false,
  },
  {
    id: "w2",
    name: "Gift Card Zara",
    imageUrl: "https://picsum.photos/200/200?random=2",
    isTaken: false,
  },
  {
    id: "w3",
    name: "Entrada Concierto",
    imageUrl: "https://picsum.photos/200/200?random=3",
    isTaken: false,
  },
  {
    id: "w4",
    name: "Zapatillas Nike",
    imageUrl: "https://picsum.photos/200/200?random=4",
    isTaken: true,
    takenByUserId: "u2",
  },
  {
    id: "w5",
    name: "Libro de Diseño",
    imageUrl: "https://picsum.photos/200/200?random=5",
    isTaken: false,
  },
  {
    id: "w6",
    name: "Cámara Instax",
    imageUrl: "https://picsum.photos/200/200?random=6",
    isTaken: false,
  },
];

export const MOCK_SONGS_DB: Partial<Song>[] = [
  {
    title: "Monaco",
    artist: "Bad Bunny",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=11",
    platformUrl: "https://open.spotify.com/track/xxxx",
  },
  {
    title: "Perro Negro",
    artist: "Bad Bunny, Feid",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=12",
    platformUrl: "https://open.spotify.com/track/yyyy",
  },
  {
    title: "Givenchy",
    artist: "Duki",
    platform: "youtube",
    thumbnailUrl: "https://picsum.photos/100/100?random=13",
    platformUrl: "https://www.youtube.com/watch?v=zzzz",
  },
  {
    title: "She Don't Give a FO",
    artist: "Duki, Khea",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=14",
    platformUrl: "https://open.spotify.com/track/aaaa",
  },
  {
    title: "Yellow",
    artist: "Coldplay",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=15",
    platformUrl: "https://open.spotify.com/track/bbbb",
  },
  {
    title: "Viva La Vida",
    artist: "Coldplay",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=16",
    platformUrl: "https://open.spotify.com/track/cccc",
  },
  {
    title: "Lala",
    artist: "Myke Towers",
    platform: "spotify",
    thumbnailUrl: "https://picsum.photos/100/100?random=17",
    platformUrl: "https://open.spotify.com/track/dddd",
  },
];
