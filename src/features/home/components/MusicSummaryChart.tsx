// src/features/home/components/MusicSummaryChart.tsx
import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import type { MusicPreference } from "../../../types";

// 📌 Capitaliza cada palabra del género
const prettifyGenre = (str: string) =>
  str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

interface Props {
  preferences: MusicPreference[];
}

export const MusicSummaryChart: React.FC<Props> = ({ preferences }) => {

  const data = useMemo(() => {
    const counts: Record<string, number> = {};

    preferences.forEach((p) => {
      const g = p.genre.trim().toLowerCase();
      counts[g] = (counts[g] ?? 0) + 1;
    });

    return Object.entries(counts).map(([genre, value]) => ({
      name: prettifyGenre(genre), // ← 🔥 ahora capitalizado correctamente
      value,
    }));
  }, [preferences]);

  const COLORS = ["#22d3ee", "#38bdf8", "#0ea5e9", "#0284c7", "#06b6d4"];

  return (
    <div className="mt-6 rounded-xl bg-black/50 border border-cyan-400/30 p-4 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
      <h2 className="text-cyan-200 font-semibold text-sm mb-3">
        Preferencias musicales del público 🎶
      </h2>

      {data.length === 0 ? (
        <p className="text-gray-400 text-xs">Todavía no se registraron preferencias musicales.</p>
      ) : (
        <div className="w-full h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#9ca3af"
                tick={{ fontSize: 10, fill: "#e5e7eb" }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis stroke="#9ca3af" tick={{ fontSize: 10, fill: "#e5e7eb" }} />
              <Tooltip
                cursor={{ opacity: 0.2 }}
                contentStyle={{
                  backgroundColor: "#0A0A0A",
                  border: "1px solid #22d3ee55",
                  fontSize: "12px",
                  color: "#e5e7eb",
                }}
                formatter={(value, name) => [`${value} voto(s)`, prettifyGenre(name as string)]}
              />

              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
