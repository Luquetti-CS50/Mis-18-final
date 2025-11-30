// src/types/user.ts
export type AttendanceStatus = "pending" | "going_no_table" | "going_with_table";

export interface Child {
  id: string;
  fullName: string;
  nickname: string;
}

export interface User {
  id: string;

  /** Nombre completo, usado para login, listas formales, etc. */
  name: string;

  /** Nombre normalizado (minúsculas, sin acentos) para búsquedas. */
  normalizedName: string;

  /** Lista de apodos posibles para mostrar en la UI (Home, modales, etc.). */
  nicknames: string[];

  /** Código de grupo familiar (A, B, C, ...). */
  familyCode?: string;

  /** Hijos asociados a este grupo familiar (no tienen login propio). */
  children?: Child[];

  /** Id de mesa actual (string porque las mesas ya usan id string). */
  tableId?: string | null;

  /** Estado de asistencia lógico (sin mesa / va sin mesa / va con mesa). */
  attendanceStatus?: AttendanceStatus;

  /** Quién fue el último usuario que le asignó la mesa. */
  seatAssignedByUserId?: string | null;

  /** Comentario de música opcional. */
  musicComment?: string;

  /** Si el usuario es administrador. */
  isAdmin?: boolean;

  /** Marcador de si ya inició sesión al menos una vez. */
  hasLoggedIn?: boolean;
}
