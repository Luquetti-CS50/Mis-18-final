// src/lib/db/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Chequeo básico de que las envs existen
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("[Supabase] Faltan variables de entorno:");
  console.error("VITE_SUPABASE_URL =", supabaseUrl);
  console.error(
    "VITE_SUPABASE_ANON_KEY presente? =",
    !!supabaseAnonKey
  );
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// 🔍 Exponemos supabase en window para poder usarlo en la consola del navegador
if (typeof window !== "undefined") {
  (window as any).supabase = supabase;
}
