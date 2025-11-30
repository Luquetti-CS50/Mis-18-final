// src/lib/db/seeds.ts
import type { User } from "../../types/user";
import type { Table } from "../../types/table";
import type { WishlistItem } from "../../types/wishlist";
import type { Song } from "../../types/song";

export const SEED_USERS: User[] = [
  {
    id: "u1",
    name: "Zoe Bazán",
    normalizedName: "zoe bazan",
    nicknames: ["Amor", "Gor", "Cielo", "Lo"],
  },
  {
    id: "u2",
    name: "Paola Srur",
    normalizedName: "paola srur",
    nicknames: ["Pao"],
  },
  {
    id: "u3",
    name: "Joaquín Rodríguez",
    normalizedName: "joaquin rodriguez",
    nicknames: ["Coaco"],
  },
  {
    id: "u4",
    name: "Bautista Anchordoquy",
    normalizedName: "bautista anchordoquy",
    nicknames: ["Pancho"],
  },
  {
    id: "u5",
    name: "Antonella Frugotti",
    normalizedName: "antonella frugotti",
    nicknames: ["Antou"],
  },
  {
    id: "u6",
    name: "Nicolás Vélez",
    normalizedName: "nicolas velez",
    nicknames: ["Nico"],
  },
  {
    id: "u7",
    name: "Santino Vidal",
    normalizedName: "santino vidal",
    nicknames: ["Santi"],
  },
  {
    id: "u8",
    name: "Agustín Fatecha",
    normalizedName: "agustin fatecha",
    nicknames: ["Fate"],
  },
  {
    id: "u9",
    name: "Lourdes Salomon",
    normalizedName: "lourdes salomon",
    nicknames: ["Lou"],
  },
  {
    id: "u10",
    name: "Iara Villagra",
    normalizedName: "iara villagra",
    nicknames: ["Ia"],
  },
  {
    id: "u11",
    name: "Lorenzo Dupesso",
    normalizedName: "lorenzo dupesso",
    nicknames: ["Lolo"],
  },
  {
    id: "u12",
    name: "Franco Mena",
    normalizedName: "franco mena",
    nicknames: ["Franquito"],
  },
  {
    id: "u13",
    name: "Lautaro Cerdá",
    normalizedName: "lautaro cerda",
    nicknames: ["Lau"],
  },
  {
    id: "u14",
    name: "Ramiro Tello",
    normalizedName: "ramiro tello",
    nicknames: ["Rami"],
  },
  {
    id: "u15",
    name: "Santiago Monje",
    normalizedName: "santiago monje",
    nicknames: ["Monje"],
  },
  {
    id: "u16",
    name: "Malvina Toledo",
    normalizedName: "malvina toledo",
    nicknames: ["Malviu"],
  },
  {
    id: "u17",
    name: "Tiziana Carino",
    normalizedName: "tiziana carino",
    nicknames: ["Tizi"],
  },
  {
    id: "u18",
    name: "Lautaro Torga",
    normalizedName: "lautaro torga",
    nicknames: ["Torga"],
  },
  {
    id: "u19",
    name: "Morena Bracho",
    normalizedName: "morena bracho",
    nicknames: ["More"],
  },
  {
    id: "u20",
    name: "Felipe Salinas",
    normalizedName: "felipe salinas",
    nicknames: ["Feli"],
  },
  {
    id: "u21",
    name: "Gabriel Herrera",
    normalizedName: "gabriel herrera",
    nicknames: ["Gabo"],
  },
  {
    id: "u22",
    name: "Gustavo Peralta",
    normalizedName: "gustavo peralta",
    nicknames: ["Gusty"],
  },
  {
    id: "u23",
    name: "Zoe Bossie",
    normalizedName: "zoe bossie",
    nicknames: ["Zo"],
  },
  {
    id: "u24",
    name: "Nayla Gioncada",
    normalizedName: "nayla gioncada",
    nicknames: ["Nay"],
  },
  {
    id: "u25",
    name: "Belinda Alfaro",
    normalizedName: "belinda alfaro",
    nicknames: ["Belu"],
  },
  {
    id: "u26",
    name: "Bruno Frontini",
    normalizedName: "bruno frontini",
    nicknames: ["Bruno"],
  },
  {
    id: "u27",
    name: "Benja Schaff",
    normalizedName: "benja schaff",
    nicknames: ["Benja"],
  },
  {
    id: "u28",
    name: "Benja Ithurburu",
    normalizedName: "benja ithurburu",
    nicknames: ["Benja"],
  },
  {
    id: "u29",
    name: "Dante Lavín",
    normalizedName: "dante lavin",
    nicknames: ["Dan"],
  },
  {
    id: "u30",
    name: "Matías Galli",
    normalizedName: "matias galli",
    nicknames: ["Mati"],
  },
  {
    id: "u31",
    name: "Lucas Ávalos",
    normalizedName: "lucas avalos",
    nicknames: ["Tibu"],
  },
  {
    id: "u32",
    name: "Thiago Casarotti",
    normalizedName: "thiago casarotti",
    nicknames: ["Titi"],
  },
  {
    id: "u33",
    name: "Ana Molina",
    normalizedName: "ana molina",
    nicknames: ["Anita"],
  },
  {
    id: "u34",
    name: "Ivana Salas",
    normalizedName: "ivana salas",
    nicknames: ["Ivi"],
  },
  {
    id: "u35",
    name: "Camila Budiño",
    normalizedName: "camila budino",
    nicknames: ["Cami"],
  },
  {
    id: "u36",
    name: "Soledad Peola",
    normalizedName: "soledad peola",
    nicknames: ["Sole"],
  },
  {
    id: "u37",
    name: "Julieta Sena",
    normalizedName: "julieta sena",
    nicknames: ["Juli"],
  },
  {
    id: "u38",
    name: "Adriana Andrade",
    normalizedName: "adriana andrade",
    nicknames: ["Adri"],
  },
  {
    id: "u39",
    name: "Jaqui Petz",
    normalizedName: "jaqui petz",
    nicknames: ["Jaqui"],
  },
  {
    id: "u40",
    name: "Alejandra Cosella",
    normalizedName: "alejandra cosella",
    nicknames: ["Ale"],
  },

  /* ──────────────────────────────────────────── */
  /* 🔥 A PARTIR DE ACÁ = USUARIOS CON FAMILIA 🔥 */
  /* ──────────────────────────────────────────── */

  // Familia A
  {
    id: "A1",
    name: "Brisa Gaspari",
    normalizedName: "brisa gaspari",
    nicknames: ["Briu"],
    familyCode: "A",
  },
  {
    id: "A2",
    name: "Yrma Gerez",
    normalizedName: "yrma gerez",
    nicknames: ["Yrmis", "Nini"],
    familyCode: "A",
  },
  {
    id: "A3",
    name: "Víctor Gaspari",
    normalizedName: "victor gaspari",
    nicknames: ["Vic"],
    familyCode: "A",
  },

  // Familia B
  {
    id: "B1",
    name: "Eduardo Millassón",
    normalizedName: "eduardo millasson",
    nicknames: ["Edo"],
    familyCode: "B",
  },
  {
    id: "B2",
    name: "Felipe Millassón",
    normalizedName: "felipe millasson",
    nicknames: ["Feli"],
    familyCode: "B",
  },

  // Familia C
  {
    id: "C1",
    name: "Sabrina Oviedo",
    normalizedName: "sabrina oviedo",
    nicknames: ["Ma"],
    familyCode: "C",
    isAdmin: true,
  },
  {
    id: "C2",
    name: "Darío Verón",
    normalizedName: "dario veron",
    nicknames: ["Pa"],
    familyCode: "C",
  },
  {
    id: "C3",
    name: "Felipe Verón",
    normalizedName: "felipe veron",
    nicknames: ["Feli"],
    familyCode: "C",
    isChild: true,
  },
  {
    id: "C4",
    name: "Luca Verón",
    normalizedName: "luca veron",
    nicknames: ["Luca"],
    familyCode: "C",
    isAdmin: true,
  },

  // Familia D
  {
    id: "D1",
    name: "Sara Casco",
    normalizedName: "sara casco",
    nicknames: ["Sarita"],
    familyCode: "D",
  },
  {
    id: "D2",
    name: "Benjamín Verón",
    normalizedName: "benjamin veron",
    nicknames: ["Ben"],
    familyCode: "D",
  },
  {
    id: "D3",
    name: "Vanina Verón",
    normalizedName: "vanina veron",
    nicknames: ["Vani"],
    familyCode: "D",
  },
  {
    id: "D4",
    name: "Blanca Casco",
    normalizedName: "blanca casco",
    nicknames: ["Tía Betty"],
    familyCode: "D",
  },
  {
    id: "D5",
    name: "Ezequias Nieva",
    normalizedName: "ezequias nieva",
    nicknames: ["Eze"],
    familyCode: "D",
  },

  // Familia E
  {
    id: "E1",
    name: "Martín Verón",
    normalizedName: "martin veron",
    nicknames: ["Martín"],
    familyCode: "E",
  },
  {
    id: "E2",
    name: "Carolina Netto",
    normalizedName: "carolina netto",
    nicknames: ["Caro"],
    familyCode: "E",
  },
  {
    id: "E3",
    name: "Brena Verón",
    normalizedName: "brena veron",
    nicknames: ["Brenu"],
    familyCode: "E",
  },
  {
    id: "E4",
    name: "Analía Gómez",
    normalizedName: "analia gomez",
    nicknames: ["Ana"],
    familyCode: "E",
  },
  {
    id: "E5",
    name: "Luis Netto",
    normalizedName: "luis netto",
    nicknames: ["Luis"],
    familyCode: "E",
  },
  {
    id: "E6",
    name: "Julieta Verón",
    normalizedName: "julieta veron",
    nicknames: ["Juli"],
    familyCode: "E",
    isChild: true,
  },

  // Familia F
  {
    id: "F1",
    name: "Brenda Oviedo",
    normalizedName: "brenda oviedo",
    nicknames: ["Bren"],
    familyCode: "F",
  },
  {
    id: "F2",
    name: "Javier Diaz",
    normalizedName: "javier diaz",
    nicknames: ["Javi"],
    familyCode: "F",
  },
  {
    id: "F3",
    name: "Santino Díaz",
    normalizedName: "santino diaz",
    nicknames: ["Santino"],
    familyCode: "F",
    isChild: true,
  },
  {
    id: "F4",
    name: "Olivia Díaz",
    normalizedName: "olivia diaz",
    nicknames: ["Oli"],
    familyCode: "F",
    isChild: true,
  },

  // Familia G
  {
    id: "G1",
    name: "Paola Oviedo",
    normalizedName: "paola oviedo",
    nicknames: ["Chola"],
    familyCode: "G",
  },
  {
    id: "G2",
    name: "Agustín Bustamante",
    normalizedName: "agustin bustamante",
    nicknames: ["Agus"],
    familyCode: "G",
  },
  {
    id: "G3",
    name: "Alejandro Bustamante",
    normalizedName: "alejandro bustamante",
    nicknames: ["Cholo"],
    familyCode: "G",
  },

  // Familia H
  {
    id: "H1",
    name: "Melina Arricau",
    normalizedName: "melina arricau",
    nicknames: ["Meli"],
    familyCode: "H",
  },
  {
    id: "H2",
    name: "Eduardo Álvarez",
    normalizedName: "eduardo alvarez",
    nicknames: ["Edu"],
    familyCode: "H",
  },
  {
    id: "H3",
    name: "Renata Álvarez",
    normalizedName: "renata alvarez",
    nicknames: ["Renu"],
    familyCode: "H",
    isChild: true,
  },
  {
    id: "H4",
    name: "Genaro Álvarez",
    normalizedName: "genaro alvarez",
    nicknames: ["Gena"],
    familyCode: "H",
    isChild: true,
  },

  // Familia I
  {
    id: "I1",
    name: "Graciela Oviedo",
    normalizedName: "graciela oviedo",
    nicknames: ["Tía Lulú"],
    familyCode: "I",
  },
  {
    id: "I2",
    name: "Fabrizio Costilla",
    normalizedName: "fabrizio costilla",
    nicknames: ["Fabri"],
    familyCode: "I",
  },
  {
    id: "I3",
    name: "Ramiro Costilla",
    normalizedName: "ramiro costilla",
    nicknames: ["Rami"],
    familyCode: "I",
  },
  {
    id: "I4",
    name: "Héctor Lescano",
    normalizedName: "hector lescano",
    nicknames: ["Pitu"],
    familyCode: "I",
  },

  // Familia J
  {
    id: "J1",
    name: "Liliana Oviedo",
    normalizedName: "liliana oviedo",
    nicknames: ["Tía Lili"],
    familyCode: "J",
  },
  {
    id: "J2",
    name: "Joaquín Rojas",
    normalizedName: "joaquin rojas",
    nicknames: ["Joaco"],
    familyCode: "J",
    isChild: true,
  },
  {
    id: "J3",
    name: "Soraya Rojas",
    normalizedName: "soraya rojas",
    nicknames: ["Soraya"],
    familyCode: "J",
  },

  // Familia K
  {
    id: "K1",
    name: "Horacio Navarro",
    normalizedName: "horacio navarro",
    nicknames: ["Charly"],
    familyCode: "K",
  },
  {
    id: "K2",
    name: "Graciela Kaiser",
    normalizedName: "graciela kaiser",
    nicknames: ["Gra"],
    familyCode: "K",
  },
  {
    id: "K3",
    name: "Franco Navarro",
    normalizedName: "franco navarro",
    nicknames: ["Franco"],
    familyCode: "K",
  },

  // Familia L
  {
    id: "L1",
    name: "Fabián Budiño",
    normalizedName: "fabian budino",
    nicknames: ["Fabi"],
    familyCode: "L",
  },
  {
    id: "L2",
    name: "Iara Budiño",
    normalizedName: "iara budino",
    nicknames: ["Iara"],
    familyCode: "L",
  },
  {
    id: "L3",
    name: "Erwin Budiño",
    normalizedName: "erwin budino",
    nicknames: ["Erwin"],
    familyCode: "L",
  },
  {
    id: "L4",
    name: "Mabel Schieda",
    normalizedName: "mabel schieda",
    nicknames: ["May"],
    familyCode: "L",
  },
  {
    id: "L5",
    name: "Noah Budiño",
    normalizedName: "noah budino",
    nicknames: ["Noah"],
    familyCode: "L",
    isChild: true,
  },

  // Familia M
  {
    id: "M1",
    name: "Pablo Guerediaga",
    normalizedName: "pablo guerediaga",
    nicknames: ["Pablo"],
    familyCode: "M",
  },
  {
    id: "M2",
    name: "Ayelen Albarracín",
    normalizedName: "ayelen albarracin",
    nicknames: ["Aye"],
    familyCode: "M",
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
