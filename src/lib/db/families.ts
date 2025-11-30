// src/lib/db/families.ts
import { User } from "@/types/user";
import { SEED_USERS } from "./seeds";

export interface FamilyGroup {
  /** Código de familia: A, B, C, ... */
  code: string;

  /** Miembros adultos (pueden loguear, aparecen en Login/Home/Mesas). */
  members: User[];

  /** Hijos de esa familia (no loguean, solo para asignar sillas). */
  children: User[];
}

/**
 * Devuelve todos los códigos de familia existentes en el seed,
 * sin duplicados y sin undefined.
 */
const FAMILY_CODES: string[] = Array.from(
  new Set(
    SEED_USERS
      .map((u) => u.familyCode)
      .filter((code): code is string => Boolean(code))
  )
);

/**
 * Lista de grupos familiares armada automáticamente a partir de SEED_USERS.
 */
export const FAMILY_GROUPS: FamilyGroup[] = FAMILY_CODES.map((code) => {
  const members = SEED_USERS.filter(
    (u) => u.familyCode === code && !u.isChild
  );
  const children = SEED_USERS.filter(
    (u) => u.familyCode === code && u.isChild
  );

  return {
    code,
    members,
    children,
  };
});

/**
 * Helper para obtener el grupo familiar de un usuario.
 * Devuelve null si el usuario no tiene familyCode.
 */
export function getFamilyGroupByUserId(userId: string): FamilyGroup | null {
  const user = SEED_USERS.find((u) => u.id === userId);
  if (!user || !user.familyCode) return null;

  return (
    FAMILY_GROUPS.find((group) => group.code === user.familyCode) ?? null
  );
}
