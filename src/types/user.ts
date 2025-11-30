// src/types/user.ts

export type AttendanceStatus = "pending" | "going_no_table" | "going_with_table";

export interface User {
  id: string;

  /** Nombre completo (para login, listas formales, etc.) */
  name: string;

  /** Nombre normalizado (minúsculas, sin acentos) para búsquedas/login. */
  normalizedName: string;

  /** Lista de apodos posibles para mostrar en la UI. */
  nicknames?: string[];

  /** Código de grupo familiar (A, B, C, ...). */
  familyCode?: string;

  /** Mesa actual del usuario (tX, null, etc.). */
  tableId?: string | null;

  /** Estado lógico de asistencia. */
  attendanceStatus?: AttendanceStatus;

  /** Quién le asignó la mesa (para cartel “te asignaron una mesa”). */
  seatAssignedByUserId?: string | null;

  /** Comentario de música opcional. */
  musicComment?: string;

  /** Permiso de administrador. */
  isAdmin?: boolean;

  /** Marcador de si ya inició sesión al menos una vez. */
  hasLoggedIn?: boolean;

  /** Si es un menor (“child”) que NO debe poder loguear. */
  isChild?: boolean;
}
