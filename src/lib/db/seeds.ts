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

// src/lib/db/seeds.ts  (solo reemplazar este bloque)

export const SEED_WISHLIST: WishlistItem[] = [
  {
    id: "w1",
    name: "Notebook Lenovo IdeaPad Flex 5 16\" (Ryzen 7)",
    imageUrl: "https://m.media-amazon.com/images/I/4164cS0wTrL._AC_.jpg",
    linkUrl:
      "https://tiendamia.com/ar/p/amz/b0fdh3cj57/lenovo-ideapad-flex-5-16abr8-2025-laptop-16-wuxga-ips",
    isTaken: false,
  },
  {
    id: "w2",
    name: "Samsung Galaxy Smartwatch 7",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_615914-MLA99442302936_112025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA38650089?pdp_filters=item_id:MLA2072564196#origin=share&sid=share&wid=MLA2072564196&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w3",
    name: "Samsung Galaxy S23 Ultra 512GB (Renewed)",
    imageUrl: "https://m.media-amazon.com/images/I/51ZZO2wp8EL._AC_SL1000_.jpg",
    linkUrl:
      "https://tiendamia.com/ar/p/amz/b0c51q5z9k/samsung-galaxy-s23-ultra-renewed-5g-factory-unlocked-512gb?utm_medium=referral&utm_source=share-pdp",
    isTaken: false,
  },
  {
    id: "w4",
    name: "Power Bank Suono",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_988881-MLA95520105252_102025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA45525874?pdp_filters=item_id:MLA2203764226#origin=share&sid=share&wid=MLA2203764226&action=copy",
    isTaken: false,
  },
  {
    id: "w5",
    name: "Auriculares JBL Tune 770nc",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_823887-MLA99496133602_112025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA53285777?pdp_filters=item_id:MLA2506259684#origin=share&sid=share&wid=MLA2506259684&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w6",
    name: "Campera Impermeable Micro Polar (Talle XL)",
    imageUrl: "https://http2.mlstatic.com/D_Q_NP_601751-MLA77838586028_072024-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/up/MLAU3153416601?pdp_filters=item_id:MLA2068790410#origin=share&sid=share&wid=MLA2068790410&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w7",
    name: "Cuchillo de Cocina de Acero de Damasco",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_873351-MLA99466744682_112025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA44588562?pdp_filters=item_id:MLA1474690861#origin=share&sid=share&wid=MLA1474690861&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w8",
    name: "PlayStation 4 Pro",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_944501-MLA99299130767_112025-F.webp",
    linkUrl:
      "https://articulo.mercadolibre.com.ar/MLA-1590845771#origin=share&sid=share&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w9",
    name: "Buzo con Capucha de Alpina (Talle XL)",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_923370-MLA84351171021_052025-F.webp",
    linkUrl:
      "https://articulo.mercadolibre.com.ar/MLA-1136900970?attributes=COLOR_SECONDARY_COLOR:TmVncm8gUG9sYXI=,SIZE:WEw=#origin=share&sid=share&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w10",
    name: "Zapatillas adidas Grand Court Base 2.0 (Talle 41-42)",
    imageUrl: "https://sportline.vtexassets.com/arquivos/ids/923494/004025000GW9251_1.jpg?v=638129128141600000",
    linkUrl:
      "https://www.sportline.com.ar/grand-court-base-2-0-004025000gw9251/p?idsku=2423854&gad_source=1&gad_campaignid=16290918871&gbraid=0AAAAADk1U5I-m2pGOvA8pXeBC9NtkAFL4&gclid=Cj0KCQiA0KrJBhCOARIsAGIy9wCI3gUfgPPK5aL_5ieHfnpZVSJIwQ7WjahX-DAC9Ll4XS14-fGPY6IaAsuUEALw_wcB",
    isTaken: false,
  },
  {
    id: "w11",
    name: "Auriculares Samsung Galaxy Buds2 Pro",
    imageUrl: "https://http2.mlstatic.com/D_Q_NP_610769-CBT81547552458_012025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA2005001158?pdp_filters=item_id:MLA1487963065#origin=share&sid=share&wid=MLA1487963065&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w12",
    name: "PC Gamer Ryzen 7 5700G",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_618895-MLA99454500152_112025-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA47543910?pdp_filters=item_id:MLA2039768678#origin=share&sid=share&wid=MLA2039768678&action=whatsapp",
    isTaken: false,
  },
  {
    id: "w13",
    name: "Perfume Versace Eros 200ml",
    imageUrl: "https://http2.mlstatic.com/D_NQ_NP_2X_800970-MLU75888175947_042024-F.webp",
    linkUrl:
      "https://www.mercadolibre.com.ar/p/MLA17892343?pdp_filters=item_id:MLA1557220025#origin=share&sid=share&wid=MLA1557220025&action=whatsapp",
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
