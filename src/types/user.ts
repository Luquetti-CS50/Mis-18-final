// src/types/user.ts
export interface User {
  id: string;
  name: string;
  normalizedName: string;
  nicknames: string[];
  familyCode?: string;
  children?: Child[];
  tableId?: string | null;
  attendanceStatus?: AttendanceStatus;
  seatAssignedByUserId?: string | null;
  musicComment?: string;
  isAdmin?: boolean;
  hasLoggedIn?: boolean;

  /** Marcador para saber si este "user" es en realidad un hijo sin login. */
  isChild?: boolean;
}
