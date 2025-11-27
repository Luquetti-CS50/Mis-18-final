// src/types/user.ts
export interface User {
  id: string;
  name: string;
  normalizedName: string;
  tableId?: string | null;
  musicComment?: string;
  isAdmin?: boolean;
  hasLoggedIn?: boolean;
}
