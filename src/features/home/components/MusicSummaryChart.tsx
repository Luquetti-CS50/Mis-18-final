// src/features/home/components/MusicSummaryChart.tsx
import React from "react";
import type { MusicPreference } from "../../../types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Props {
  preferences: MusicPreference[];
}

export const MusicSummaryChart: React.FC<Props> = ({ preferences }) => {
  const counts = preferences.reduce((acc, p) => {
    acc[p.genre] = (acc[p.genre] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(counts).map((g) => ({ genre: g, votes: counts[g] }));

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, bottom: 10 }}>
          <XAxis dataKey="genre" stroke="#72e3ff" tick={{ fontSize: 11 }} />
          <YAxis stroke="#72e3ff" tick={{ fontSize: 11 }} />
          <Tooltip contentStyle={{ background: "#000", border: "1px solid #0ff" }} />
          <Bar dataKey="votes" radius={5}>
            {data.map((_, i) => (
              <Cell key={i} fill="rgba(0,255,255,0.35)" />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
