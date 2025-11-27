// src/features/home/components/MusicSummaryChart.tsx
import React, { useMemo } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { MusicPreference, MusicGenreCount } from "../../../types";
import { NeonCard } from "../../../components/ui/NeonCard";

interface Props {
  preferences: MusicPreference[];
}

export const MusicSummaryChart: React.FC<Props> = ({ preferences }) => {
  const chartData: MusicGenreCount[] = useMemo(() => {
    const counter = new Map<string, number>();
    for (const pref of preferences) {
      counter.set(pref.genre, (counter.get(pref.genre) ?? 0) + 1);
    }
    return Array.from(counter.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [preferences]);

  if (chartData.length === 0) return null;

  return (
    <NeonCard className="mb-6 cursor-default">
      <h3 className="text-sm font-semibold text-white mb-2">
        Gustos musicales generales
      </h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #0f172a",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </NeonCard>
  );
};
